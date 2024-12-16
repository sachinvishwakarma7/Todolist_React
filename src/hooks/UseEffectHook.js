import axios from "axios";
import React, { useEffect, useState } from "react";

const UseEffectHook = (url, method = "get") => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (method === "get") {
      axios
        .get(url)
        .then((res) => {
          setData(res. data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);
  return { data, loading, error };
};

export default UseEffectHook;
