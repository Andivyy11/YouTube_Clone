// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from 'firebase/auth'
 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "video-8cc5b.firebaseapp.com",
  projectId: "video-8cc5b",
  storageBucket: "video-8cc5b.appspot.com",
  messagingSenderId: process.env.REACT_APP_MSSG_ID,
  appId: process.env.REACT_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider(); 
export default app