import { Button } from '@/components/shadcn/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Demotivational Quotes</h1>
        <p className="text-muted-foreground text-lg">
          Because sometimes you need a reality check
        </p>
        <Link to="/quote" className="mt-10 inline-block">
          <Button variant={'outline'}>View Quotes</Button>
        </Link>
      </div>
    </div>
  )
}
