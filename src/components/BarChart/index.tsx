import React from "react";
import { C_STATE } from "../../redux/reducers/rootReducer";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button, ButtonGroup } from "@material-ui/core";
import {
  ButtonFilterIds,
  FilterButtons,
  FilterButtonsDataSetter,
} from "./Buttons.filter";

interface BarChartProps extends Pick<C_STATE, "country"> {}

interface BarChartState {
  filterBy: ButtonFilterIds;
}

export interface BarChartDataItem {
  name: string;
  deaths: number;
  cases: number;
  recovereds: number;
}

class CustomBarChart extends React.Component<BarChartProps, BarChartState> {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: "monthly",
    };
  }

  private _DataHandler(): BarChartDataItem[] {
    const { country } = this.props;
    const { filterBy } = this.state;
    if (country) {
      var willReturn: BarChartDataItem[] = [];
      const dates = Object.keys(country.timeline.cases); // dates = ["1/1/1970", "1/2/1970", ...];
      for (var i = 0; i < dates.length; i++) {
        const willPush: BarChartDataItem = {
          name: dates[i],
          deaths: country.timeline.deaths[dates[i]],
          cases: country.timeline.cases[dates[i]],
          recovereds: country.timeline.recovered[dates[i]],
        };

        willReturn.push(willPush);
      }
      return FilterButtonsDataSetter[filterBy](willReturn);
    }

    return [];
  }

  render() {
    const data = this._DataHandler();
    if (data.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div className="wrapper" style={{ marginBottom: "15px" }}>
          <ButtonGroup>
            {FilterButtons.map(({ filterType, text, ...otherProps }, i) => {
              return (
                <Button
                  {...otherProps}
                  key={`filter-button-${filterType}-${i}`}
                  color={
                    filterType === this.state.filterBy ? "primary" : "secondary"
                  }
                  onClick={(e) => this.setState({ filterBy: filterType })}
                >
                  {text}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
        <div className={"wrapper"}>
          <div className="bar-chart-wrapper">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <BarChart
                width={800}
                height={800}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip />
                <Legend
                  verticalAlign={"top"}
                  wrapperStyle={{ lineHeight: "40px" }}
                />
                <ReferenceLine y={0} stroke={"#000"} />
                <Brush dataKey={"name"} height={30} stroke={"#8884D8"} />
                <Bar dataKey={"cases"} fill={"#FF0000"} />
                <Bar dataKey={"deaths"} fill={"#001300"} />
                <Bar dataKey={"recovereds"} fill={"#3a9100"} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    );
  }
}

export default CustomBarChart;
