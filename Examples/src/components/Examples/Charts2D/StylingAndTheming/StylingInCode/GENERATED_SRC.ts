export const code = `
import * as React from "react";
import {SciChartSurface} from "scichart";
import {NumericAxis} from "scichart/Charting/Visuals/Axis/NumericAxis";
import {MouseWheelZoomModifier} from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import {EAxisAlignment} from "scichart/types/AxisAlignment";
import {ZoomPanModifier} from "scichart/Charting/ChartModifiers/ZoomPanModifier";

const divElementId = "chart";

const drawExample = async () => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId);
    sciChartSurface.background = "#FFCA75";

    // Create and style xAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, {
        axisTitle: "X Axis",
        drawMajorBands: true,
        axisBandsFill: "#FF665555",
        axisTitleStyle: {
            fontSize: 16,
            fontFamily: "Arial",
            color: "#4682b4",
            fontWeight: "bold",
            fontStyle: "italic"
        },
        majorGridLineStyle: {
            strokeThickness: 1,
            color: "#ADFF2F",
            strokeDasharray: [10, 5]
        },
        minorGridLineStyle: {
            strokeThickness: 1,
            color: "#EE82EE",
            strokeDasharray: [2, 2]
        },
        majorTickLineStyle: {
            strokeThickness: 1,
            color: "#ADFF2F",
            tickSize: 8,
        },
        minorTickLineStyle: {
            strokeThickness: 1,
            color: "#EE82EE",
            tickSize: 4,
        },
        labelStyle: {
            fontSize: 16,
            fontWeight: "bold",
            fontStyle: "Italic",
            color: "#4682b4",
            fontFamily: "Arial"
        },
    }));

    // Create and style left YAxis
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, {
        axisAlignment: EAxisAlignment.Left,
        axisBandsFill: "#FF665555",
        axisTitle: "Left Y Axis",
        axisTitleStyle: {
            fontSize: 25,
            fontFamily: "Montserrat",
            fontWeight: "bold",
            color: "#DC143C",
        },
        majorGridLineStyle: {
            strokeThickness: 1,
            color: "#ADFF2F",
            strokeDasharray: [10, 5]
        },
        minorGridLineStyle: {
            strokeThickness: 1,
            color: "#EE82EE",
            strokeDasharray: [2, 2]
        },
        majorTickLineStyle: {
            strokeThickness: 1,
            color: "#ADFF2F",
            tickSize: 8,
        },
        minorTickLineStyle: {
            strokeThickness: 1,
            color: "#EE82EE",
            tickSize: 4,
        },
        labelStyle: {
            fontSize: 15,
            color: "#DC143C",
            fontFamily: "Arial"
        },
    }));

    // Create and style right YAxis
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, {
        axisTitle: "Right Y Axis",
        axisTitleStyle: {
            fontSize: 18,
            fontFamily: "Arial",
            color: "#ADFF2F",
        },
        axisAlignment: EAxisAlignment.Right,
        majorGridLineStyle: {
            strokeThickness: 1,
            color: "#ADFF2F",
            strokeDasharray: [10, 5]
        },
        minorGridLineStyle: {
            strokeThickness: 1,
            color: "#EE82EE",
            strokeDasharray: [2, 2]
        },
        majorTickLineStyle: {
            strokeThickness: 1,
            color: "#ADFF2F",
            tickSize: 8,
        },
        minorTickLineStyle: {
            strokeThickness: 1,
            color: "#EE82EE",
            tickSize: 4,
        },
        labelStyle: {
            fontSize: 14,
            color: "#ADFF2F",
            fontFamily: "Arial"
        },
    }));

    // Add some interactivity modifiers
    sciChartSurface.chartModifiers.add(new ZoomPanModifier());
    sciChartSurface.chartModifiers.add(new MouseWheelZoomModifier());

    sciChartSurface.zoomExtents();
};
export default function StylingInCode() {
    React.useEffect(() => {
        drawExample();
    }, []);

    return <div id={divElementId} style={{ maxWidth: 900 }} />;
}

`;
