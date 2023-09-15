import styles from "./AppLayout.module.css";
import Header from "../components/Header";
import Metric from "../components/Metric";
import TabLink from "../components/TabLink";
import Screen from "../components/Screen";
import Search from "../components/Search";
import Regions from "../components/Regions";

function AppLayout() {
  return (
    <>
      <div className={styles.app}>
        <Header />
        <Metric />
        <TabLink />
        <Search />
        <Screen />
        <Regions />
      </div>
    </>
  );
}
export default AppLayout;
