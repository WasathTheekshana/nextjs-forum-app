import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIQT2x6LKpTOVmXodWCGAlje8cJowyqss",
  authDomain: "nextjs-forum-ceafa.firebaseapp.com",
  projectId: "nextjs-forum-ceafa",
  storageBucket: "nextjs-forum-ceafa.appspot.com",
  messagingSenderId: "1054629609358",
  appId: "1:1054629609358:web:8ba10133254ea1a55b2edf",
  measurementId: "G-WJGS0ZKX9X",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
