import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ===============================
// FIREBASE CONFIGURATION
// Replace these values with your own Firebase config
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyABBmSdzxZuwRnExZur0XdQWmA8713z3YA",
    authDomain: "nishanth-portfolio-65dac.firebaseapp.com",
    projectId: "nishanth-portfolio-65dac",
    storageBucket: "nishanth-portfolio-65dac.firebasestorage.app",
    messagingSenderId: "1061463687876",
    appId: "1:1061463687876:web:1b59613878f50599dcff91",
    measurementId: "G-RK78LF47JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===============================
// HTML ELEMENTS
// ===============================

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");
const emailError = document.getElementById("emailError");

// ===============================
// EMAIL VALIDATION
// ===============================

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// ===============================
// FORM SUBMIT
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    emailError.textContent = "";
    statusMessage.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !subject || !message) {
        statusMessage.style.color = "red";
        statusMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!validateEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {

        await addDoc(collection(db, "contacts"), {
            name,
            email,
            subject,
            message,
            createdAt: serverTimestamp()
        });

        statusMessage.style.color = "green";
        statusMessage.textContent = "Message sent successfully!";

        form.reset();

    } catch (error) {

        console.error(error);

        statusMessage.style.color = "red";
        statusMessage.textContent = "Failed to send message.";

    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";

});
