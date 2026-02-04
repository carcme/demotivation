import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/shadcn/button";
import { Card } from "@/components/shadcn/card";

export const Route = createFileRoute("/")({ component: App });

interface Demot {
  id: number;
  quote: string;
  author: string;
}

function App() {
  const [randomQuote, setRandomQuote] = useState<Demot | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/demots/random");
      const data = await response.json();
      setRandomQuote(data.data);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Demotivational Quotes</h1>
        <p className="text-muted-foreground text-lg">
          Because sometimes you need a reality check
        </p>
      </div>

      <Card className="p-8 mb-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : randomQuote ? (
          <div className="text-center">
            <blockquote className="text-2xl font-medium mb-6 italic">
              "{randomQuote.quote}"
            </blockquote>
            <p className="text-lg text-muted-foreground">
              — {randomQuote.author}
            </p>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No quote available
          </p>
        )}
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={fetchRandomQuote}
          disabled={loading}
          size="lg"
          className="px-8"
        >
          {loading ? "Loading..." : "Get Another Quote"}
        </Button>
      </div>

      <div className="mt-16 border-t pt-8">
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
    </div>
  );
}