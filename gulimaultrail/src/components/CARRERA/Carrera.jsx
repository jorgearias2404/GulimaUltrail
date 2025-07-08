import "./Carrera.css";
import "../UI/TABLES/Tables.css";
import CarreraBotones from "./CarreraBotones.jsx";
import { useState } from "react";

function Carrera({ personas, setPersonas, clubs, setClubs, updateFirebaseData }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegisterArrival = () => {
    if (!searchTerm) return;
  
    const now = new Date();
    const horaActual = formatTime(now);
  
    setPersonas((prevPersonas) => {
      const updatedPersonas = prevPersonas.map((persona) => {
        if (persona.nro.toString() === searchTerm.trim() && persona.salida && !persona.llegada) {
          const tiempoTranscurrido = calcularTiempo(persona.salida, horaActual);
  
          return {
            ...persona,
            llegada: horaActual ||null,
            tiempo: tiempoTranscurrido || null,
          };
        }
        return persona;
      });
  
      // Actualizar directamente en Firebase
      updateFirebaseData('corredoresData', updatedPersonas);
  
      // Actualizar clubs con los nuevos datos
      const nuevosClubs = clubs.map((club) => {
        const miembrosActualizados = club.miembros?.map((miembro) => {
          const corredorActualizado = updatedPersonas.find(
            (p) => p.cedula === miembro.cedula && p.nro === miembro.nro
          );
          return corredorActualizado
            ? {
                ...miembro,
                llegada: corredorActualizado.llegada||null,
                tiempo: corredorActualizado.tiempo||null,
              }
            : miembro;
        });
        return {
          ...club,
          miembros: miembrosActualizados || [],
        };
      });
  
      updateFirebaseData('clubesData', nuevosClubs);
  
      return updatedPersonas;
    });
  
    setSearchTerm("");
  };

  const formatTime = (date) => {
    const horas = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");
    const segundos = date.getSeconds().toString().padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };

  const calcularTiempo = (horaSalida, horaLlegada) => {
    try {
      const [hSalida, mSalida, sSalida] = horaSalida.split(":").map(Number);
      const [hLlegada, mLlegada, sLlegada] = horaLlegada.split(":").map(Number);
  
      let segundosTotales =
        hLlegada * 3600 +
        mLlegada * 60 +
        sLlegada -
        (hSalida * 3600 + mSalida * 60 + sSalida);
  
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegisterArrival();
    }
  };
  return (
    <div className="body-carrera">
      <section className="header-container">
        <div className="salidas">
          <div className="title underline" style={{ marginBottom: "1.2rem" }}>
            ¡SALIDAS GULIMA ULTRAIL 2025!
          </div>
          <CarreraBotones
            personas={personas}
            setPersonas={setPersonas}
            clubs={clubs}
            setClubs={setClubs}
             updateFirebaseData={updateFirebaseData} 
          />
        </div>
        <div className="carrera-container">
          <div className="title underline" style={{ marginBottom: "1.5rem" }}>
            LLEGADAS
          </div>
          <div className="arrival-bar">
            <div className="bold">
              <span
                className="bolder"
                style={{ color: "var(--Orange-1000)", fontSize: "22px" }}>
                #
              </span>{" "}
              CORREDOR:
            </div>
            <div className="search-bar">
              <input
                id="arrival-input"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="# Corredor"
              />
              <button
                className="button mini-btn"
                onClick={handleRegisterArrival}>
                <svg
                  className="paragraph-svg"
                  width="22"
                  height="24"
                  viewBox="0 0 22 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.57143 0C2.44062 0 3.14286 0.670312 3.14286 1.5V2.25L6.53125 1.44375C8.40223 0.998437 10.3763 1.20469 12.1049 2.02969C14.3786 3.11719 17.0549 3.11719 19.3286 2.02969L19.8 1.80469C20.8116 1.31719 22 2.02031 22 3.09844V16.2094C22 16.8328 21.5924 17.3953 20.9786 17.6156L19.2746 18.225C17.0058 19.0359 14.4817 18.9094 12.3161 17.8781C10.4549 16.9875 8.32366 16.7672 6.30045 17.25L3.14286 18V22.5C3.14286 23.3297 2.44062 24 1.57143 24C0.702232 24 0 23.3297 0 22.5V18.75V15.6562V3V1.5C0 0.670312 0.702232 0 1.57143 0ZM3.14286 8.77031L6.28571 8.11875V11.1891L3.14286 11.8406V14.9062L5.53929 14.3344C5.78973 14.2734 6.03527 14.2219 6.28571 14.1797V11.1844L8.19598 10.7906C8.60357 10.7063 9.01607 10.6734 9.42857 10.6922V7.69219C10.0964 7.71094 10.7643 7.81406 11.4125 7.99219L12.5714 8.31562V11.4422L10.5237 10.8656C10.1652 10.7672 9.79688 10.7063 9.42857 10.6875V14.0344C10.4991 14.1234 11.5549 14.3484 12.5714 14.7094V11.4375L13.6862 11.7516C14.3491 11.9391 15.0268 12.0516 15.7143 12.0984V9.08906C15.3312 9.05156 14.9482 8.98125 14.575 8.87812L12.5714 8.31562V5.40938C11.933 5.23125 11.3045 4.99688 10.6955 4.70625C10.2929 4.51406 9.86562 4.37812 9.42857 4.29375V7.6875C8.79018 7.66875 8.15179 7.725 7.52812 7.85625L6.28571 8.11875V4.59375L3.14286 5.34375V8.77031ZM15.7143 15.7359C16.5393 15.8063 17.379 15.7031 18.1696 15.4172L18.8571 15.1734V11.8125L18.4692 11.8969C17.5656 12.0984 16.6375 12.1641 15.7143 12.1078V15.7359ZM18.8571 8.73281V5.41406C17.8308 5.7 16.775 5.84062 15.7143 5.84062V9.09375C16.3969 9.15938 17.0893 9.11719 17.7621 8.97187L18.8571 8.72812V8.73281Z"
                    fill="var(--White)"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="table-container" style={{ height: "70vh" }}>
        <table className="corredores-table" id="tableCarrera">
          <thead className="corredores-encabezado">
            <tr className="list-titles">
              <th className="bold thNombre">Nombre</th>
              <th className="bold thCategoria">Categoría</th>
              <th className="bold thSexo">Sexo</th>
              <th className="bold thDistancia">Dist</th>
              <th className="bold thNro">Nro</th>
              <th className="bold thClub">Club</th>
              <th className="bold thSalida">Salida</th>
              <th className="bold thLlegada">Llegada</th>
              <th className="bold thTiempo">Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "var(--Orange-150)" : "var(--Orange-250)",
                }}>
                <td>{persona.nombre}</td>
                <td>{persona.categoria}</td>
                <td>{persona.sexo}</td>
                <td>{persona.distancia}</td>
                <td>{persona.nro}</td>
                <td>{persona.club}</td>
                <td>{persona.salida}</td>
                <td>{persona.llegada}</td>
                <td>{persona.tiempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Carrera;
