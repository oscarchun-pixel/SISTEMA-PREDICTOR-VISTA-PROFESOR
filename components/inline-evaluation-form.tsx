"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { predictPerformance } from "@/lib/predictor"

interface Student {
  id: string
  name: string
}

interface InlineEvaluationFormProps {
  student: Student
  onClose: () => void
  onSubmit: (evaluation: any) => void
}

export function InlineEvaluationForm({ student, onClose, onSubmit }: InlineEvaluationFormProps) {
  const [formData, setFormData] = useState({
    asistencia: "",
    horasSueno: "",
    horasEstudio: "",
    saludMental: "",
  })

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

    const evaluationData = {
      ...prediction,
      evaluation: {
        asistencia: formData.asistencia,
        horasSueno: formData.horasSueno,
        horasEstudio: formData.horasEstudio,
        saludMental: formData.saludMental,
      },
    }

    onSubmit(evaluationData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Porcentaje de Asistencia */}
        <div className="space-y-2">
          <Label htmlFor="asistencia" className="text-sm font-medium">
            Asistencia (0-100)
          </Label>
          <Input
            id="asistencia"
            name="asistencia"
            type="text"
            inputMode="numeric"
            placeholder="Ej: 85"
            value={formData.asistencia}
            onChange={handleInputChange}
            className="bg-white dark:bg-card"
          />
        </div>

        {/* Horas de Sueño */}
        <div className="space-y-2">
          <Label htmlFor="horasSueno" className="text-sm font-medium">
            Sueño (0-10)
          </Label>
          <Input
            id="horasSueno"
            name="horasSueno"
            type="text"
            inputMode="numeric"
            placeholder="Ej: 7"
            value={formData.horasSueno}
            onChange={handleInputChange}
            className="bg-white dark:bg-card"
          />
        </div>

        {/* Horas de Estudio */}
        <div className="space-y-2">
          <Label htmlFor="horasEstudio" className="text-sm font-medium">
            Estudio (0-9)
          </Label>
          <Input
            id="horasEstudio"
            name="horasEstudio"
            type="text"
            inputMode="numeric"
            placeholder="Ej: 4"
            value={formData.horasEstudio}
            onChange={handleInputChange}
            className="bg-white dark:bg-card"
          />
        </div>

        {/* Salud Mental */}
        <div className="space-y-2">
          <Label htmlFor="saludMental" className="text-sm font-medium">
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
            className="bg-white dark:bg-card"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Evaluar Estudiante
        </Button>
      </div>
    </form>
  )
}
