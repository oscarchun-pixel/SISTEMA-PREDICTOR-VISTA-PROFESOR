"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, TrendingUp, AlertCircle, Users } from "lucide-react"

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

interface EvaluationReportProps {
  students: Student[]
}

export function EvaluationReport({ students }: EvaluationReportProps) {
  const evaluatedStudents = students.filter((s) => s.results)

  const getPerformanceIcon = (calificacion: string) => {
    if (calificacion === "alto") return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
    if (calificacion === "regular") return <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
    return <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
  }

  const getRiskColor = (riesgo: string) => {
    if (riesgo === "bajo") return "bg-green-100 dark:bg-green-950/20"
    if (riesgo === "medio") return "bg-amber-100 dark:bg-amber-950/20"
    return "bg-red-100 dark:bg-red-950/20"
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground font-medium">Total Evaluados</p>
          <p className="text-3xl font-bold text-primary mt-2">{evaluatedStudents.length}</p>
        </div>
        <div className="bg-white dark:bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground font-medium">Alto Rendimiento</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            {evaluatedStudents.filter((s) => s.results?.calificacion === "alto").length}
          </p>
        </div>
        <div className="bg-white dark:bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground font-medium">Rendimiento Regular</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">
            {evaluatedStudents.filter((s) => s.results?.calificacion === "regular").length}
          </p>
        </div>
        <div className="bg-white dark:bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground font-medium">Bajo Rendimiento</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
            {evaluatedStudents.filter((s) => s.results?.calificacion === "bajo").length}
          </p>
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Reporte de Evaluaciones</CardTitle>
              <CardDescription>Todos los estudiantes evaluados y sus resultados</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Nombre</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Grupo</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Asistencia</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Sueño</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Estudio</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Salud Mental</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Rendimiento</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Score</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Riesgo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {evaluatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">Grupo {student.group}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <p className="font-semibold text-orange-600 dark:text-orange-400">
                          {student.evaluation?.asistencia}%
                        </p>
                        <p className="text-xs text-muted-foreground">{student.results?.detalles?.asistencia}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {student.evaluation?.horasSueno} hrs
                        </p>
                        <p className="text-xs text-muted-foreground">{student.results?.detalles?.sueno}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          {student.evaluation?.horasEstudio} hrs
                        </p>
                        <p className="text-xs text-muted-foreground">{student.results?.detalles?.estudio}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <p className="font-semibold text-rose-600 dark:text-rose-400">
                          {student.evaluation?.saludMental}/10
                        </p>
                        <p className="text-xs text-muted-foreground">{student.results?.detalles?.saludMental}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getPerformanceIcon(student.results?.calificacion || "")}
                        <span className="font-semibold capitalize text-sm text-foreground">
                          {student.results?.calificacion}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-primary/10 text-primary border border-primary/20">
                        {student.results?.score}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${getRiskColor(student.results?.riesgo || "")} text-foreground capitalize`}>
                        {student.results?.riesgo}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {evaluatedStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay estudiantes evaluados aún</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
