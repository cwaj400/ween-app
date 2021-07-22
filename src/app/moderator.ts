import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.addAdmin = functions.https.onCall((data, context) => {
  // @ts-ignore
  if (!context.auth.token.moderator) {
    return {
      error: 'Request not authorized'
    };
  }
  const email = data.email;
  return grantModeratorRole(email).then(() => {
    return {
      result: `Request fulfilled. ${email} is now a moderator.`
    };
  });
});

async function grantModeratorRole(email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).moderator === true) {
    return;
  }

  return admin.auth().setCustomUserClaims(user.uid, {
    moderator: true
  });
}
