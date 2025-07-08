import "./Login.css";
import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "#GUX_84562197**/";

function Login({ onUserTypeSelect }) {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [error, setError] = useState(null);

  const handleAdminClick = () => {
    setShowPasswordPrompt(true);
    setError(null); // Resetear error al intentar nuevamente
  };

  const handlePasswordSubmit = () => {
    try {
      const password = prompt("Ingrese la contraseña de administrador:");

      if (password === null) {
        // Usuario canceló el prompt
        return;
      }

      if (password === ADMIN_PASSWORD) {
        onUserTypeSelect("admin");
      } else {
        throw new Error("Contraseña incorrecta");
      }
    } catch (err) {
      setError(err.message);
      alert(err.message);
    } finally {
      setShowPasswordPrompt(false);
    }
  };

  useEffect(() => {
    if (showPasswordPrompt) {
      handlePasswordSubmit();
    }
  }, [showPasswordPrompt]);

  const handleCorredorClick = () => {
    try {
      onUserTypeSelect("corredor");
    } catch (err) {
      setError("Error al seleccionar modo corredor");
      console.error(err);
    }
  };

  return (
    <div className="Login">
      <h1 className="title underline">GULIMA ULTRAIL 2025</h1>
      <div className="Login__container">
        <h3 className="subtitle">Ingresar como:</h3>
        {error && <div className="Login__error">{error}</div>}
        <form className="Login__form">
          {/* BOTON ADMINISTRADOR */}
          <button
            className="button bold"
            type="button"
            onClick={handleAdminClick}>
            <svg
              className="paragraph-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512">
              <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
            </svg>
            ADMIN
          </button>

          {/* BOTON CORREDOR */}
          <button
            className="button bold"
            type="button"
            onClick={handleCorredorClick}>
            <svg
              className="paragraph-svg"
              width="19"
              height="22"
              viewBox="0 0 19 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2857 2.0625C14.2857 1.51549 14.0599 0.990886 13.6581 0.604092C13.2562 0.217298 12.7112 0 12.1429 0C11.5745 0 11.0295 0.217298 10.6276 0.604092C10.2258 0.990886 10 1.51549 10 2.0625C10 2.60951 10.2258 3.13411 10.6276 3.52091C11.0295 3.9077 11.5745 4.125 12.1429 4.125C12.7112 4.125 13.2562 3.9077 13.6581 3.52091C14.0599 3.13411 14.2857 2.60951 14.2857 2.0625ZM5.61161 7.54102C6.05357 7.11562 6.65625 6.875 7.28571 6.875C7.37054 6.875 7.45536 6.8793 7.53571 6.88789L6.14286 10.9141C5.72768 12.1172 6.21875 13.4406 7.33929 14.1152L11.1875 16.4312L10.0536 20.2469C9.83482 20.9773 10.2768 21.7379 11.0357 21.9484C11.7946 22.159 12.5848 21.7336 12.8036 21.0031L14.0848 16.6891C14.3482 15.8039 13.9688 14.8586 13.1607 14.373L10.625 12.8477L12.0045 9.30703L12.2321 9.83555C12.9018 11.3738 14.4598 12.375 16.192 12.375H17.1429C17.933 12.375 18.5714 11.7605 18.5714 11C18.5714 10.2395 17.933 9.625 17.1429 9.625H16.192C15.6161 9.625 15.0938 9.28984 14.875 8.77851L14.5938 8.13398C13.942 6.62578 12.625 5.47422 11 4.99297L8.82589 4.34844C8.33036 4.20234 7.8125 4.125 7.29018 4.125C5.90625 4.125 4.57589 4.65352 3.59821 5.59883L2.5625 6.59141C2.00446 7.12851 2.00446 8.00078 2.5625 8.53789C3.12054 9.075 4.02679 9.075 4.58482 8.53789L5.61607 7.54531L5.61161 7.54102ZM4.07143 15.125H1.42857C0.638393 15.125 0 15.7395 0 16.5C0 17.2605 0.638393 17.875 1.42857 17.875H4.53571C5.38393 17.875 6.15179 17.3937 6.49554 16.6504L7.00893 15.5375L6.58482 15.2797C5.80357 14.8113 5.22321 14.1281 4.89286 13.3504L4.07143 15.125Z" />
            </svg>
            CORREDOR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
