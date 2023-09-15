import { useSelector } from "react-redux";
import Region from "./Region";
import styles from "./Regions.module.css";
function Regions() {
  const data = useSelector((state) => state.temperature);
  const { searchedData } = data;
  return (
    <div className={styles.regions}>
      {searchedData.map((region, i) => (
        <Region key={i} {...region} />
      ))}
    </div>
  );
}
export default Regions;
