import React, { useEffect, useState } from "react";
import axios from "axios";

const Information = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, seterr] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.thingspeak.com/channels/1485319/feeds.json")
      .then((res) => {
        const myData = res.data.feeds;
        setData(myData);
      })
      .catch((err) => {
        const error = err.message;
        seterr(error);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const display = data !== null ? data.length : "...Loading";

  return (
    <div className="Information">
      <div className="total">
        <p>TOTAL CO2 Entries: {display}</p>
        <p>
          LAST UPDATED:{" "}
          {data !== null
            ? new Date(data[data.length - 1].created_at).toLocaleString()
            : "...loading"}
        </p>
      </div>
    </div>
  );
};

export default Information;
