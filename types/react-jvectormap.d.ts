declare module "react-jvectormap" {
    import React from "react";

    type CustomStyling = Record<"initial" | "hover" | "selected" | "selectedHover", React.CSSProperties>
    type LatLang = Array<number, number>;
    type MouseOn = React.MouseEvent<HTMLDivElement>;

    interface DataSeries {
        values: Record<string, number>;
        attribute?: string;
        scale: string[];
        normalizeFunction: "linear" | "polynomial";
        min?: number;
        max?: number;
    }

    export interface VectorMapProps {
        map: "world_mill";
        backgroundColor?: string;
        containerStyle?: React.CSSProperties;
        containerClassName?: string;
        zoomOnScroll?: boolean;
        zoomMax?: number;
        zoomMin?: number;
        zoomStep?: number;
        zoomAnimate?: boolean;
        regionsSelectable?: boolean;
        regionsSelectableOne?: boolean;
        markersSelectable?: boolean;
        markersSelectableOne?: boolean;
        regionStyle?: CustomStyling;
        regionLabelStyle?: CustomStyling;
        markerStyle?: CustomStyling;
        markerLabelStyle?: CustomStyling;
        markers?: LatLang[];
        series?: {
            regions?: DataSeries[];
            markers?: DataSeries[];
        };
        onRegionClick?: (e: MouseOn, code: string) => void;
        onRegionTipShow?: (e: MouseOn, tooltip: HTMLDivElement, code: string) => void;
        onRegionOver?: (e: MouseOn, code: string) => void;
        onRegionOut?: (e: MouseOn, code: string) => void;
    }
    export function VectorMap(props: VectorMapProps): React.ReactElement<VectorMapProps>;
    export default VectorMap;
}
