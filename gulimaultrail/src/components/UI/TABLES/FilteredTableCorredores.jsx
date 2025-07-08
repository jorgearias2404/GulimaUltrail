import React, { useState } from "react";
import "./Tables.css";

function FilteredTableCorredores({ personas, filtros, onToggleDescalificado }) {
  const { checkboxes, selects } = filtros;
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [personaToDisqualify, setPersonaToDisqualify] = useState(null);
  const [error, setError] = useState("");

  // Definir orden de distancia, categoría y sexo
  const ordenDistancia = ["6K", "11K", "21K", "45K"];
  const ordenCategoria = [
    "Sub 15",
    "Sub 18",
    "Libre 18-29 años",
    "Submaster A 30-34 años",
    "Submaster B 35-39 años",
    "Master A 40-44 años",
    "Master B 45-49 años",
    "Master C 50-54 años",
    "Master D 55-59 años",
    "Master E 60 y + años",
  ];
  const ordenSexo = ["Masculino", "Femenino"];

  // Función para obtener el índice de orden
  const obtenerOrden = (valor, listaOrden) => {
    if (!valor) return listaOrden.length; // Si el valor es null o vacío, lo coloca al final

    if (listaOrden === ordenDistancia) {
      // Extraer número de distancia (ej: "6K" -> 6, "45K" -> 45)
      const match = valor.match(/\d+/);
      return match ? parseInt(match[0], 10) : Infinity;
    }

    if (!valor) return listaOrden.length; // Si el valor es null o vacío, lo coloca al final
    return listaOrden.indexOf(valor) !== -1
      ? listaOrden.indexOf(valor)
      : listaOrden.length;
  };

  // Función para agrupar personas según los filtros activos
  const agruparPorFiltros = () => {
    const grupos = {};

    personas.forEach((persona) => {
      let distancia = checkboxes.distancia ? persona.distancia : "";
      let categoria = checkboxes.categoria ? persona.categoria : "";
      let sexo = checkboxes.sexo ? persona.sexo : "";

      let key = [distancia, categoria, sexo].filter(Boolean).join(" - ");

      // Si hay filtros activos en los selects, validamos que coincida con ellos
      if (
        (selects.distancia &&
          selects.distancia !== "null" &&
          selects.distancia !== distancia) ||
        (selects.categoria &&
          selects.categoria !== "null" &&
          selects.categoria !== categoria) ||
        (selects.sexo && selects.sexo !== "null" && selects.sexo !== sexo)
      ) {
        return; // Si no coincide con los filtros del select, lo ignoramos
      }

      if (!grupos[key]) {
        grupos[key] = [];
      }
      grupos[key].push(persona);
    });

    return grupos;
  };

  // Aplicar filtros de los selects solo si están activos
  const aplicarFiltrosDeSelect = (grupos) => {
    let gruposFiltrados = { ...grupos };

    if (selects.distancia && selects.distancia !== " - ") {
      gruposFiltrados = Object.fromEntries(
        Object.entries(gruposFiltrados).filter(([key]) =>
          key.startsWith(selects.distancia)
        )
      );
    }

    if (selects.categoria && selects.categoria !== " - ") {
      gruposFiltrados = Object.fromEntries(
        Object.entries(gruposFiltrados).filter(([key]) =>
          key.includes(selects.categoria)
        )
      );
    }

    if (selects.sexo && selects.sexo !== " - ") {
      gruposFiltrados = Object.fromEntries(
        Object.entries(gruposFiltrados).filter(([key]) =>
          key.endsWith(selects.sexo)
        )
      );
    }

    return Object.keys(gruposFiltrados).length > 0 ? gruposFiltrados : grupos;
  };

  // Obtener grupos y aplicar filtros
  let gruposFiltrados = agruparPorFiltros();
  gruposFiltrados = aplicarFiltrosDeSelect(gruposFiltrados);

  // Ordenar claves de los grupos
  const clavesOrdenadas = Object.keys(gruposFiltrados).sort((a, b) => {
    const [distA, catA, sexA] = a.split(" - ");
    const [distB, catB, sexB] = b.split(" - ");

    return (
      obtenerOrden(distA, ordenDistancia) -
        obtenerOrden(distB, ordenDistancia) ||
      obtenerOrden(catA, ordenCategoria) - obtenerOrden(catB, ordenCategoria) ||
      obtenerOrden(sexA, ordenSexo) - obtenerOrden(sexB, ordenSexo)
    );
  });

  const handleDisqualifyClick = (persona) => {
    setPersonaToDisqualify(persona);
    setShowModal(true);
  };

  const handleConfirmDisqualify = () => {
    if (password === "#GUX_84562197**/") {
      onToggleDescalificado(personaToDisqualify.cedula);
      setShowModal(false);
      setPassword("");
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  if (clavesOrdenadas.length === 0) {
    return <p>No hay datos disponibles para los filtros seleccionados.</p>;
  }

  return (
    <div className="main-table-container">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="bolder subtitle underline">
              CALIFICAR/DESCALIFICAR
            </h3>
            <br />
            <p>
              ¿Estás seguro que deseas calificar/descalificar a este corredor?
            </p>
            <p style={{ color: "var(--Orange-1000)" }} className="bold">
              "Nombre: " {personaToDisqualify?.nombre || "Nombre no disponible"}
              <br />
              "Cedula:" {personaToDisqualify?.cedula || "Cédula no disponible"}
              <br />
              "Numero:" {personaToDisqualify?.nro || "Número no disponible"}
              <br />
              "Distancia: "
              {personaToDisqualify?.distancia || "Distancia no disponible"}
            </p>
            <div className="modal-input-container">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese la contraseña"
              />
              {error && <p className="error-message">{error}</p>}
            </div>
            <div className="modal-buttons">
              <button
                className="button cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}>
                Cancelar
              </button>
              <button
                className="button confirm-btn"
                onClick={handleConfirmDisqualify}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {clavesOrdenadas.length > 0 ? (
        clavesOrdenadas.map((titulo) => (
          <div key={titulo} className="sub-table-container">
            <h2 className="title underline" style={{ marginTop: "2rem" }}>
              {titulo}
            </h2>
            <table className="corredores-table">
              <thead className="corredores-encabezado">
                <tr className="list-titles">
                  <th className="bold thDescalificado">
                    <svg
                      className="subtitle-svg white-color"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 24 36.2"
                      width="24px"
                      height="24px">
                      <path
                        d="M16.9,1.7c0.1,1.5,0.8,2.3,1.6,3.4c0.6,0.7,1.4,2.6,0.6,3.1c-0.3,0.2-0.3,0.2-0.4-0.1c-0.2-1-0.9-1.7-1.5-2.4
  C16.4,4.6,15.9,3.1,16.9,1.7z"
                      />
                      <path
                        d="M22.7,14.8C22.7,14.8,22.7,14.8,22.7,14.8c-0.9-1.7-2.4-4-2.4-4s0.6,3.8,0.1,5.5c-0.5,1.7-1,2.4-1.1,2.4
  c0-0.2-0.2-1.1-0.5-2.2c-0.4-1.4-0.9-3.1-1.4-4.1c0,0,0,0,0,0c-1-1.7-2.6-3.4-2.6-3.4c-0.4-0.4-0.7-0.8-1-1.2
  c-1.1-1.5-1.7-3.2-1.8-5.1c0-0.7,0.4-2.1,0.6-2.7c-2.2,1.1-3.8,2.8-4.8,5.1C7.2,6,7,7,6.9,7.9c-0.2,1.4-0.1,2.8-0.3,4
  c0,0.3-0.1,0.5-0.1,0.8c-0.4,2.1-1.7,3-1.8,3c0,0,0-0.7-0.1-1.5c-0.1-0.4-0.2-0.9-0.4-1.4c-0.2-0.6-0.7-1.2-1.2-1.7
  c-0.7-0.7-1.4-1.3-1.4-1.3C1.7,9.7,2.4,11.4,1.8,14c-0.1,0.4-0.2,0.8-0.4,1.3c-0.3,0.7-0.5,1.4-0.6,2.1c-0.7,2.8-0.8,5.8-0.7,7
  c0,0.4,0.1,1.7,0.6,3.4c0.1,1,0.4,2,1.2,2.8C2,30.5,2,30.6,2.1,30.6c0.1,0.1,0.3,0,0.5-0.1c1.2-0.7,2.4-0.2,2.8,1.2
  c0.2,0.6,0.2,1.2,0.1,1.8c0,0,0,0,0,0.1c-0.1,0.6-0.2,1.2-0.3,1.8c0.6-0.1,2-0.4,2.1,0c0,0.1,0.5-0.4,0.8-0.8
  c0.2,0.1,0.5,0.1,0.7,0.1c0.3,0.4,0.6,1,0.7,1.6c0.2-0.1,0.7-0.9,1.4-1.4c0.2,0,0.3,0,0.5,0c0.5,0,1,0,1.5-0.1
  c0.8,0.5,1.4,1.3,1.5,1.2c0.1-0.3,0.5-1,0.8-1.5c0.2,0,0.3-0.1,0.5-0.1c0.1,0.4,0.5,0.9,0.6,1.1c0.1,0.2,1.5-0.4,1.9-0.2
  c0.1,0.1,0.3,0.2,0.4,0.1c0.1-0.1,0-0.2,0-0.4c-0.1-0.6-0.2-1.2-0.2-1.8c0-0.4,0-0.7,0.1-1.1c0.2-1.6,1.5-2.3,2.9-1.6
  c0,0,0.1,0,0.1,0.1c0.3,0.1,0.4,0.1,0.6-0.1c0.9-0.8,1.2-1.9,1.3-3c0-0.4,0-0.8,0-1.2c0.4-1.5,0.6-2.9,0.6-3.8
  C24.2,19.2,23.5,16.5,22.7,14.8z M9.8,24.6c-0.2,0.8-0.4,1.5-0.9,2.2c0-0.4-1.9,0.2-3.2,0.1c-1-0.1-2.1-0.6-2.3-1.2
  c-0.4-1.2-0.2-2.4,0.7-3.4c0.8-0.9,1.9-1.1,3.1-0.8c0.3,0.1,0.6,0.2,0.9,0.3C8.7,22,9.3,22,9.9,21.7c0.2-0.1,0.2-0.1,0.2,0.1
  C10.2,22.8,10.1,23.7,9.8,24.6z M12.6,31.6c-0.2,0-0.3-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.3-0.4c-0.1,0.2-0.2,0.3-0.2,0.4
  c-0.1,0.2-0.3,0.2-0.6,0.2c-0.6-0.1-0.8-0.3-0.8-0.6c-0.1-0.9,0.2-1.8,0.6-2.6c0.1-0.2,0.3-0.4,0.7-0.4c0.2,0,0.3-0.1,0.5-0.1
  c0.5-0.1,0.7,0,0.9,0.2c0.5,0.9,0.8,1.9,1,2.9C14,31.4,13.5,31.6,12.6,31.6z M20.5,25.9c-0.3,0.6-1.8,0.9-2.2,1
  c-0.7,0.1-3.1-0.5-3.2-0.1c-0.9-1.6-1.3-3.4-1.1-5.3c1,0.7,1.9,0.3,2.8,0c1.3-0.4,2.4-0.1,3.3,0.9C20.8,23.4,21,24.8,20.5,25.9z"
                      />
                    </svg>
                  </th>
                  <th className="bold thPos">Inscrpción</th>
                  <th className="bold thDescalificado">
                    <svg
                      className="paragraph-svg white-color"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512">
                      <path d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 301.7 32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-160 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                    </svg>
                  </th>
                  <th className="bold thNombre">Nombre</th>
                  <th className="bold thNro">Nro</th>
                  <th className="bold thDistancia">Dist</th>
                  <th className="bold thCategoria">Categoría</th>
                  <th className="bold thClub">Club</th>
                  <th className="bold thSexo">Sexo</th>
                  <th className="bold thCedula">Cédula</th>
                  <th className="bold thTiempo">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {gruposFiltrados[titulo].map((persona, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: persona.descalificado
                        ? "var(--Dark-gray)"
                        : index % 2 === 0
                        ? "var(--Orange-150)"
                        : "var(--Orange-250)",
                      padding: "0px",
                      margin: "0px",
                      opacity: persona.descalificado ? 0.8 : 1,
                      transition: "all 0.2s ease",
                    }}>
                    <td
                      onClick={() => handleDisqualifyClick(persona)}
                      style={{ cursor: "pointer" }}>
                      {persona.descalificado ? (
                        <svg
                          className="paragraph-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512">
                          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                        </svg>
                      ) : (
                        <svg
                          className="paragraph-svg white85-color"
                          width="19"
                          height="22"
                          viewBox="0 0 19 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.2857 2.0625C14.2857 1.51549 14.0599 0.990886 13.6581 0.604092C13.2562 0.217298 12.7112 0 12.1429 0C11.5745 0 11.0295 0.217298 10.6276 0.604092C10.2258 0.990886 10 1.51549 10 2.0625C10 2.60951 10.2258 3.13411 10.6276 3.52091C11.0295 3.9077 11.5745 4.125 12.1429 4.125C12.7112 4.125 13.2562 3.9077 13.6581 3.52091C14.0599 3.13411 14.2857 2.60951 14.2857 2.0625ZM5.61161 7.54102C6.05357 7.11562 6.65625 6.875 7.28571 6.875C7.37054 6.875 7.45536 6.8793 7.53571 6.88789L6.14286 10.9141C5.72768 12.1172 6.21875 13.4406 7.33929 14.1152L11.1875 16.4312L10.0536 20.2469C9.83482 20.9773 10.2768 21.7379 11.0357 21.9484C11.7946 22.159 12.5848 21.7336 12.8036 21.0031L14.0848 16.6891C14.3482 15.8039 13.9688 14.8586 13.1607 14.373L10.625 12.8477L12.0045 9.30703L12.2321 9.83555C12.9018 11.3738 14.4598 12.375 16.192 12.375H17.1429C17.933 12.375 18.5714 11.7605 18.5714 11C18.5714 10.2395 17.933 9.625 17.1429 9.625H16.192C15.6161 9.625 15.0938 9.28984 14.875 8.77851L14.5938 8.13398C13.942 6.62578 12.625 5.47422 11 4.99297L8.82589 4.34844C8.33036 4.20234 7.8125 4.125 7.29018 4.125C5.90625 4.125 4.57589 4.65352 3.59821 5.59883L2.5625 6.59141C2.00446 7.12851 2.00446 8.00078 2.5625 8.53789C3.12054 9.075 4.02679 9.075 4.58482 8.53789L5.61607 7.54531L5.61161 7.54102ZM4.07143 15.125H1.42857C0.638393 15.125 0 15.7395 0 16.5C0 17.2605 0.638393 17.875 1.42857 17.875H4.53571C5.38393 17.875 6.15179 17.3937 6.49554 16.6504L7.00893 15.5375L6.58482 15.2797C5.80357 14.8113 5.22321 14.1281 4.89286 13.3504L4.07143 15.125Z" />
                        </svg>
                      )}
                    </td>
                    <td>{persona.marcaTemporal}</td>
                    <td>{index + 1}</td>
                    <td>{persona.nombre}</td>
                    <td>{persona.nro}</td>
                    <td>{persona.distancia}</td>
                    <td>{persona.categoria}</td>
                    <td>{persona.club}</td>
                    <td>{persona.sexo}</td>
                    <td>{persona.cedula}</td>
                    <td>{persona.tiempo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No hay datos disponibles para los filtros seleccionados.</p>
      )}
    </div>
  );
}

export default FilteredTableCorredores;
