// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const initApp = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCHmmvGRY1W9OiceCrDeUfhl2mqWQO5aDg",
    authDomain: "orangenotes-f385e.firebaseapp.com",
    projectId: "orangenotes-f385e",
    storageBucket: "orangenotes-f385e.appspot.com",
    messagingSenderId: "727164633964",
    appId: "1:727164633964:web:6417f35686144f6c746949",
    measurementId: "G-K0FDXJC440"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
}
