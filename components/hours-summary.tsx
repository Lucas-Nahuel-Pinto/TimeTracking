"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getTotalBusinessDays } from "@/lib/business-days"
import { Clock, Calendar, TrendingUp } from "lucide-react"

interface HoursSummaryProps {
  totalHours: number
  daysRegistered: number
}

export function HoursSummary({ totalHours, daysRegistered }: HoursSummaryProps) {
  const totalBusinessDays = getTotalBusinessDays()
  const averageHours = daysRegistered > 0 ? (totalHours / daysRegistered).toFixed(1) : "0"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary rounded-md">
              <Clock className="h-5 w-5 text-foreground" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Horas</p>
              <p className="text-2xl font-bold">{totalHours}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary rounded-md">
              <Calendar className="h-5 w-5 text-foreground" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Días Registrados</p>
              <p className="text-2xl font-bold">
                {daysRegistered}
                <span className="text-sm font-normal text-muted-foreground">
                  /{totalBusinessDays}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary rounded-md">
              <TrendingUp className="h-5 w-5 text-foreground" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Promedio Diario</p>
              <p className="text-2xl font-bold">{averageHours}h</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
