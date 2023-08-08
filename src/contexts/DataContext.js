import UseFetch from "../hooks/useFetch";

const { createContext, useContext, useReducer, useEffect } = require("react");

const DataContext = createContext();

const initialState = {
  searchData: {
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
  return (
    <DataContext.Provider value={{ ...state, setSearchData }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => {
  return useContext(DataContext);
};

export { DataContext, DataProvider, useDataContext };
