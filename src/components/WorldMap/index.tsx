import React, { ChangeEvent } from "react";
import { C_STATE } from "../../redux/reducers/rootReducer";
import { connect } from "react-redux";

import { VectorMap } from "react-jvectormap";
import { INITIAL_General } from "../../redux/actions/generalActions";
import { canShowToday, filterData, getMinMax } from "../../utils/filter";
import { WorldMapScaleColors } from "./colors";
import { tooltipTextGenerator } from "./tooltip";
import { capitalizeFirstLetter, printError } from "../../utils/dom";
import { getCountryData } from "../../utils/api";
import { setCountry } from "../../utils/redux.util";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

interface WorldMapProps extends Partial<Pick<C_STATE, "general" | "country">> {}

interface WorldMapState {
  selectedCountry: string;
}

/**
 * @description WorldMap dediğimiz sayfanın en başında bulunan harita burada render edilir.
 * @param general Tüm ülkelerin genel verisi.
 * @param country Seçili ülke, default: null.
 */
class WorldMap extends React.Component<WorldMapProps, WorldMapState> {
  // Haritamıza "DOM" üzerinde erişmek istersek bu mapRef i kullanacağız.
  mapRef: React.RefObject<unknown>;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      selectedCountry: this.props.country?.country || "Turkey",
    };
  }

  /**
   * @description Ülke seçmenin 2 adet yolu var: Haritadan seçmek ya da sağ üstte bulunan selectbox'dan işaretlemek.
   * İki işlemde de seçilen ülke hakkında REST API'ye istek gidecektir, gelen veri Redux'a aktarılacaktır.
   * Bu durumda iki seçim işlemi için de ülke belirlendikten sonra işlemler aynıdır.
   * Bu işlemler bu fonksiyonda belirlenir.
   * @param countryName Ülke Tam Adı
   */
  private _onCountryChange = async (countryName: string) => {
    const gen = this.props.general as INITIAL_General;

    setCountry(null);

    const getCountry = await getCountryData(countryName, gen.items);
    if (getCountry.success === true) {
      setCountry(getCountry.data);
      this.setState({
        selectedCountry: countryName,
      });
    }
  };

  /**
   * @description Harita üzerinden bir ülkeye tıklandığında çalışan event fonksiyonu.
   * @param e MouseEvent
   * @param code Ülke Kodu (Örnek: TR)
   */
  private _onCountryClick = async (e, code: string) => {
    const gen = this.props.general as INITIAL_General;

    const country = gen.items.find(
      (it) =>
        it.countryInfo.iso2 === code ||
        it.countryInfo.iso2 === code.toUpperCase()
    );

    if (country) {
      await this._onCountryChange(country.country);
    } else {
      // Eğer seçilen ülke rest apimizde mevcut değilse basit bir uyarı oluşturuyoruz.
      printError(
        "This country does not provide information about the Covid19."
      );
    }
  };

  /**
   * @description Ülke seçimi selectbox üzerinden yapılırsa çalışan event fonksiyonu.
   * @param e Select OnChange Event
   */
  private _onCountrySelect = async (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const countryName = e.target.value as string;
    await this._onCountryChange(countryName);
  };

  render() {
    const gen = this.props.general as INITIAL_General;
    var filterType: any = gen?.filterType;
    if (gen?.today === true && canShowToday(gen.filterType)) {
      // Eğer navbardaki "Today" radiosu true + Seçili veri tipinin "today" verisi REST API'de mevcut ise
      filterType = `today${capitalizeFirstLetter(gen.filterType)}`;
    }
    // Buradaki filterType, navbar üzerinden seçtiğimiz "cases", "deaths" gibi durumlardır.
    const filteredData = filterData(gen.items || [], filterType);
    // Renk skalasını doğru hesaplayabilmek için elimizdeki verinin en düşük ve en yüksek sayılarına ulaşıyoruz.
    const minMax = getMinMax(gen.items || [], filterType);

    return (
      <div className={"worldmap-wrapper"}>
        <div className={"country-select"}>
          <FormControl variant={"outlined"}>
            <InputLabel id={"country-select-label"}>Country</InputLabel>
            <Select
              label={"Country"}
              labelId={"country-select-label"}
              onChange={this._onCountrySelect}
              value={this.state.selectedCountry}
            >
              {gen?.items.map((c) => {
                return (
                  <MenuItem value={c.country} key={`country-item-${c.country}`}>
                    {c.country}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <VectorMap
          map={"world_mill"}
          backgroundColor="lightgray"
          ref={this.mapRef}
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          containerClassName="map"
          onRegionClick={this._onCountryClick}
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
