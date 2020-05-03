import * as puppeteer from "puppeteer";
import { isEqual } from "lodash";

import { wait } from "./utils/wait";
import { loginToInstagram } from "./modules/login";
import { openFollowersModal, scrollFollowerModal } from "./modules/followersModal";
import { storage } from "./services/storage";
import { config } from "./config";

(async () => {
  const browser = await puppeteer.launch({ headless: !!config.headlessBrowser });
  const page = await browser.newPage();
  let buffer: string[] = [];

  try {
    const db = await storage({ url: config.storage.url, dbName: config.storage.dbName });
    await loginToInstagram(page);

    page.on("response", async (response) => {
      // 429
      if (response.status() === 429) {
        console.error("429!");
        process.exit(1);
      }

      if (response.url().startsWith("https://www.instagram.com/graphql/query/")) {
        const parsedResponse = JSON.parse((await response.buffer()).toString());
        if (parsedResponse?.data?.user?.edge_followed_by?.page_info?.has_next_page) {
          const scrappedFollowers = parsedResponse.data.user.edge_followed_by.edges.map(
            ({ node }: any) => node.username
          );
          buffer = [...buffer, ...scrappedFollowers];
          await wait(".5s");
          scrollFollowerModal(page);
        }
        if (parsedResponse?.data?.user?.edge_followed_by?.page_info?.has_next_page === false) {
          const scrappedFollowers = parsedResponse.data.user.edge_followed_by.edges.map(
            ({ node }: any) => node.username
          );
          buffer = [...buffer, ...scrappedFollowers];
          const previousItem = (
            await db
              .collection(config.storage.collectionName)
              .find()
              .sort({ createdAt: -1 })
              .limit(1)
              .toArray()
          )[0];
          console.log("🔵 Buffer length", buffer.length);
          if (previousItem && isEqual(previousItem.payload, buffer)) {
            console.log("No changes in data");
            await wait(config.waitAfterFinish);
            return process.exit(0);
          }
          await db.collection(config.storage.collectionName).insertOne({
            createdAt: Date.now(),
            count: buffer.length,
            payload: buffer,
            target: config.target,
          });
          console.log("Done");
          await wait(config.waitAfterFinish);
          process.exit(0);
        }
      }
    });

    await openFollowersModal(page);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
