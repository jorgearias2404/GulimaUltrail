import React, { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { database } from "../../firebaseConfig";

const CARRERA_PASSWORD = "#GUX_84562197**/";

export function CarreraBotones({
  personas,
  setPersonas,
  clubs,
  setClubs,
  updateFirebaseData,
}) {
  const [carreraState, setCarreraState] = useState({
    activo6k: false,
    horaActivacion6k: null,
    activo11k: false,
    horaActivacion11k: null,
    activo21k: false,
    horaActivacion21k: null,
    activo45k: false,
    horaActivacion45k: null,
  });

  // Cargar el estado desde Firebase al inicializar
  useEffect(() => {
    const estadoRef = ref(database, "carreraEstado");
    const unsubscribe = onValue(estadoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCarreraState({
          activo6k: data.activo6k || false,
          horaActivacion6k: data.horaActivacion6k || null,
          activo11k: data.activo11k || false,
          horaActivacion11k: data.horaActivacion11k || null,
          activo21k: data.activo21k || false,
          horaActivacion21k: data.horaActivacion21k || null,
          activo45k: data.activo45k || false,
          horaActivacion45k: data.horaActivacion45k || null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Función para actualizar el estado en Firebase
  const updateCarreraState = (newState) => {
    set(ref(database, "carreraEstado"), newState);
    setCarreraState(newState);
  };

  // Formatear hora actual como HH:MM:SS
  const formatTime = (date) => {
    const horas = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");
    const segundos = date.getSeconds().toString().padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };

  // Calcular diferencia entre dos horas (HH:MM:SS)
  const calcularTiempo = (horaSalida, horaLlegada) => {
    try {
      const [hSalida, mSalida, sSalida] = horaSalida.split(":").map(Number);
      const [hLlegada, mLlegada, sLlegada] = horaLlegada.split(":").map(Number);

      let segundosTotales =
        hLlegada * 3600 +
        mLlegada * 60 +
        sLlegada -
        (hSalida * 3600 + mSalida * 60 + sSalida);

      // Manejar caso cuando pasa la medianoche
      if (segundosTotales < 0) segundosTotales += 24 * 3600;

      const horas = Math.floor(segundosTotales / 3600);
      const minutos = Math.floor((segundosTotales % 3600) / 60);
      const segundos = segundosTotales % 60;

      return `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    } catch {
      return "00:00:00";
    }
  };

  // Actualizar hora de salida de TODOS los corredores de una distancia
  const actualizarHoraSalida = (distancia, hora) => {
    const nuevasPersonas = personas.map((persona) => {
      const baseProps = {
        ...persona,
        llegada: persona.llegada || null,
        tiempo: persona.tiempo || null,
      };

      if (persona.distancia === distancia) {
        return {
          ...baseProps,
          salida: hora || null,
          llegada: hora ? persona.llegada : null,
          tiempo: hora ? persona.tiempo : null,
        };
      }
      return baseProps;
    });

    // Sanitizar datos para Firebase (opcional pero recomendado)
    const sanitizedPersonas = JSON.parse(JSON.stringify(nuevasPersonas));
    setPersonas(sanitizedPersonas);
    updateFirebaseData("corredoresData", sanitizedPersonas);

    // Actualizar clubs (sanitized también)
    const nuevosClubs = clubs.map((club) => ({
      ...club,
      miembros:
        club.miembros?.map((miembro) => ({
          ...miembro,
          salida: miembro.salida || null,
          llegada: miembro.llegada || null,
          tiempo: miembro.tiempo || null,
        })) || [],
    }));

    const sanitizedClubs = JSON.parse(JSON.stringify(nuevosClubs));
    setClubs(sanitizedClubs);
    updateFirebaseData("clubesData", sanitizedClubs);
  };
  // Manejador para los botones de carrera (iniciar/reiniciar)
  const handleCarreraClick = (distancia) => {
    const carreraKey = distancia.toLowerCase() + "k";
    const activoKey = `activo${carreraKey}`;
    const horaKey = `horaActivacion${carreraKey}`;

    if (!carreraState[activoKey]) {
      // INICIAR CARRERA - Asignar hora de salida a todos los corredores de esta distancia
      const now = new Date();
      const hora = formatTime(now);

      const newState = {
        ...carreraState,
        [activoKey]: true,
        [horaKey]: hora,
      };

      updateCarreraState(newState);
      actualizarHoraSalida(carreraKey, hora);
    } else {
      // REINICIAR CARRERA - Solo con contraseña
      if (
        window.confirm(`¿Está seguro de reiniciar la carrera ${distancia}K?`)
      ) {
        const password = prompt("Ingrese la contraseña:");
        if (password === CARRERA_PASSWORD) {
          const newState = {
            ...carreraState,
            [activoKey]: false,
            [horaKey]: null,
          };

          updateCarreraState(newState);
          actualizarHoraSalida(carreraKey, null);
        }
      }
    }
  };

  return (
    <div className="carrera-btns-container">
      {["6", "11", "21", "45"].map((distancia) => {
        const activoKey = `activo${distancia}k`;
        const horaKey = `horaActivacion${distancia}k`;
        const activo = carreraState[activoKey];
        const hora = carreraState[horaKey];

        return (
          <div key={distancia} className="btn-container">
            <button
              className={`carrera-button ${
                activo ? "btn-activo" : "btn-inactivo"
              }`}
              onClick={() => handleCarreraClick(distancia)}>
              {activo ? (
                <svg
                  className="paragraph-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" />
                </svg>
              ) : (
                <svg
                  className="paragraph-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512">
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
              )}
              <p className="bold">SALIDA {distancia}K</p>
            </button>
            {activo && (
              <div>
                <p className="paragraph-div">
                  <svg
                    className="paragraph-svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0.96875C4.78854 0.96875 0.96875 4.78854 0.96875 9.5C0.96875 14.2115 4.78854 18.0312 9.5 18.0312C14.2115 18.0312 18.0312 14.2115 18.0312 9.5C18.0312 4.78854 14.2115 0.96875 9.5 0.96875ZM13.4375 10.8125H9.5C9.32595 10.8125 9.15903 10.7434 9.03596 10.6203C8.91289 10.4972 8.84375 10.3303 8.84375 10.1562V4.25C8.84375 4.07595 8.91289 3.90903 9.03596 3.78596C9.15903 3.66289 9.32595 3.59375 9.5 3.59375C9.67405 3.59375 9.84097 3.66289 9.96404 3.78596C10.0871 3.90903 10.1562 4.07595 10.1562 4.25V9.5H13.4375C13.6115 9.5 13.7785 9.56914 13.9015 9.69221C14.0246 9.81528 14.0938 9.9822 14.0938 10.1562C14.0938 10.3303 14.0246 10.4972 13.9015 10.6203C13.7785 10.7434 13.6115 10.8125 13.4375 10.8125Z" />
                  </svg>
                  {hora}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CarreraBotones;
