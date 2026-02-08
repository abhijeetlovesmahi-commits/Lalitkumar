/* 1. NEWS ROTATION (Aapka Purana Code) */
const news = [
  "✦ Admissions Open 2026–27 ✦",
  "✦ International Curriculum ✦",
  "✦ Elite Faculty & Infrastructure ✦",
  "✦ Legacy of Excellence ✦"
];

let i = 0;
const newsBox = document.getElementById("newsText");

// Ye check karne ke liye ki newsBox screen par hai ya nahi
if (newsBox) {
  setInterval(() => {
    i = (i + 1) % news.length;
    newsBox.innerText = news[i];
  }, 3500);
}

/* 2. FIREBASE CONFIGURATION (Aapka Data) */
const firebaseConfig = {
  apiKey: "AIzaSyADzG1BL5PkDvEFDrqopdDY2BNl6jycDkQ",
  authDomain: "school-management-system-d210c.firebaseapp.com",
  projectId: "school-management-system-d210c",
  storageBucket: "school-management-system-d210c.firebasestorage.app",
  messagingSenderId: "78104585527",
  appId: "1:78104585527:web:9e25193d63f4d4fd1fe6b2"
};

// Firebase ko chalu karein
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* 3. STUDENT DATA SAVE FUNCTION */
function saveData() {
    const name = document.getElementById('stuName').value;
    const sClass = document.getElementById('stuClass').value;
    const roll = document.getElementById('stuRoll').value;

    if(name == "" || sClass == "" || roll == "") {
        alert("Saari jankari bhariye!");
        return;
    }

    db.collection("students").add({
        studentName: name,
        class: sClass,
        rollNo: roll,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Student Added Successfully! ✅");
        // Form ko khali karne ke liye
        document.getElementById('stuName').value = "";
        document.getElementById('stuClass').value = "";
        document.getElementById('stuRoll').value = "";
    })
    .catch((error) => {
        console.error("Error: ", error);
        alert("Kuch error aaya hai!");
    });
}
