import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import { GalleryItem } from "../../../../../helpers/types/types";
import { TDocumentationLink } from "../../../../../helpers/types/ExampleDescriptionTypes";
import exampleImage from "./javascript-custom-filters.jpg";

const previewDescription = `This uses a simple custom filter to apply random noise to a line, then an advanced aggregation filter calculates the frequency distribution`;
const description = `Simple Custom Filters are great if you just want to apply some function to each y value.  Just create an XyCustomFilter and set your function.
If you want to significantly reshape your data, create a class that extends XyFilterBase`;
const tips = [' There are CustomFilter and FitlerBase types for each of the series types (xy, xyy, xyz, ohlc)',
' Complex custom filters do not have to output the same series type as they take as input.',
' If your filter takes a parameter, use a setter to call filterAll when the parameter is updated'
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
        href: ExampleStrings.urlCustomFiltersDocumentation,
        title: ExampleStrings.urlTitleFiltersApiDocumentation,
        linkTitle: "SciChart.js Custom Filters Documentation"
    }
];

const Subtitle = () => (
    <p>
        Demonstrates simple and advanced <strong>Custom Filters</strong>, with realtime updates
        using SciChart.js, High Performance{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank">
            JavaScript Charts
        </a>
    </p>
);

export const customFiltersExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleCustomFilters,
    pageTitle: ExampleStrings.titleCustomFilters + ExampleStrings.exampleGenericTitleSuffix,
    path: ExampleStrings.urlCustomFilters,
    subtitle: Subtitle,
    documentationLinks,
    tips,
    description,
    previewDescription,
    code,
    githubUrl,
    metaDescription:
        "Demonstrates simple and advanced Custom Filters for data transformation and aggregation, with realtime updates",
    metaKeywords: "real-time, filter, transform, updating, aggregation, custom, chart, javascript, webgl, canvas",
    thumbnailImage: exampleImage
};
