import React, { createRef } from "react";
import "./App.css";
import { VectorMap } from "react-jvectormap";
import cl from "countries-list";
import axios from "axios";


interface AppState {
  countries: Record<string, number>;
}

const apiUrl = "https://corona.lmao.ninja/v2/countries?yesterday=false&sort";
class App extends React.Component<any, AppState> {
  mapRef: React.RefObject<unknown>;

  constructor(props) {
    super(props);
    this.mapRef = createRef();
    this.state = {
      countries: {},
    };
  }

  async componentDidMount() {
    axios.get(apiUrl).then((r) => {
      var obj = {};
      r.data.forEach((d) => {
        obj[d.countryInfo.iso2] = d.deaths;
      });

      this.setState({
        countries: obj,
      });
    });
  }

  render() {
    return (
      <>
        <div style={{ width: "100%", height: "100vh" }}>
          <VectorMap
            map={"world_mill"}
            backgroundColor="#3b96ce"
            ref={this.mapRef}
            containerStyle={{
              width: "100%",
              height: "100%",
            }}

            containerClassName="map"
            onRegionClick={(e, code) => {
              console.log(e);
              console.log(cl.countries[code.toUpperCase()].name);
            }}
            zoomOnScroll={false}
            labels={{
              render: (l) => {
                console.log(l);
              },
            }}
            onRegionTipShow={(e, tip, code) => {
              const found = Object.keys(this.state.countries).find(k => k === code.toUpperCase());

              var insert = "<br />Unknown";

              if (found) {
                insert = `<br/>Deaths: ${this.state.countries[found]}`;
              }

              tip.html(tip.html() + insert);
            }}
            series={{
              regions: [
                {
                  values: this.state.countries,
                  normalizeFunction: "polynomial",
                  scale: ["#ff5252", "#730000"],
                },
              ],
            }}
            regionStyle={{
              selected: {
                fill: "yellow",
              },
            }}
            regionsSelectable={true}
            regionsSelectableOne={true}
          />
        </div>
        <div style={{ height: "200vh" }}>Other Content...</div>
      </>
    );
  }
}

export default App;
