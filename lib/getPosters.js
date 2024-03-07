const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { createCanvas, loadImage } = require("canvas");
const { getLogo } = require("./getLogo");
const defaultLogo = "https://i.imgur.com/L6DB3ge.png"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

function genPoster(matchInfo) {
  return new Promise(async (resolve, reject) => {
    const width = 720;
    const height = 400;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    context.fillStyle = "#1B1F23";
    context.fillRect(0, 0, width, height);

    context.font = "bold 70pt Menlo";
    context.textAlign = "center";
    context.textBaseline = "top";

    const text = "x";

    context.fillStyle = "#7791AE";
    context.fillText(text, 360, 140);

    context.fillStyle = "#7791AE";
    context.font = "bold 15pt Menlo";
    context.fillText(matchInfo.event.name, 360, 330);

    const team1 = await getLogo(matchInfo.team1.name)
    const team2 = await getLogo(matchInfo.team2.name)

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "hltv" },
      function (error, result) {
        resolve(result.secure_url);
      }
    );

    loadImage(team1 || defaultLogo).then((image) => {
      context.drawImage(image, 80, 100, 184, 184);
      loadImage(team2 || defaultLogo).then((image) => {
        context.drawImage(image, 460, 100, 184, 184);
        const buffer = canvas.toBuffer("image/png");
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
    });
  });
}

module.exports = { genPoster };