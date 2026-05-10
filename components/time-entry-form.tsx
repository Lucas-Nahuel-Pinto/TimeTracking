"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMarch2026BusinessDays, formatDateForDisplay } from "@/lib/business-days"
import { TimeEntry } from "@/lib/types"
import { Plus, Save, X } from "lucide-react"

interface TimeEntryFormProps {
  existingDates: string[]
  editingEntry: TimeEntry | null
  onSubmit: (date: string, hours: number) => void
  onCancelEdit: () => void
}

export function TimeEntryForm({ existingDates, editingEntry, onSubmit, onCancelEdit }: TimeEntryFormProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [hours, setHours] = useState("")
  const [error, setError] = useState("")

  const businessDays = getMarch2026BusinessDays()
  const availableDates = editingEntry 
    ? businessDays 
    : businessDays.filter(date => !existingDates.includes(date))

  useEffect(() => {
    if (editingEntry) {
      setSelectedDate(editingEntry.date)
      setHours(editingEntry.hours.toString())
      setError("")
    } else {
      setSelectedDate("")
      setHours("")
      setError("")
    }
  }, [editingEntry])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!selectedDate) {
      setError("Selecciona una fecha")
      return
    }

    const hoursNum = parseFloat(hours)
    if (isNaN(hoursNum) || hoursNum <= 0 || hoursNum > 24) {
      setError("Las horas deben ser entre 0.1 y 24")
      return
    }

    onSubmit(selectedDate, hoursNum)
    setSelectedDate("")
    setHours("")
  }

  const handleCancel = () => {
    setSelectedDate("")
    setHours("")
    setError("")
    onCancelEdit()
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">
          {editingEntry ? "Editar Registro" : "Agregar Horas"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <select
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={!!editingEntry}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Seleccionar fecha"
            >
              <option value="">Seleccionar fecha...</option>
              {availableDates.map(date => (
                <option key={date} value={date}>
                  {formatDateForDisplay(date)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours">Horas trabajadas</Label>
            <Input
              id="hours"
              type="number"
              step="0.5"
              min="0.5"
              max="24"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="8"
              aria-describedby={error ? "hours-error" : undefined}
            />
          </div>

          {error && (
            <p id="hours-error" className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {editingEntry ? (
                <>
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Guardar
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Agregar
                </>
              )}
            </Button>
            {editingEntry && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Cancelar edición</span>
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
