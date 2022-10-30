const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { createCanvas, loadImage } = require("canvas");

cloudinary.config({
  cloud_name: "dnailepwh",
  api_key: "892594384494619",
  api_secret: "idnz0csnjKwtuo7Yf44wGyU6CEQ",
  secure: true,
});

function genPoster(matchInfo) {
  return new Promise((resolve, reject) => {
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

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "hltv" },
      function (error, result) {
        resolve(result.secure_url);
      }
    );

    loadImage(
      `https://static.hltv.org/images/team/logo/${matchInfo.team1.id}`
    ).then((image) => {
      context.drawImage(image, 80, 100, 184, 184);
      loadImage(
        `https://static.hltv.org/images/team/logo/${matchInfo.team2.id}`
      ).then((image) => {
        context.drawImage(image, 460, 100, 184, 184);
        const buffer = canvas.toBuffer("image/png");
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
    });
  });
}

module.exports = { genPoster };
