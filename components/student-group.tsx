"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, AlertCircle, CheckCircle2, Edit2 } from "lucide-react"
import { useState } from "react"
import { InlineEvaluationForm } from "./inline-evaluation-form"
import { Button } from "@/components/ui/button"

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

interface StudentGroupProps {
  groupNum: number
  students: Student[]
  stats: {
    total: number
    evaluated: number
    alto: number
    regular: number
    bajo: number
  }
  onSelectStudent: (student: Student) => void
  selectedStudent: Student | null
  onEvaluateStudent: (student: Student, evaluation: any) => void
}

export function StudentGroup({
  groupNum,
  students,
  stats,
  onSelectStudent,
  selectedStudent,
  onEvaluateStudent,
}: StudentGroupProps) {
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null)

  const getResultBadge = (calificacion?: string, score?: number) => {
    if (!calificacion)
      return (
        <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          No evaluado
        </Badge>
      )
    if (calificacion === "alto")
      return (
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Rendimiento: Alto {score && `(${score}%)`}
        </Badge>
      )
    if (calificacion === "regular")
      return (
        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
          <TrendingUp className="w-3 h-3 mr-1" /> Rendimiento: Regular {score && `(${score}%)`}
        </Badge>
      )
    return (
      <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs">
        <AlertCircle className="w-3 h-3 mr-1" /> Rendimiento: Bajo {score && `(${score}%)`}
      </Badge>
    )
  }

  const getRiskBadge = (riesgo?: string) => {
    if (!riesgo) return null
    if (riesgo === "bajo") return <Badge className="bg-green-500/80 text-white text-xs">Bajo Riesgo</Badge>
    if (riesgo === "medio") return <Badge className="bg-amber-500/80 text-white text-xs">Riesgo Medio</Badge>
    return <Badge className="bg-red-500/80 text-white text-xs">Alto Riesgo</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300 font-semibold uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold uppercase tracking-wider">
            Evaluados
          </p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.evaluated}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <p className="text-xs text-green-700 dark:text-green-300 font-semibold uppercase tracking-wider">Alto</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.alto}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
          <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold uppercase tracking-wider">Regular</p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">{stats.regular}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <p className="text-xs text-red-700 dark:text-red-300 font-semibold uppercase tracking-wider">Bajo</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.bajo}</p>
        </div>
      </div>

      {/* Students List */}
      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-xl">Estudiantes - Grupo {groupNum}</CardTitle>
              <CardDescription>Haz clic para evaluar el rendimiento académico</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {students.map((student) => (
              <div key={student.id}>
                <div
                  onClick={() => setExpandedStudentId(expandedStudentId === student.id ? null : student.id)}
                  className={`cursor-pointer transition-all duration-200 hover:bg-accent/5 ${
                    expandedStudentId === student.id
                      ? "bg-primary/5 border-l-4 border-primary"
                      : "border-l-4 border-transparent"
                  }`}
                >
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="flex-shrink-0 min-w-48">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">
                        Nombre y Apellidos
                      </p>
                      <p className="font-bold text-lg text-foreground">{student.name}</p>
                    </div>

                    {student.evaluation && student.results ? (
                      <div className="flex-1 flex items-center gap-6 justify-start">
                        {/* Asistencia */}
                        <div className="flex flex-col items-center min-w-fit">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">
                            Asistencia
                          </p>
                          <p className="font-bold text-lg text-orange-600 dark:text-orange-400">
                            {student.evaluation.asistencia}%
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{student.results.detalles?.asistencia}</p>
                        </div>

                        {/* Horas de Sueño */}
                        <div className="flex flex-col items-center min-w-fit">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">Sueño</p>
                          <p className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                            {student.evaluation.horasSueno} hrs
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{student.results.detalles?.sueno}</p>
                        </div>

                        {/* Horas de Estudio */}
                        <div className="flex flex-col items-center min-w-fit">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">
                            Estudio
                          </p>
                          <p className="font-bold text-lg text-green-600 dark:text-green-400">
                            {student.evaluation.horasEstudio} hrs
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{student.results.detalles?.estudio}</p>
                        </div>

                        {/* Salud Mental */}
                        <div className="flex flex-col items-center min-w-fit">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">
                            Salud Mental
                          </p>
                          <p className="font-bold text-lg text-rose-600 dark:text-rose-400">
                            {student.evaluation.saludMental}/10
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{student.results.detalles?.saludMental}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1"></div>
                    )}

                    <div className="flex-shrink-0 flex items-center gap-2 min-w-fit">
                      {student.results && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedStudentId(expandedStudentId === student.id ? null : student.id)
                          }}
                          className="text-primary hover:bg-primary/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      )}
                      <div className="flex flex-col gap-2">
                        {student.results
                          ? getResultBadge(student.results.calificacion, student.results.score)
                          : getResultBadge()}
                        {student.results && student.results.riesgo && (
                          <div className="flex items-center gap-1 text-xs font-semibold">
                            <span className="text-muted-foreground">Riesgo:</span>
                            {student.results.riesgo === "bajo" && (
                              <Badge className="bg-green-500/80 text-white text-xs">Bajo (20%)</Badge>
                            )}
                            {student.results.riesgo === "medio" && (
                              <Badge className="bg-amber-500/80 text-white text-xs">Medio (50%)</Badge>
                            )}
                            {student.results.riesgo === "alto" && (
                              <Badge className="bg-red-500/80 text-white text-xs">Alto (80%)</Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {expandedStudentId === student.id && (
                  <div className="bg-gradient-to-b from-primary/5 to-transparent p-6 border-t border-primary/20">
                    <InlineEvaluationForm
                      student={student}
                      onClose={() => setExpandedStudentId(null)}
                      onSubmit={(evaluation) => {
                        onEvaluateStudent(student, evaluation)
                        setExpandedStudentId(null)
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
