"use client";

import { useState } from 'react';
import { Button } from './DemoComponents';
import { useMiniKit } from "@coinbase/onchainkit/minikit";

interface ExtendedClientContext {
  name?: string;
  added?: boolean;
}

export function BuilderScore() {
  const { context } = useMiniKit();
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkBuilderScore = async () => {
    const client = context?.client as ExtendedClientContext | undefined;
    if (!client?.name) {
      setError("Please connect your Farcaster account first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/builder-score?username=${client.name}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch builder score');
      }

      setScore(data.score);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch builder score');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={checkBuilderScore}
        disabled={loading}
        variant="primary"
        size="lg"
        className="w-full"
      >
        {loading ? 'Checking...' : 'Check Builder Score'}
      </Button>

      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      {score !== null && !error && (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[var(--app-accent)]">
            Builder Score: {score}
          </h3>
        </div>
      )}
    </div>
  );
} 