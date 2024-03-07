const { HLTV } = require("hltv")
const { cacheWrapMeta } = require("./getCache")
const { getMeta } = require("./getMeta")

async function getCatalog() {
    return new Promise(async (resolve, reject) => {
        HLTV.getMatches().then(async (matches) => {
            const inLive = matches.filter((val) => val.live === true);
            const metas = await Promise.all(
                inLive.map(async (match) => {
                    const meta = await cacheWrapMeta(match.id, async () => {
                        return await getMeta(match.id);
                    });
                    return meta;
                })
            );
            resolve({ metas });
        });
    });
}

module.exports = { getCatalog }