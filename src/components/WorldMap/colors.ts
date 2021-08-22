import { FilterIds } from "../../../types/custom.interface";

const redScale = ["#f89c9c", "#b00000"];
const greenScale = ["#acfa87", "#217200"];
const darkScale = ["#4f4c4c", "#340101"];
const blueScale = ["#98b3ff", "#003a59"];

/**
 * @description "Scaling" yani ölçeklendirme renklerimiz. Bir açık, bir koyu renk alınır.
 * Verinin en düşük hali açık renk, en yüksek hali koyu renk seçilir.
 * Arada kalan renkler ise seçilmiş iki rengin arasında ölçeklendirilir.
 * @example ["Beyaz", "Siyah"] renkleri ve [1,2,3,4,5] verisi için ölçeklendirme = [Beyaz, Açık Gri, Gri, Koyu Gri, Siyah];
 */
export const WorldMapScaleColors: Record<FilterIds, string[]> = {
  cases: redScale,
  active: redScale,
  recovered: greenScale,
  deaths: darkScale,
  critical: darkScale,
  tests: blueScale,
};
