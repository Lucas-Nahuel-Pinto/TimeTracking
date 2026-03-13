import { TimeEntry } from './types'

const STORAGE_KEY = 'timetracking_entries'

export function getEntries(): TimeEntry[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function saveEntries(entries: TimeEntry[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function addEntry(date: string, hours: number): TimeEntry {
  const entries = getEntries()
  const now = new Date().toISOString()
  
  const newEntry: TimeEntry = {
    id: crypto.randomUUID(),
    date,
    hours,
    createdAt: now,
    updatedAt: now
  }
  
  entries.push(newEntry)
  saveEntries(entries)
  return newEntry
}

export function updateEntry(id: string, hours: number): TimeEntry | null {
  const entries = getEntries()
  const index = entries.findIndex(e => e.id === id)
  
  if (index === -1) return null
  
  entries[index] = {
    ...entries[index],
    hours,
    updatedAt: new Date().toISOString()
  }
  
  saveEntries(entries)
  return entries[index]
}

export function deleteEntry(id: string): boolean {
  const entries = getEntries()
  const filtered = entries.filter(e => e.id !== id)
  
  if (filtered.length === entries.length) return false
  
  saveEntries(filtered)
  return true
}

export function getEntryByDate(date: string): TimeEntry | undefined {
  const entries = getEntries()
  return entries.find(e => e.date === date)
}

export function getTotalHours(): number {
  const entries = getEntries()
  return entries.reduce((sum, entry) => sum + entry.hours, 0)
}
