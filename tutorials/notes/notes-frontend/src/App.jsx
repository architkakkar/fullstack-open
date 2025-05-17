import { useEffect, useState } from "react";

import LoginView from "./components/LoginView";
import NoteView from "./components/NoteView";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

import noteService from "./services/notes";

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const onLogin = (user, status) => {
    if (status === "success") {
      setUser(user);
      noteService.setToken(user.token);
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
    } else {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const onLogout = () => {
    setUser(null);
    noteService.setToken(null);
    window.localStorage.removeItem("loggedNoteAppUser");
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Notes</h1>
        {user !== null && (
          <button type="button" onClick={onLogout}>
            logout
          </button>
        )}
      </header>
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
