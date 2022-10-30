const { HLTV } = require("hltv");
const { genPoster } = require("./genPoster");
const { getVideos } = require("./getStreams");
const BACKGROUND_URL = "https://res.cloudinary.com/dnailepwh/image/upload/v1667141869/hltv/ffc38d9bce22d7a9eaa07b890e3af1a2_feobw4.jpg"
const LOGO_URL = "https://res.cloudinary.com/dnailepwh/image/upload/v1667150596/hltv/rsz_image_1_w2ddxb.png"

async function getMeta(matchId) {
  return new Promise((resolve, reject) => {
    HLTV.getMatch({ id: matchId }).then(async (match) => {
      const poster = await genPoster(match);
      const videos = await getVideos(match.id);
      const meta = {
        id: `hltv:${match.id.toString()}`,
        type: "tv",
        name: `${match.team1?.name} X ${match.team2?.name}`,
        logo: LOGO_URL,
        poster,
        background: BACKGROUND_URL,
        posterShape: "landscape",
        videos,
      };
      resolve(meta);
    })
    .catch(err => reject(err));
  });
}

module.exports = { getMeta };
