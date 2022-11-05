const { addonBuilder } = require("stremio-addon-sdk");
const { HLTV } = require("hltv");
const { getStreams } = require("./getStreams");
const { getMeta } = require("./getMeta");
const { cacheWrapMeta } = require("./cache");

const manifest = {
  id: "community.HLTV",
  version: "0.0.2",
  catalogs: [
    {
      type: "tv",
      id: "top",
    },
  ],
  resources: ["catalog", "stream", "meta"],
  types: ["tv"],
  name: "HLTV Confirmed",
  description:
    "Watch the biggest Counter Strike: Global Offensive championships in real time.",
  background:
    "https://res.cloudinary.com/dnailepwh/image/upload/v1667141869/hltv/ffc38d9bce22d7a9eaa07b890e3af1a2_feobw4.jpg",
  logo: "https://res.cloudinary.com/dnailepwh/image/upload/v1667142999/hltv/D9lBEYYW4AIKgiP_c8ivib.png",
};
const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(async () => {
  return new Promise(async (resolve, reject) => {
    HLTV.getMatches().then(async (matches) => {
      const inLive = matches.filter((val) => val.live === true);
      const metas = await Promise.all(
        inLive.map(async (match) => {
          const meta = await getMeta(match.id);
          return meta;
        })
      );
      resolve({ metas });
    });
  });
});

builder.defineMetaHandler(async ({ id }) => {
  const matchId = id.split(":")[1];
  const meta = await cacheWrapMeta(matchId, async () => {
    return await getMeta(matchId);
  });
  return Promise.resolve({ meta });
});

builder.defineStreamHandler(({ id }) => {
  return new Promise(async (resolve, reject) => {
    getStreams(id)
      .then((streams) => resolve(streams))
      .catch((err) => reject(err));
  });
});

module.exports = builder.getInterface();
