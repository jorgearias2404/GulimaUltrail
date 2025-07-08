import React from "react";
import "./Tables.css";

function FilteredTableAbsolutos({ personas, filtros }) {
  const { checkboxes, selects } = filtros;

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

  // Función para obtener el índice de orden
  const obtenerOrden = (valor, listaOrden) => {
    if (!valor) return listaOrden.length; // Si el valor es null o vacío, lo coloca al final

    if (listaOrden === ordenDistancia) {
      // Extraer número de distancia (ej: "6K" -> 6, "45K" -> 45)
      const match = valor.match(/\d+/);
      return match ? parseInt(match[0], 10) : Infinity;
    }

    return listaOrden.indexOf(valor) !== -1
      ? listaOrden.indexOf(valor)
      : listaOrden.length;
  };

  // Función para filtrar personas con tiempo de llegada válido y no descalificadas
  const tieneTiempoValidoYNoDescalificado = (persona) => {
    return (
      persona.tiempo && persona.tiempo.trim() !== "" && !persona.descalificado
    );
  };

  const agruparPorFiltros = () => {
    const grupos = {};

    // Filtrar solo personas absolutas
    const personasAbsolutas = personas.filter(p => p.absoluto);

    personasAbsolutas.forEach((persona) => {
      const distancia = checkboxes.distancia ? persona.distancia : "";
      const sexo = checkboxes.sexo ? persona.sexo : "";

      // Validar filtros de selects
      if (
        (selects.distancia && selects.distancia !== "null" && selects.distancia !== distancia) ||
        (selects.sexo && selects.sexo !== "null" && selects.sexo !== sexo)
      ) {
        return;
      }

      const key = [distancia, sexo].filter(Boolean).join(" - ");

      if (!grupos[key]) {
        grupos[key] = [];
      }
      grupos[key].push(persona);
    });

    return grupos;
  };

  const gruposFiltrados = agruparPorFiltros();

  // Ordenar las claves de los grupos
  const clavesOrdenadas = Object.keys(gruposFiltrados).sort((a, b) => {
    // Ordenar primero por distancia, luego por sexo
    const [distA, sexoA] = a.split(" - ");
    const [distB, sexoB] = b.split(" - ");

    const ordenDistA = ordenDistancia.indexOf(distA);
    const ordenDistB = ordenDistancia.indexOf(distB);

    if (ordenDistA !== ordenDistB) {
      return ordenDistA - ordenDistB;
    }

    return ordenSexo.indexOf(sexoA) - ordenSexo.indexOf(sexoB);
  });

  // Ordenar los corredores dentro de cada grupo por tiempo
  clavesOrdenadas.forEach((key) => {
    gruposFiltrados[key] = gruposFiltrados[key].sort(
      (a, b) => tiempoASegundos(a.tiempo) - tiempoASegundos(b.tiempo)
    );
  });

  if (clavesOrdenadas.length === 0) {
    return <p>No hay datos disponibles para los filtros seleccionados.</p>;
  }

  return (
    <div className="main-table-container">
      {clavesOrdenadas.length > 0 ? (
        clavesOrdenadas.map((titulo) => (
          <div key={titulo} className="sub-table-container">
            <h2 className="title underline">{titulo}</h2>
            <table className="corredores-table">
              <thead className="corredores-encabezado">
                <tr className="list-titles">
                  <th className="bold thDescalificado">
                    <svg
                      className="paragraph-svg white-color"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512">
                      <path d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 301.7 32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 32l32 0c17.7 0 32 14.3 32 32s-14.3-32-32-32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l96 0c17.7 0 32 14.3 32 32s-14.3-32-32-32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l160 0c17.7 0 32 14.3 32 32s-14.3-32-32-32l-160 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l224 0c17.7 0 32 14.3 32 32s-14.3-32-32-32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                    </svg>
                  </th>
                  <th className="bold thNombre">Nombre</th>
                  <th className="bold thNro">Nro</th>
                  <th className="bold thDistancia">Dist</th>
                  <th className="bold thCategoria">Categoría</th>
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
                      backgroundColor: index % 2 === 0
                        ? "var(--Orange-150)"
                        : "var(--Orange-250)",
                      fontWeight: "bold"
                    }}>
                    <td>{index + 1}</td>
                    <td>
                      {persona.nombre}
                      {persona.absoluto && (
                        <span style={{ marginLeft: "5px", color: "var(--Green)" }}>★</span>
                      )}
                    </td>
                    <td>{persona.nro}</td>
                    <td>{persona.distancia}</td>
                    <td>{persona.categoria}</td>
                    <td>{persona.sexo}</td>
                    <td>{persona.cedula}</td>
                    <td>
                      {persona.tiempo}
                      {persona.absoluto && (
                        <span style={{ marginLeft: "5px", color: "var(--Green)" }}>(Absoluto)</span>
                      )}
                    </td>
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

export default FilteredTableAbsolutos;