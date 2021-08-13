import { CovidItem_General, FilterIds } from "../../types/custom.interface";

/**
 * @description Bir object[] veriyi verilen filtre tipine göre ayrıştırıp geri object olarak döndüren fonksiyon.
 * @param data REST API'den dönen tüm ülkeleri içinde barındıran veri
 * @param filterType Filtre Tipi
 */
export const filterData = (
  data: CovidItem_General[],
  filterType: FilterIds
): Record<string, number> => {
  var wR: Record<string, number> = {};

  data.forEach((d) => {
    wR[d.countryInfo.iso2] = d[filterType];
  });

  return wR;
};

/**
 * @description Renk skalasını doğru ayarlamak için en küçük ve en büyük değişkeni bilmemiz gerekir. Bu fonksiyon filtre tipine göre min ve max değerleri buluyor.
 * @param data REST API'den dönen tüm ülkeleri içinde barındıran veri
 * @param filterType Filtre Tipi
 */
export const getMinMax = (
  data: CovidItem_General[],
  filterType: FilterIds
): Record<"min" | "max", number> => {
  if (data.length === 0) {
    return {
      min: 0,
      max: 0,
    };
  }
  // Veriyi küçükten büyüğe sıraladık.
  data.sort((a, b) => a[filterType] - b[filterType]);

  return {
    min: data[0][filterType] < 0 ? 0 : data[0][filterType],
    max: data[data.length - 1][filterType],
  };
};

/**
 * @description Kullandığımız rest apide her veri tipinin "bugün"e özel verisi bulunmuyor. Bulunanları kullanabilmek için böyle bir fonksiyon oluşturuldu.
 * @param filterType Filtre Tipi
 */
export const canShowToday = (filterType: FilterIds) => {
  var todayCanShowValues = ["cases", "recovered", "deaths"];

  return todayCanShowValues.includes(filterType);
};
