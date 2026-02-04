import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/apis')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="md:m-16 m-2 border-t pt-8">
      <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
      <div className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <code className="text-sm">GET /api/demots</code>
          <p className="text-sm text-muted-foreground mt-2">
            Returns all demotivational quotes
          </p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <code className="text-sm">GET /api/demots/:id</code>
          <p className="text-sm text-muted-foreground mt-2">
            Returns a specific quote by ID (e.g., /api/demots/1)
          </p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <code className="text-sm">GET /api/demots/random</code>
          <p className="text-sm text-muted-foreground mt-2">
            Returns a random quote
          </p>
        </div>
      </div>
    </div>
  )
}
