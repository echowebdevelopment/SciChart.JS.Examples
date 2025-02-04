import { FC, useContext, useState, useEffect, ChangeEvent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import CodeIcon from "@material-ui/icons/Code";
import BookIcon from "@material-ui/icons/Book";
import { makeStyles } from "@material-ui/core/styles";
import Search from "../Search/Search";
import classes from "./AppTopBar.module.scss";
import Logo from "../../images/scichart-logo-app-bar.svg";
import LogoSmall from "../../images/scichart-logo-app-bar-mobile.svg";
import { TExamplePage } from "../AppRouter/examplePages";
import npm from "./npm.svg";
import { FrameworkContext } from "../../helpers/shared/Helpers/FrameworkContext";
import { getTitle, EPageFramework, FRAMEWORK_NAME } from "../../helpers/shared/Helpers/frameworkParametrization";
import { FormControl, InputLabel, MenuItem, Select, Tooltip } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { appTheme } from "../Examples/theme";

type TProps = {
    toggleDrawer: () => void;
    currentExample?: TExamplePage;
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
        width: 200,
        marginLeft: 10,
    },
    select: {
        color: "#97a0a8",
        background: "#030723",
        width: 200,
        paddingLeft: 10,
        "&.Mui-focused": {
            color: "#4a545b",
        },
        "&:hover": {
            background: "#4a545b",
            color: appTheme.ForegroundColor,
        },
    },
    label: {
        paddingLeft: 10,

        color: appTheme.ForegroundColor,
        "&.Mui-focused": {
            color: appTheme.ForegroundColor,
        },
    },
    selectIcon: {
        color: appTheme.ForegroundColor,
    },
    "MuiSelect-nativeInput": {
        width: "100%",
    },
}));

const AppBarTop: FC<TProps> = (props) => {
    const { toggleDrawer, currentExample } = props;
    const [isMobile, setIsMobile] = useState(false);
    const [availableFrameworks, setAvailableFrameworks] = useState<EPageFramework[]>([EPageFramework.React]);
    const selectedFramework = useContext(FrameworkContext);
    const navigate = useNavigate();
    const localClasses = useStyles();
    const baseGithubPath = "https://github.com/ABTSoftware/SciChart.JS.Examples/blob/master/Examples/src";
    const contextualGithub =
        currentExample?.filepath !== undefined
            ? baseGithubPath + "/components/Examples/" + currentExample.filepath
            : "https://github.com/ABTSoftware/SciChart.JS.Examples";
    const contextualGithubTitle =
        currentExample !== undefined
            ? `View source for ${getTitle(currentExample.title, selectedFramework)} on Github`
            : "Clone SciChart.js.examples on GitHub";
    const docLinks = currentExample?.documentationLinks;
    const contextualDocUrl =
        docLinks !== undefined && docLinks.length > 0
            ? docLinks[0].href
            : "https://www.scichart.com/javascript-chart-documentation";
    const contextualDocTitle =
        docLinks !== undefined && docLinks.length > 0 ? docLinks[0].title : "SciChart.js Documentation Home";

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    type TAvailableFrameworkVariants = {
        [key in EPageFramework]: string;
    };
    useEffect(() => {
        const fetchAvailableVariants = async (example: TExamplePage): Promise<TAvailableFrameworkVariants> => {
            const variantsUrl = `services/variants/${example.path}?framework=${selectedFramework}`;
            const response = await fetch(variantsUrl);
            const data = (await response.json()) as TAvailableFrameworkVariants;
            return data;
        };

        if (currentExample) {
            fetchAvailableVariants(currentExample).then((variants) => {
                const frameworks = Object.keys(variants).filter((key) => variants[key as EPageFramework]);
                setAvailableFrameworks([...(frameworks as EPageFramework[]), EPageFramework.React]);
            });
        }
    }, [currentExample]);

    const isFrameworkVariantAvailable = availableFrameworks?.includes(selectedFramework);

    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        if (currentExample) {
            navigate(`/${event.target.value as EPageFramework}/${currentExample.path}`);
        } else {
            navigate(`/${event.target.value as EPageFramework}`);
        }
    };

    const codeSandboxButton = currentExample ? (
        <Button
            //disabled={!isFrameworkVariantAvailable}
            rel="nofollow external"
            // className={
            //     isFrameworkVariantAvailable ? classes.PurpleButton : `${classes.PurpleButton} ${classes.DisabledButton}`
            // }
            className={classes.PurpleButton}
            href={`codesandbox/${currentExample.path}?codesandbox=1&framework=${
                isFrameworkVariantAvailable ? selectedFramework : EPageFramework.React
            }`}
            title={
                isFrameworkVariantAvailable
                    ? `Edit ${getTitle(currentExample.title, selectedFramework)} in CodeSandbox`
                    : `Sorry, we have not got ${FRAMEWORK_NAME[selectedFramework]} code for this example yet, so you will see react code instead, but the actual chart code is always the same. Contact support@scichart.com to request prioritisation of this example`
            }
            target="_blank"
        >
            <CodeIcon fontSize="small" /> &nbsp;Code Sandbox
        </Button>
    ) : null;

    return (
        <AppBar position="sticky" className={classes.AppBar}>
            <Toolbar className={classes.ToolBar}>
                <a href="https://demo.scichart.com/" title="SciChart Demo">
                    {isMobile ? (
                        <img className={classes.Logo} src={LogoSmall} alt="scichart-logo" />
                    ) : (
                        <img className={classes.Logo} src={Logo} alt="scichart-logo" />
                    )}
                </a>
                <Search />
                <div className={classes.FlexPlaceholder}></div>
                {!isMobile ? (
                    <FormControl className={localClasses.formControl}>
                        <InputLabel id="framework-select-label" className={localClasses.label}>
                            Framework
                        </InputLabel>

                        <Select
                            inputProps={{ MenuProps: { disableScrollLock: true } }}
                            labelId="framework-select-label"
                            id="demo-simple-select"
                            className={localClasses.select}
                            classes={{ icon: localClasses.selectIcon }}
                            value={selectedFramework}
                            label={FRAMEWORK_NAME[selectedFramework]}
                            onChange={handleChange}
                        >
                            <MenuItem value={EPageFramework.Vanilla}>{FRAMEWORK_NAME[EPageFramework.Vanilla]}</MenuItem>
                            <MenuItem value={EPageFramework.React}>{FRAMEWORK_NAME[EPageFramework.React]}</MenuItem>
                            {/* <MenuItem value={EPageFramework.Angular}>{FRAMEWORK_NAME[EPageFramework.Angular]}</MenuItem> */}
                            {/* <MenuItem value={EPageFramework.Vue}>{FRAMEWORK_NAME[EPageFramework.Vue]}</MenuItem> */}
                        </Select>
                    </FormControl>
                ) : null}

                <Button
                    className={classes.BlueButton}
                    href="https://www.scichart.com/getting-started/scichart-javascript/"
                    target="_blank"
                    title="Get a FREE Community license"
                >
                    Get it FREE
                </Button>
                <Button
                    className={classes.PurpleButton}
                    href={contextualDocUrl}
                    title={contextualDocTitle}
                    target="_blank"
                >
                    <BookIcon fontSize="small" />
                    &nbsp;Docs
                </Button>
                {codeSandboxButton}
                <a className={classes.GitHubLink} href={contextualGithub} title={contextualGithubTitle} target="_blank">
                    <GitHubIcon fontSize="small" />
                </a>
                <a
                    className={classes.NpmLink}
                    href="https://www.npmjs.com/package/scichart"
                    title="npmjs / SciChart"
                    target="_blank"
                >
                    <img src={npm} alt="Npm Logo" width={32} height={32} />
                </a>
                <IconButton
                    onClick={toggleDrawer}
                    edge="start"
                    className={classes.MenuButton}
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarTop;
