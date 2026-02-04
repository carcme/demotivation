import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/shadcn/button'
import { Card } from '@/components/shadcn/card'
import { Demot } from '@/types/demotivation'

export const Route = createFileRoute('/quote')({
  component: RouteComponent,
})

function RouteComponent() {
  const [randomQuote, setRandomQuote] = useState<Demot | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchRandomQuote = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/demots/random')
      const data = await response.json()
      setRandomQuote(data.data)
    } catch (error) {
      console.error('Failed to fetch quote:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomQuote()
  }, [])

  return (
    <div className="pt-20 px-4 md:px-16">
      <Card className="p-8 mb-8 max-w-full md:max-w-2xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : randomQuote ? (
          <div className="text-center">
            <blockquote className="text-2xl font-medium my-6 italic">
              "{randomQuote.quote}"
            </blockquote>
            <p className="text-lg text-right text-muted-foreground">
              — {randomQuote.author}
            </p>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No quote available
          </p>
        )}
      </Card>
      <div className="flex justify-center fixed bottom-16 w-full">
        <Button
          onClick={fetchRandomQuote}
          disabled={loading}
          size="lg"
          className="px-8"
        >
          {loading ? 'Loading...' : 'Get Another Quote'}
        </Button>
      </div>
    </div>
  )
}
