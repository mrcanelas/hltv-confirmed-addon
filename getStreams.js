const axios = require("axios");
const twitch = require("twitch-m3u8");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const countries = require("./countries");

function parseFlag(country) {
  if (country) {
    const findCountry = countries.find((obj) => obj.name === country);
    if (findCountry) {
      return findCountry.emoji;
    }
  }
}

function parseTiwtch(url) {
  if (url && url.includes("www.twitch.tv")) {
    return url.split("/")[3];
  } else {
    return undefined;
  }
}

async function getVideos(matchId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://www.hltv.org/matches/${matchId}/page`)
      .then((response) => {
        const dom = new JSDOM(response.data);

        const videos = [];

        const itens = dom.window.document.querySelectorAll(
          "div.stream-box-embed"
        );

        itens.forEach((item, index) => {
          const name = item.textContent;
          const country = item.querySelector("img").getAttribute("title");
          const url = item.parentElement.querySelector(
            "div.external-stream > a"
          );
          const id = url ? url.href : null;
          if (id) {
            videos.push({
              id: parseTiwtch(id),
              title: name + " | " + parseFlag(country),
              thumbnail: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${parseTiwtch(
                id
              )}-1920x1080.jpg`,
            });
          }
        });
        resolve(videos);
      })
      .catch((err) => reject(console.error(err)));
  });
}

async function getStreams(twitchId) {
  return new Promise((resolve, reject) => {
    if (twitchId) {
      twitch
        .getStream(twitchId)
        .then((data) => {
          const streams = data.map((source) => {
            return {
              title: source.quality,
              url: source.url,
            };
          });
          resolve({ streams });
        })
        .catch((err) => reject(console.error(err)));
    }
  });
}

module.exports = { getVideos, getStreams };
