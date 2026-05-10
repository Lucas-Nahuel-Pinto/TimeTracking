// March 2026 business days (Monday to Friday only)
// March 2026: 1st is Sunday, 31st is Tuesday
// Weekends: 1, 7, 8, 14, 15, 21, 22, 28, 29

const MARCH_2026_BUSINESS_DAYS = [
  2, 3, 4, 5, 6,       // Week 1: Mon-Fri
  9, 10, 11, 12, 13,   // Week 2: Mon-Fri
  16, 17, 18, 19, 20,  // Week 3: Mon-Fri
  23, 24, 25, 26, 27,  // Week 4: Mon-Fri
  30, 31               // Week 5: Mon-Tue
]

export function getMarch2026BusinessDays(): string[] {
  return MARCH_2026_BUSINESS_DAYS.map(day => {
    const dayStr = day.toString().padStart(2, '0')
    return `2026-03-${dayStr}`
  })
}

export function isBusinessDay(date: string): boolean {
  const businessDays = getMarch2026BusinessDays()
  return businessDays.includes(date)
}

export function getTotalBusinessDays(): number {
  return MARCH_2026_BUSINESS_DAYS.length // 22 days
}

export function formatDateForDisplay(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  
  const dayName = dayNames[date.getDay()]
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  
  return `${dayName} ${day} de ${month}`
}

export function getShortDateDisplay(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  const day = date.getDate()
  return `${day} Mar`
}
