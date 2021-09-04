import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import "chartjs-adapter-moment";

const Graph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, seterr] = useState("");

  const [chartData, setChartData] = useState({});
  const [Time, setTime] = useState([]);
  const [CO2, setCO2] = useState([]);

  const Chart = () => {
    let empTime = [];
    let empCO2 = [];

    axios
      .get("https://api.thingspeak.com/channels/1485319/feeds.json")
      .then((res) => {
        const Data = res.data.feeds;
        setData(Data);

        for (const el of Data) {
          const date = new Date(el.created_at).toLocaleString();
          empTime.push(date);
          empCO2.push(el.field1);
        }

        setChartData({
          labels: empTime,
          datasets: [
            {
              label: "CO2 Emission",
              data: empCO2,
              borderColor: "rgb(255, 49, 49)",
              fill: true,
              backgroundColor: "rgb(238, 75, 43, 0.3)",

              borderWidth: 1,
              lineTension: 0,
              pointRadius: 2,
            },
          ],
        });
      })
      .catch((err) => {
        const error = err.message;
        seterr(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    Chart();
  }, []);

  // const argh = data
  //   ? data.map((el) => {
  //       const date = new Date(el.created_at).toLocaleTimeString();

  //       return {
  //         x: date,
  //         y: el.field1,
  //       };
  //     })
  //   : console.log(err);

  return (
    <div>
      <Line
        data={chartData}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,

          responsive: true,
          title: {
            text: "CO2 EMMISSION",
            display: true,
          },
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
              },
              title: {
                display: true,
                text: "PPM",
                align: "center",
                font: {
                  size: 20,
                },
                color: "rgb(255, 49, 49)",
              },
            },
            x: {
              title: {
                display: true,
                text: "TIME",
                align: "center",
                font: {
                  size: 20,
                },
                color: "rgb(255, 49, 49)",
              },
              type: "time",
              alignToPixels: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Graph;
