import UseFetch from "../hooks/useFetch";
import useSimpleFetch from "../hooks/useSimpleFetch";

const { createContext, useContext, useReducer, useEffect } = require("react");

const DataContext = createContext();

const initialState = {
  searchData: {
    data: null,
    isPending: false,
    error: null,
  },
  queryArray: [],
  result: {
    data: null,
    isPending: false,
    error: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_DATA":
      return {
        ...state,
        searchData: {
          data: action.payload.searchData,
          isPending: action.payload.isSearchPending,
          error: action.payload.searchError,
        },
      };
    case "ADD_TO_QUERY_ARRAY":
      return {
        ...state,
        queryArray: [...state.queryArray, action.payload],
      };
    case "DELETE_FROM_QUERY_ARRAY":
      let newQueryArray = state.queryArray.filter(
        (e) => e.id !== action.payload
      );
      return {
        ...state,
        queryArray: newQueryArray,
      };
    case "UPDATE_QUERY_ARRAY":
      return {
        ...state,
        queryArray: action.payload,
      };
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fetchSearchData, searchData, isSearchPending, searchError] =
    UseFetch();
  const fetchSimpleData = useSimpleFetch();
  const setSearchData = async (string) => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${string}&include_adult=false&language=en-US&page=1`;
    await fetchSearchData(url);
  };
  useEffect(() => {
    dispatch({
      type: "SET_SEARCH_DATA",
      payload: { searchData, isSearchPending, searchError },
    });
  }, [searchData]);

  const addToQueryArray = (data) => {
    if (data)
      dispatch({
        type: "ADD_TO_QUERY_ARRAY",
        payload: data,
      });
  };

  const deleteFromQueryArray = (id) => {
    dispatch({
      type: "DELETE_FROM_QUERY_ARRAY",
      payload: id,
    });
  };

  const getTitleAndName = (obj) => {
    if (obj["media_type"] === "tv") return obj["name"];
    if (obj["media_type"] === "movie") return obj["title"];
  };

  const addCast = async () => {
    const newQueryArray = await Promise.all(
      state.queryArray.map(async (e) => {
        const url = `https://api.themoviedb.org/3/${e["media_type"]}/${
          e["id"]
        }/${
          e["media_type"] === "tv" ? "aggregate_" : ""
        }credits?language=en-US`;
        const credits = await fetchSimpleData(url);
        e["cast"] = credits["cast"];
        return e;
      })
    );
    dispatch({
      type: "UPDATE_QUERY_ARRAY",
      payload: newQueryArray,
    });
  };
  return (
    <DataContext.Provider
      value={{
        ...state,
        setSearchData,
        addToQueryArray,
        deleteFromQueryArray,
        getTitleAndName,
        addCast,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => {
  return useContext(DataContext);
};

export { DataContext, DataProvider, useDataContext };
