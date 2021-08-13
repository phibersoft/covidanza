import { CovidItem_General } from "../../../types/custom.interface";

export const tooltipTextGenerator = (data: CovidItem_General) => {
  return `<br />Cases: ${data.cases}<br/>Active: ${data.active}<br/>Deaths: ${data.deaths}<br/>Recovereds: ${data.recovered}<br/><br/><hr /><br/>Today Cases: ${data.todayCases}<br/>Today Deaths: ${data.todayDeaths}<br/>Today Recovereds: ${data.todayRecovered}`;
};
