import React from "react";
import "./Tables.css";

function FilteredTablePodios({ personas, filtros }) {
  const { checkboxes, selects } = filtros;

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

  const tiempoASegundos = (tiempo) => {
    if (!tiempo) return Infinity;
    const partes = tiempo.split(":");
    if (partes.length === 3) {
      return parseInt(partes[0]) * 3600 + parseInt(partes[1]) * 60 + parseInt(partes[2]);
    } else if (partes.length === 2) {
      return parseInt(partes[0]) * 60 + parseInt(partes[1]);
    }
    return Infinity;
  };

const tieneTiempoValidoYNoDescalificado = (persona) => {
    return (
        persona.tiempo &&
        persona.tiempo.trim() !== "" &&
        !persona.descalificado &&
        !persona.absoluto // Excluir corredores absolutos
    );
};
  const agruparPorFiltros = () => {
     const grupos = {};

    // Filtrar personas con tiempo válido, no descalificadas y que no sean absolutos
    const personasFiltradas = personas.filter(tieneTiempoValidoYNoDescalificado);

    personasFiltradas.forEach((persona) => {
      let distancia = checkboxes.distancia ? persona.distancia : "";
      let categoria = checkboxes.categoria ? persona.categoria : "";
      let sexo = checkboxes.sexo ? persona.sexo : "";

      let key = [distancia, categoria, sexo].filter(Boolean).join(" - ");

      if (
        (selects.distancia && selects.distancia !== "null" && selects.distancia !== distancia) ||
        (selects.categoria && selects.categoria !== "null" && selects.categoria !== categoria) ||
        (selects.sexo && selects.sexo !== "null" && selects.sexo !== sexo)
      ) {
        return;
      }

      if (!grupos[key]) {
        grupos[key] = [];
      }
      grupos[key].push(persona);
    });

    return grupos;
  };

  const gruposFiltrados = agruparPorFiltros();

  const clavesOrdenadas = Object.keys(gruposFiltrados).sort((a, b) => {
    const [distA, catA, sexA] = a.split(" - ");
    const [distB, catB, sexB] = b.split(" - ");

    const ordenDistA = ordenDistancia.indexOf(distA);
    const ordenDistB = ordenDistancia.indexOf(distB);
    const ordenCatA = ordenCategoria.indexOf(catA);
    const ordenCatB = ordenCategoria.indexOf(catB);
    const ordenSexA = ordenSexo.indexOf(sexA);
    const ordenSexB = ordenSexo.indexOf(sexB);

    return (
      ordenDistA - ordenDistB ||
      ordenCatA - ordenCatB ||
      ordenSexA - ordenSexB
    );
  });

  clavesOrdenadas.forEach((key) => {
    gruposFiltrados[key] = gruposFiltrados[key].sort(
      (a, b) => tiempoASegundos(a.tiempo) - tiempoASegundos(b.tiempo)
    ).slice(0, 3); // Tomar solo los 3 primeros (podio)
  });

  if (clavesOrdenadas.length === 0) {
    return <p>No hay datos disponibles para los filtros seleccionados.</p>;
  }

  return (
    <div className="main-table-container">
      {clavesOrdenadas.map((titulo) => (
        <div key={titulo} className="sub-table-container">
          <h2 className="title underline">{titulo}</h2>
          <table className="corredores-table">
            <thead className="corredores-encabezado">
              <tr className="list-titles">
                <th className="bold thDescalificado">Pos</th>
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
                  }}>
                  <td>{index + 1}</td>
                  <td>{persona.nombre}</td>
                  <td>{persona.nro}</td>
                  <td>{persona.distancia}</td>
                  <td>{persona.categoria}</td>
                  <td>{persona.sexo}</td>
                  <td>{persona.cedula}</td>
                  <td>{persona.tiempo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default FilteredTablePodios;