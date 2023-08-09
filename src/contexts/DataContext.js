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
    case "RESET_RESULT":
      return {
        ...state,
        result: {
          data: null,
          isPending: false,
          error: null,
        },
      };
    case "SET_RESULT_DATA":
      return {
        ...state,
        result: {
          data: action.payload,
          isPending: false,
          error: null,
        },
      };
    case "SET_RESULT_PENDING":
      return {
        ...state,
        result: {
          data: null,
          isPending: true,
          error: null,
        },
      };
    case "SET_RESULT_ERROR":
      return {
        ...state,
        result: {
          data: null,
          isPending: false,
          error: action.payload,
        },
      };
    default:
      return state;
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
  const findPeople = async () => {
    dispatch({
      type: "SET_RESULT_PENDING",
    });
    /**
     * Below is the implementation to find the people
     * who were appeared in all the movies/TV shows
     * in the searched array
     */
    const hashMap = {};
    const len = state.queryArray.length;
    for (let query of state.queryArray) {
      let idArray = query["cast"].map((e) => e.id);
      idArray = [...new Set(idArray)]; // gets the unique persons
      for (let id of idArray) {
        hashMap[id] = hashMap[id] ? hashMap[id] + 1 : 1;
      }
    }
    const commonPeopleIds = Object.keys(hashMap).filter(
      (e) => hashMap[e] === len
    );
    const resultArray = await Promise.all(
      commonPeopleIds.map(async (e) => {
        const url = `https://api.themoviedb.org/3/person/${e}?language=en-US`;
        const person = await fetchSimpleData(url);
        return person;
      })
    ).catch((err) => {
      dispatch({
        type: "SET_RESULT_ERROR",
        payload: err.message,
      });
    });
    dispatch({
      type: "SET_RESULT_DATA",
      payload: resultArray,
    });
  };
  useEffect(() => {
    dispatch({
      type: "RESET_RESULT",
    });
  }, [state.queryArray]);

  const calculate = async () => {
    await addCast();
    await findPeople();
  };
  return (
    <DataContext.Provider
      value={{
        ...state,
        setSearchData,
        addToQueryArray,
        deleteFromQueryArray,
        getTitleAndName,
        calculate,
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
