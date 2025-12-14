import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs
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

// 👮 CHANGE THIS TO YOUR ADMIN EMAIL
const ADMIN_EMAIL = "esejjeph@gmail.com";

// Protect admin page
onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== ADMIN_EMAIL) {
    alert("Access denied");
    window.location.href = "index.html";
  } else {
    loadUsers();
  }
});

// Load users into table
async function loadUsers() {
  const snapshot = await getDocs(collection(db, "users"));
  const table = document.getElementById("userTable");

  snapshot.forEach((doc) => {
    const u = doc.data();
    const row = `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.loginMethod}</td>
        <td>${u.lastLogin.toDate().toLocaleString()}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}