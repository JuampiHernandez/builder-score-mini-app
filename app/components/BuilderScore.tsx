"use client";

import { useState } from 'react';
import { Button } from './DemoComponents';
import { useMiniKit } from "@coinbase/onchainkit/minikit";

interface UserContext {
  fid: number;
  username: string;
  displayName: string;
}

export function BuilderScore() {
  const { context } = useMiniKit();
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkBuilderScore = async () => {
    const user = context?.user as UserContext | undefined;
    if (!user?.fid) {
      setError("Please connect your Farcaster account first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/builder-score?account_id=${user.fid}&account_source=farcaster`);
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