import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import Gallery from "../../../../Gallery/Gallery";
import { GalleryItem } from "../../../../../helpes/types/types";
import pieChart from "../PieChart/javascript-pie-chart.jpg";
import { TDocumentationLink } from "../../../../../helpes/types/ExampleDescriptionTypes";
import ExampleDescription from "../../../../ExampleDescription/ExampleDescription";

const description = `Demonstrates how to create a JavaScript Donut Chart. This is a circular chart type with a hole in the center
consisting of sectors which are proportional to the quantity it represents.`;
const tips = [
    `You can change the fill color of every segment and the style of its label.`,
    `Every segment can be highlighted by clicking on it or when selected in the legend.`
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
        href: "#",
        title: ExampleStrings.titleDonutChart,
        linkTitle: "JavaScript Donut Chart Documentation"
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
                imgPath: pieChart,
                title: ExampleStrings.titlePieChart,
                seoTitle: ExampleStrings.urlTitlePieChart,
                examplePath: ExampleStrings.urlPieChart
            }
        ]
    }
];

const SeeAlsoComponent = () => <Gallery examples={seeAlso} />;

const Subtitle = () => (
    <p>
        Demonstrates how create a <strong>JavaScript Donut Chart</strong> using SciChart.js, High Performance{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank">
            JavaScript Charts
        </a>
    </p>
);

const Description = () => (
    <>
        <ExampleDescription documentationLinks={documentationLinks} tips={tips} description={description} />
    </>
);

export const donutChartExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleDonutChart,
    path: ExampleStrings.urlDonutChart,
    subtitle: Subtitle,
    description: Description,
    seeAlso: SeeAlsoComponent,
    code,
    githubUrl,
    seoDescription:
        "Demonstrates how to create a JavaScript Donut Chart. This is a circular chart type with a hole in the center " +
        "consisting of sectors which are proportional to the quantity it represents.",
    seoKeywords: "donut, chart, javascript, canvas",
    thumbnailImage: "javascript-donut-chart.jpg"
};
