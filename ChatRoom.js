function ChatRoom({ user }) {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');

  // Messages fetch karna
  useEffect(() => {
    const query = db.collection('messages').orderBy('createdAt').limit(25);
    const unsubscribe = query.onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setMessages(data);
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = user;

    await db.collection('messages').add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
  };

  return (
    <div className="chat-container">
      <main>
        {messages && messages.map(msg => (
          <div key={msg.id} className={`message ${msg.uid === user.uid ? 'sent' : 'received'}`}>
            <img src={msg.photoURL} alt="user" style={{width: '30px', borderRadius: '50%'}} />
            <p>{msg.text}</p>
          </div>
        ))}
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" />
        <button type="submit">Send</button>
      </form>
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
}
