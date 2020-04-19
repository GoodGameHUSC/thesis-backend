import keys from '../config/env/keys';
const AWS = require('aws-sdk');
// TODO: configure new AWS key
AWS.config.update({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
});
const s3 = new AWS.S3();
const uuidv1 = require('uuid/v1');

const imageFileBody = (path, buffer, mimetype) => {
  return {
    Bucket: 'cloud9-staging-bucket',
    Key: path,
    Body: buffer,
    ContentType: mimetype || 'image/jpeg',
    ACL: 'public-read',
  };
}

export function uploadGiftImageToBucket(fileExtension, buffer, mimetype) {
  return new Promise(async (res, rej) => {
    try {
      const params = imageFileBody(`gifts/${uuidv1()}.${fileExtension}`, buffer, mimetype)
      const uploadedImage = await s3.upload(params).promise();
      res(uploadedImage)
    } catch (error) {
      rej(error);
    }
  })
}
// ${req.userId}/profile.${fileExtension}
export function uploadUserAvatarImageToBucket(fileExtension, buffer, mimetype, userId) {
  return new Promise(async (res, rej) => {
    try {
      const params = imageFileBody(`${userId}/avatar.${fileExtension}`, buffer, mimetype)
      const uploadedImage = await s3.upload(params).promise();
      res(uploadedImage)
    } catch (error) {
      rej(error);
    }
  })
}

export function uploadPrizeImageToBucket(fileExtension, buffer, mimetype){
  return new Promise(async (res, rej) => {
    try {
      const params = imageFileBody(`prizes/${uuidv1()}.${fileExtension}`, buffer, mimetype)
      const uploadedImage = await s3.upload(params).promise();
      res(uploadedImage)
    } catch (error) {
      rej(error);
    }
  })
}
export default s3;