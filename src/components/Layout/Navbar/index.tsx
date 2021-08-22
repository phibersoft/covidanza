import React from "react";
import { NavbarItems } from "./items.data";
import NavItem from "./Item";
import { FormControlLabel, IconButton, Switch } from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import { toggleSidebar } from "../../../utils/dom";
import { setToday } from "../../../utils/redux.util";
import { C_STATE } from "../../../redux/reducers/rootReducer";
import { connect } from "react-redux";
import { FilterIds } from "../../../../types/custom.interface";

interface NavbarProps {
  filterId?: FilterIds;
}

/**
 * @description Tüm navigasyon componenti burada render edilir.
 * @param filterId Reduxımızda seçilmiş olan filtreleme tipi
 * @constructor
 */
function Navbar({ filterId }: NavbarProps) {
  return (
    <header>
      <div className={"logo"}>
        <a href={"/"}>Covidanza</a>
      </div>
      <nav id={"navbar"}>
        {NavbarItems.map((n) => {
          return (
            <NavItem
              key={`nav-item-${n.filterId}`}
              {...n}
              active={n.filterId === filterId}
            />
          );
        })}
        <div className={"switch"}>
          <FormControlLabel
            control={
              <Switch
                color={"secondary"}
                defaultChecked={true}
                onChange={(e) => {
                  setToday(e.target.checked);
                }}
              />
            }
            label={"Today"}
            labelPlacement={"start"}
          />
        </div>
      </nav>
      <div className={"burger"}>
        <IconButton onClick={toggleSidebar}>
          <Menu />
        </IconButton>
      </div>
    </header>
  );
}

const mapStateToProps = (state: C_STATE) => ({
  filterId: state.general.filterType,
});

export default connect(mapStateToProps, null)(Navbar);
