
import { useState, useEffect } from "react";
import SearchBar from "../UI/SEARCHBAR/SearchBar.jsx";
import PrintButtonAbsolutos from "../UI/PRINT/PrintButtonAbsolutos.jsx";
import FilteredTableAbsolutos from "../UI/TABLES/FilteredTableAbsolutos.jsx";
import { marcarAbsolutos } from "./utils.js";

function LlegadaAbsolutos({ personas }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundRunner, setFoundRunner] = useState(null);
  const [filteredPersonas, setFilteredPersonas] = useState(personas);

  // Estado para los checkboxes de filtros
  const [checkboxes, setCheckboxes] = useState({
    distancia: true,
    sexo: true,
  });

  // Estado para los select de filtros
  const [selects, setSelects] = useState({
    distancia: "null",
    sexo: "null",
  });

  // Función para convertir tiempo a segundos
  const tiempoASegundos = (tiempo) => {
    if (!tiempo) return Infinity;
    const [horas, minutos, segundos] = tiempo.split(":").map(Number);
    return horas * 3600 + minutos * 60 + segundos;
  };

  // Efecto para actualizar filteredPersonas cuando cambian personas, searchTerm o filtros
  useEffect(() => {
    // Marcar los absolutos primero
    const personasConAbsolutos = marcarAbsolutos(personas);

    // Filtrar solo los absolutos para mostrar
    const soloAbsolutos = personasConAbsolutos.filter(p => p.absoluto);

    // Aplicar filtros de búsqueda
    let filtered = soloAbsolutos;
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.cedula && p.cedula.includes(searchTerm)
      );
    }

    // Aplicar filtros de selects
    if (selects.distancia !== "null") {
      filtered = filtered.filter(p => p.distancia === selects.distancia);
    }

    if (selects.sexo !== "null") {
      filtered = filtered.filter(p => p.sexo === selects.sexo);
    }

    setFilteredPersonas(filtered);

    // Buscar corredor específico
    if (searchTerm) {
      const runner = personas.find(p => p.cedula && p.cedula.includes(searchTerm));
      setFoundRunner(runner);
    } else {
      setFoundRunner(null);
    }
  }, [searchTerm, personas, selects]);

  // Función para marcar absolutos
  const marcarAbsolutos = (personasList) => {
    const copiaPersonas = JSON.parse(JSON.stringify(personasList));

    // Ordenar por distancia, sexo y tiempo
    const ordenadas = [...copiaPersonas]
      .filter(p => p.tiempo && !p.descalificado)
      .sort((a, b) => {
        const distComp = a.distancia.localeCompare(b.distancia);
        if (distComp !== 0) return distComp;

        const sexoComp = a.sexo.localeCompare(b.sexo);
        if (sexoComp !== 0) return sexoComp;

        return tiempoASegundos(a.tiempo) - tiempoASegundos(b.tiempo);
      });

    // Contar y marcar absolutos
    const conteo = {};
    ordenadas.forEach(p => {
      const key = p.distancia;
      if (!conteo[key]) {
        conteo[key] = { Masculino: 0, Femenino: 0 };
      }

      if (conteo[key][p.sexo] < 3) {
        conteo[key][p.sexo]++;
        p.absoluto = true;
      } else {
        p.absoluto = false;
      }
    });

    return ordenadas;
  };

  // Función para exportar a XML
  // En LlegadaAbsolutos.jsx, reemplaza la función exportToXML con esta versión:

  const exportToXML = () => {
    try {
      // Obtener los grupos de absolutos que se están mostrando actualmente
      const grupos = {};

      // Filtrar solo los absolutos que coincidan con los filtros actuales
      const personasAbsolutas = personas.filter(p => p.absoluto &&
        (!selects.distancia || selects.distancia === "null" || p.distancia === selects.distancia) &&
        (!selects.sexo || selects.sexo === "null" || p.sexo === selects.sexo)
      );

      // Agrupar por distancia y sexo (según checkboxes)
      personasAbsolutas.forEach((persona) => {
        const distancia = checkboxes.distancia ? persona.distancia : "Todas";
        const sexo = checkboxes.sexo ? persona.sexo : "Todos";

        const key = `${distancia} - ${sexo}`;

        if (!grupos[key]) {
          grupos[key] = [];
        }
        grupos[key].push(persona);
      });

      // Ordenar los grupos
      const clavesOrdenadas = Object.keys(grupos).sort((a, b) => {
        const [distA, sexoA] = a.split(" - ");
        const [distB, sexoB] = b.split(" - ");

        const ordenDist = (d) => ["6K", "11K", "21K", "45K", "Todas"].indexOf(d);
        const ordenSexo = (s) => ["Masculino", "Femenino", "Todos"].indexOf(s);

        return ordenDist(distA) - ordenDist(distB) || ordenSexo(sexoA) - ordenSexo(sexoB);
      });

      // Ordenar los corredores dentro de cada grupo por tiempo
      clavesOrdenadas.forEach((key) => {
        grupos[key] = grupos[key].sort(
          (a, b) => tiempoASegundos(a.tiempo) - tiempoASegundos(b.tiempo)
        );
      });

      // Crear el contenido XML
      let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xmlContent += `<Absolutos>\n`;
      xmlContent += `  <FechaExportacion>${new Date().toISOString()}</FechaExportacion>\n`;
      xmlContent += `  <Filtros>\n`;
      xmlContent += `    <Distancia>${selects.distancia !== "null" ? cleanForXML(selects.distancia) : "Todos"}</Distancia>\n`;
      xmlContent += `    <Sexo>${selects.sexo !== "null" ? cleanForXML(selects.sexo) : "Todos"}</Sexo>\n`;
      xmlContent += `  </Filtros>\n`;

      // Añadir cada grupo de absolutos
      clavesOrdenadas.forEach((grupoKey, grupoIndex) => {
        const [distancia, sexo] = grupoKey.split(" - ");

        xmlContent += `  <Grupo>\n`;
        xmlContent += `    <Distancia>${cleanForXML(distancia)}</Distancia>\n`;
        xmlContent += `    <Sexo>${cleanForXML(sexo)}</Sexo>\n`;

        // Añadir los corredores absolutos
        grupos[grupoKey].forEach((corredor, index) => {
          xmlContent += `    <Corredor>\n`;
          xmlContent += `      <Puesto>${index + 1}</Puesto>\n`;
          xmlContent += `      <Nombre>${cleanForXML(corredor.nombre || '')}</Nombre>\n`;
          xmlContent += `      <Cedula>${cleanForXML(corredor.cedula || '')}</Cedula>\n`;
          xmlContent += `      <Numero>${cleanForXML(corredor.nro || '')}</Numero>\n`;
          xmlContent += `      <Tiempo>${cleanForXML(corredor.tiempo || '')}</Tiempo>\n`;
          xmlContent += `      <Club>${cleanForXML(corredor.club || '')}</Club>\n`;
          xmlContent += `      <Categoria>${cleanForXML(corredor.categoria || '')}</Categoria>\n`;
          xmlContent += `    </Corredor>\n`;
        });

        xmlContent += `  </Grupo>\n`;
      });

      xmlContent += `</Absolutos>`;

      // Descargar el archivo
      downloadXML(xmlContent, `absolutos_${formatDate(new Date())}.xml`);
    } catch (error) {
      console.error("Error al generar XML:", error);
      alert("Ocurrió un error al generar el archivo XML");
    }
  };

  // Función auxiliar para limpiar texto para XML
  const cleanForXML = (text) => {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  // Función para formatear fecha como AAAA-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  // Función para descargar el XML
  const downloadXML = (content, filename) => {
    const blob = new Blob([content], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));

    if (!checked) {
      setSelects((prevSelects) => ({
        ...prevSelects,
        [name]: "null",
      }));
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelects((prevSelects) => ({
      ...prevSelects,
      [name]: value,
    }));

    if (!checkboxes[name]) {
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [name]: true,
      }));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <main className="body-llegada">
      <div className="filter-section">
        <SearchBar onSearch={handleSearch} />
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
        <PrintButtonAbsolutos onExportXML={exportToXML} />
      </div>
      <div className="table-container">
        <div className="title-div" style={{ marginTop: 0 }}>
          <svg
            className="title-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512">
            <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z" />
          </svg>
          <h1 className="title underline">ABSOLUTOS</h1>
        </div>
        {foundRunner && (
          <div style={{ marginBottom: "1rem", color: "var(--White)" }}>
            Mostrando resultados para: {foundRunner.nombre} - Cédula:{" "}
            {foundRunner.cedula}
          </div>
        )}
        <FilteredTableAbsolutos
          personas={filteredPersonas}
          filtros={{ checkboxes, selects }}
          searchTerm={searchTerm}
        />
      </div>
    </main>
  );
}

export default LlegadaAbsolutos;