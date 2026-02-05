import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/shadcn/button'
import { Card } from '@/components/shadcn/card'
import { Demot } from '@/types/demotivation'
import { Calendar7day } from '@/components/shadcn/calendar7day'

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
    <div className="p-4 w-full max-w-full md:max-w-3xl mx-auto">
      {/* <MiniCalendarDemo /> */}
      <Card className="p-8 mb-4 shadow-xl w-full">
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
      <div className="flex sm:flex-row flex-col justify-between items-center">
        {/* <ClockTime date={date} /> */}
        <div className="flex justify-center sm:justify-end items-center ">
          <Calendar7day
            view="week"
            mode="single"
            className="rounded-lg border"
          />
        </div>
        <div className="m-4 flex justify-center mx-auto items-center">
          <Button
            onClick={fetchRandomQuote}
            disabled={loading}
            size="lg"
            className="px-4 text-black shadow-xl"
          >
            {loading ? 'Loading...' : 'Get New Quote'}
          </Button>
        </div>

        {/* <ClockDate /> */}
      </div>
    </div>
  )
}
