const { HLTV } = require("hltv");
const { cacheWrapPoster } = require("./getCache");
const { genPoster } = require("./getPosters");
const { getVideos } = require("./getStreams");
const { generateMatchSummary } = require("./getSumary");
const BACKGROUND_URL = "https://i.imgur.com/JLXw551.jpg";
const LOGO_URL = "https://i.imgur.com/PeCE3tW.png";

async function getMeta(matchId) {
  return new Promise((resolve, reject) => {
    HLTV.getMatch({ id: matchId })
      .then(async (match) => {
        const poster = await cacheWrapPoster(match.id, async () => {
          return await await genPoster(match);
        });
        const videos = await getVideos(match.streams);
        const meta = {
          id: `hltv:${match.id.toString()}`,
          type: "tv",
          name: `${match.team1?.name} X ${match.team2?.name}`,
          logo: LOGO_URL,
          poster,
          background: BACKGROUND_URL,
          posterShape: "landscape",
//          description: generateMatchSummary(match),
          videos,
        };
        resolve(meta);
      })
      .catch((err) => reject(err));
  });
}

module.exports = { getMeta };