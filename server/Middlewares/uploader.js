const serviceAccount = require("../Keys/dailyneedsapp-36b13-firebase-adminsdk-99kne-0f145a1bb8.json");
const firestoreAdmin = require("firebase-admin");
const multer = require("multer");
firestoreAdmin.initializeApp({
  credential: firestoreAdmin.credential.cert(serviceAccount),
});
const firestore = firestoreAdmin.firestore();

exports.upload = multer({ storage: multer.memoryStorage() });

exports.bucket = firestoreAdmin
  .storage()
  .bucket("gs://dailyneedsapp-36b13.appspot.com");
