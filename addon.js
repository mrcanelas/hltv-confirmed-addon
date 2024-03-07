const { addonBuilder } = require("stremio-addon-sdk")
const manifest = require("./lib/getManifest")
const { cacheWrapMeta } = require("./lib/getCache")
const { getCatalog } = require("./lib/getCatalog")
const { getMeta } = require("./lib/getMeta")
const { getStreams } = require("./lib/getStreams")
const builder = new addonBuilder(manifest)

builder.defineCatalogHandler(async ({ type, id, extra }) => {
	return await getCatalog()
})

builder.defineMetaHandler(async ({ id }) => {
	const matchId = id.split(":")[1];
	const meta = await cacheWrapMeta(matchId, async () => {
		return await getMeta(matchId);
	});
	return Promise.resolve({ meta });
})

builder.defineStreamHandler(({ id }) => {
	return new Promise(async (resolve, reject) => {
		getStreams(id)
		  .then((streams) => resolve(streams))
		  .catch((err) => reject(err));
	  });
})

module.exports = builder.getInterface()