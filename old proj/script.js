import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

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

window.login = () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => document.getElementById("authMessage").innerText = err.message);
};

window.signup = () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => document.getElementById("authMessage").innerText = err.message);
};

// Typewriter
const text = "Rhythm of India";
const el = document.getElementById("typewriter");
let idx = 0, dir = 1;

function tick() {
  if (!el) return;
  el.textContent = text.substring(0, idx);
  if (dir === 1) {
    if (idx < text.length) idx++;
    else { dir = -1; return setTimeout(tick, 1200); }
  } else {
    if (idx > 0) idx--;
    else { dir = 1; return setTimeout(tick, 800); }
  }
  setTimeout(tick, dir === 1 ? 130 : 65);
}
document.addEventListener("DOMContentLoaded", tick);

// Toggle forms
document.getElementById("showLogin").onclick = () => {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
};
document.getElementById("showSignup").onclick = () => {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
};
