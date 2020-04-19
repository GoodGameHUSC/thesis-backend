const admin = require('firebase-admin');
const uuidv4 = require('uuid/v4');
export class FireBaseStorage {

  /**
   * Upload file to ref Firebase
   * @param {*} file 
   * @param {*} basePath 
   */
  static uploadFileToRef(file, basePath) {
    const fileName = Date.now() + file.originalname;
    const storagePath = basePath + fileName;
    var bucket = admin.storage().bucket();
    let fileRef = bucket.file(storagePath);
    let uuid = uuidv4();


    return new Promise((res, rej) => {
      fileRef.save(file.buffer, {
        gzip: true,
        metadata: {
          contentType: file.mimetype,
          firebaseStorageDownloadTokens: uuid
        }
      })
        .then(() => {
          const img_url = 'https://firebasestorage.googleapis.com/v0/b/tedious2018-1521676086012.appspot.com/o/'
            + encodeURIComponent(storagePath)
            + '?alt=media&token='
            + uuid;
          res(img_url);
        }
        ).catch(error => {
          rej(error);
        });

    })
  }
}
