import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  ONEPIECE_BACKGROUNDS,
  getOnePieceStageBackground,
  toOnePieceBgUrl,
} from "./onepiece/data/backgrounds";
import { EPISODES as ONEPIECE_EPISODES } from "./onepiece/data/episodes";

import {
  BLEACH_BACKGROUNDS,
  getBleachStageBackground,
  toBleachBgUrl,
} from "./bleach/data/backgrounds";
import { EPISODES as BLEACH_EPISODES } from "./bleach/data/episodes";

import {
  DEMONSLAYER_BACKGROUNDS,
  getDemonSlayerStageBackground,
  toDemonSlayerBgUrl,
} from "./demonslayer/data/backgrounds";
import { EPISODES as DEMONSLAYER_EPISODES } from "./demonslayer/data/episodes";

import {
  NARUTO_BACKGROUNDS,
  getNarutoStageBackground,
  isNarutoTopRightLogoCropBackground,
  toNarutoBgUrl,
} from "./naruto/data/backgrounds";
import { EPISODES as NARUTO_EPISODES } from "./naruto/data/episodes";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");

function assertPublicAssetExists(webPath: string) {
  const fullPath = path.join(PUBLIC_DIR, webPath.replace(/^\/+/, ""));
  assert.ok(
    fs.existsSync(fullPath),
    `Expected background file to exist on disk: ${webPath} (${fullPath})`,
  );
  const stat = fs.statSync(fullPath);
  assert.ok(stat.size > 0, `Expected non-empty file: ${webPath}`);
}

function listUploadedBackgrounds(gameDir: string): string[] {
  const dirPath = path.join(PUBLIC_DIR, gameDir, "backgrounds");
  return fs
    .readdirSync(dirPath)
    .filter((f) => !f.startsWith("."))
    .map((f) => `/${gameDir}/backgrounds/${f}`)
    .sort();
}

test("All 32 mapped background files across onepiece, bleach, demonslayer, naruto exist on disk and match uploaded assets", () => {
  const groups = [
    { dir: "onepiece", values: Object.values(ONEPIECE_BACKGROUNDS) },
    { dir: "bleach", values: Object.values(BLEACH_BACKGROUNDS) },
    { dir: "demonslayer", values: Object.values(DEMONSLAYER_BACKGROUNDS) },
    { dir: "naruto", values: Object.values(NARUTO_BACKGROUNDS) },
  ];

  for (const { dir, values } of groups) {
    assert.equal(values.length, 8, `${dir} should define 8 background paths`);
    for (const webPath of values) {
      assertPublicAssetExists(webPath);
    }
    const uploaded = listUploadedBackgrounds(dir);
    assert.deepEqual(
      [...values].sort(),
      uploaded,
      `${dir} mapped backgrounds should cover all uploaded files in public/${dir}/backgrounds/`,
    );
  }
});

test("Every episode in all 4 games resolves to a valid background image and spaces are URL-encoded", () => {
  for (const ep of ONEPIECE_EPISODES) {
    const bg = getOnePieceStageBackground(ep.stageTheme);
    assertPublicAssetExists(bg);
    const cssUrl = toOnePieceBgUrl(bg);
    assert.match(cssUrl, /^url\('\/onepiece\/backgrounds\/[^'\s]+'\)$/);
  }

  for (const ep of BLEACH_EPISODES) {
    const bg = getBleachStageBackground(ep.stageTheme, "story");
    assertPublicAssetExists(bg);
    const cssUrl = toBleachBgUrl(bg);
    assert.match(cssUrl, /^url\('\/bleach\/backgrounds\/[^'\s]+'\)$/);
  }
  // Bleach EP06 transitions from Hueco Mundo desert to Las Noches interior on choice/reaction
  assert.equal(
    getBleachStageBackground("hueco-mundo", "story"),
    BLEACH_BACKGROUNDS.huecoMundo,
  );
  assert.equal(
    getBleachStageBackground("hueco-mundo", "choice"),
    BLEACH_BACKGROUNDS.lasNoches,
  );
  assert.equal(
    getBleachStageBackground("hueco-mundo", "reaction"),
    BLEACH_BACKGROUNDS.lasNoches,
  );

  for (const ep of DEMONSLAYER_EPISODES) {
    const bg = getDemonSlayerStageBackground(ep.stageTheme);
    assertPublicAssetExists(bg);
    const cssUrl = toDemonSlayerBgUrl(bg);
    assert.match(cssUrl, /^url\('\/demonslayer\/backgrounds\/[^'\s]+'\)$/);
  }

  for (const ep of NARUTO_EPISODES) {
    const bg = getNarutoStageBackground(ep.stageTheme);
    assertPublicAssetExists(bg);
    const cssUrl = toNarutoBgUrl(bg);
    assert.match(cssUrl, /^url\('\/naruto\/backgrounds\/[^'\s]+'\)$/);
  }
});

test("Naruto top-right logo crop applies EXCLUSIVELY to amegakure.jpg", () => {
  assert.equal(
    isNarutoTopRightLogoCropBackground(NARUTO_BACKGROUNDS.amegakure),
    true,
  );
  assert.equal(
    isNarutoTopRightLogoCropBackground(getNarutoStageBackground("akatsuki-moon")),
    true,
  );

  for (const [key, bgPath] of Object.entries(NARUTO_BACKGROUNDS)) {
    if (key === "amegakure") continue;
    assert.equal(
      isNarutoTopRightLogoCropBackground(bgPath),
      false,
      `Logo crop must NOT apply to ${bgPath}`,
    );
  }
});
