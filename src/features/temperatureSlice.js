import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APP_ID, BASE_URL } from "../axios";
import axios from "../axios";
import {
  addItemToSearchedData,
  convertTemperature,
  setSearchedDataAsType,
} from "../utils";

const searchedData = JSON.parse(localStorage.getItem("regions"));
const initialState = {
  checked: true,
  symbol: "F",
  search: "Baku",
  data: {},
  searchedData: searchedData?.length > 0 ? searchedData : [],
  status: "",
  error: "",
};

// Get  the temperature from the API
export const getTemperature = createAsyncThunk(
  "temperature/getTemperature",
  async (search, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}?q=${search}&appid=${APP_ID}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

const temperatureSlice = createSlice({
  name: "temperature",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.checked = action.payload;
      state.symbol = action.payload ? "F" : "C";
      state.data = {
        ...state.data,
        temp: convertTemperature(state.data.kelvin, action.payload),
      };
      state.searchedData = setSearchedDataAsType(
        state.searchedData,
        action.payload
      );
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: {
    [getTemperature.pending]: (state) => {
      // When data is being fetched
      state.status = "loading";
    },
    [getTemperature.fulfilled]: (state, action) => {
      // When data is fetched successfully
      state.status = "successful";
      state.error = "";
      // Concatenate the new data to the existing data in the array
      state.data = {
        city: action.payload.name,
        kelvin: action.payload.main.temp,
        humidity: action.payload.main.humidity,
        speed: action.payload.wind.speed,
        temp: convertTemperature(action.payload.main.temp, state.checked),
        weather: action.payload.weather[0].main,
      };
      state.searchedData = addItemToSearchedData(
        state.searchedData,
        state.data
      );
    },
    [getTemperature.rejected]: (state, action) => {
      // When data is fetched unsuccessfully
      state.status = "failed";

      // Update the error message for proper error handling
      state.error = action.error.message;
    },
  },
});

const { reducer, actions } = temperatureSlice;

export const { setType, setSearch } = actions;
export default reducer;
