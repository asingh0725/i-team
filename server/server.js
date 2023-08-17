let serviceAccount = require('./serviceAccountKey.json');

const express = require('express');
const cron = require('node-cron');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://share-a-bite-815b4.firebaseio.com"
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000;

async function deleteOldPosts() {
    const oneDayAgo = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
   
    // Fetch posts older than 24 hours
    const oldPostsQuery = db.collection('posts').where('timestamp', '<', oneDayAgo);

    const oldPostsSnapshot = await oldPostsQuery.get();

    // If there are no old posts, exit the function
    if (oldPostsSnapshot.empty) {
        console.log('No old posts to delete.');
        return;
    }

    // Loop through the old posts and delete them
    const batch = db.batch();
    oldPostsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Deleted ${oldPostsSnapshot.size} old posts.`);
}

// Schedule the cron job
cron.schedule('* * * * *', function() {
    console.log('Running the deleteOldPosts task every minite');
    deleteOldPosts().then(() => {
        console.log("Operation completed.");
    }).catch(error => {
        console.error("Error deleting old posts:", error);
    });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
