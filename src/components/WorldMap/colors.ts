import { FilterIds } from "../../../types/custom.interface";

const redScale = ["#f89c9c", "#b00000"];
const greenScale = ["#acfa87", "#217200"];
const darkScale = ["#4f4c4c", "#340101"];
const blueScale = ["#98b3ff", "#003a59"];

export const WorldMapScaleColors: Record<FilterIds, string[]> = {
  cases: redScale,
  active: redScale,
  recovered: greenScale,
  deaths: darkScale,
  critical: darkScale,
  tests: blueScale,
};
