"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentGroup } from "@/components/student-group"
import { PredictionForm } from "@/components/prediction-form"
import { ResultsDashboard } from "@/components/results-dashboard"
import { studentNames } from "@/lib/student-names"
import { BookOpen, BarChart3 } from "lucide-react"

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

const initialStudents: Student[] = studentNames.map((student, index) => ({
  id: `std-${student.group}-${index + 1}`,
  name: student.name,
  email: `${student.name.toLowerCase().replace(/\s+/g, ".")}.est@universidad.edu`,
  group: student.group,
}))

export function StudentDashboard() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showResults, setShowResults] = useState(false)

  const updateStudentResults = (studentId: string, results: any) => {
    setStudents(students.map((s) => (s.id === studentId ? { ...s, results } : s)))
    setSelectedStudent(null)
  }

  const getGroupStats = (groupNum: number) => {
    const groupStudents = students.filter((s) => s.group === groupNum)
    const withResults = groupStudents.filter((s) => s.results)
    return {
      total: groupStudents.length,
      evaluated: withResults.length,
      alto: withResults.filter((s) => s.results?.calificacion === "alto").length,
      regular: withResults.filter((s) => s.results?.calificacion === "regular").length,
      bajo: withResults.filter((s) => s.results?.calificacion === "bajo").length,
    }
  }

  const totalStats = {
    total: students.length,
    evaluated: students.filter((s) => s.results).length,
    alto: students.filter((s) => s.results?.calificacion === "alto").length,
    regular: students.filter((s) => s.results?.calificacion === "regular").length,
    bajo: students.filter((s) => s.results?.calificacion === "bajo").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-gradient-to-br from-primary to-accent rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Sistema Predictor</h1>
              <p className="text-lg text-muted-foreground mt-1">Rendimiento Académico - 5to Ciclo Sistemas</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white dark:bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">Total Estudiantes</p>
              <p className="text-3xl font-bold text-primary mt-1">{totalStats.total}</p>
            </div>
            <div className="bg-white dark:bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground font-medium">Evaluados</p>
              <p className="text-3xl font-bold text-accent mt-1">{totalStats.evaluated}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300 font-medium">Alto Rendimiento</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{totalStats.alto}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">Por Mejorar</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {totalStats.regular + totalStats.bajo}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setShowResults(false)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              !showResults
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Estudiantes
          </button>
          <button
            onClick={() => setShowResults(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              showResults
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Análisis
          </button>
        </div>

        {!showResults ? (
          <>
            {/* Tabs por grupo */}
            <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <Tabs defaultValue="grupo1" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border rounded-none">
                  <TabsTrigger
                    value="grupo1"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Grupo 1 ({getGroupStats(1).total})
                  </TabsTrigger>
                  <TabsTrigger
                    value="grupo2"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Grupo 2 ({getGroupStats(2).total})
                  </TabsTrigger>
                  <TabsTrigger
                    value="grupo3"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Grupo 3 ({getGroupStats(3).total})
                  </TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent value="grupo1" className="space-y-4 mt-0">
                    <StudentGroup
                      groupNum={1}
                      students={students.filter((s) => s.group === 1)}
                      stats={getGroupStats(1)}
                      onSelectStudent={setSelectedStudent}
                      selectedStudent={selectedStudent}
                    />
                  </TabsContent>

                  <TabsContent value="grupo2" className="space-y-4 mt-0">
                    <StudentGroup
                      groupNum={2}
                      students={students.filter((s) => s.group === 2)}
                      stats={getGroupStats(2)}
                      onSelectStudent={setSelectedStudent}
                      selectedStudent={selectedStudent}
                    />
                  </TabsContent>

                  <TabsContent value="grupo3" className="space-y-4 mt-0">
                    <StudentGroup
                      groupNum={3}
                      students={students.filter((s) => s.group === 3)}
                      stats={getGroupStats(3)}
                      onSelectStudent={setSelectedStudent}
                      selectedStudent={selectedStudent}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Prediction Form */}
            {selectedStudent && (
              <PredictionForm
                student={selectedStudent}
                onClose={() => setSelectedStudent(null)}
                onResults={(results) => updateStudentResults(selectedStudent.id, results)}
              />
            )}
          </>
        ) : (
          <ResultsDashboard students={students} />
        )}
      </div>
    </div>
  )
}
