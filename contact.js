// ===============================
// SUPABASE CONFIGURATION
// ===============================

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

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

function validateEmail(email){

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

// ===============================
// FORM SUBMIT
// ===============================

form.addEventListener("submit", async function(e){

    e.preventDefault();

    emailError.textContent = "";
    statusMessage.textContent = "";
    statusMessage.style.color = "green";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Empty Validation

    if(name === "" || email === "" || subject === "" || message === ""){

        statusMessage.style.color = "red";
        statusMessage.textContent = "Please fill in all fields.";

        return;

    }

    // Email Validation

    if(!validateEmail(email)){

        emailError.textContent = "Please enter a valid email address.";

        return;

    }

    // Loading

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    // Insert into Supabase

    const { error } = await supabase
        .from("contacts")
        .insert([
            {
                name: name,
                email: email,
                subject: subject,
                message: message
            }
        ]);

    if(error){

        statusMessage.style.color = "red";
        statusMessage.textContent = "Failed to send message.";

        console.error(error);

    }
    else{

        statusMessage.style.color = "green";
        statusMessage.textContent = "Message sent successfully!";

        form.reset();

    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message";

});