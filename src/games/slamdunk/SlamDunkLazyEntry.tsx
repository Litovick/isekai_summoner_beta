import "./styles.css";
import { Game } from "./components/Game";
import { slamdunk } from "./game/themes/slamdunk";

export default function SlamDunkLazyEntry() {
  return (
    <div className="slam-game">
      <Game theme={slamdunk} />
    </div>
  );
}
