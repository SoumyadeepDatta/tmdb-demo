import { useState, useEffect } from "react";

const UseFetch = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setIsPending(true);

    const requestOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AUTH}`,
      },
    };

    await fetch(url, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error(`Could not fetch data from ${url}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  return [fetchData, data, isPending, error];
};

export default UseFetch;
