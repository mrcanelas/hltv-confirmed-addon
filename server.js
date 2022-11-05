const { serveHTTP, publishToCentral } = require("stremio-addon-sdk");
const schedule = require("node-schedule");
const addonInterface = require("./addon");
const axios = require("axios");

serveHTTP(addonInterface, { port: process.env.PORT || 53832 }).then((res) => {
  schedule.scheduleJob("* */15 * * * ", function () {
    axios
      .get(
        "https://94c8cb9f702d-hltv-confirmed-addon.baby-beamup.club/catalog/tv/top.json?break"
      )
      .then((resp) => console.log("Catalog Updated"));
  });
});
