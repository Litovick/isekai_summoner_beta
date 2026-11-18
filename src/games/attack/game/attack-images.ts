import bg0 from "../assets/bg-0-hq.jpg";
import bg1 from "../assets/bg-1-gate.jpg";
import bg2 from "../assets/bg-2-forest-edge.jpg";
import bg3 from "../assets/bg-3-wasteland.jpg";
import bg4 from "../assets/bg-4-supply.jpg";
import bg5 from "../assets/bg-5-forest-deep.jpg";
import bg6 from "../assets/bg-6-ruins.jpg";
import bg7 from "../assets/bg-7-canyon.jpg";
import bg8 from "../assets/bg-8-command.jpg";
import bg9 from "../assets/bg-9-final.jpg";
import erwin from "../assets/p-erwin.png";
import levi from "../assets/p-levi.png";
import mikasa from "../assets/p-mikasa.png";
import armin from "../assets/p-armin.png";
import hange from "../assets/p-hange.png";

/** One background per mission (index 0-9). */
export const missionBackgrounds = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];
export const homeBackground = bg1;
export const portraits: Record<string, string> = { 엘빈: erwin, 리바이: levi, 미카사: mikasa, 아르민: armin, 한지: hange };
