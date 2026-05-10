import { TimeTracker } from "@/components/time-tracker"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            TimeTracking
          </h1>
          <p className="text-muted-foreground mt-1">
            Registro de horas - Marzo 2026..
          </p>
        </header>
        
        <TimeTracker />
        
        <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>Solo días hábiles (Lunes a Viernes)</p>
          <p className="mt-1">22 días hábiles en Marzo 2026</p>
        </footer>
      </div>
    </main>
  )
}
