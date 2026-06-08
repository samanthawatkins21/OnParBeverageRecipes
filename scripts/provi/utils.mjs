import fs from "node:fs/promises";
import path from "node:path";

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function writeJson(filePath, value) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function nowStamp() {
  return new Date().toISOString();
}

export function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function looksLikeJson(contentType = "") {
  return /json|graphql/i.test(contentType);
}

export function extractInterestingValues(input, matches = [], trail = []) {
  if (input === null || input === undefined) return matches;

  if (Array.isArray(input)) {
    input.forEach((value, index) => extractInterestingValues(value, matches, [...trail, `[${index}]`]));
    return matches;
  }

  if (typeof input === "object") {
    Object.entries(input).forEach(([key, value]) => {
      const nextTrail = [...trail, key];
      if (/(retailer|account|ohlq|customer|location|license|cart|checkout)/i.test(key)) {
        matches.push({
          path: nextTrail.join("."),
          value,
        });
      }
      extractInterestingValues(value, matches, nextTrail);
    });
    return matches;
  }

  if (typeof input === "string" && /(retailer|account|ohlq|customer|location|license)/i.test(input)) {
    matches.push({
      path: trail.join("."),
      value: input,
    });
  }

  return matches;
}
