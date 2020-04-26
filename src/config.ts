import { config as loadConfig } from "dotenv";

loadConfig();

const {
  STORAGE_URL,
  STORAGE_DB_NAME,
  STORAGE_COLLECTION_NAME,
  BOT_USERNAME,
  BOT_EMAIL,
  BOT_PASSWORD,
  TARGET_USERNAME,
  HEADLESS_BROWSER,
  WAIT_AFTER_FINISH,
} = process.env;

const config = {
  headlessBrowser: HEADLESS_BROWSER ?? false,
  waitAfterFinish: WAIT_AFTER_FINISH || "5min",
  storage: {
    url: STORAGE_URL ?? "",
    dbName: STORAGE_DB_NAME ?? "",
    collectionName: STORAGE_COLLECTION_NAME ?? "followed_by_stamps",
  },
  botAccount: {
    username: BOT_USERNAME ?? "",
    email: BOT_EMAIL ?? "",
    password: BOT_PASSWORD ?? "",
  },
  target: {
    username: TARGET_USERNAME ?? "symbiotikka",
  },
};

if (!config.storage.url) throw new Error("config.storage.url required");
if (!config.storage.dbName) throw new Error("config.storage.dbName required");

console.log("🧩 Config", config);
export { config };
