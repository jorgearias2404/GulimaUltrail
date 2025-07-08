import PrintButton from "../UI/PRINT/PrintButton";

function PtsClubs({ clubs }) {
  return (
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
            PUNTAJES CLUBS
          </div>
        </div>
        <div className="obj3">
          <PrintButton />
        </div>
      </div>
      <div className="table-container">
        <table className="corredores-table">
          <thead className="corredores-encabezado">
            <tr className="list-titles">
              <th className="bold thPos">Pos</th>
              <th className="bold">Club</th>
              <th className="bold">Puntaje</th>
              <th className="thMiembros bold">Miembros</th>
              <th className="bold">Promedio</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "var(--Orange-150)" : "var(--Orange-250)",
                }}>
                <td>{index + 1}°</td>
                <td>{club.nombre}</td>
                <td>{club.puntajeTotal}</td>
                <td>{club.miembros}</td>
                <td>{club.puntaje}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PtsClubs;
