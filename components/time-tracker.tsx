"use client"

import { useState, useEffect } from "react"
import { TimeEntryForm } from "@/components/time-entry-form"
import { TimeEntriesTable } from "@/components/time-entries-table"
import { HoursSummary } from "@/components/hours-summary"
import { TimeEntry } from "@/lib/types"
import { getEntries, addEntry, updateEntry, deleteEntry } from "@/lib/storage"

export function TimeTracker() {
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setEntries(getEntries())
    setIsLoaded(true)
  }, [])

  const handleSubmit = (date: string, hours: number) => {
    if (editingEntry) {
      const updated = updateEntry(editingEntry.id, hours)
      if (updated) {
        setEntries(getEntries())
        setEditingEntry(null)
      }
    } else {
      addEntry(date, hours)
      setEntries(getEntries())
    }
  }

  const handleEdit = (entry: TimeEntry) => {
    setEditingEntry(entry)
  }

  const handleDelete = (id: string) => {
    if (deleteEntry(id)) {
      setEntries(getEntries())
      if (editingEntry?.id === id) {
        setEditingEntry(null)
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingEntry(null)
  }

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)
  const existingDates = entries.map(e => e.date)

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-24 bg-muted animate-pulse rounded-lg" />
        <div className="h-48 bg-muted animate-pulse rounded-lg" />
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <HoursSummary totalHours={totalHours} daysRegistered={entries.length} />
      
      <TimeEntryForm
        existingDates={existingDates}
        editingEntry={editingEntry}
        onSubmit={handleSubmit}
        onCancelEdit={handleCancelEdit}
      />
      
      <TimeEntriesTable
        entries={entries}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
