import { Link } from "react-router-dom";
import hero1x from "../../assets/hero@1x.jpg";
import hero2x from "../../assets/hero@2x.jpg";
import styles from "./Home.module.css";

const statistics = [
  {
    value: "32,000 +",
    label: "Experienced tutors",
  },
  {
    value: "300,000 +",
    label: "5-star tutor reviews",
  },
  {
    value: "120 +",
    label: "Subjects taught",
  },
  {
    value: "200 +",
    label: "Tutor nationalities",
  },
];

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Unlock your potential with the best{" "}
              <span className={styles.highlight}>language</span> tutors
            </h1>

            <p className={styles.description}>
              Embark on an exciting language journey with expert language
              tutors. Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>

            <Link to="/teachers" className={styles.getStartedButton}>
              Get started
            </Link>
          </div>

          <div className={styles.heroImageWrapper}>
            <img
              src={hero1x}
              srcSet={`${hero1x} 1x, ${hero2x} 2x`}
              alt="Language tutor using a laptop"
              className={styles.heroImage}
            />
          </div>
        </div>

        <ul className={styles.statistics}>
          {statistics.map(({ value, label }) => (
            <li key={value} className={styles.statisticItem}>
              <strong className={styles.statisticValue}>{value}</strong>
              <span className={styles.statisticLabel}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Home;
