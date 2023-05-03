import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyPQPqp13xFyuP5Sw63Bmv5RVnQpNsXrw",
  authDomain: "major-project-2023-main.firebaseapp.com",
  projectId: "major-project-2023-main",
  storageBucket: "major-project-2023-main.appspot.com",
  messagingSenderId: "43031709573",
  appId: "1:43031709573:web:48567e19f9ca4b041d26ec",
  measurementId: "G-094RTDW9HW",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
