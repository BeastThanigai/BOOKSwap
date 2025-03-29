// Import Firebase modules
/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1wF844Xeur0bEDQfZdoydiNbcLdlStOU",
    authDomain: "bookexc.firebaseapp.com",
    databaseURL: "https://bookexc-default-rtdb.firebaseio.com",
    projectId: "bookexc",
    storageBucket: "bookexc.appspot.com",
    messagingSenderId: "688636268839",
    appId: "1:688636268839:web:abe81b13bc8bfa8ab01902",
    measurementId: "G-8TZ99T5M1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
const registerForm = document.querySelector('.form-box.register form');
// Registration Form Checkbox Validation
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = registerForm.querySelector('input[name="username"]').value.trim(); // Add username field
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    const agreeTerms = registerForm.querySelector('input[type="checkbox"]').checked;

    if (!agreeTerms) {
        alert("You must agree to the terms and conditions.");
        return; // Stop further execution
    }

    // Firebase Register Function
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User registered:", user);
            alert("Registration successful!");
            wrapper.classList.remove('active'); // Redirect to login
            registerForm.reset();
        })
        .catch((error) => {
            console.error("Error registering user:", error.message);
            alert(error.message);
        });
});
})



const loginForm = document.querySelector('.form-box.login form');
// Login with Remember Me
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    const rememberMe = loginForm.querySelector('input[type="checkbox"]').checked;

    loadingScreen.style.display = 'flex';

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);
           // alert("Login successful!");

            // Save to localStorage if Remember Me is checked
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
                localStorage.setItem('rememberedPassword', password);
            } else {
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
            }
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = "db2.html"; // Replace with your dashboard page URL
            }, 2000);
            loginForm.reset();
            
        })
        .catch((error) => {
            console.error("Error logging in user:", error.message);
            alert(error.message);

            loadingScreen.style.display = 'none';
        });
});

// Pre-fill login fields if remembered
document.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');

    if (rememberedEmail && rememberedPassword) {
        loginForm.querySelector('input[type="email"]').value = rememberedEmail;
        loginForm.querySelector('input[type="password"]').value = rememberedPassword;
        loginForm.querySelector('input[type="checkbox"]').checked = true;
    }
});



const forgotForm = document.querySelector('.form-box.forgot form');
forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = forgotForm.querySelector('input[type="email"]').value;

    // Firebase Forgot Password Function
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!");
            forgotFormWrapper.classList.remove('active-forgot'); // Go to Login
        })
        .catch((error) => {
            console.error("Error sending password reset email:", error.message);
            alert(error.message);
        });
});

// Toggle Password Visibility
document.querySelectorAll('.input-box .icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        const passwordField = e.target.closest('.input-box').querySelector('input[type="password"], input[type="text"]');
        if (passwordField.type === "password") {
            passwordField.type = "text";
            e.target.setAttribute('name', 'eye-off'); // Change icon to "eye-off"
        } else {
            passwordField.type = "password";
            e.target.setAttribute('name', 'eye'); // Change icon to "eye"
        }
    });
});
*/


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyD1wF844Xeur0bEDQfZdoydiNbcLdlStOU",
    authDomain: "bookexc.firebaseapp.com",
    databaseURL: "https://bookexc-default-rtdb.firebaseio.com",
    projectId: "bookexc",
    storageBucket: "bookexc.appspot.com",
    messagingSenderId: "688636268839",
    appId: "1:688636268839:web:abe81b13bc8bfa8ab01902",
    measurementId: "G-8TZ99T5M1L"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


// Registration Form Submission
document.addEventListener('DOMContentLoaded', () => {
const registerForm = document.querySelector('.form-box.register form');
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = registerForm.username.value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;
  const agreeTerms = registerForm.querySelector('input[type="checkbox"]').checked;

  if (!agreeTerms) {
      alert("You must agree to the terms and conditions.");
      return; // Stop further execution
  }

  // Create a new user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid; // Firebase generates a unique user ID
    
      // Store username and userId in Firebase Realtime Database
      set(ref(database, `users/${userId}`), {
        username: username,
        userId: userId,
        email: email
      }).then(() => {
        alert('Registration successful!');
        wrapper.classList.remove('active'); // Redirect to login
        registerForm.reset();
        loginForm.reset();
      }).catch((error) => {
        console.error('Error storing user data:', error);
        alert('Failed to store user data.');
      });
    })
    .catch((error) => {
      console.error('Error during registration:', error);
      alert(error.message);
    });
});
});


// Login Form Submission
const loginForm = document.querySelector('.form-box.login form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;
  const rememberMe = loginForm.querySelector('input[type="checkbox"]').checked;

  loadingScreen.style.display = 'flex';

  // Sign in user
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      const dbRef = ref(database);
      get(child(dbRef, `profiles/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            loadingScreen.querySelector('p').textContent = `Welcome, ${userData.username}!`;
            setTimeout(() => {
              loadingScreen.style.display = 'none';
              window.location.href = `db2.html?userid=${userId}`;
            }, 2000);
            loginForm.reset();
          } else {
            // Redirect to create profile page if no profile found
            window.location.href = `createProfile.html?userid=${userId}`;
          }
        })
        .catch((error) => {
          console.error('Error retrieving profile data:', error);
          alert('Failed to retrieve profile data.');
        });
    })
    .catch((error) => {
      console.error('Error during login:', error);
      alert(error.message);
      loadingScreen.style.display = 'none';
    });
});


// Pre-fill login fields if remembered
document.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');

    if (rememberedEmail && rememberedPassword) {
        loginForm.querySelector('input[type="email"]').value = rememberedEmail;
        loginForm.querySelector('input[type="password"]').value = rememberedPassword;
        loginForm.querySelector('input[type="checkbox"]').checked = true;
    }
});



const forgotForm = document.querySelector('.form-box.forgot form');
forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = forgotForm.querySelector('input[type="email"]').value;

    // Firebase Forgot Password Function
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!");
            forgotFormWrapper.classList.remove('active-forgot'); // Go to Login
            loginForm.reset();
            forgotForm.reset();
        })
        .catch((error) => {
            console.error("Error sending password reset email:", error.message);
            alert(error.message);
        });
});

// Toggle Password Visibility
document.querySelectorAll('.input-box .icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        // Get the parent input box and find the password field within it
        const inputBox = e.target.closest('.input-box');
        if (inputBox) {
            const passwordField = inputBox.querySelector('input[type="password"], input[type="text"]');
            
            // Check if the password field exists
            if (passwordField) {
                if (passwordField.type === "password") {
                    passwordField.type = "text"; // Show password
                    e.target.setAttribute('name', 'eye-off'); // Change icon to "eye-off"
                } else {
                    passwordField.type = "password"; // Hide password
                    e.target.setAttribute('name', 'eye'); // Change icon to "eye"
                }
            } else {
                console.warn("Password field not found in the input box.");
            }
        } else {
            console.warn("Input box not found for the clicked icon.");
        }
    });
});
