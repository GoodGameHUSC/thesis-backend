const admin = require('firebase-admin');
const uuidv4 = require('uuid/v4');

export class FirestoreService {

  static readDataInDocByRef(ref) {
    return new Promise((res, rej) => {
      ref.get()
        .then(doc => {
          if (!doc.exists) {
            rej(new Error('No such document!'));
          } else {
            res(doc.data());
          }
        })
        .catch(err => {
          rej(err);
        });
    });

  }

  /**
   * 
   * @param {*} ref Firestore Ref
   * @param {*} readType list,associate
   */
  static readDataInCollectionByRef(ref, readType = 'list') {
    return new Promise((res, rej) => {
      ref.get()
        .then(snapshot => {

          if (readType == 'list') {
            let result = [];
            snapshot.forEach(doc => {
              result.push(doc.data());
            });
            res(result);
          } else if (readType == 'associate') {
            let result = {};
            snapshot.forEach(doc => {
              result[doc.id] = doc.data();
            });
            res(result);
          }
        })
        .catch(err => {
          rej(err);
        });
    });

  }
}