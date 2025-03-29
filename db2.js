import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1wF844Xeur0bEDQfZdoydiNbcLdlStOU",
  authDomain: "bookexc.firebaseapp.com",
  projectId: "bookexc",
  storageBucket: "bookexc.appspot.com",
  messagingSenderId: "688636268839",
  appId: "1:688636268839:web:abe81b13bc8bfa8ab01902",
  measurementId: "G-8TZ99T5M1L",
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userid"); 

if (userId) {
  
  const dbRef = ref(database);
  get(child(dbRef, `users/${userId}`)) 
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val(); // Retrieve user data
        const username = userData.username;
        const email = userData.email; 

        
     document.querySelector(".user-info h3").textContent = username;

        console.log("User Email:", email);

       
const profileRef = ref(database, `profiles/${userId}`);


onValue(profileRef, (snapshot) => {
    if (snapshot.exists()) {
        const userProfile = snapshot.val();
        let base64Image = userProfile.profileImage;
        if (base64Image && !base64Image.startsWith("data:image/")) {
            base64Image = `data:image/jpeg;base64,${base64Image}`;
        }
        const profilePic = document.querySelector("#profile img.user-pic");
        if (profilePic) profilePic.src = base64Image || "Images/pro2.jpg";

        const profileInfoPic = document.querySelector(".user-info img");
        if (profileInfoPic) profileInfoPic.src = base64Image || "Images/pro2.jpg";

        
    } else {
        console.warn("Profile not found for userId:", userId);
    }
});


        const links = document.querySelectorAll('a.menu-item');
        links.forEach((link) => {
          const href = link.getAttribute('href');
          if (href) {
            const newHref = `${href}?userid=${userId}`;
            link.setAttribute('href', newHref);
          }
          else {
            console.error("No user found with the given ID!");
            alert("No user found with the given ID!");
          }
        });
        
        

        const subMenuLinks = document.querySelectorAll('a.sub-menu-link');
        subMenuLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href) {
                const newHref = `${href}?userid=${userId}`;
                link.setAttribute('href', newHref);
            }
        });
      } else {
        console.error("No user found with the given ID!");
        alert("No user found with the given ID!");
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
} else {
  console.error("No userid found in the URL!");
  alert("User ID not found in the URL. Please log in again.");
}
