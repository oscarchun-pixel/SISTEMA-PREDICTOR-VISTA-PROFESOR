"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { predictPerformance } from "@/lib/predictor"
import { FeedbackModal } from "@/components/feedback-modal"

interface Student {
  id: string
  name: string
}

interface PredictionFormProps {
  student: Student
  onClose: () => void
  onResults: (results: any) => void
}

export function PredictionForm({ student, onClose, onResults }: PredictionFormProps) {
  const [formData, setFormData] = useState({
    asistencia: "",
    horasSueno: "",
    horasEstudio: "",
    saludMental: "",
  })
  const [results, setResults] = useState<any>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number.parseFloat(value),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      formData.asistencia === "" ||
      formData.horasSueno === "" ||
      formData.horasEstudio === "" ||
      formData.saludMental === ""
    ) {
      alert("Por favor completa todos los campos")
      return
    }

    const prediction = predictPerformance({
      asistencia: formData.asistencia,
      horasSueno: formData.horasSueno,
      horasEstudio: formData.horasEstudio,
      saludMental: formData.saludMental,
    })

    setResults({
      ...prediction,
      evaluation: {
        asistencia: formData.asistencia,
        horasSueno: formData.horasSueno,
        horasEstudio: formData.horasEstudio,
        saludMental: formData.saludMental,
      },
    })
    setShowFeedback(true)
  }

  if (showFeedback && results) {
    return (
      <FeedbackModal
        student={student}
        results={results}
        onClose={() => {
          onResults(results)
          onClose()
        }}
      />
    )
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Evaluación de Rendimiento</DialogTitle>
          <DialogDescription>{student.name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Porcentaje de Asistencia */}
            <div className="space-y-2">
              <Label htmlFor="asistencia" className="text-base font-medium">
                Porcentaje de Asistencia (0-100)
              </Label>
              <Input
                id="asistencia"
                name="asistencia"
                type="text"
                inputMode="numeric"
                placeholder="Ej: 85"
                value={formData.asistencia}
                onChange={handleInputChange}
                className="bg-input"
              />
              <p className="text-xs text-muted-foreground">Bajo: 0-50 | Regular: 50-70 | Frecuente: 70-100</p>
            </div>

            {/* Horas de Sueño */}
            <div className="space-y-2">
              <Label htmlFor="horasSueno" className="text-base font-medium">
                Horas de Sueño (0-10)
              </Label>
              <Input
                id="horasSueno"
                name="horasSueno"
                type="text"
                inputMode="numeric"
                placeholder="Ej: 7"
                value={formData.horasSueno}
                onChange={handleInputChange}
                className="bg-input"
              />
              <p className="text-xs text-muted-foreground">Insuficientes: 0-6 | Adecuadas: 6-8 | Excesivas: 8-10</p>
            </div>

            {/* Horas de Estudio */}
            <div className="space-y-2">
              <Label htmlFor="horasEstudio" className="text-base font-medium">
                Horas de Estudio por Día (0-9)
              </Label>
              <Input
                id="horasEstudio"
                name="horasEstudio"
                type="text"
                inputMode="numeric"
                placeholder="Ej: 4"
                value={formData.horasEstudio}
                onChange={handleInputChange}
                className="bg-input"
              />
              <p className="text-xs text-muted-foreground">Pocas: 0-2 | Moderadas: 2-6 | Muchas: 6-9</p>
            </div>

            {/* Salud Mental */}
            <div className="space-y-2">
              <Label htmlFor="saludMental" className="text-base font-medium">
                Salud Mental (0-10)
              </Label>
              <Input
                id="saludMental"
                name="saludMental"
                type="text"
                inputMode="numeric"
                placeholder="Ej: 7"
                value={formData.saludMental}
                onChange={handleInputChange}
                className="bg-input"
              />
              <p className="text-xs text-muted-foreground">Mala: 0-2 | Media: 2-6 | Buena: 6-10</p>
            </div>
          </div>

          {/* Info Box */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-900">
                Ingresa los datos del estudiante para calcular su predicción de rendimiento académico y riesgo de
                deserción.
              </p>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Calcular Predicción
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
