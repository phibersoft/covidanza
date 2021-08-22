import React from "react";
import { C_STATE } from "../../redux/reducers/rootReducer";
import {
  ButtonFilterIds,
  ButtonsFilterDataSetter,
} from "./Buttons/Buttons.filter";
import { Charts } from "./index";
import FilterButtons from "./Buttons";
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

interface ChartListProps extends Pick<C_STATE, "country"> {}

interface ChartListState {
  filterBy: ButtonFilterIds;
}

/**
 * @param country O an seçili olan ülkeyi parametre olarak alır. Verileri işler ve bir kaç adet BarChart döndürür.
 */
export default class ChartList extends React.Component<
  ChartListProps,
  ChartListState
> {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: "monthly",
    };
  }

  /**
   * @description Charts/index.ts de chart tanımlarken dataHandlerda zamansal işlemleri yürütemiyoruz.
   * Bunun ana sebebi o an hangi zaman durumu seçili onu bilmiyoruz. Bu yüzden bu fonksiyonda datayı işliyoruz.
   * @param dataHandler Charts/index.ts de tanımladığımız chartların dataHandler'ı.
   * @param hasTimeFiltering Charts/index.ts de tanımladığımız chartların hasTimeFiltering'i.
   * @private
   */
  private _realDataHandler(
    dataHandler: Function,
    hasTimeFiltering: boolean | undefined
  ) {
    const { country } = this.props;
    const { filterBy } = this.state;
    const results = dataHandler(country);

    if (hasTimeFiltering) {
      return ButtonsFilterDataSetter[filterBy](results);
    }

    return results;
  }

  /**
   * @description Hem chartlarımızı, hem de tümünü kapsayan wrapper componentimizi de render eder.
   */
  render() {
    const { country } = this.props;
    const { filterBy } = this.state;

    if (country) {
      return (
        <>
          {Charts.map((ch, i) => {
            return (
              <React.Fragment key={`chart-list-item-${i}`}>
                <div className={"chart-title"}>{ch.title(country)}</div>
                {ch.hasTimeFiltering && (
                  <FilterButtons
                    onClick={(e) => {
                      const el = e.target as
                        | HTMLButtonElement
                        | HTMLSpanElement;

                      if (el.localName === "span") {
                        this.setState({
                          filterBy: el?.parentElement?.getAttribute(
                            "data-filter"
                          ) as any,
                        });
                      } else {
                        this.setState({
                          filterBy: el?.getAttribute("data-filter") as any,
                        });
                      }
                    }}
                    activeButton={filterBy}
                  />
                )}
                <div className="wrapper">
                  <div className="bar-chart-wrapper">
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                      <BarChart
                        width={800}
                        height={800}
                        data={this._realDataHandler(
                          ch.dataHandler,
                          ch.hasTimeFiltering
                        )}
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
                        <Brush
                          dataKey={"name"}
                          height={30}
                          stroke={"#8884D8"}
                        />
                        {ch.dataKeys.map((dt, i) => {
                          return (
                            <Bar
                              {...dt}
                              key={`chart-data-key-${i}-${dt.dataKey}`}
                            />
                          );
                        })}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </>
      );
    }

    return null;
  }
}
