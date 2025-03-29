

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getDatabase, ref, get, push, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

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
const db = getDatabase(app);
const auth = getAuth(app);


export function addNotification(userId, senderId, bookId, message) {
    const notificationsRef = ref(db, `notifications/${userId}`);
    const newNotification = push(notificationsRef);

    set(newNotification, {
        senderId: senderId,  // Sender's user ID
        bookId: bookId,      // Book ID for fetching image
        message: message,
        read: false,
        timestamp: Date.now()
    });
}


export function fetchNotifications(userId) {
    if (!userId) {
        console.error("User ID is missing while fetching notifications.");
        return;
    }

    const notificationRef = ref(db, `notifications/${userId}`);

    get(notificationRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const notifications = snapshot.val();
                console.log("Fetched notifications:", notifications);
                displayNotifications(userId, notifications); // Pass userId
            } else {
                console.log("No notifications found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching notifications:", error);
        });
}


function displayNotifications(userId, notifications) {
    const notificationContainer = document.getElementById("notificationList");
    notificationContainer.innerHTML = ""; // Clear previous notifications

    let unreadSection = document.createElement("div");
    let readSection = document.createElement("div");

    let unreadHeading = document.createElement("h3");
    unreadHeading.textContent = "Unread Notifications";
    unreadHeading.style.borderBottom = "2px solid #000";
    unreadHeading.style.paddingBottom = "5px";

    let readHeading = document.createElement("h3");
    readHeading.textContent = "Read Notifications";
    readHeading.style.borderBottom = "2px solid #aaa";
    readHeading.style.paddingBottom = "5px";
    readHeading.style.marginTop = "15px";

    unreadSection.appendChild(unreadHeading);
    readSection.appendChild(readHeading);

    Object.entries(notifications).forEach(([key, notification]) => {
        let listItem = document.createElement("div");
        listItem.style.display = "flex";
        listItem.style.alignItems = "center";
        listItem.style.padding = "10px";
        listItem.style.borderBottom = "1px solid #ddd";

        
        get(ref(db, `profiles/${notification.senderId}`)).then((profileSnap) => {
            let profilePicUrl = profileSnap.exists() ? profileSnap.val().profileImage : "default-profile.png";

            let profileImg = document.createElement("img");
            profileImg.src = profilePicUrl;
            profileImg.style.width = "40px";
            profileImg.style.height = "40px";
            profileImg.style.borderRadius = "50%";
            profileImg.style.marginRight = "10px";

            listItem.appendChild(profileImg);
        });

        
        let messageText = document.createElement("span");
        messageText.textContent = notification.message;
        if (!notification.read) {
            messageText.style.fontWeight = "bold"; // Highlight unread notifications
        }
        listItem.appendChild(messageText);

        // Fetch book image
        get(ref(db, `books/${notification.bookId}`)).then((bookSnap) => {
            let bookImgUrl = bookSnap.exists() ? bookSnap.val().image: "default-book.png";

            let bookImg = document.createElement("img");
            bookImg.src = bookImgUrl;
            bookImg.style.width = "50px";
            bookImg.style.height = "50px";
            bookImg.style.marginLeft = "auto";
            listItem.appendChild(bookImg);
        });

        
        listItem.onclick = function () {
            markAsRead(userId, key);
        };

        if (!notification.read) {
            unreadSection.appendChild(listItem);
        } else {
            readSection.appendChild(listItem);
        }
    });

    notificationContainer.appendChild(unreadSection);
    notificationContainer.appendChild(readSection);
}

// Function to mark a notification as read
function markAsRead(userId, notificationKey) {
    if (!userId || !notificationKey) {
        console.error("Missing userId or notificationKey while marking as read.");
        return;
    }

    const notificationRef = ref(db, `notifications/${userId}/${notificationKey}`);

    update(notificationRef, { read: true })
        .then(() => {
            console.log(`Notification ${notificationKey} marked as read.`);
            fetchNotifications(userId); // Refresh notifications
        })
        .catch((error) => {
            console.error("Error marking notification as read:", error);
        });
}

// Authentication listener to get logged-in user
onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchNotifications(user.uid);
    } else {
        alert("Please log in first.");
    }
});
