import test from "node:test";
import assert from "node:assert/strict";
import {
  collectUniqueImageUrls,
  preloadImagesInBackground,
  preloadPriorityImages,
  resetPreloaderCache,
} from "./imagePreloader";

test("collectUniqueImageUrls filters blanks, deduplicates, and encodes spaces", () => {
  const urls = collectUniqueImageUrls([
    "",
    null,
    undefined,
    "  ",
    "/onepiece/characters/luffy.png",
    "/onepiece/characters/luffy.png",
    "/sugarsugarune/backgrounds/magic world.jpg",
    "/sugarsugarune/backgrounds/magic%20world.jpg",
  ]);
  assert.deepEqual(urls, [
    "/onepiece/characters/luffy.png",
    "/sugarsugarune/backgrounds/magic%20world.jpg",
  ]);
});

test("preloadPriorityImages uses new Image() with decoding=async and deduplicates across calls", () => {
  resetPreloaderCache();
  const created: Array<{ src: string; decoding: string }> = [];
  const prevImage = globalThis.Image;

  class FakeImage {
    src = "";
    decoding = "";
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    constructor() {
      created.push(this);
    }
  }

  (globalThis as unknown as { Image: typeof FakeImage }).Image = FakeImage;
  try {
    const first = preloadPriorityImages([
      "/onepiece/characters/nami.png",
      "/onepiece/characters/robin.png",
      "/onepiece/characters/nami.png",
    ]);
    assert.equal(first, 2);
    assert.equal(created.length, 2);
    assert.equal(created[0]!.src, "/onepiece/characters/nami.png");
    assert.equal(created[0]!.decoding, "async");
    assert.equal(created[1]!.src, "/onepiece/characters/robin.png");

    // Second call with overlapping URL only loads the new one
    const second = preloadPriorityImages([
      "/onepiece/characters/robin.png",
      "/onepiece/characters/usopp.png",
    ]);
    assert.equal(second, 1);
    assert.equal(created.length, 3);
    assert.equal(created[2]!.src, "/onepiece/characters/usopp.png");
  } finally {
    (globalThis as unknown as { Image: typeof prevImage }).Image = prevImage;
    resetPreloaderCache();
  }
});

test("preloadImagesInBackground batches assets and supports cancellation", async () => {
  resetPreloaderCache();
  const created: string[] = [];
  const prevImage = globalThis.Image;

  class FakeImage {
    private _src = "";
    decoding = "";
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    set src(v: string) {
      this._src = v;
      created.push(v);
    }
    get src() {
      return this._src;
    }
  }

  (globalThis as unknown as { Image: typeof FakeImage }).Image = FakeImage;
  try {
    const cancel = preloadImagesInBackground(
      ["/a.png", "/b.png", "/c.png"],
      2,
    );
    await new Promise((r) => setTimeout(r, 320));
    cancel();
    assert.deepEqual(created, ["/a.png", "/b.png", "/c.png"]);
  } finally {
    (globalThis as unknown as { Image: typeof prevImage }).Image = prevImage;
    resetPreloaderCache();
  }
});
