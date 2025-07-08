import { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { database } from "./firebaseConfig";
import "./App.css";
import NavBar from "./components/NAVBAR/Navbar.jsx";
import Carrera from "./components/CARRERA/Carrera.jsx";
import Llegada from "./components/LLEGADA/Llegada.jsx";
import Puntaje from "./components/PUNTAJES/Puntaje.jsx";
import Corredores from "./components/CORREDORES/Corredores.jsx";
import Registro from "./components/REGISTRO/Registro.jsx";
import Login from "./components/UI/Login/Login.jsx";

function App() {
  const [personas, setPersonas] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [activeComponent, setActiveComponent] = useState("race");
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const personasRef = ref(database, 'corredoresData');
    const clubsRef = ref(database, 'clubesData');
    
    const unsubscribePersonas = onValue(personasRef, (snapshot) => {
      const data = snapshot.val();
      setPersonas(data || []);
    });
    
    const unsubscribeClubs = onValue(clubsRef, (snapshot) => {
      const data = snapshot.val();
      setClubs(data || []);
    });

    return () => {
      unsubscribePersonas();
      unsubscribeClubs();
    };
  }, []);

  const updateFirebaseData = (key, data) => {
    const sanitizedData = JSON.parse(JSON.stringify(data)); // Elimina undefined
    set(ref(database, key), sanitizedData);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "race":
        return (
          <Carrera
            personas={personas}
            setPersonas={setPersonas}
            clubs={clubs}
            setClubs={setClubs}
            updateFirebaseData={updateFirebaseData}
          />
        );
      case "arrival":
        return <Llegada personas={personas} />;
      case "points":
        return (
          <Puntaje 
            personas={personas} 
            clubs={clubs} 
            setClubs={setClubs}
            updateFirebaseData={updateFirebaseData}
          />
        );
      case "runners":
        return (
          <Corredores
            personas={personas}
            setPersonas={setPersonas}
            setClubs={setClubs}
            updateFirebaseData={updateFirebaseData}
          />
        );
      case "register":
        return (
          <Registro 
            personas={personas} 
            setPersonas={setPersonas}
            updateFirebaseData={updateFirebaseData}
          />
        );
      default:
        return <Carrera />;
    }
  };
  const handleUserTypeSelect = (type) => {
    setUserType(type || '');
  };

  return (
    
    <div className="body-main">
      {userType ==='' ? (
        <Login onUserTypeSelect={handleUserTypeSelect} />
      ) : userType === 'admin' ? (
        <>
          <NavBar
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
          {renderComponent()}
        </>
      ) : (
        <Llegada personas={personas} />
      )}
    </div>
  );
}

export default App;