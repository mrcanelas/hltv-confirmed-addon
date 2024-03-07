const manifest = {
    id: "hltv-addon",
    version: "0.0.3",
    catalogs: [
      {
        type: "tv",
        id: "live",
        name: "HLTV - Live Matches",
      },
    ],
    resources: ["catalog", "stream", "meta"],
    types: ["tv"],
    name: "HLTV Confirmed",
    description:
      "Watch the biggest Counter Strike: Global Offensive championships in real time.",
    background: "https://i.imgur.com/JLXw551.jpg",
    logo: "https://i.imgur.com/Uui2nsc.png",
  }

module.exports = manifest