const gis = require('async-g-i-s');

async function getLogo(teamName) {
    return new Promise((resolve, reject) => {
        gis(teamName + "team logo liquipedia").then(result => {
            if (result && result.length) {
                resolve(result[0].url)
            } else {
                resolve(undefined)
            }
        });
    })
}

module.exports = { getLogo }