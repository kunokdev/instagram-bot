import * as puppeteer from "puppeteer";

import { config } from "../config";
import { wait } from "../utils/wait";

export const openFollowersModal = async (page: puppeteer.Page) => {
  await page.goto(`https://www.instagram.com/${config.target.username}`);
  await wait();

  await (await page.$x(`//a[text()=' followers']`))[0].click();
  await wait("10s");
  return true;
};

export const scrollFollowerModal = (page: puppeteer.Page) => {
  const selectorDiv = ".isgrP";
  page.evaluate((selector) => {
    const scrollableSection = document.querySelector(selector);
    scrollableSection.scrollTop = document.querySelector<any>(selector + " ul")?.offsetHeight;
  }, selectorDiv);
};
