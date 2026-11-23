import test from "node:test";
import assert from "node:assert/strict";
import {
  ATTACK_SLICE_AUDIO_CANDIDATES,
  ATTACK_SLICE_AUDIO_SRC,
  ATTACK_SLICE_SOUND_KEY,
  shouldUseSliceMp3,
} from "./attack-sound";
import { SLICE_AUDIO_CANDIDATES, SLICE_AUDIO_SRC } from "../../demonslayer/sound";

test("Attack on Titan uses the exact same slice.mp3 asset paths as Demon Slayer", () => {
  assert.equal(ATTACK_SLICE_AUDIO_SRC, SLICE_AUDIO_SRC);
  assert.deepEqual([...ATTACK_SLICE_AUDIO_CANDIDATES], [...SLICE_AUDIO_CANDIDATES]);
  assert.equal(ATTACK_SLICE_SOUND_KEY, "demonslayer:slice");
});

test("shouldUseSliceMp3 enables slice.mp3 for choice outcomes and expedition slash, keeping dialogue click lightweight", () => {
  assert.equal(shouldUseSliceMp3("good"), true);
  assert.equal(shouldUseSliceMp3("bad"), true);
  assert.equal(shouldUseSliceMp3("slash"), true);
  assert.equal(shouldUseSliceMp3("click"), false);
});
