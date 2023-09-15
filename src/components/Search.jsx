import { useRef } from "react";
import styles from "./Search.module.css";
import { useDispatch } from "react-redux";
import { getTemperature } from "../features/temperatureSlice";
function Search() {
  const searchInput = useRef();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const query = searchInput.current.value.trim();
    if (query.length < 2) return;
    dispatch(getTemperature(query));
    searchInput.current.value = "";
  }

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input placeholder="Baku" ref={searchInput} />
      <button>
        <img src="/images/icon _search_.svg" />
      </button>
    </form>
  );
}
export default Search;
