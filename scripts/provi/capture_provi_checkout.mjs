import fs from "node:fs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { chromium } from "playwright";
import {
  alternateProviLocationNames,
  captureDir,
  chromeExecutableCandidates,
  chromeProfileDir,
  latestCapturePath,
  latestExtractPath,
  preferredProviLocationName,
  proviHostPattern,
  proviStartUrl,
} from "./paths.mjs";
import { ensureDir, extractInterestingValues, looksLikeJson, nowStamp, safeJsonParse, writeJson } from "./utils.mjs";

function resolveChromeExecutable() {
  return chromeExecutableCandidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function isInterestingUrl(url = "") {
  return proviHostPattern.test(url) || /graphql|api|checkout|cart|order|retailer|account/i.test(url);
}

async function main() {
  const executablePath = resolveChromeExecutable();
  if (!executablePath) throw new Error("Chrome executable was not found on this machine.");

  await ensureDir(captureDir);

  console.log("Opening Chrome with the saved Provi session...");
  console.log(`1. Make sure the active Provi location is "${preferredProviLocationName}".`);
  if (alternateProviLocationNames.length) {
    console.log(`2. Avoid capturing from ${alternateProviLocationNames.join(", ")} because it uses a different location ID.`);
  }
  console.log("3. Navigate through the Provi flow until you reach cart / checkout / account screens.");
  console.log("4. Spend a minute on the pages that show retailer / account details.");
  console.log("5. Come back to this PowerShell window and press Enter.");

  const requestLog = [];
  const candidateValues = [];

  const context = await chromium.launchPersistentContext(chromeProfileDir, {
    executablePath,
    headless: false,
    viewport: null,
    ignoreHTTPSErrors: true,
  });

  context.on("request", async (request) => {
    const url = request.url();
    if (!isInterestingUrl(url)) return;

    const headers = await request.allHeaders();
    const postData = request.postData() || "";
    const parsedPostData = safeJsonParse(postData);
    if (parsedPostData) {
      candidateValues.push(...extractInterestingValues(parsedPostData, [], ["requestBody"]));
    }

    requestLog.push({
      type: "request",
      capturedAt: nowStamp(),
      method: request.method(),
      url,
      resourceType: request.resourceType(),
      headers,
      postData: parsedPostData || postData || null,
    });
  });

  context.on("response", async (response) => {
    const url = response.url();
    if (!isInterestingUrl(url)) return;

    const contentType = response.headers()["content-type"] || "";
    let body = null;

    try {
      if (looksLikeJson(contentType)) {
        const text = await response.text();
        body = safeJsonParse(text) || text;
        if (body && typeof body === "object") {
          candidateValues.push(...extractInterestingValues(body, [], ["responseBody"]));
        }
      }
    } catch {}

    requestLog.push({
      type: "response",
      capturedAt: nowStamp(),
      status: response.status(),
      url,
      headers: response.headers(),
      body,
    });
  });

  const page = context.pages()[0] || (await context.newPage());
  await page.goto(proviStartUrl, { waitUntil: "domcontentloaded" });
  const rl = readline.createInterface({ input, output });
  try {
    await rl.question("Press Enter after you have finished the Provi checkout/account capture on On Par Entertainment...");
  } finally {
    rl.close();
  }

  const summary = {
    capturedAt: nowStamp(),
    totalEvents: requestLog.length,
    interestingValues: dedupeValues(candidateValues).slice(0, 200),
    events: requestLog,
  };

  await writeJson(latestCapturePath, summary);
  await writeJson(latestExtractPath, {
    capturedAt: summary.capturedAt,
    interestingValues: summary.interestingValues,
  });

  console.log(`Saved Provi capture to ${latestCapturePath}`);
  console.log(`Saved extracted values to ${latestExtractPath}`);
  await context.close();
}

function dedupeValues(values) {
  const seen = new Set();
  return values.filter((entry) => {
    const key = `${entry.path}:${JSON.stringify(entry.value)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
