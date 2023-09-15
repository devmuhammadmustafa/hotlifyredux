import { useSelector } from "react-redux";
import styles from "./Screen.module.css";
import RoomIcon from "@mui/icons-material/Room";

function Screen() {
  const data = useSelector((state) => state.temperature);
  const { data: currentData, status, error, symbol } = data;
  if (status === "loading") return <h1>Loading........</h1>;
  if (error) return <h1>Error........</h1>;

  return (
    <div className={styles.screen}>
      <span className={styles.location}>
        {currentData.city} <RoomIcon />
      </span>
      <span className={styles.date}>Aug 23, Tue</span>
      <div className={styles.temperature}>
        <img src="/images/icon _temperature_.svg" />
        <span>
          {currentData.temp}°{symbol}
        </span>
        <img src={`/images/${currentData.weather}.svg`} />
      </div>
      <div className={styles.humidity}>
        <span>Humidity</span>
        <span>{currentData.humidity}%</span>
      </div>
      <div className={styles.wind}>
        <span>Wind</span>
        <span>{currentData.speed}mph</span>
      </div>
    </div>
  );
}
export default Screen;
