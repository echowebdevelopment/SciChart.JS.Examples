import * as React from "react";
import {MouseWheelZoomModifier} from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import {ZoomExtentsModifier} from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import {ZoomPanModifier} from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import {XyyDataSeries} from "scichart/Charting/Model/XyyDataSeries";
import {NumericAxis} from "scichart/Charting/Visuals/Axis/NumericAxis";
import {SciChartSurface} from "scichart/Charting/Visuals/SciChartSurface";
import {getVarianceData} from "./data";
import {XyDataSeries} from "scichart/Charting/Model/XyDataSeries";
import {FastBandRenderableSeries} from "scichart/Charting/Visuals/RenderableSeries/FastBandRenderableSeries";
import {ENumericFormat} from "scichart/types/NumericFormat";
import classes from "../../../../Examples/Examples.module.scss";
import {WaveAnimation} from "scichart/Charting/Visuals/RenderableSeries/Animations/WaveAnimation";
import {appTheme} from "../../../theme";
import {
    SplineLineRenderableSeries
} from "../../../../../../../../scichart.dev/Web/src/SciChart/lib/Charting/Visuals/RenderableSeries/SplineLineRenderableSeries";
import {
    TextAnnotation
} from "../../../../../../../../scichart.dev/Web/src/SciChart/lib/Charting/Visuals/Annotations/TextAnnotation";
import {EVerticalAnchorPoint} from "../../../../../../../../scichart.dev/Web/src/SciChart/lib/types/AnchorPoint";
import {
    SplineBandRenderableSeries
} from "../../../../../../../../scichart.dev/Web/src/SciChart/lib/Charting/Visuals/RenderableSeries/SplineBandRenderableSeries";

// tslint:disable:max-line-length

const divElementId = "chart";
const animation = new WaveAnimation({ duration: 700, fadeEffect: true });

const drawExample = async () => {
    // Create a SciChartSurface
    const { wasmContext, sciChartSurface } = await SciChartSurface.create(divElementId, { theme: appTheme.SciChartJsTheme });

    // Add an XAxis, YAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { labelFormat: ENumericFormat.Date_DDMMYYYY }));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

    // Generates some data for the example as an array of TVarPoint: {
    //     date: number;
    //     actual: number;
    //     varMax: number;
    //     var4: number;
    //     var3: number;
    //     var2: number;
    //     var1: number;
    //     varMin: number;
    // }
    const varianceData = getVarianceData();

    // To render the fan chart, we use a Line Chart with XyDataSeries
    // and three Band charts with XyyDataSeries
    const actualDataSeries = new XyDataSeries(wasmContext);
    const variance3DataSeries = new XyyDataSeries(wasmContext);
    const variance2DataSeries = new XyyDataSeries(wasmContext);
    const variance1DataSeries = new XyyDataSeries(wasmContext);

    actualDataSeries.appendRange(
        varianceData.map(v => v.date),
        varianceData.map(v => v.actual)
    );
    variance3DataSeries.appendRange(
        varianceData.map(v => v.date),
        varianceData.map(v => v.varMin),
        varianceData.map(v => v.varMax)
    );
    variance2DataSeries.appendRange(
        varianceData.map(v => v.date),
        varianceData.map(v => v.var1),
        varianceData.map(v => v.var4)
    );
    variance1DataSeries.appendRange(
        varianceData.map(v => v.date),
        varianceData.map(v => v.var2),
        varianceData.map(v => v.var3)
    );

    // Add a line series with the Xy data (the actual data)
    // Note use FastLineRenderableSeries for non-spline version
    sciChartSurface.renderableSeries.add(
        new SplineLineRenderableSeries(wasmContext, {
            strokeThickness: 2,
            dataSeries: actualDataSeries,
            stroke: appTheme.VividPink,
            animation
        })
    );

    // Add band series with progressively higher opacity for the fan variance data
    // Note use FastBandRenderableSeries for non-spline version
    sciChartSurface.renderableSeries.add(
        new SplineBandRenderableSeries(wasmContext, {
            dataSeries: variance3DataSeries,
            opacity: 0.15,
            fill: appTheme.VividPink,
            strokeY1: "#00000000",
            animation
        })
    );
    sciChartSurface.renderableSeries.add(
        new SplineBandRenderableSeries(wasmContext, {
            dataSeries: variance2DataSeries,
            opacity: 0.33,
            fill: appTheme.VividPink,
            strokeY1: "#00000000",
            animation
        })
    );
    sciChartSurface.renderableSeries.add(
        new SplineBandRenderableSeries(wasmContext, {
            dataSeries: variance1DataSeries,
            opacity: 0.5,
            fill: appTheme.VividPink,
            strokeY1: "#00000000",
            animation
        })
    );

    // Optional: Add some interactivity modifiers
    sciChartSurface.chartModifiers.add(
        new ZoomExtentsModifier(),
        new ZoomPanModifier(),
        new MouseWheelZoomModifier(),
        new ZoomExtentsModifier()
    );

    // Optional: Add some annotations (text) to show detail
    sciChartSurface.annotations.add(new TextAnnotation({
        x1: varianceData[0].date,
        y1: varianceData[0].actual,
        verticalAnchorPoint: EVerticalAnchorPoint.Bottom,
        yCoordShift: -50,
        text: "Actual data",
        opacity: 0.45,
        textColor: appTheme.ForegroundColor,
    }));

    sciChartSurface.annotations.add(new TextAnnotation({
        x1: varianceData[5].date,
        y1: varianceData[5].actual,
        text: "Forecast Variance",
        verticalAnchorPoint: EVerticalAnchorPoint.Top,
        yCoordShift: 50,
        opacity: 0.45,
        textColor: appTheme.ForegroundColor,
    }));

    sciChartSurface.zoomExtents();
    return { wasmContext, sciChartSurface };
};

export default function FanChart() {
    const [sciChartSurface, setSciChartSurface] = React.useState<SciChartSurface>();
    React.useEffect(() => {
        (async () => {
            const res = await drawExample();
            setSciChartSurface(res.sciChartSurface);
        })();
        // Delete sciChartSurface on unmount component to prevent memory leak
        return () => sciChartSurface?.delete();
    }, []);

    return <div id={divElementId} className={classes.ChartWrapper} />;
}
