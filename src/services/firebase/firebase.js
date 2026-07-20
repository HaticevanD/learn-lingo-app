import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCLgwe3sESojfs6RHIMpRHMIOzjts8BFIg",
  authDomain: "learn-lingo-app-7a61a.firebaseapp.com",
  databaseURL:
    "https://learn-lingo-app-7a61a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learn-lingo-app-7a61a",
  storageBucket: "learn-lingo-app-7a61a.firebasestorage.app",
  messagingSenderId: "841384095934",
  appId: "1:841384095934:web:107936466bf3e2ba452eef",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
