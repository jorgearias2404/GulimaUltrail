import React, { useMemo } from "react";
import PtsCorredores from "./PtsCorredores";
import PtsClubs from "./PtsClubs";

function CalculoPuntajes({ personas, vistaActiva }) {
  // Función para convertir tiempo a segundos (igual que en tu código original)
  const timeToSeconds = (timeStr) => {
    if (!timeStr) return Infinity;
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  };

  // Función para calcular puntaje UTMB (igual que en tu código original)
  const calcularPuntajeUTMB = (tiempoCorredorSeg, tiempoMejorSeg) => {
    const ratioTiempo = tiempoCorredorSeg / tiempoMejorSeg;
    const penalizador = Math.pow(ratioTiempo, 2.2);
    return Math.round(100 / penalizador);
  };

  // Calculamos puntajes de corredores
  const { corredoresConPuntaje, clubsConPuntaje } = useMemo(() => {
    // Paso 1: Calcular puntajes de corredores
    const distancias = ["45k", "21k", "11k"];
    const corredoresConPuntaje = [];
    const clubesMap = {};

    distancias.forEach((distancia) => {
      const grupo = personas.filter(
        (p) => p.distancia === distancia && p.tiempo
      );
      if (grupo.length === 0) return;

      const mejorTiempoSeg = Math.min(
        ...grupo.map((p) => timeToSeconds(p.tiempo))
      );

      grupo.forEach((p) => {
        const tiempoSeg = timeToSeconds(p.tiempo);
        const puntaje = calcularPuntajeUTMB(tiempoSeg, mejorTiempoSeg);
        const corredorConPuntaje = { ...p, puntaje };
        corredoresConPuntaje.push(corredorConPuntaje);

        if (p.club) {
          if (!clubesMap[p.club]) {
            clubesMap[p.club] = {
              nombre: p.club,
              puntajeTotal: 0, // Cambiado de puntaje a puntajeTotal
              miembros: 0,
              puntajes: [], // Array para almacenar puntajes individuales
            };
          }
          clubesMap[p.club].puntajeTotal += puntaje;
          clubesMap[p.club].miembros++;
          clubesMap[p.club].puntajes.push(puntaje); // Almacenamos cada puntaje
        }
      });
    });

    // Agregar corredores sin tiempo
    const sinTiempo = personas
      .filter((p) => !p.tiempo || !distancias.includes(p.distancia))
      .map((p) => ({ ...p, puntaje: "-" }));
    corredoresConPuntaje.push(...sinTiempo);

    // Ordenar corredores
    const valorDistancia = (dist) => parseInt(dist?.replace("k", "")) || 0;
    corredoresConPuntaje.sort((a, b) => {
      const distA = valorDistancia(a.distancia);
      const distB = valorDistancia(b.distancia);
      if (distA !== distB) return distA - distB;
      return timeToSeconds(a.tiempo) - timeToSeconds(b.tiempo);
    });

    // Convertir clubesMap a array y ordenar
    const clubsConPuntaje = Object.values(clubesMap)
      .filter((club) => {
        // Filtramos "INDEPENDIENTE" (en cualquier formato de mayúsculas/minúsculas)
        return club.nombre.toUpperCase() !== "INDEPENDIENTE";
      })
      .map((club) => ({
        nombre: club.nombre,
        puntaje:
          club.miembros > 0 ? Math.round(club.puntajeTotal / club.miembros) : 0,
        miembros: club.miembros,
        puntajeTotal: club.puntajeTotal,
      }))
      .sort((a, b) => b.puntaje - a.puntaje);

    return { corredoresConPuntaje, clubsConPuntaje };
  }, [personas]);

  return (
    <div className="puntajes-container">
      {vistaActiva === "corredores" && (
        <PtsCorredores personas={corredoresConPuntaje} />
      )}
      {vistaActiva === "clubs" && <PtsClubs clubs={clubsConPuntaje} />}
      {vistaActiva === "null" && (
        <div className="vista-inicial">
          <p>Selecciona una vista para mostrar los resultados</p>
        </div>
      )}
    </div>
  );
}

export default CalculoPuntajes;
