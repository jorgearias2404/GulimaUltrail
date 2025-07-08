import React, { useState, useEffect } from "react";
import "./Corredores.css";
import SearchBar from "../UI/SEARCHBAR/SearchBar.jsx";
import PrintButton from "../UI/PRINT/PrintButton.jsx";
import FilteredTableCorredores from "../UI/TABLES/FilteredTableCorredores.jsx";
import { ref, set } from "firebase/database";
import { database } from "../../firebaseConfig";

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

function Corredor(
  MarcaTemporal,
  Correo,
  Puntuacion,
  NombreApellido,
  Cedula,
  Nacimiento,
  Residencia,
  Sexo,
  Categoria,
  DistanciaSeleccionada,
  Club,
  FranelaCaballero,
  FranelaDama,
  FechaPago,
  ReferenciaPago,
  TerminosyCondiciones,
  ComoSeEnteroDeLaCarrera,
  NumeroTelefono,
  NumeroTelefonoFamiliar,
  NumeroCorredor,
  Salida,
  Llegada,
  Tiempo,
  Descalificado
) {
  this.MarcaTemporal = MarcaTemporal;
  this.Correo = Correo;
  this.Puntuacion = Puntuacion;
  this.NombreApellido = NombreApellido;
  this.Cedula = Cedula;
  this.Nacimiento = Nacimiento;
  this.Residencia = Residencia;
  this.Sexo = Sexo;
  this.Categoria = Categoria;
  this.DistanciaSeleccionada = DistanciaSeleccionada;
  this.Club = Club;
  this.FranelaCaballero = FranelaCaballero;
  this.FranelaDama = FranelaDama;
  this.FechaPago = FechaPago;
  this.ReferenciaPago = ReferenciaPago;
  this.TerminosyCondiciones = TerminosyCondiciones;
  this.ComoSeEnteroDeLaCarrera = ComoSeEnteroDeLaCarrera;
  this.NumeroTelefono = NumeroTelefono;
  this.NumeroTelefonoFamiliar = NumeroTelefonoFamiliar;
  this.NumeroCorredor = NumeroCorredor;
  this.Salida = Salida;
  this.Llegada = Llegada;
  this.Tiempo = Tiempo;
  this.Descalificado = Descalificado;
}

function Corredores({ personas, setPersonas, setClubs, updateFirebaseData }) {
  const [filteredPersonas, setFilteredPersonas] = useState(personas);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    distancia: false,
    categoria: false,
    sexo: false,
  });
  const [selects, setSelects] = useState({
    distancia: "null",
    categoria: "null",
    sexo: "null",
  });

  // Efecto para actualizar filteredPersonas cuando cambian personas o searchTerm
  useEffect(() => {
    if (searchTerm) {
      const filtered = personas.filter(
        (persona) => persona.cedula && persona.cedula.includes(searchTerm)
      );
      setFilteredPersonas(filtered);
    } else {
      setFilteredPersonas(personas);
    }
  }, [personas, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const procesarClubes = (corredores) => {
    const clubesMap = {};

    corredores.forEach((corredor) => {
      if (!corredor.Club) return;

      const clubNombre = corredor.Club.trim();

      if (!clubesMap[clubNombre]) {
        clubesMap[clubNombre] = {
          nombre: clubNombre,
          puntuacionTotal: 0,
          miembros: [],
        };
      }

      clubesMap[clubNombre].miembros.push({
        nombre: corredor.NombreApellido,
        cedula: corredor.Cedula,
        categoria: corredor.Categoria,
        sexo: corredor.Sexo,
        distancia: corredor.DistanciaSeleccionada,
        numero: corredor.NumeroCorredor,
        salida: corredor.Salida,
        llegada: corredor.Llegada,
        tiempo: corredor.Tiempo,
        puntuacion: corredor.Puntuacion || 0,
      });

      clubesMap[clubNombre].puntuacionTotal +=
        parseFloat(corredor.Puntuacion) || 0;
    });

    return Object.values(clubesMap);
  };

  const procesarCSV = (csvString) => {
    const filas = csvString.split("\n");
    const resultados = [];

    for (let i = 0; i < filas.length; i++) {
      const columnas = filas[i].split(",").map((c) => c.trim());

      if (columnas.length === 0 || columnas.every((c) => c === "")) continue;

      const corredor = new Corredor(
        columnas[0] || null,
        columnas[1] || null,
        columnas[2] || null,
        columnas[3] || null,
        columnas[4] || null,
        columnas[5] || null,
        columnas[6] || null,
        columnas[7] === "Masculino"
          ? "Masculino"
          : columnas[7] === "Femenino"
          ? "Femenino"
          : null,
        columnas[8] || null,
        columnas[9] || null,
        columnas[10] || null,
        columnas[11] || null,
        columnas[12] || null,
        columnas[13] || null,
        columnas[14] || null,
        columnas[15] || null,
        columnas[16] || null,
        columnas[17] || null,
        columnas[18] || null,
        columnas[19] || null,
        columnas[20] || null,
        columnas[21] || null,
        columnas[22] || null,
        columnas[23] || null
      );

      resultados.push(corredor);
    }

    let datosTabla = resultados.map((corredor) => ({
      marcaTemporal: corredor.MarcaTemporal,
      nombre: corredor.NombreApellido,
      categoria: corredor.Categoria,
      sexo: corredor.Sexo,
      distancia: corredor.DistanciaSeleccionada || null,
      nro: corredor.NumeroCorredor || null,
      club: corredor.Club,
      cedula: corredor.Cedula,
      franelaCaballero: corredor.FranelaCaballero,
      franelaDama: corredor.FranelaDama,
      salida: corredor.Salida || null,
      llegada: corredor.Llegada || null,
      tiempo: corredor.Tiempo || null,
      tieneNumero: !!corredor.NumeroCorredor,
      descalificado: corredor.Descalificado || null,
      puntuacion: corredor.Puntuacion || 0,
    }));

    let contadores = {
      "11k": { inicio: 0, fin: 200, actual: 0 },
      "21k": { inicio: 200, fin: 400, actual: 200 },
      "45k": { inicio: 400, fin: 500, actual: 400 },
      "6k": { inicio: 500, fin: 600, actual: 500 },
    };

    datosTabla = datosTabla.map((persona) => {
      if (persona.tieneNumero) return persona;

      const distancia = persona.distancia;
      if (distancia && contadores[distancia]) {
        const contador = contadores[distancia];
        if (contador.actual <= contador.fin) {
          contador.actual++;
          return { ...persona, nro: contador.actual.toString() };
        }
      }
      return persona;
    });

    const clubesActualizados = procesarClubes(datosTabla);
    setClubs(clubesActualizados);
    setPersonas(datosTabla);
    updateFirebaseData("corredoresData", datosTabla);
    updateFirebaseData("clubesData", clubesActualizados);
  };

  useEffect(() => {
    if (personas.length > 0) {
      const clubesActualizados = procesarClubes(personas);
      setClubs(clubesActualizados);
      updateFirebaseData("clubesData", clubesActualizados);
    }
  }, [personas]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
    if (!checked) setSelects((prev) => ({ ...prev, [name]: "null" }));
  };

  const handleSelectChange = (event) => {
    setSelects((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Por favor sube un archivo CSV");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        procesarCSV(event.target.result);
      } catch (error) {
        console.error("Error al procesar CSV:", error);
        alert("Error al procesar el archivo CSV. Verifica el formato.");
      }
    };
    reader.onerror = () => alert("Error al leer el archivo");
    reader.readAsText(file, "UTF-8");
  };

  const toggleDescalificado = (cedula) => {
    const nuevasPersonas = personas.map((persona) => {
      if (persona.cedula === cedula) {
        return {
          ...persona,
          descalificado: !persona.descalificado,
        };
      }
      return persona;
    });

    setPersonas(nuevasPersonas);
    updateFirebaseData("corredoresData", nuevasPersonas);
    const clubesActualizados = procesarClubes(nuevasPersonas);
    setClubs(clubesActualizados);
    updateFirebaseData("clubesData", clubesActualizados);
  };

  // Función para obtener orden
  const obtenerOrden = (valor, listaOrden) => {
    if (!valor) return listaOrden.length;
    return listaOrden.indexOf(valor) !== -1
      ? listaOrden.indexOf(valor)
      : listaOrden.length;
  };

  // Función para agrupar por filtros
  const agruparPorFiltros = () => {
    const grupos = {};

    filteredPersonas.forEach((persona) => {
      let distancia = checkboxes.distancia ? persona.distancia : "";
      let categoria = checkboxes.categoria ? persona.categoria : "";
      let sexo = checkboxes.sexo ? persona.sexo : "";

      let key = [distancia, categoria, sexo].filter(Boolean).join(" - ");

      if (
        (selects.distancia &&
          selects.distancia !== "null" &&
          selects.distancia !== distancia) ||
        (selects.categoria &&
          selects.categoria !== "null" &&
          selects.categoria !== categoria) ||
        (selects.sexo && selects.sexo !== "null" && selects.sexo !== sexo)
      ) {
        return;
      }

      if (!grupos[key]) grupos[key] = [];
      grupos[key].push(persona);
    });

    return grupos;
  };

  // Función para aplicar filtros de selects
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

    return gruposFiltrados;
  };

  // Función para escapar XML
  const escapeXML = (str) => {
    if (!str) return "";
    return str.replace(/[<>&'"]/g, (char) => {
      switch (char) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
        default:
          return char;
      }
    });
  };

  // Función exportToXML
  const exportToXML = () => {
    // Obtener los datos actualmente mostrados (ya filtrados)
    const datosParaExportar = filteredPersonas;

    // Crear el encabezado XML
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xmlContent += `<Carrera>\n`;
    xmlContent += `  <FechaExportacion>${new Date().toISOString()}</FechaExportacion>\n`;
    xmlContent += `  <TotalCorredores>${datosParaExportar.length}</TotalCorredores>\n`;
    xmlContent += `  <Corredores>\n`;

    // Añadir cada corredor
    datosParaExportar.forEach((corredor, index) => {
      xmlContent += `    <Corredor id="${index + 1}">\n`;
      xmlContent += `      <Nombre>${cleanForXML(
        corredor.nombre || ""
      )}</Nombre>\n`;
      xmlContent += `      <Cedula>${cleanForXML(
        corredor.cedula || ""
      )}</Cedula>\n`;
      xmlContent += `      <Numero>${cleanForXML(
        corredor.nro || ""
      )}</Numero>\n`;
      xmlContent += `      <Distancia>${cleanForXML(
        corredor.distancia || ""
      )}</Distancia>\n`;
      xmlContent += `      <Categoria>${cleanForXML(
        corredor.categoria || ""
      )}</Categoria>\n`;
      xmlContent += `      <Sexo>${cleanForXML(corredor.sexo || "")}</Sexo>\n`;
      xmlContent += `      <Tiempo>${cleanForXML(
        corredor.tiempo || ""
      )}</Tiempo>\n`;
      xmlContent += `      <Club>${cleanForXML(corredor.club || "")}</Club>\n`;
      xmlContent += `      <Descalificado>${
        corredor.descalificado ? "Si" : "No"
      }</Descalificado>\n`;
      xmlContent += `    </Corredor>\n`;
    });

    xmlContent += `  </Corredores>\n`;
    xmlContent += `</Carrera>`;

    // Crear y descargar el archivo
    downloadXML(xmlContent, `corredores_${formatDate(new Date())}.xml`);
  };
  // Función auxiliar para limpiar texto para XML
  const cleanForXML = (text) => {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };
  // Función para formatear fecha como YYYYMMDD
  // Función para formatear fecha como YYYYMMDD
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

  return (
    <div className="body-corredores">
      <nav className="filter-section">
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className="csv-uploader button small-btn"
            style={{ display: "none" }}>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="csv-input"
            />
            <svg
              className="subtitle-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
          </button>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="filters">
          <div className="filter-option">
            <input
              type="checkbox"
              name="distancia"
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

          <div className="filter-option">
            <input
              type="checkbox"
              name="categoria"
              onChange={handleCheckboxChange}
            />
            <label className="bold">CATEGORÍA</label>
            <select
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

          <div className="filter-option">
            <input
              type="checkbox"
              name="sexo"
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

        <PrintButton onExportXML={exportToXML} />
      </nav>

      <div className="table-container" style={{ height: "82vh" }}>
        <div className="title-div" style={{ margin: 0 }}>
          <svg
            className="title-svg"
            width="19"
            height="22"
            viewBox="0 0 19 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2857 2.0625C14.2857 1.51549 14.0599 0.990886 13.6581 0.604092C13.2562 0.217298 12.7112 0 12.1429 0C11.5745 0 11.0295 0.217298 10.6276 0.604092C10.2258 0.990886 10 1.51549 10 2.0625C10 2.60951 10.2258 3.13411 10.6276 3.52091C11.0295 3.9077 11.5745 4.125 12.1429 4.125C12.7112 4.125 13.2562 3.9077 13.6581 3.52091C14.0599 3.13411 14.2857 2.60951 14.2857 2.0625ZM5.61161 7.54102C6.05357 7.11562 6.65625 6.875 7.28571 6.875C7.37054 6.875 7.45536 6.8793 7.53571 6.88789L6.14286 10.9141C5.72768 12.1172 6.21875 13.4406 7.33929 14.1152L11.1875 16.4312L10.0536 20.2469C9.83482 20.9773 10.2768 21.7379 11.0357 21.9484C11.7946 22.159 12.5848 21.7336 12.8036 21.0031L14.0848 16.6891C14.3482 15.8039 13.9688 14.8586 13.1607 14.373L10.625 12.8477L12.0045 9.30703L12.2321 9.83555C12.9018 11.3738 14.4598 12.375 16.192 12.375H17.1429C17.933 12.375 18.5714 11.7605 18.5714 11C18.5714 10.2395 17.933 9.625 17.1429 9.625H16.192C15.6161 9.625 15.0938 9.28984 14.875 8.77851L14.5938 8.13398C13.942 6.62578 12.625 5.47422 11 4.99297L8.82589 4.34844C8.33036 4.20234 7.8125 4.125 7.29018 4.125C5.90625 4.125 4.57589 4.65352 3.59821 5.59883L2.5625 6.59141C2.00446 7.12851 2.00446 8.00078 2.5625 8.53789C3.12054 9.075 4.02679 9.075 4.58482 8.53789L5.61607 7.54531L5.61161 7.54102ZM4.07143 15.125H1.42857C0.638393 15.125 0 15.7395 0 16.5C0 17.2605 0.638393 17.875 1.42857 17.875H4.53571C5.38393 17.875 6.15179 17.3937 6.49554 16.6504L7.00893 15.5375L6.58482 15.2797C5.80357 14.8113 5.22321 14.1281 4.89286 13.3504L4.07143 15.125Z" />
          </svg>
          <h1 className="title underline">CORREDORES</h1>
        </div>
        <FilteredTableCorredores
          personas={filteredPersonas}
          filtros={{ checkboxes, selects }}
          onToggleDescalificado={toggleDescalificado}
        />
      </div>
    </div>
  );
}

export default Corredores;
