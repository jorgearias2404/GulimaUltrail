import PrintButton from "../UI/PRINT/PrintButton";
import "../UI/TABLES/Tables.css";

function PtsCorredores({ personas }) {
  // Función para convertir tiempo a segundos
  const timeToSeconds = (timeStr) => {
    if (!timeStr) return Infinity;
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  };

  // Orden de distancias (de menor a mayor)
  const ordenDistancias = {
    "6k": 1,
    "11k": 2,
    "21k": 3,
    "45k": 4,
  };

  // Ordenamos las personas primero por distancia y luego por tiempo
  const personasOrdenadas = [...personas].sort((a, b) => {
    // Primero por distancia
    const distanciaA = a.distancia?.toLowerCase();
    const distanciaB = b.distancia?.toLowerCase();
    const ordenA = ordenDistancias[distanciaA] || 5;
    const ordenB = ordenDistancias[distanciaB] || 5;

    if (ordenA !== ordenB) return ordenA - ordenB;

    // Luego por tiempo (los sin tiempo van al final)
    if (!a.tiempo) return 1;
    if (!b.tiempo) return -1;

    return timeToSeconds(a.tiempo) - timeToSeconds(b.tiempo);
  });

  // Calculamos posiciones por distancia
  const personasConPosicion = [];
  const contadoresPorDistancia = {};

  personasOrdenadas.forEach((persona) => {
    const distancia = persona.distancia?.toLowerCase();

    if (distancia in ordenDistancias) {
      if (!contadoresPorDistancia[distancia]) {
        contadoresPorDistancia[distancia] = 0;
      }
      contadoresPorDistancia[distancia]++;
      personasConPosicion.push({
        ...persona,
        posicion: `${contadoresPorDistancia[distancia]}°`,
      });
    } else {
      personasConPosicion.push({
        ...persona,
        posicion: "-",
      });
    }
  });

  return (
    <>
      <section className="body-puntaje">
        <div className="pts-head-container">
          <div className="obj1"></div>
          <div className="obj2">
            <div className="title-div title underline" style={{ marginTop: 0 }}>
              <svg
                className="title-svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7544 0.773438C12.5243 0.300781 12.0382 0 11.5044 0C10.9705 0 10.4887 0.300781 10.2544 0.773438L7.46356 6.4582L1.23092 7.36914C0.710085 7.44648 0.276057 7.80742 0.115467 8.30156C-0.0451236 8.7957 0.0850846 9.34141 0.458348 9.70664L4.98092 14.1367L3.91321 20.3973C3.8264 20.9129 4.04342 21.4371 4.47311 21.7422C4.90279 22.0473 5.47137 22.0859 5.94012 21.841L11.5087 18.8977L17.0773 21.841C17.546 22.0859 18.1146 22.0516 18.5443 21.7422C18.974 21.4328 19.191 20.9129 19.1042 20.3973L18.0321 14.1367L22.5547 9.70664C22.928 9.34141 23.0625 8.7957 22.8976 8.30156C22.7327 7.80742 22.303 7.44648 21.7821 7.36914L15.5452 6.4582L12.7544 0.773438Z" />
              </svg>
              PUNTAJES CORREDORES
            </div>
          </div>
          <div className="obj3">
            <PrintButton />
          </div>
        </div>
        <div className="table-container" style={{ height: "75vh" }}>
          <table className="corredores-table">
            <thead className="corredores-encabezado">
              <tr>
                <th className="bold thPos">Pos</th>
                <th className="bold thNombre">Nombre</th>
                <th className="bold thSexo">Sexo</th>
                <th className="bold thDistancia">Dist</th>
                <th className="bold thNro">Nro</th>
                <th className="bold thClub">Club</th>
                <th className="bold thTiempo">Tiempo</th>
                <th className="bold thPuntaje">Pts</th>
              </tr>
            </thead>
            <tbody>
              {personasConPosicion.map((persona, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "var(--Orange-150)"
                        : "var(--Orange-250)",
                  }}>
                  <td>{persona.posicion}</td>
                  <td>{persona.nombre}</td>
                  <td>{persona.sexo}</td>
                  <td>{persona.distancia}</td>
                  <td>{persona.nro}</td>
                  <td>{persona.club}</td>
                  <td>{persona.tiempo}</td>
                  <td>{persona.puntaje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default PtsCorredores;
