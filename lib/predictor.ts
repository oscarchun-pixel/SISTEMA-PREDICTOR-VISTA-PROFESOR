// Rango de asistencia: BAJA (0-50), REGULAR (50-70), FRECUENTE (70-100)
function getAsistenciaLevel(value: number): string {
  if (value < 50) return "baja"
  if (value < 70) return "regular"
  return "frecuente"
}

// Horas de sueño: INSUFICIENTES (0-6), ADECUADAS (6-8), EXCESIVO (8-10)
function getSuenoLevel(value: number): string {
  if (value < 6) return "insuficientes"
  if (value <= 8) return "adecuadas"
  return "excesivo"
}

// Horas de estudio: POCAS (0-2), MODERADAS (2-6), MUCHAS (6-9)
function getEstudioLevel(value: number): string {
  if (value < 2) return "pocas"
  if (value < 6) return "moderadas"
  return "muchas"
}

// Salud mental: MALA (0-2), MEDIA (2-6), BUENA (6-10)
function getSaludMentalLevel(value: number): string {
  if (value < 2) return "mala"
  if (value < 6) return "media"
  return "buena"
}

export function predictPerformance(inputs: {
  asistencia: number
  horasSueno: number
  horasEstudio: number
  saludMental: number
}) {
  let score = 0
  let riesgoDesercion = "bajo"

  // Score por asistencia (0-25 puntos)
  const asistenciaLevel = getAsistenciaLevel(inputs.asistencia)
  if (asistenciaLevel === "frecuente") score += 25
  else if (asistenciaLevel === "regular") score += 15
  else score += 5

  // Score por sueño (0-25 puntos)
  const suenoLevel = getSuenoLevel(inputs.horasSueno)
  if (suenoLevel === "adecuadas") score += 25
  else if (suenoLevel === "insuficientes") score += 8
  else score += 15 // excesivo

  // Score por estudio (0-25 puntos)
  const estudioLevel = getEstudioLevel(inputs.horasEstudio)
  if (estudioLevel === "muchas") score += 25
  else if (estudioLevel === "moderadas") score += 18
  else score += 8

  // Score por salud mental (0-25 puntos)
  const saludLevel = getSaludMentalLevel(inputs.saludMental)
  if (saludLevel === "buena") score += 25
  else if (saludLevel === "media") score += 15
  else score += 5

  // Determinar calificación según score
  let calificacion = "bajo"
  if (score >= 70) {
    calificacion = "alto"
    riesgoDesercion = "bajo"
  } else if (score >= 50) {
    calificacion = "regular"
    riesgoDesercion = "medio"
  } else {
    calificacion = "bajo"
    riesgoDesercion = "alto"
  }

  // Lógica adicional para riesgo de deserción
  if (asistenciaLevel === "baja" || suenoLevel === "insuficientes" || saludLevel === "mala") {
    if (riesgoDesercion === "bajo") riesgoDesercion = "medio"
    else if (riesgoDesercion === "medio") riesgoDesercion = "alto"
  }

  return {
    calificacion,
    riesgo: riesgoDesercion,
    score,
    detalles: {
      asistencia: asistenciaLevel,
      sueno: suenoLevel,
      estudio: estudioLevel,
      saludMental: saludLevel,
    },
  }
}
