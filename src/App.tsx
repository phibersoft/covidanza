import React, { useState } from "react";
import Layout from "./components/Layout";
import Future from "./components/Future";
import { getCountryData, getGeneralData } from "./utils/api";
import { setCountry, setGeneralData } from "./utils/redux.util";
import store from "./redux/store";
import WorldMap from "./components/WorldMap";
import Country from "./components/Country";

/**
 * @description Anasayfamız burada render ediliyor.
 * @constructor
 */
function Home() {
    // Bir ülkenin verisine erişmeden önce Rest API'den tüm ülkelerin verilerini çekip Dünya Haritası oluşturuyoruz. Bu işlem bitene kadar diğer işlemleri askıya alacağız.
  const [isGeneralDataAccessible, setIsGeneralDataAccessible] =
    useState<boolean>(false);

  return (
    <Layout>
      <Future
        handlerFunction={async () => {
          const results = await getGeneralData();
          if (results.success === true) {
            // Hem Reduxtaki verimizi güncelle, hem de işlemleri askıya almayı bırak.
            setGeneralData(results.data);
            setIsGeneralDataAccessible(true);
          }
        }}
      >
        <WorldMap />
      </Future>
      {isGeneralDataAccessible && (
        <Future
          handlerFunction={async () => {
            const general = store.getState().general;
            const country = await getCountryData("Turkey", general.items);
            if (country.success === true) {
              setCountry(country.data);
            }
          }}
        >
          <Country />
        </Future>
      )}
    </Layout>
  );
}

export default Home;
