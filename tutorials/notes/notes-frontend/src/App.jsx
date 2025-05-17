import { useState } from "react";

import LoginView from "./components/LoginView";
import NoteView from "./components/NoteView";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onLogin = (user, status) => {
    if (status === "success") {
      setUser(user);
    } else {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginView onLogin={onLogin} />
      ) : (
        <NoteView username={user?.name} setErrorMessage={setErrorMessage} />
      )}
      <Footer />
    </div>
  );
};

export default App;
