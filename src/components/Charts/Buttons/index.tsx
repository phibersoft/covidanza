import React from "react";
import { ButtonFilterIds, ButtonsFilter } from "./Buttons.filter";
import { Button, ButtonGroup } from "@material-ui/core";

interface FilterButtonsProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLSpanElement, MouseEvent>) => void;
  activeButton: ButtonFilterIds;
}

/**
 *
 * @param onClick Başka bir componentin içinden çağıracağımız için o componentin stateini değiştirmeye kullanılıyor.
 * @param activeButton Hangi buton aktifse renk ayarı için seçiliyor.
 * @description Zaman Filtreli Istatistik oluştururken kullanılan butonlar.
 */
export default function FilterButtons({
  onClick,
  activeButton,
}: FilterButtonsProps) {
  return (
    <div className="wrapper" style={{ marginBottom: "15px" }}>
      <ButtonGroup>
        {ButtonsFilter.map(({ filterType, text, ...otherProps }, i) => {
          return (
            <Button
              {...otherProps}
              key={`filter-button-${filterType}-${i}`}
              color={activeButton === filterType ? "primary" : "secondary"}
              onClick={onClick}
              data-filter={filterType}
            >
              {text}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
