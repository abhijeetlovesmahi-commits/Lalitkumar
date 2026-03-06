import React, { useState, useEffect, useRef } from 'react';
// Firebase imports yahan pehle se honge...

function ChatRoom({ user }) {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');
  const [loading, setLoading] = useState(false); // Uploading indicator
  const dummy = useRef(); // Auto-scroll ke liye

  // 1. Messages Fetch Logic (Pehle wala hi)
  useEffect(() => {
    const query = db.collection('messages').orderBy('createdAt').limit(50);
    const unsubscribe = query.onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      dummy.current.scrollIntoView({ behavior: 'smooth' }); // Naya message aane par scroll karega
    });
    return unsubscribe;
  }, []);

  // 2. Image Upload Function (Cloudinary)
  const uploadToCloudinary = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_PRESET_NAME"); // Yahan apna Preset Name likhein
    formData.append("cloud_name", "YOUR_CLOUD_NAME"); // Yahan apna Cloud Name likhein

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setLoading(false);
      return data.secure_url;
    } catch (err) {
      console.error("Upload failed", err);
      setLoading(false);
      return null;
    }
  };

  // 3. Message Send Function
  const sendMessage = async (e, imageUrl = null) => {
    if (e) e.preventDefault();
    if (!formValue && !imageUrl) return;

    await db.collection('messages').add({
      text: formValue,
      imageUrl: imageUrl, // Agar image hai toh URL save hoga
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName
    });

    setFormValue('');
  };

  // 4. File Input Change Handler
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        sendMessage(null, url); // Image URL ke saath message bhej do
      }
    }
  };

  return (
    <div className="chat-container">
      <header>
        <span>WhatsApp Clone</span>
        <button onClick={() => auth.signOut()}>Logout</button>
      </header>

      <main>
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.uid === user.uid ? 'sent' : 'received'}`}>
            <div className="bubble">
              {msg.imageUrl && <img src={msg.imageUrl} alt="sent-file" className="chat-img" />}
              {msg.text && <p>{msg.text}</p>}
            </div>
          </div>
        ))}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={(e) => sendMessage(e)}>
        {/* Hidden File Input */}
        <label htmlFor="file-input" style={{cursor: 'pointer', fontSize: '20px', padding: '10px'}}>
          📷
        </label>
        <input 
          id="file-input" 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          style={{display: 'none'}} 
        />

        <input 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)} 
          placeholder={loading ? "Uploading..." : "Type a message"} 
          disabled={loading}
        />
        <button type="submit" disabled={!formValue && !loading}>Send</button>
      </form>
    </div>
  );
}
