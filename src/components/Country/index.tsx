import React, { useEffect } from "react";
import CustomBarChart from "../BarChart";
import { C_STATE } from "../../redux/reducers/rootReducer";
import { connect } from "react-redux";
import { timestampToDate } from "../../utils/time";

interface CountryProps extends Partial<Pick<C_STATE, "country">> {}

function Country({ country }: CountryProps) {
  useEffect(() => {
    // Bu işlemi paketteki (react-jvectormap) bir bug'ı çözmek için yapacağız.
    /*
            Bug Açıklaması: Ülkelerin üzerine geldiğimizde imlecin üzerinde baloncuk bilgi çıkıyor.
            Ülke seçtiğimizde map'i yeniden render ettiği için o esnada bir bug oluyor ve eski baloncuk bilgi kalmaya devam ediyor.
            Bunu çözmek için componentimiz her render edildiğinde ekranda gözüken baloncuk bilgileri manual yolla sileceğiz.
       */
    const tips = document.getElementsByClassName("jvectormap-tip");
    for (var i = 0; i < tips.length; i++) {
      tips[i].remove();
    }
  });
  if (country) {
    return (
      <div className={"country-container"}>
        <div className={"info"}>
          <div className="wrapper">
            <h2>
              {country.country} ({country.countryInfo.iso2})
            </h2>
            <div className={"flag"}>
              <img
                src={country.countryInfo.flag}
                alt={`${country.country} Flag`}
              />
            </div>
          </div>

          <div className="updated">
            (Updated: {timestampToDate(country.updated)})
          </div>
        </div>
        <CustomBarChart country={country} />
      </div>
    );
  }
  return <div id={"loading"}>Loading...</div>;
}

const mapStateToProps = (state: C_STATE) => ({ country: state.country });

export default connect(mapStateToProps, null)(Country);
