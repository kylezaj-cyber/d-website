import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCpZdAfOVYZWw-e_MUtmT0pPOBMcM-psU8",
  authDomain: "operation-slap-kyle.firebaseapp.com",
  projectId: "operation-slap-kyle",
  storageBucket: "operation-slap-kyle.firebasestorage.app",
  messagingSenderId: "818173177124",
  appId: "1:818173177124:web:f50d770c807dfae7a7d7b1",
  measurementId: "G-Y9XGFE8XC5"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const formTitle = document.getElementById("formTitle");
const toggleForm = document.getElementById("toggleForm");
const messageDiv = document.getElementById("message");

// Function to show messages
function showMessage(type, text) {
  messageDiv.className = type;
  messageDiv.textContent = text;
  setTimeout(() => {
    messageDiv.textContent = "";
    messageDiv.className = "";
  }, 5000); // Clear after 5 seconds
}

// Toggle between login and signup
toggleForm.onclick = (e) => {
  e.preventDefault();
  messageDiv.textContent = "";
  messageDiv.className = "";
  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    formTitle.textContent = "Login";
    toggleForm.textContent = "Don't have an account? Sign up";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    formTitle.textContent = "Sign Up";
    toggleForm.textContent = "Already have an account? Log in";
  }
};

// Email/Password Signup
document.getElementById("signupBtn").onclick = async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user log
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      loginMethod: "Email",
      lastLogin: new Date()
    });

    showMessage("success", "Account created successfully!");
  } catch (error) {
    showMessage("error", error.message);
  }
};

// Email/Password Login
document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login
    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: new Date()
    });

    showMessage("success", "Logged in successfully!");
  } catch (error) {
    showMessage("error", error.message);
  }
};