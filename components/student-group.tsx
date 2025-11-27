"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  group: number
  results?: {
    calificacion: string
    riesgo: string
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
}

export function StudentGroup({ groupNum, students, stats, onSelectStudent, selectedStudent }: StudentGroupProps) {
  const getResultBadge = (calificacion?: string) => {
    if (!calificacion)
      return (
        <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          No evaluado
        </Badge>
      )
    if (calificacion === "alto")
      return (
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Alto
        </Badge>
      )
    if (calificacion === "regular")
      return (
        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
          <TrendingUp className="w-3 h-3 mr-1" /> Regular
        </Badge>
      )
    return (
      <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs">
        <AlertCircle className="w-3 h-3 mr-1" /> Bajo
      </Badge>
    )
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
              <div
                key={student.id}
                onClick={() => onSelectStudent(student)}
                className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-200 ${
                  selectedStudent?.id === student.id
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary"
                    : "hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/25 hover:border-l-4 hover:border-muted"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{student.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                </div>
                <div className="ml-4 flex-shrink-0">{getResultBadge(student.results?.calificacion)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
