import ToolGlyph from "./ToolGlyph";
import { marqueeTools } from "../data/techStack";
import styles from "./ToolMarquee.module.css";

function Track({ hidden }) {
  return (
    <ul className={styles.track} aria-hidden={hidden || undefined}>
      {marqueeTools.map((name) => (
        <li key={name} className={styles.item}>
          <span className={styles.glyph}>
            <ToolGlyph name={name} size={18} />
          </span>
          {name}
        </li>
      ))}
    </ul>
  );
}

/** Endless strip of tool logos between the top section and About. Pauses on hover. */
export default function ToolMarquee() {
  return (
    <section className={styles.strip} aria-label="Tools I work with">
      <div className={styles.viewport}>
        <div className={styles.rail}>
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}
