import React from "react";
import { C_STATE } from "../../redux/reducers/rootReducer";
import { connect } from "react-redux";

import { VectorMap } from "react-jvectormap";
import { INITIAL_General } from "../../redux/actions/generalActions";
import { canShowToday, filterData, getMinMax } from "../../utils/filter";
import { WorldMapScaleColors } from "./colors";
import { tooltipTextGenerator } from "./tooltip";
import {capitalizeFirstWord, printError} from "../../utils/dom";
import { getCountryData } from "../../utils/api";
import { setCountry } from "../../utils/redux.util";

interface WorldMapProps extends Partial<Pick<C_STATE, "general" | "country">> {}

class WorldMap extends React.Component<WorldMapProps, any> {
  mapRef: React.RefObject<unknown>;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  render() {
    const gen = this.props.general as INITIAL_General;
    var filterType: any = gen?.filterType;
    if (gen?.today === true && canShowToday(gen.filterType)) {
      filterType = `today${capitalizeFirstWord(gen.filterType)}`;
    }
    const filteredData = filterData(gen.items || [], filterType);
    const minMax = getMinMax(gen.items || [], filterType);

    return (
      <div className={"worldmap-wrapper"}>
        <VectorMap
          map={"world_mill"}
          backgroundColor="lightgray"
          ref={this.mapRef}
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          containerClassName="map"
          onRegionClick={async (e, code) => {
            setCountry(null);

            const country = gen.items.find(
              (it) =>
                it.countryInfo.iso2 === code ||
                it.countryInfo.iso2 === code.toUpperCase()
            );

            if (country) {
              const getCountry = await getCountryData(
                country.country,
                gen.items
              );
              if (getCountry.success === true) {
                setCountry(getCountry.data);
              }
            } else {
              printError('This country does not provide information about the Covid19.');
            }
          }}
          zoomOnScroll={false}
          onRegionTipShow={(e, tip, code) => {
            const found = gen?.items.find(
              (it) =>
                it.countryInfo.iso2 === code ||
                it.countryInfo.iso2 === code.toUpperCase()
            );

            var insert = "<br />Unknown";

            if (found) {
              insert = tooltipTextGenerator(found);
            }
            tip.html(
              `<div class="wrapper" style="font-size:1.2em">${tip.html()}</div> ${insert}`
            );
          }}
          series={{
            regions: [
              {
                values: filteredData,
                normalizeFunction: "polynomial",
                scale: WorldMapScaleColors[gen.filterType],
                ...minMax,
              },
            ],
          }}
          regionStyle={{
            selected: {
              fill: "#73006f",
            },
          }}
          regionsSelectable={true}
          regionsSelectableOne={true}
          selectedRegions={[
            this.props.country?.countryInfo?.iso2?.toUpperCase() || "TR",
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: C_STATE) => ({
  general: state.general,
  country: state.country,
});

export default connect(mapStateToProps, null)(WorldMap);
