import DemotIcon from '@/assets/demot-icon'
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

        <div className="flex justify-center py-12 ">
          <DemotIcon className="fill-muted-foreground" h={50} w={50} />
        </div>
        <Link to="/quote">
          <Button variant={'outline'}>View Quotes</Button>
        </Link>
      </div>

    </div>
  )
}
