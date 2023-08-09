import UseFetch from "../hooks/useFetch";

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
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fetchSearchData, searchData, isSearchPending, searchError] =
    UseFetch();
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
  return (
    <DataContext.Provider
      value={{
        ...state,
        setSearchData,
        addToQueryArray,
        deleteFromQueryArray,
        getTitleAndName,
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
