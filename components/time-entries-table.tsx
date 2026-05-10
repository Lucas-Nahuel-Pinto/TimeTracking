"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateForDisplay, getShortDateDisplay } from "@/lib/business-days"
import { TimeEntry } from "@/lib/types"
import { Pencil, Trash2 } from "lucide-react"

interface TimeEntriesTableProps {
  entries: TimeEntry[]
  onEdit: (entry: TimeEntry) => void
  onDelete: (id: string) => void
}

export function TimeEntriesTable({ entries, onEdit, onDelete }: TimeEntriesTableProps) {
  const sortedEntries = [...entries].sort((a, b) => a.date.localeCompare(b.date))

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Registros de Horas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No hay registros. Agrega tu primer registro de horas.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Registros de Horas</CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        {/* Mobile: Card view */}
        <div className="sm:hidden divide-y">
          {sortedEntries.map(entry => (
            <div key={entry.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{getShortDateDisplay(entry.date)}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDateForDisplay(entry.date).split(' ')[0]}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg">{entry.hours}h</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(entry)}
                    aria-label={`Editar registro del ${formatDateForDisplay(entry.date)}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(entry.id)}
                    aria-label={`Eliminar registro del ${formatDateForDisplay(entry.date)}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table view */}
        <div className="hidden sm:block">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground" scope="col">
                  Fecha
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground" scope="col">
                  Horas
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground" scope="col">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map(entry => (
                <tr key={entry.id} className="border-b last:border-0">
                  <td className="py-3 px-4">
                    <span className="font-medium">{formatDateForDisplay(entry.date)}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {entry.hours} horas
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(entry)}
                        aria-label={`Editar registro del ${formatDateForDisplay(entry.date)}`}
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(entry.id)}
                        aria-label={`Eliminar registro del ${formatDateForDisplay(entry.date)}`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
