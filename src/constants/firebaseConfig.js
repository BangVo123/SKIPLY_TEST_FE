import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyiqZBUu9m2Fiqb9ABTbroZv8JKYbR8ms",
  authDomain: "test-f89ff.firebaseapp.com",
  projectId: "test-f89ff",
  storageBucket: "test-f89ff.firebasestorage.app",
  messagingSenderId: "768644652832",
  appId: "1:768644652832:web:9ea3b9b03dfb1193d00145",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const githubProvider = new GithubAuthProvider();

export { auth, githubProvider };
