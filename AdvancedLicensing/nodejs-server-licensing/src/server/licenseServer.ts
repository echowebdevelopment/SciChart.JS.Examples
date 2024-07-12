import * as express from "express";
import { DataType, open, close, define } from "ffi-rs";
import path = require("path");
import os = require("os");

const router = express.Router();

// If your application will need to run on multiple platforms you may need to make multiple native lbraries available and pick the correct name and path here
const libraryName =
  os.platform() === "win32"
    ? "SciChartLicenseServer.dll"
    : "LibSciChartLicenseServer.so";
const libraryPath = path.join(__dirname, libraryName);

const debug = (msg: string, ...args: any[]) => {
  if (process.env.NODE_ENV == "development") {
    console.log(msg, args);
  }
};

const library = "SciChartLicenseServer";
// Open the dynamic library
open({ library, path: libraryPath });
// Configure the native api
let nativeLicenseServer = define({
  SciChartLicenseServer_SetAssemblyName: {
    library,
    retType: DataType.Boolean,
    paramsType: [DataType.String],
  },
  SciChartLicenseServer_SetRuntimeLicenseKey: {
    library,
    retType: DataType.Boolean,
    paramsType: [DataType.String],
  },
  SciChartLicenseServer_ValidateChallenge: {
    library,
    retType: DataType.String,
    paramsType: [DataType.String],
  },
  SciChartLicenseServer_Dump: {
    library,
    retType: DataType.String,
    paramsType: [],
  },
  SciChartLicenseServer_GetLicenseErrors: {
    library,
    retType: DataType.String,
    paramsType: [],
  },
});

debug("nativeLicenseServer created");

// The app name you set here must match one you have added on the MyAccount page before generating a key pair.
debug("app name", process.env.npm_package_name);
nativeLicenseServer.SciChartLicenseServer_SetAssemblyName([
  process.env.npm_package_name,
]);

// Set the Server key
const isValid = nativeLicenseServer.SciChartLicenseServer_SetRuntimeLicenseKey([
  "server key here",
]);
debug("SciChartLicenseServer_SetRuntimeLicenseKey", isValid);
if (!isValid) {
  const errors = nativeLicenseServer.SciChartLicenseServer_GetLicenseErrors([]);
  console.error(errors);
}

router.get("/", (req, res) => {
  const challenge = req.query.challenge.toString();
  debug("Received license challenge: ", challenge);
  const result = nativeLicenseServer.SciChartLicenseServer_ValidateChallenge([
    challenge,
  ]);
  debug("returning response: ", result);
  res.end(result);
});

// Callback to close the library on shutdown
const closeLicenseServer = () => {
  debug("Closing licenseServer");
  close(library);
};

export { router as licenseServer, closeLicenseServer };
