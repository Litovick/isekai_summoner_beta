import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getGlobalAudioMuted,
  isLikelyHtmlResponse,
  playSoundEffect,
  resolveAudioCandidateUrls,
  scheduleOnAudioContext,
  setGlobalAudioMuted,
  subscribeGlobalAudioMuted,
  toggleGlobalAudioMuted,
  type MinimalAudioContext,
} from "./mobileAudio";

describe("mobileAudio", () => {
  it("normalizes and deduplicates candidate audio URLs preserving order", () => {
    assert.deepEqual(
      resolveAudioCandidateUrls([
        " /demonslayer/sounds/slice.mp3 ",
        "",
        "/demonslayer/characters/sounds/slice.mp3",
        "/demonslayer/sounds/slice.mp3",
      ]),
      [
        "/demonslayer/sounds/slice.mp3",
        "/demonslayer/characters/sounds/slice.mp3",
      ],
    );

    assert.deepEqual(
      resolveAudioCandidateUrls("/naruto/sounds/chakra.mp3"),
      ["/naruto/sounds/chakra.mp3"],
    );
  });

  it("executes immediately when AudioContext is already running", () => {
    let called = 0;
    const ctx: MinimalAudioContext = {
      state: "running",
      resume: () => Promise.resolve(),
    };

    const ok = scheduleOnAudioContext(ctx, () => {
      called += 1;
    });

    assert.equal(ok, true);
    assert.equal(called, 1);
  });

  it("resumes suspended AudioContext before executing synthesis callback", async () => {
    let resumed = false;
    let called = 0;
    const ctx: MinimalAudioContext = {
      state: "suspended",
      resume: () => {
        resumed = true;
        return Promise.resolve();
      },
    };

    const ok = scheduleOnAudioContext(ctx, () => {
      called += 1;
    });

    assert.equal(ok, true);
    assert.equal(resumed, true);
    assert.equal(called, 0);

    await Promise.resolve();
    assert.equal(called, 1);
  });

  it("does not throw or invoke callback when AudioContext is closed or null", () => {
    let called = 0;
    const closedCtx: MinimalAudioContext = {
      state: "closed",
      resume: () => Promise.resolve(),
    };

    assert.equal(
      scheduleOnAudioContext(null, () => {
        called += 1;
      }),
      false,
    );
    assert.equal(
      scheduleOnAudioContext(closedCtx, () => {
        called += 1;
      }),
      false,
    );
    assert.equal(called, 0);
  });

  it("short-circuits muted playback without calling fallback", () => {
    setGlobalAudioMuted(false);
    let fallbackCalled = 0;
    playSoundEffect({
      key: "test-muted",
      urls: "/test/sound.mp3",
      muted: true,
      onFallback: () => {
        fallbackCalled += 1;
      },
    });
    assert.equal(fallbackCalled, 0);
  });

  it("invokes fallback in headless/non-browser environments when Audio APIs are absent", () => {
    setGlobalAudioMuted(false);
    let fallbackCalled = 0;
    playSoundEffect({
      key: "test-fallback",
      urls: "/test/sound.mp3",
      muted: false,
      onFallback: () => {
        fallbackCalled += 1;
      },
    });
    assert.equal(fallbackCalled, 1);
  });

  it("manages global mute state, notifies subscribers, and blocks playback when globally muted", () => {
    setGlobalAudioMuted(false);
    assert.equal(getGlobalAudioMuted(), false);

    const events: boolean[] = [];
    const unsubscribe = subscribeGlobalAudioMuted((m) => {
      events.push(m);
    });

    const afterToggleOn = toggleGlobalAudioMuted();
    assert.equal(afterToggleOn, true);
    assert.equal(getGlobalAudioMuted(), true);

    let fallbackCalled = 0;
    playSoundEffect({
      key: "test-global-muted",
      urls: "/test/sound.mp3",
      muted: false,
      onFallback: () => {
        fallbackCalled += 1;
      },
    });
    assert.equal(fallbackCalled, 0);

    const afterToggleOff = toggleGlobalAudioMuted();
    assert.equal(afterToggleOff, false);
    assert.equal(getGlobalAudioMuted(), false);
    assert.deepEqual(events, [true, false]);

    unsubscribe();
    setGlobalAudioMuted(true);
    assert.deepEqual(events, [true, false]);
    setGlobalAudioMuted(false);
  });

  it("detects SPA text/html fallback responses so audio preloader tries next candidate", () => {
    assert.equal(isLikelyHtmlResponse("text/html; charset=utf-8"), true);
    assert.equal(isLikelyHtmlResponse("TEXT/HTML"), true);
    assert.equal(isLikelyHtmlResponse("audio/mpeg"), false);
    assert.equal(isLikelyHtmlResponse("application/octet-stream"), false);
    assert.equal(isLikelyHtmlResponse(null), false);
  });
});
