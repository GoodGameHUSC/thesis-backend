const sharp = require('sharp');
export default function resizeImageBuffer(inputBuffer, height, width) {
  return new Promise((res, rej) => {
    sharp(inputBuffer)
      .resize({ height, width })
      .toBuffer()
      .then(data => {
        res(data);
      })
      .catch(error => {
        rej(error);
      });
  });

}