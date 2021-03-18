import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import Gallery from "../../../../Gallery/Gallery";
import { GalleryItem } from "../../../../../helpes/types/types";
import { TDocumentationLink } from "../../../../../helpes/types/ExampleDescriptionTypes";
import pointMarkers from "../../StylingAndTheming/UsePointMarkers/javascript-chart-custom-poinmarkers.jpg";
import bubbleChart from "../BubbleChart/javascript-bubble-chart.jpg";
import ExampleDescription from "../../../../ExampleDescription/ExampleDescription";

const previewDescription = ` Demonstrates how to create a JavaScript Digital Line Chart. The FastLineRenderableSeries can be used to
render an XyDataSeries, XyyDataSeries (uses Y1 only) or OhlcDataSeries (renders Close).`;
const description = `The scatter chart uses the PointMarker API to define the marker shape and size. Point-markers available out
of the box include Ellipse (circle), Triangle, Square, Cross and CustomPointMarker, which renders an image.`;
const tips = [
    `Perhaps you wanted a scatter point with a line? If so, you can do this using the Line Series type and by
    setting the pointMarker property.`
];

const documentationLinks: TDocumentationLink[] = [
    {
        href: ExampleStrings.urlDocumentationHome,
        title: ExampleStrings.titleDocumentationHome,
        linkTitle: "SciChart.js Documentation Home"
    },
    {
        href: ExampleStrings.urlTutorialsHome,
        title: ExampleStrings.titleTutorialsHome,
        linkTitle: "SciChart.js Tutorials"
    },
    {
        href: ExampleStrings.urlScatterChartDocumentation,
        title: ExampleStrings.urlTitleScatterChartDocumentation,
        linkTitle: "JavaScript Scatter Chart Documentation"
    },
    {
        href: ExampleStrings.urlRenderSeriesPropertiesDocumentation,
        title: ExampleStrings.urlTitleRenderSeriesProperties,
        linkTitle: "Common RenderableSeries Properties"
    }
];

const seeAlso: GalleryItem[] = [
    {
        chartGroupTitle: "See also",
        items: [
            {
                imgPath: bubbleChart,
                title: ExampleStrings.titleBubbleChart,
                seoTitle: ExampleStrings.urlTitleBubbleChart,
                examplePath: ExampleStrings.urlBubbleChart
            },
            {
                imgPath: pointMarkers,
                title: ExampleStrings.titlePointMarkers,
                seoTitle: ExampleStrings.urlTitlePointMarkersDocumentation,
                examplePath: ExampleStrings.urlPointMarkers
            }
        ]
    }
];

const SeeAlsoComponent = () => <Gallery examples={seeAlso} />;
const Subtitle = () => (
    <p>
        Demonstrates how to create a <strong>JavaScript Scatter Chart</strong> using SciChart.js, High Performance{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank">
            JavaScript Charts
        </a>
    </p>
);

const Description = () => (
    <div>
        <ExampleDescription
            documentationLinks={documentationLinks}
            tips={tips}
            description={description}
            previewDescription={previewDescription}
        />
    </div>
);

export const scatterChartExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleScatterChart,
    path: ExampleStrings.urlScatterChart,
    subtitle: Subtitle,
    description: Description,
    seeAlso: SeeAlsoComponent,
    code,
    githubUrl,
    seoDescription:
        "Demonstrates how to create a JavaScript Scatter Chart. The Scatter Chart supports different markers (Triangle, Circle, Square) " +
        "and can be colored per-point using our PaletteProvider API.",
    seoKeywords: "scatter, chart, javascript, webgl, canvas",
    thumbnailImage: "javascript-scatter-chart.jpg"
};
