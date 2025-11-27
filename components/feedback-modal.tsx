"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle, X } from "lucide-react"

interface FeedbackModalProps {
  student: {
    id: string
    name: string
  }
  results: {
    calificacion: string
    riesgo: string
    score: number
  }
  onClose: () => void
}

const feedbackMessages = {
  alto: {
    title: "Felicitaciones",
    icon: CheckCircle,
    color: "green",
    message: "Excelente rendimiento académico",
    advice: [
      "Mantén tus hábitos de estudio actuales",
      "Sigue dedicando el tiempo necesario al aprendizaje",
      "Preserva tu salud mental y descanso",
      "Considera ser tutor para otros compañeros",
    ],
  },
  regular: {
    title: "Rendimiento Regular",
    icon: AlertCircle,
    color: "amber",
    message: "Tienes potencial para mejorar",
    advice: [
      "Aumenta tus horas de estudio diarias",
      "Mejora tu asistencia a clases",
      "Busca apoyo en temas difíciles",
      "Cuida tu salud mental y descanso",
    ],
  },
  bajo: {
    title: "Bajo Rendimiento",
    icon: AlertCircle,
    color: "red",
    message: "Necesitas hacer cambios importantes",
    advice: [
      "Incrementa significativamente tus horas de estudio",
      "Asiste a todas las clases posibles",
      "Busca ayuda académica con tus profesores",
      "Considera apoyo psicológico si es necesario",
      "Crea un plan de mejora con objetivos claros",
    ],
  },
}

export function FeedbackModal({ student, results, onClose }: FeedbackModalProps) {
  const feedback = feedbackMessages[results.calificacion as keyof typeof feedbackMessages]
  const Icon = feedback.icon
  const colorClasses = {
    green: "bg-green-50 border-green-200 text-green-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    red: "bg-red-50 border-red-200 text-red-900",
  }
  const iconColors = {
    green: "text-green-600",
    amber: "text-amber-600",
    red: "text-red-600",
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-center flex-1 text-2xl">{feedback.title}</DialogTitle>
          <button
            onClick={onClose}
            className="rounded-lg hover:bg-gray-100 transition-colors p-2 absolute right-4 top-4"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Message */}
          <Card className={`border-2 ${colorClasses[feedback.color as keyof typeof colorClasses]}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Icon className={`w-8 h-8 flex-shrink-0 ${iconColors[feedback.color as keyof typeof iconColors]}`} />
                <div>
                  <p className="font-semibold text-lg">{feedback.message}</p>
                  <p className="text-sm mt-2 opacity-80">
                    Estudiante: <span className="font-medium">{student.name}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Calificación Predicha</p>
                  <p className="text-2xl font-bold text-blue-600 capitalize">{results.calificacion}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Riesgo de Deserción</p>
                  <p className="text-2xl font-bold text-purple-600 capitalize">{results.riesgo}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advice */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Recomendaciones para Mejora:</h3>
            <ul className="space-y-2">
              {feedback.advice.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      feedback.color === "green"
                        ? "bg-green-600"
                        : feedback.color === "amber"
                          ? "bg-amber-600"
                          : "bg-red-600"
                    }`}
                  />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Close Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button onClick={onClose} variant="outline" className="hover:bg-gray-100 bg-transparent">
              Cerrar
            </Button>
            <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
              Nueva Evaluación
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
