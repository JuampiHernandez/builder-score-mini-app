"use client";

import { useState } from 'react';
import { Button } from './DemoComponents';
import { useMiniKit } from "@coinbase/onchainkit/minikit";

interface UserContext {
  fid: number;
  username: string;
  displayName: string;
}

interface BuilderScoreResponse {
  score: number;
  lastCalculatedAt: string;
}

export function BuilderScore() {
  const { context } = useMiniKit();
  const [score, setScore] = useState<BuilderScoreResponse | null>(null);
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
      const response = await fetch(`/api/builder-score?id=${user.fid}&account_source=farcaster`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch builder score');
      }

      setScore(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch builder score');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

      {score && !error && (
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-[var(--app-accent)]">
            Builder Score: {score.score}
          </h3>
          <p className="text-sm text-[var(--app-foreground-muted)]">
            Last updated: {formatDate(score.lastCalculatedAt)}
          </p>
        </div>
      )}
    </div>
  );
} 