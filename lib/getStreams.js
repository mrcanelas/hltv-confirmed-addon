const twitch = require("twitch-m3u8");
const querystring = require("node:querystring")
const countries = require("../utils/countries");

function parseFlag(country) {
  if (country) {
    const findCountry = countries.find((obj) => obj.name === country);
    if (findCountry) {
      return findCountry.emoji;
    }
  }
}

function parseTiwtch(url) {
  const decodeUrl = querystring.decode(url)
  const twitchUser = decodeUrl['https://player.twitch.tv/?channel']
  return twitchUser;
}

async function getVideos(streams) {
  const twitchStreams = streams.filter(stream => stream.link.includes("twitch.tv"))
  return twitchStreams.map(stream => {
    return {
      id: parseTiwtch(stream.link),
      title: stream.name,
      thumbnail: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${parseTiwtch(stream.link)}-1920x1080.jpg`,
    }
  })
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