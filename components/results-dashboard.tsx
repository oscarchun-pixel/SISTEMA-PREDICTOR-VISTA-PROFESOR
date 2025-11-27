"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface Student {
  id: string
  name: string
  email: string
  group: number
  evaluation?: {
    asistencia: number
    horasSueno: number
    horasEstudio: number
    saludMental: number
  }
  results?: {
    calificacion: string
    riesgo: string
    score?: number
    detalles?: {
      asistencia: string
      sueno: string
      estudio: string
      saludMental: string
    }
  }
}

interface ResultsDashboardProps {
  students: Student[]
}

export function ResultsDashboard({ students }: ResultsDashboardProps) {
  const evaluatedStudents = students.filter((s) => s.results)
  const totalEvaluated = evaluatedStudents.length

  const performanceCount = {
    alto: evaluatedStudents.filter((s) => s.results?.calificacion === "alto").length,
    regular: evaluatedStudents.filter((s) => s.results?.calificacion === "regular").length,
    bajo: evaluatedStudents.filter((s) => s.results?.calificacion === "bajo").length,
  }

  const riskCount = {
    bajo: evaluatedStudents.filter((s) => s.results?.riesgo === "bajo").length,
    medio: evaluatedStudents.filter((s) => s.results?.riesgo === "medio").length,
    alto: evaluatedStudents.filter((s) => s.results?.riesgo === "alto").length,
  }

  const groupStats = [1, 2, 3].map((groupNum) => {
    const groupStudents = students.filter((s) => s.group === groupNum)
    const groupEvaluated = groupStudents.filter((s) => s.results)
    return {
      grupo: `Grupo ${groupNum}`,
      total: groupStudents.length,
      evaluados: groupEvaluated.length,
      alto: groupEvaluated.filter((s) => s.results?.calificacion === "alto").length,
      regular: groupEvaluated.filter((s) => s.results?.calificacion === "regular").length,
      bajo: groupEvaluated.filter((s) => s.results?.calificacion === "bajo").length,
    }
  })

  const performanceData = [
    { name: "Alto Rendimiento", value: performanceCount.alto, fill: "#22c55e" },
    { name: "Rendimiento Regular", value: performanceCount.regular, fill: "#f59e0b" },
    { name: "Bajo Rendimiento", value: performanceCount.bajo, fill: "#ef4444" },
  ]

  const riskData = [
    { name: "Riesgo Bajo", value: riskCount.bajo, fill: "#22c55e" },
    { name: "Riesgo Medio", value: riskCount.medio, fill: "#f59e0b" },
    { name: "Riesgo Alto", value: riskCount.alto, fill: "#ef4444" },
  ]

  const [expandPerformance, setExpandPerformance] = useState(false)
  const [expandRisk, setExpandRisk] = useState(false)

  const studentsByPerformance = {
    alto: evaluatedStudents
      .filter((s) => s.results?.calificacion === "alto")
      .sort((a, b) => a.name.localeCompare(b.name)),
    regular: evaluatedStudents
      .filter((s) => s.results?.calificacion === "regular")
      .sort((a, b) => a.name.localeCompare(b.name)),
    bajo: evaluatedStudents
      .filter((s) => s.results?.calificacion === "bajo")
      .sort((a, b) => a.name.localeCompare(b.name)),
  }

  const studentsByRisk = {
    bajo: evaluatedStudents.filter((s) => s.results?.riesgo === "bajo").sort((a, b) => a.name.localeCompare(b.name)),
    medio: evaluatedStudents.filter((s) => s.results?.riesgo === "medio").sort((a, b) => a.name.localeCompare(b.name)),
    alto: evaluatedStudents.filter((s) => s.results?.riesgo === "alto").sort((a, b) => a.name.localeCompare(b.name)),
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Estudiantes Evaluados</p>
              <p className="text-3xl font-bold text-primary">{totalEvaluated}</p>
              <p className="text-xs text-muted-foreground mt-1">de {students.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Alto Rendimiento</p>
              <p className="text-3xl font-bold text-green-600">{performanceCount.alto}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {totalEvaluated > 0 ? Math.round((performanceCount.alto / totalEvaluated) * 100) : 0}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Rendimiento Regular</p>
              <p className="text-3xl font-bold text-amber-600">{performanceCount.regular}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {totalEvaluated > 0 ? Math.round((performanceCount.regular / totalEvaluated) * 100) : 0}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Bajo Rendimiento</p>
              <p className="text-3xl font-bold text-red-600">{performanceCount.bajo}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {totalEvaluated > 0 ? Math.round((performanceCount.bajo / totalEvaluated) * 100) : 0}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Rendimiento</CardTitle>
            <CardDescription>Cantidad de estudiantes por nivel de desempeño</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Riesgo de Deserción</CardTitle>
            <CardDescription>Evaluación del riesgo académico</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Group Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Comparación por Grupo</CardTitle>
          <CardDescription>Rendimiento de cada grupo de estudiantes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={groupStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grupo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="alto" stackId="a" fill="#22c55e" name="Alto" />
              <Bar dataKey="regular" stackId="a" fill="#f59e0b" name="Regular" />
              <Bar dataKey="bajo" stackId="a" fill="#ef4444" name="Bajo" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Overall Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas Detalladas</CardTitle>
          <CardDescription>Resumen por grupo de estudiantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">Grupo</th>
                  <th className="text-center py-2 px-4 font-semibold">Total</th>
                  <th className="text-center py-2 px-4 font-semibold">Evaluados</th>
                  <th className="text-center py-2 px-4 font-semibold">
                    <span className="text-green-600">Alto</span>
                  </th>
                  <th className="text-center py-2 px-4 font-semibold">
                    <span className="text-amber-600">Regular</span>
                  </th>
                  <th className="text-center py-2 px-4 font-semibold">
                    <span className="text-red-600">Bajo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupStats.map((stat, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{stat.grupo}</td>
                    <td className="py-3 px-4 text-center">{stat.total}</td>
                    <td className="py-3 px-4 text-center">{stat.evaluados}</td>
                    <td className="py-3 px-4 text-center text-green-600 font-medium">{stat.alto}</td>
                    <td className="py-3 px-4 text-center text-amber-600 font-medium">{stat.regular}</td>
                    <td className="py-3 px-4 text-center text-red-600 font-medium">{stat.bajo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setExpandPerformance(!expandPerformance)}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Listado de Estudiantes por Rendimiento</CardTitle>
              <CardDescription>Detalle completo de evaluación por cada estudiante</CardDescription>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandPerformance ? "rotate-180" : ""}`} />
          </div>
        </CardHeader>
        {expandPerformance && (
          <CardContent className="space-y-6">
            {/* Alto Rendimiento */}
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                Alto Rendimiento ({studentsByPerformance.alto.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-green-50 dark:bg-green-950/20">
                      <th className="text-left py-2 px-3 font-semibold">Estudiante</th>
                      <th className="text-center py-2 px-3 font-semibold">Grupo</th>
                      <th className="text-center py-2 px-3 font-semibold">Asistencia %</th>
                      <th className="text-center py-2 px-3 font-semibold">Sueño hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Estudio hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Salud Mental</th>
                      <th className="text-center py-2 px-3 font-semibold">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsByPerformance.alto.length > 0 ? (
                      studentsByPerformance.alto.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-green-50/50 dark:hover:bg-green-950/10">
                          <td className="py-3 px-3 font-medium">{student.name}</td>
                          <td className="py-3 px-3 text-center text-muted-foreground">G{student.group}</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.asistencia.toFixed(1) || "-"}%</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.horasSueno.toFixed(1) || "-"}</td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.horasEstudio.toFixed(1) || "-"}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.saludMental.toFixed(1) || "-"}/10
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-semibold">
                              {student.results?.score || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-4 px-3 text-center text-muted-foreground">
                          No hay estudiantes en este nivel
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rendimiento Regular */}
            <div>
              <h3 className="text-lg font-semibold text-amber-600 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-600 rounded-full"></span>
                Rendimiento Regular ({studentsByPerformance.regular.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-amber-50 dark:bg-amber-950/20">
                      <th className="text-left py-2 px-3 font-semibold">Estudiante</th>
                      <th className="text-center py-2 px-3 font-semibold">Grupo</th>
                      <th className="text-center py-2 px-3 font-semibold">Asistencia %</th>
                      <th className="text-center py-2 px-3 font-semibold">Sueño hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Estudio hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Salud Mental</th>
                      <th className="text-center py-2 px-3 font-semibold">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsByPerformance.regular.length > 0 ? (
                      studentsByPerformance.regular.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-amber-50/50 dark:hover:bg-amber-950/10">
                          <td className="py-3 px-3 font-medium">{student.name}</td>
                          <td className="py-3 px-3 text-center text-muted-foreground">G{student.group}</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.asistencia.toFixed(1) || "-"}%</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.horasSueno.toFixed(1) || "-"}</td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.horasEstudio.toFixed(1) || "-"}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.saludMental.toFixed(1) || "-"}/10
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full text-xs font-semibold">
                              {student.results?.score || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-4 px-3 text-center text-muted-foreground">
                          No hay estudiantes en este nivel
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bajo Rendimiento */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                Bajo Rendimiento ({studentsByPerformance.bajo.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-red-50 dark:bg-red-950/20">
                      <th className="text-left py-2 px-3 font-semibold">Estudiante</th>
                      <th className="text-center py-2 px-3 font-semibold">Grupo</th>
                      <th className="text-center py-2 px-3 font-semibold">Asistencia %</th>
                      <th className="text-center py-2 px-3 font-semibold">Sueño hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Estudio hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Salud Mental</th>
                      <th className="text-center py-2 px-3 font-semibold">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsByPerformance.bajo.length > 0 ? (
                      studentsByPerformance.bajo.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-red-50/50 dark:hover:bg-red-950/10">
                          <td className="py-3 px-3 font-medium">{student.name}</td>
                          <td className="py-3 px-3 text-center text-muted-foreground">G{student.group}</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.asistencia.toFixed(1) || "-"}%</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.horasSueno.toFixed(1) || "-"}</td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.horasEstudio.toFixed(1) || "-"}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.saludMental.toFixed(1) || "-"}/10
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-semibold">
                              {student.results?.score || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-4 px-3 text-center text-muted-foreground">
                          No hay estudiantes en este nivel
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setExpandRisk(!expandRisk)}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Listado de Estudiantes por Riesgo de Deserción</CardTitle>
              <CardDescription>Detalle completo de evaluación por cada estudiante</CardDescription>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandRisk ? "rotate-180" : ""}`} />
          </div>
        </CardHeader>
        {expandRisk && (
          <CardContent className="space-y-6">
            {/* Riesgo Bajo */}
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                Riesgo Bajo ({studentsByRisk.bajo.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-green-50 dark:bg-green-950/20">
                      <th className="text-left py-2 px-3 font-semibold">Estudiante</th>
                      <th className="text-center py-2 px-3 font-semibold">Grupo</th>
                      <th className="text-center py-2 px-3 font-semibold">Asistencia %</th>
                      <th className="text-center py-2 px-3 font-semibold">Sueño hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Estudio hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Salud Mental</th>
                      <th className="text-center py-2 px-3 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsByRisk.bajo.length > 0 ? (
                      studentsByRisk.bajo.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-green-50/50 dark:hover:bg-green-950/10">
                          <td className="py-3 px-3 font-medium">{student.name}</td>
                          <td className="py-3 px-3 text-center text-muted-foreground">G{student.group}</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.asistencia.toFixed(1) || "-"}%</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.horasSueno.toFixed(1) || "-"}</td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.horasEstudio.toFixed(1) || "-"}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.saludMental.toFixed(1) || "-"}/10
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-semibold">
                              Seguro
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-4 px-3 text-center text-muted-foreground">
                          No hay estudiantes en este nivel
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Riesgo Medio */}
            <div>
              <h3 className="text-lg font-semibold text-amber-600 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-600 rounded-full"></span>
                Riesgo Medio ({studentsByRisk.medio.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-amber-50 dark:bg-amber-950/20">
                      <th className="text-left py-2 px-3 font-semibold">Estudiante</th>
                      <th className="text-center py-2 px-3 font-semibold">Grupo</th>
                      <th className="text-center py-2 px-3 font-semibold">Asistencia %</th>
                      <th className="text-center py-2 px-3 font-semibold">Sueño hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Estudio hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Salud Mental</th>
                      <th className="text-center py-2 px-3 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsByRisk.medio.length > 0 ? (
                      studentsByRisk.medio.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-amber-50/50 dark:hover:bg-amber-950/10">
                          <td className="py-3 px-3 font-medium">{student.name}</td>
                          <td className="py-3 px-3 text-center text-muted-foreground">G{student.group}</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.asistencia.toFixed(1) || "-"}%</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.horasSueno.toFixed(1) || "-"}</td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.horasEstudio.toFixed(1) || "-"}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.saludMental.toFixed(1) || "-"}/10
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full text-xs font-semibold">
                              Alerta
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-4 px-3 text-center text-muted-foreground">
                          No hay estudiantes en este nivel
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Riesgo Alto */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                Riesgo Alto ({studentsByRisk.alto.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-red-50 dark:bg-red-950/20">
                      <th className="text-left py-2 px-3 font-semibold">Estudiante</th>
                      <th className="text-center py-2 px-3 font-semibold">Grupo</th>
                      <th className="text-center py-2 px-3 font-semibold">Asistencia %</th>
                      <th className="text-center py-2 px-3 font-semibold">Sueño hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Estudio hrs</th>
                      <th className="text-center py-2 px-3 font-semibold">Salud Mental</th>
                      <th className="text-center py-2 px-3 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsByRisk.alto.length > 0 ? (
                      studentsByRisk.alto.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-red-50/50 dark:hover:bg-red-950/10">
                          <td className="py-3 px-3 font-medium">{student.name}</td>
                          <td className="py-3 px-3 text-center text-muted-foreground">G{student.group}</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.asistencia.toFixed(1) || "-"}%</td>
                          <td className="py-3 px-3 text-center">{student.evaluation?.horasSueno.toFixed(1) || "-"}</td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.horasEstudio.toFixed(1) || "-"}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {student.evaluation?.saludMental.toFixed(1) || "-"}/10
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-semibold">
                              Crítico
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-4 px-3 text-center text-muted-foreground">
                          No hay estudiantes en este nivel
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
