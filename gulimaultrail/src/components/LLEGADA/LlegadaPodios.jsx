import { useState, useEffect } from "react";
import SearchBar from "../UI/SEARCHBAR/SearchBar.jsx";
import PrintButtonPodios from "../UI/PRINT/PrintButtonPodios.jsx";
import FilteredTablePodios from "../UI/TABLES/FilteredTablePodios.jsx";
import { marcarAbsolutos } from "./utils.js";


function LlegadaPodios({ personas }) {
  const [filteredPersonas, setFilteredPersonas] = useState(personas);
  const [searchTerm, setSearchTerm] = useState("");
  const [foundRunner, setFoundRunner] = useState(null);

  // Process personas to mark absolutos (first 3 men and women per race)
  const personasConAbsolutos = marcarAbsolutos(personas);

  // Estado para los checkboxes de filtros
  const [checkboxes, setCheckboxes] = useState({
    distancia: false,
    categoria: false,
    sexo: false,
  });

  // Estado para los select de filtros
  const [selects, setSelects] = useState({
    distancia: "null",
    categoria: "null",
    sexo: "null",
  });

  // Efecto para buscar corredor cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm) {
      const runner = personas.find(
        (p) => p.cedula && p.cedula.includes(searchTerm)
      );
      setFoundRunner(runner);

      if (runner) {
        setCheckboxes({
          distancia: true,
          categoria: true,
          sexo: true,
        });

        setSelects({
          distancia: runner.distancia || "null",
          categoria: runner.categoria || "null",
          sexo: runner.sexo || "null",
        });
      }
    } else {
      setFoundRunner(null);
      setCheckboxes({
        distancia: false,
        categoria: false,
        sexo: false,
      });

      setSelects({
        distancia: "null",
        categoria: "null",
        sexo: "null",
      });
    }
  }, [searchTerm, personas]);

  // Manejar cambios en checkboxes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));

    // Si el checkbox se desmarca, reseteamos el select correspondiente a "null"
    if (!checked) {
      setSelects((prevSelects) => ({
        ...prevSelects,
        [name]: "null",
      }));
    }
  };

  // Manejar cambios en selects
  const handleSelectChange = (event) => {
    setSelects({
      ...selects,
      [event.target.name]: event.target.value,
    });
  };

  // Función para manejar la búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Función para limpiar texto para XML
  const cleanForXML = (text) => {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  // Función para formatear fecha
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${d.getDate().toString().padStart(2, "0")}`;
  };

  // Función para descargar el XML
  const downloadXML = (content, filename) => {
    const blob = new Blob([content], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Función para convertir tiempo a segundos para ordenar
  const tiempoASegundos = (tiempo) => {
    if (!tiempo) return Infinity;
    const partes = tiempo.split(":");
    if (partes.length === 3) {
      return (
        parseInt(partes[0]) * 3600 +
        parseInt(partes[1]) * 60 +
        parseInt(partes[2])
      );
    } else if (partes.length === 2) {
      return parseInt(partes[0]) * 60 + parseInt(partes[1]);
    }
    return Infinity;
  };
  //  Función para obtener los podios filtrados según los criterios actuales
 const obtenerPodiosFiltrados = () => {
  const grupos = {};

    // Aplicar todos los filtros
    let corredoresFiltrados = [...personas];

    // Filtrar solo personas con tiempo válido, no descalificadas y que no sean absolutos
    corredoresFiltrados = corredoresFiltrados.filter(
        (p) => p.tiempo && p.tiempo.trim() !== "" && !p.descalificado && !p.absoluto
    );
    // Filtrar por búsqueda si existe
    if (searchTerm) {
      corredoresFiltrados = corredoresFiltrados.filter(
        (p) =>
          (p.cedula && p.cedula.includes(searchTerm)) ||
          (p.nombre &&
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtrar por selects
    if (selects.distancia !== "null") {
      corredoresFiltrados = corredoresFiltrados.filter(
        (p) => p.distancia === selects.distancia
      );
    }

    if (selects.categoria !== "null") {
      corredoresFiltrados = corredoresFiltrados.filter(
        (p) => p.categoria === selects.categoria
      );
    }

    if (selects.sexo !== "null") {
      corredoresFiltrados = corredoresFiltrados.filter(
        (p) => p.sexo === selects.sexo
      );
    }

    // Agrupar según los checkboxes activos
    corredoresFiltrados.forEach((persona) => {
      let distancia = checkboxes.distancia ? persona.distancia : "";
      let categoria = checkboxes.categoria ? persona.categoria : "";
      let sexo = checkboxes.sexo ? persona.sexo : "";

      let key = [distancia, categoria, sexo].filter(Boolean).join(" - ");

      if (!grupos[key]) grupos[key] = [];
      grupos[key].push(persona);
    });

    // Ordenar cada grupo por tiempo y tomar los primeros 3 (podio)
    Object.keys(grupos).forEach((key) => {
      grupos[key] = [...grupos[key]]
        .sort((a, b) => {
          const tiempoA = tiempoASegundos(a.tiempo);
          const tiempoB = tiempoASegundos(b.tiempo);
          return tiempoA - tiempoB;
        })
        .slice(0, 3);
    });

    return grupos;
  };

  // Función para exportar podios a XML
  const exportPodiosToXML = () => {
    try {
      // Obtener los grupos de podios que se están mostrando actualmente
      const gruposPodios = obtenerPodiosFiltrados();

      // Crear el contenido XML
      let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xmlContent += `<Podios>\n`;
      xmlContent += `  <FechaExportacion>${new Date().toISOString()}</FechaExportacion>\n`;
      xmlContent += `  <Filtros>\n`;
      xmlContent += `    <Distancia>${
        selects.distancia !== "null" ? selects.distancia : "Todos"
      }</Distancia>\n`;
      xmlContent += `    <Categoria>${
        selects.categoria !== "null" ? selects.categoria : "Todos"
      }</Categoria>\n`;
      xmlContent += `    <Sexo>${
        selects.sexo !== "null" ? selects.sexo : "Todos"
      }</Sexo>\n`;
      xmlContent += `  </Filtros>\n`;

      // Añadir cada grupo de podios
      Object.entries(gruposPodios).forEach(([grupoKey, podio], grupoIndex) => {
        const [distancia, categoria, sexo] = grupoKey.split(" - ");

        xmlContent += `  <Grupo id="${grupoIndex + 1}">\n`;
        xmlContent += `    <Distancia>${cleanForXML(
          distancia || "No especificada"
        )}</Distancia>\n`;
        xmlContent += `    <Categoria>${cleanForXML(
          categoria || "No especificada"
        )}</Categoria>\n`;
        xmlContent += `    <Sexo>${cleanForXML(
          sexo || "No especificada"
        )}</Sexo>\n`;
        xmlContent += `    <Podio>\n`;

        // Añadir los 3 primeros como podio (oro, plata, bronce)
        podio.forEach((corredor, index) => {
          const puesto =
            ["Oro", "Plata", "Bronce"][index] || `Posición ${index + 1}`;

          xmlContent += `      <Corredor puesto="${puesto}">\n`;
          xmlContent += `        <Nombre>${cleanForXML(
            corredor.nombre || ""
          )}</Nombre>\n`;
          xmlContent += `        <Cedula>${cleanForXML(
            corredor.cedula || ""
          )}</Cedula>\n`;
          xmlContent += `        <Numero>${cleanForXML(
            corredor.nro || ""
          )}</Numero>\n`;
          xmlContent += `        <Tiempo>${cleanForXML(
            corredor.tiempo || ""
          )}</Tiempo>\n`;
          xmlContent += `        <Club>${cleanForXML(
            corredor.club || ""
          )}</Club>\n`;
          xmlContent += `      </Corredor>\n`;
        });

        xmlContent += `    </Podio>\n`;
        xmlContent += `  </Grupo>\n`;
      });

      xmlContent += `</Podios>`;

      // Descargar el archivo
      downloadXML(xmlContent, `podios_${formatDate(new Date())}.xml`);
    } catch (error) {
      console.error("Error al generar XML:", error);
      alert("Ocurrió un error al generar el archivo XML");
    }
  };

  return (
    <div className="body-llegada">
      <div className="filter-section">
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className="button small-btn"
            id="mostrar-podio-btn"
            style={{ display: "none" }}>
            <svg
              className="subtitle-svg"
              width="25"
              height="23"
              viewBox="0 0 25 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M15.4375 0H8.9375C8.50652 0 8.0932 0.171205 7.78845 0.475951C7.48371 0.780698 7.3125 1.19402 7.3125 1.625V22.5469C7.3125 22.6007 7.3339 22.6524 7.37199 22.6905C7.41009 22.7286 7.46175 22.75 7.51562 22.75H16.8594C16.9132 22.75 16.9649 22.7286 17.003 22.6905C17.0411 22.6524 17.0625 22.6007 17.0625 22.5469V1.625C17.0625 1.19402 16.8913 0.780698 16.5865 0.475951C16.2818 0.171205 15.8685 0 15.4375 0ZM22.75 8.125H19.0938C18.986 8.125 18.8827 8.1678 18.8065 8.24399C18.7303 8.32017 18.6875 8.42351 18.6875 8.53125V22.3438C18.6875 22.4515 18.7303 22.5548 18.8065 22.631C18.8827 22.7072 18.986 22.75 19.0938 22.75H23.1562C23.4795 22.75 23.7895 22.6216 24.018 22.393C24.2466 22.1645 24.375 21.8545 24.375 21.5312V9.75C24.375 9.31902 24.2038 8.9057 23.899 8.60095C23.5943 8.29621 23.181 8.125 22.75 8.125ZM1.625 4.875C1.19402 4.875 0.780698 5.04621 0.475951 5.35095C0.171205 5.6557 0 6.06902 0 6.5V21.5312C0 21.8545 0.128404 22.1645 0.356964 22.393C0.585524 22.6216 0.895517 22.75 1.21875 22.75H5.28125C5.38899 22.75 5.49233 22.7072 5.56851 22.631C5.6447 22.5548 5.6875 22.4515 5.6875 22.3438V5.28125C5.6875 5.17351 5.6447 5.07017 5.56851 4.99399C5.49233 4.9178 5.38899 4.875 5.28125 4.875H1.625Z" />
            </svg>
          </button>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="filters">
          {/* Checkbox y select de Distancia */}
          <div className="filter-option">
            <input
              type="checkbox"
              name="distancia"
              checked={checkboxes.distancia}
              onChange={handleCheckboxChange}
            />
            <label className="bold">DISTANCIA</label>
            <select
              name="distancia"
              value={selects.distancia}
              onChange={handleSelectChange}
              disabled={!checkboxes.distancia}>
              <option value="null">-</option>
              <option value="6k">6K</option>
              <option value="11k">11K</option>
              <option value="21k">21K</option>
              <option value="45k">45K</option>
            </select>
          </div>

          {/* Checkbox y select de Categoría */}
          <div className="filter-option">
            <input
              type="checkbox"
              name="categoria"
              checked={checkboxes.categoria}
              onChange={handleCheckboxChange}
            />
            <label className="bold">CATEGORÍA</label>
            <select
              id="select-categoria"
              name="categoria"
              value={selects.categoria}
              onChange={handleSelectChange}
              disabled={!checkboxes.categoria}>
              <option value="null">-</option>
              {[
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
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Checkbox y select de Sexo */}
          <div className="filter-option">
            <input
              type="checkbox"
              name="sexo"
              checked={checkboxes.sexo}
              onChange={handleCheckboxChange}
            />
            <label className="bold">SEXO</label>
            <select
              name="sexo"
              value={selects.sexo}
              onChange={handleSelectChange}
              disabled={!checkboxes.sexo}>
              <option value="null">-</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
        </div>
        <PrintButtonPodios onExportXML={exportPodiosToXML} />
      </div>
      <div className="table-container">
        <div className="title-div" style={{ marginTop: 0 }}>
          <svg
            className="title-svg"
            width="25"
            height="23"
            viewBox="0 0 25 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4375 0H8.9375C8.50652 0 8.0932 0.171205 7.78845 0.475951C7.48371 0.780698 7.3125 1.19402 7.3125 1.625V22.5469C7.3125 22.6007 7.3339 22.6524 7.37199 22.6905C7.41009 22.7286 7.46175 22.75 7.51562 22.75H16.8594C16.9132 22.75 16.9649 22.7286 17.003 22.6905C17.0411 22.6524 17.0625 22.6007 17.0625 22.5469V1.625C17.0625 1.19402 16.8913 0.780698 16.5865 0.475951C16.2818 0.171205 15.8685 0 15.4375 0ZM22.75 8.125H19.0938C18.986 8.125 18.8827 8.1678 18.8065 8.24399C18.7303 8.32017 18.6875 8.42351 18.6875 8.53125V22.3438C18.6875 22.4515 18.7303 22.5548 18.8065 22.631C18.8827 22.7072 18.986 22.75 19.0938 22.75H23.1562C23.4795 22.75 23.7895 22.6216 24.018 22.393C24.2466 22.1645 24.375 21.8545 24.375 21.5312V9.75C24.375 9.31902 24.2038 8.9057 23.899 8.60095C23.5943 8.29621 23.181 8.125 22.75 8.125ZM1.625 4.875C1.19402 4.875 0.780698 5.04621 0.475951 5.35095C0.171205 5.6557 0 6.06902 0 6.5V21.5312C0 21.8545 0.128404 22.1645 0.356964 22.393C0.585524 22.6216 0.895517 22.75 1.21875 22.75H5.28125C5.38899 22.75 5.49233 22.7072 5.56851 22.631C5.6447 22.5548 5.6875 22.4515 5.6875 22.3438V5.28125C5.6875 5.17351 5.6447 5.07017 5.56851 4.99399C5.49233 4.9178 5.38899 4.875 5.28125 4.875H1.625Z" />
          </svg>
          <h1 className="title underline">PODIOS</h1>
        </div>
        {foundRunner && (
          <div style={{ marginBottom: "1rem", color: "var(--White)" }}>
            Mostrando podios para: {foundRunner.nombre} - Cédula:{" "}
            {foundRunner.cedula}
          </div>
        )}
        <FilteredTablePodios
          personas={personasConAbsolutos.filter(p => !p.absoluto)}
          filtros={{ checkboxes, selects }}
        />
      </div>
    </div>
  );
}

export default LlegadaPodios;
