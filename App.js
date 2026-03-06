import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Aapka Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDqDmsMp2eAuHJBcjW-ciO2JcLTXapiIrs",
  authDomain: "the-lalit-d7472.firebaseapp.com",
  projectId: "the-lalit-d7472",
  storageBucket: "the-lalit-d7472.firebasestorage.app",
  messagingSenderId: "479237084229",
  appId: "1:479237084229:web:31078825739b3c5712ff2c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="App">
      {user ? (
        <ChatRoom user={user} />
      ) : (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
          <h2>WhatsApp Clone</h2>
          <button onClick={signInWithGoogle}>Login with Google</button>
        </div>
      )}
    </div>
  );
}

export default App;
