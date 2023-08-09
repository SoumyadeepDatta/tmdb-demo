const useSimpleFetch = () => {
  const fetchSimpleData = async (url) => {
    const requestOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AUTH}`,
      },
    };

    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (!response.ok) {
      throw Error(`Could not fetch from ${url}`);
    }
    return json;
  };
  return fetchSimpleData;
};

export default useSimpleFetch;
