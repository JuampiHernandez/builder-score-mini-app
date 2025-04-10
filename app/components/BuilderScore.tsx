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

  const handleShare = () => {
    const shareText = `🏗️ My Builder Score: ${score?.score}\n\nCheck yours at builderscoreminiapp.vercel.app`;
    window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={checkBuilderScore}
        disabled={loading}
        variant="primary"
        size="lg"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Checking Score...</span>
          </div>
        ) : 'Check Score'}
      </Button>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {score && !error && (
        <div className="text-center space-y-6">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
            <div className="relative bg-[var(--app-card-bg)] rounded-full p-8">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {score.score}
              </h3>
            </div>
          </div>
          
          <Button
            onClick={handleShare}
            variant="secondary"
            size="lg"
            className="w-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            Share on Farcaster
          </Button>
        </div>
      )}
    </div>
  );
} 