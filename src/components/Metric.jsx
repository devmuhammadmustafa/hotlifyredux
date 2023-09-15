import { Switch } from "@mui/material";
import styles from "./Metric.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../features/temperatureSlice";
function Metric() {
  const data = useSelector((state) => state.temperature);
  const { status, error } = data;
  const dispatch = useDispatch();
  function handleChange(e) {
    dispatch(setType(e.target.checked));
  }

  // if (status === "loading") return <h1>Loading........</h1>;
  // if (error) return <h1>Error........</h1>;

  return (
    <div className={styles.metric}>
      <span>°C</span>
      <Switch
        checked={data.checked}
        onChange={handleChange}
        className={styles.toggle}
        value={data.checked}
      />
      <span>°F</span>
    </div>
  );
}
export default Metric;
