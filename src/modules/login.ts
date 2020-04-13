import * as puppeteer from "puppeteer";

import { config } from "../config";
import { wait } from "../utils/wait";

export const loginToInstagram = async (page: puppeteer.Page) => {
  // Viist page
  await page.goto("https://www.instagram.com/");
  await wait();
  // Login with facebook
  await (await page.$x(`//span[text()='Log in with Facebook']`))[0].click();

  await wait();
  await (await page.$x(`//*[@id="email"]`))[0].type(config.botAccount.email);
  await wait("200ms");
  await (await page.$x(`//*[@id="pass"]`))[0].type(config.botAccount.password);
  await wait("200ms");
  await (await page.$x(`//*[@id="loginbutton"]`))[0].click();
  await wait("10s");
  return true;
};
