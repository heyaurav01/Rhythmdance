import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9jqARZuhC06TJdWIlDNHhwkjZVcJP25I",
  authDomain: "rythymesd.firebaseapp.com",
  projectId: "rythymesd",
  storageBucket: "rythymesd.firebasestorage.app",
  messagingSenderId: "81818607086",
  appId: "1:81818607086:web:89f0544492a762163502ff",
  measurementId: "G-TLBL9MND7T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "index.html";
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});