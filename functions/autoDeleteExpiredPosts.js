const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Assuming we've already initialized the Firebase
if (!admin.apps.length) {
    admin.initializeApp();
}

const firestore = admin.firestore();

exports.removeExpiredDocuments = functions.pubsub.schedule("every 1 hours").onRun(async (context) => {
    const now = firestore.Timestamp.now();
    const ts = firestore.Timestamp.fromMillis(now.toMillis() - 86400000); // 24 hours in milliseconds = 86400000

    const expiredPostsSnap = await firestore.collection("posts").where("timestamp", "<", ts).get();
// 
    const promises = expiredPostsSnap.docs.map(async (docSnap) => {
        // Delete the post
        await docSnap.ref.delete();

        // Delete associated comments with this post
        const expiredCommentsSnap = await firestore.collection("comments").where("postId", "==", docSnap.id).get();
        const commentDeletionPromises = expiredCommentsSnap.docs.map(commentSnap => commentSnap.ref.delete());
        
        return Promise.all(commentDeletionPromises);
    });

    return Promise.all(promises);
});
