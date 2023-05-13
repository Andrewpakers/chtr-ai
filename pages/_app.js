import '../styles/globals.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHS_X7Q1rULMSCbM4cfnEW2PAHHfbXxqo",
  authDomain: "chtr-ai.firebaseapp.com",
  projectId: "chtr-ai",
  storageBucket: "chtr-ai.appspot.com",
  messagingSenderId: "278233786948",
  appId: "1:278233786948:web:58e13b66dfba0783d9aa11",
  measurementId: "G-499B3ET4X6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {
  return (
    <div className="px-3">
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <Component {...pageProps} />
    </div>
  );
}