import React, { Component } from "react";
import { Daata } from "../utils/DummyData";
import moment from "moment";

import {
  AreaChart,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Jan ",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    pv: 1798,
    amt: 2210,
  },
  {
    name: " Mar",
    pv: 4800,
    amt: 2290,
  },
  {
    name: " Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    pv: 4300,
    amt: 2100,
  },
];

export default class Graph extends Component {
  render() {
    const convertDate = (timestamp) =>
      moment(new Date(timestamp * 1000)).format("MMM ");
    const convertValue = (value) => `${Math.floor(value / 10e2)}M`;
    return (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={850}
            height={230}
            data={Daata}
            margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="3%" stopColor="#0294FF" stopOpacity={0.3} />
                <stop offset="97%" stopColor="#ffffff" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="transactionNo"
              tickFormatter={convertDate}
              orientation="top"
              mirror="true"
              tick={{ fontWeight: "bold" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tickFormatter={convertValue} tickLine={false} hide="true" />
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#DDD"
            />
            <Tooltip />
            <Area
              type=""
              dataKey="price"
              stroke="#0294FF"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            {/* </AreaChart> */}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
