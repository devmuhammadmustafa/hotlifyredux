import { Suspense, lazy, useEffect } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { useDispatch, useSelector } from "react-redux";
import { getTemperature } from "./features/temperatureSlice";
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.temperature);

  useEffect(() => {
    dispatch(getTemperature(search));
  }, [search]);
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <AppLayout />
    </Suspense>
  );
}

export default App;
