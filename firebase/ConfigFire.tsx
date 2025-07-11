import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { apiKeyFire, authDomainFire, databaseURLFire, projectIdFire, storageBucketFire, messagingSenderIdFire, appIdfire } from "../secrets/CredencialesFire";

const firebaseConfig = {
  apiKey: apiKeyFire,
  authDomain: authDomainFire,
  databaseURL: databaseURLFire,
  projectId: projectIdFire,
  storageBucket: storageBucketFire,
  messagingSenderId: messagingSenderIdFire,
  appId: appIdfire
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
