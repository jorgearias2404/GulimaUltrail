import { useState, useEffect } from "react";
import SearchBar from "../UI/SEARCHBAR/SearchBar.jsx";
import PrintButtonDescalificados from "../UI/PRINT/PrintButtonDescalificados.jsx";
import FilteredTableDescalificados from "../UI/TABLES/FilteredTableDescalificados.jsx";

function LlegadaDescalificados({ personas }) {
  // Filtrar solo las personas descalificadas
  const [filteredPersonas, setFilteredPersonas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Efecto para actualizar la lista filtrada
  useEffect(() => {
    let result = personas.filter(persona => persona.descalificado);

    // Aplicar filtro de búsqueda
    if (searchTerm) {
      result = result.filter(p => 
        p.cedula && p.cedula.includes(searchTerm) || 
        p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtros de selects
    if (selects.distancia !== "null") {
      result = result.filter(p => p.distancia === selects.distancia);
    }
    
    if (selects.categoria !== "null") {
      result = result.filter(p => p.categoria === selects.categoria);
    }
    
    if (selects.sexo !== "null") {
      result = result.filter(p => p.sexo === selects.sexo);
    }

    setFilteredPersonas(result);
  }, [personas, searchTerm, selects]);

  // Función para exportar a XML
  const exportToXML = () => {
    // Crear el encabezado XML
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xmlContent += `<Descalificados>\n`;
    xmlContent += `  <FechaExportacion>${new Date().toISOString()}</FechaExportacion>\n`;
    xmlContent += `  <TotalCorredores>${filteredPersonas.length}</TotalCorredores>\n`;
    xmlContent += `  <Filtros>\n`;
    xmlContent += `    <Distancia>${selects.distancia !== "null" ? selects.distancia : "Todos"}</Distancia>\n`;
    xmlContent += `    <Categoria>${selects.categoria !== "null" ? selects.categoria : "Todos"}</Categoria>\n`;
    xmlContent += `    <Sexo>${selects.sexo !== "null" ? selects.sexo : "Todos"}</Sexo>\n`;
    xmlContent += `  </Filtros>\n`;
    xmlContent += `  <Corredores>\n`;
  
    // Añadir cada corredor
    filteredPersonas.forEach((corredor, index) => {
      xmlContent += `    <Corredor id="${index + 1}">\n`;
      xmlContent += `      <Nombre>${cleanForXML(corredor.nombre || '')}</Nombre>\n`;
      xmlContent += `      <Cedula>${cleanForXML(corredor.cedula || '')}</Cedula>\n`;
      xmlContent += `      <Numero>${cleanForXML(corredor.nro || '')}</Numero>\n`;
      xmlContent += `      <Distancia>${cleanForXML(corredor.distancia || '')}</Distancia>\n`;
      xmlContent += `      <Categoria>${cleanForXML(corredor.categoria || '')}</Categoria>\n`;
      xmlContent += `      <Sexo>${cleanForXML(corredor.sexo || '')}</Sexo>\n`;
      xmlContent += `      <Tiempo>${cleanForXML(corredor.tiempo || '')}</Tiempo>\n`;
      xmlContent += `      <Club>${cleanForXML(corredor.club || '')}</Club>\n`;
      xmlContent += `      <Motivo>${cleanForXML(corredor.motivoDescalificacion || 'No especificado')}</Motivo>\n`;
      xmlContent += `    </Corredor>\n`;
    });
  
    xmlContent += `  </Corredores>\n`;
    xmlContent += `</Descalificados>`;
  
    // Crear y descargar el archivo
    downloadXML(xmlContent, `descalificados_${formatDate(new Date())}.xml`);
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

  // Función para formatear fecha como YYYYMMDD
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`;
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

  // Manejar búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="body-llegada">
      <nav className="filter-section">
        <SearchBar onSearch={handleSearch} />
        <div className="filters">
          {/* Checkbox y select de Distancia */}
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
              <option value="6K">6K</option>
              <option value="11K">11K</option>
              <option value="21K">21K</option>
              <option value="45K">45K</option>
            </select>
          </div>

          {/* Checkbox y select de Categoría */}
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
              <option value="Sub 15">Sub 15</option>
              <option value="Sub 18">Sub 18</option>
              <option value="Libre 18-29 años">Libre 18-29 años</option>
              <option value="Submaster A 30-34 años">Submaster A 30-34 años</option>
              <option value="Submaster B 35-39 años">Submaster B 35-39 años</option>
              <option value="Master A 40-44 años">Master A 40-44 años</option>
              <option value="Master B 45-49 años">Master B 45-49 años</option>
              <option value="Master C 50-54 años">Master C 50-54 años</option>
              <option value="Master D 55-59 años">Master D 55-59 años</option>
              <option value="Master E 60 y + años">Master E 60 y + años</option>
            </select>
          </div>

          {/* Checkbox y select de Sexo */}
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
        <PrintButtonDescalificados onExportXML={exportToXML} />
      </nav>
      <div className="table-container">
        <div className="title-div" style={{ marginTop: 0 }}>
          <svg
            className="title-svg"
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
          <h1 className="title underline">DESCALIFICADOS</h1>
        </div>
        {/* Componente de Tablas */}
        <FilteredTableDescalificados
          personas={filteredPersonas}
          filtros={{ checkboxes, selects }}
        />
      </div>
    </div>
  );
}

export default LlegadaDescalificados;
