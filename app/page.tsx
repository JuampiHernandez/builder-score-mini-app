"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";
import { BuilderScore } from "./components/BuilderScore";
import Image from 'next/image';

interface UserContext {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  location?: {
    placeId: string;
    description: string;
  };
}

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const user = context?.user as UserContext | undefined;

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3 h-11">
          <div>
            {user ? (
              <span className="text-sm font-medium">
                @{user.username}
              </span>
            ) : (
              <div className="text-sm text-[var(--app-foreground-muted)]">
                Loading...
              </div>
            )}
          </div>
        </header>

        <main className="flex-1">
          <div className="space-y-6">
            <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-6">
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Builder Score
                </h1>
                <p className="text-[var(--app-foreground-muted)] mb-6 text-center text-sm">
                  Check your Builder Score V2
                </p>
              </div>
              <BuilderScore />
            </div>
          </div>
        </main>

        <footer className="mt-4 pt-4 flex flex-col items-center space-y-2 border-t border-[var(--app-card-border)]">
          <a 
            href="https://talentprotocol.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs text-[var(--app-foreground-muted)] hover:text-[var(--app-accent)] transition-colors"
          >
            <Image
              src="/talent_svg_long.svg"
              alt="Talent Protocol"
              width={122}
              height={18}
              className="opacity-75 hover:opacity-100 transition-opacity"
            />
          </a>
        </footer>
      </div>
    </div>
  );
}
