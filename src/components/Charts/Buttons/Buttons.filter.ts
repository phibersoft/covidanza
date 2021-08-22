import { ButtonProps } from "@material-ui/core";
import { compareDates } from "../../../utils/dom";
import { ChartValueItem } from "../index";

export type ButtonFilterIds = "weekly" | "monthly" | "three-monthly";

interface ButtonsFilterProps extends ButtonProps {
  text: string;
  filterType: ButtonFilterIds;
}

/**
 * @description Bu nesne zaman filtreli istatistik kullanırken gösterilen, seçim yapılan butonları içerir.
 */
export const ButtonsFilter: ButtonsFilterProps[] = [
  {
    text: "Weekly",
    filterType: "weekly",
  },
  {
    text: "Monthly",
    filterType: "monthly",
  },
  {
    text: "3 Monthly",
    filterType: "three-monthly",
  },
].map((btn) => ({ ...btn, variant: "contained", type: "button" } as any));

/**
 * @description Satır15 te tanımladığımız ButtonsFilter dizisindeki butonlara tıklandığında nasıl bir filtreleme uyguladıklarını açıklar.
 */
export const ButtonsFilterDataSetter: Record<
  ButtonFilterIds,
  (data: ChartValueItem[]) => ChartValueItem[]
> = {
  weekly: (data) => {
    const wR: ChartValueItem[] = [data[0]]; // İlk günün her zaman dahil olmasını istiyoruz.
    for (var i = data.length - 2; i > 1; i -= 7) {
      wR.push(data[i]);
    }

    wR.sort((a, b) => compareDates(a.name, b.name));

    return [...wR, data[data.length - 1]]; // Sonradan eklenen veriler ile birlikte son günün de her zaman dahil olmasını istiyoruz.
  },
  monthly: (data) => {
    const wR: ChartValueItem[] = [data[0]];

    for (var i = 1; i < data.length - 1; i++) {
      const splitted = data[i].name.split("/"); // ["12", "30", "1970"];
      if (splitted[1] === "1") {
        wR.push(data[i]);
      }
    }

    return [...wR, data[data.length - 1]];
  },
  "three-monthly": (data) => {
    const wR: ChartValueItem[] = [data[0]];

    for (var i = 1; i < data.length - 1; i++) {
      const splitted = data[i].name.split("/"); // ["12", "30", "1970"];
      if (splitted[1] === "1" && ["3", "6", "9", "12"].includes(splitted[0])) {
        wR.push(data[i]);
      }
    }

    return [...wR, data[data.length - 1]];
  },
};
