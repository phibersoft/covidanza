import { NavItemProps } from "./Item";

/**
 * @param name Kullanıcıya gösterilecek olan isim
 * @param filterId Filtreleme Tipi
 */
export const NavbarItems: NavItemProps[] = [
  {
    name: "Cases",
    filterId: "cases"
  },
  {
    name: "Recovereds",
    filterId: "recovered",
  },
  {
    name: "Active",
    filterId: "active",
  },
  {
    name: "Deaths",
    filterId: "deaths",
  },
  {
    name: "Tests",
    filterId: "tests",
  },
  {
    name: "Criticals",
    filterId: "critical",
  },
];
