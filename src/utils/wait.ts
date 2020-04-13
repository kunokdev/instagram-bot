import ms = require("ms");

export const wait = (duration = "2.5s") =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(duration);
    }, ms(duration));
  });
