import os from "node:os";
import path from "node:path";

export const agentRoot = path.join(os.homedir(), ".FoodOrderAgent", "provi");
export const chromeProfileDir = path.join(agentRoot, "chrome-profile");
export const sessionStatePath = path.join(agentRoot, "provi_session_state.json");
export const storageDumpPath = path.join(agentRoot, "provi_storage_dump.json");
export const captureDir = path.join(agentRoot, "captures");
export const latestCapturePath = path.join(captureDir, "latest-provi-capture.json");
export const latestExtractPath = path.join(captureDir, "latest-provi-values.json");

export const proviStartUrl = "https://app.provi.com/";
export const proviHostPattern = /provi\.com/i;
export const preferredProviLocationName = "On Par Entertainment";
export const alternateProviLocationNames = ["Wild Axe"];

export const chromeExecutableCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];
