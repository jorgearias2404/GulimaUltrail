export function marcarAbsolutos(personasList) {
  const copiaPersonas = JSON.parse(JSON.stringify(personasList));

  // Función para convertir tiempo a segundos
  const tiempoASegundos = (tiempo) => {
    if (!tiempo) return Infinity;
    const [horas, minutos, segundos] = tiempo.split(":").map(Number);
    return horas * 3600 + minutos * 60 + segundos;
  };

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
}
