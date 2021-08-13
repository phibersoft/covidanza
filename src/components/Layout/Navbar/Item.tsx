import React from "react";
import { FilterIds } from "../../../../types/custom.interface";
import { setFilterType } from "../../../utils/redux.util";

export interface NavItemProps {
  name: string;
  filterId: FilterIds;
  active?: boolean;
}

export default function NavItem({ name, filterId, active }: NavItemProps) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    setFilterType(filterId);
  };

  return (
    <a
      className={`nav-link ${active && "active"}`}
      href={`/a-valid-link-for-react/${filterId}`}
      onClick={onClick}
    >
      {name}
    </a>
  );
}
