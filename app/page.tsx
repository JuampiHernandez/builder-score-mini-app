"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useMemo, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { BuilderScore } from "./components/BuilderScore";

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
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    await addFrame();
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }
    return null;
  }, [context, handleAddFrame]);

  const user = context?.user as UserContext | undefined;

  // Debug logs
  useEffect(() => {
    console.log('Full MiniKit Context:', context);
    console.log('Frame Ready Status:', isFrameReady);
    console.log('User:', user);
  }, [context, isFrameReady, user]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3 h-11">
          <div>
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="text-sm">
                  <span className="font-medium">
                    @{user.username}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-[var(--app-foreground-muted)]">
                Loading...
              </div>
            )}
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1">
          <div className="space-y-6">
            <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-6">
              <h1 className="text-2xl font-bold mb-4 text-center">Builder Score</h1>
              <p className="text-[var(--app-foreground-muted)] mb-6 text-center">
                Check your Builder Score from Talent Protocol
              </p>
              <BuilderScore />
            </div>

            {/* Debug Information Panel */}
            <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] p-6">
              <h2 className="text-lg font-semibold mb-4">Debug Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Frame Status</h3>
                  <pre className="text-xs bg-black/10 p-2 rounded overflow-x-auto">
                    {JSON.stringify({ isFrameReady }, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">User Data</h3>
                  <pre className="text-xs bg-black/10 p-2 rounded overflow-x-auto">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Full Context</h3>
                  <pre className="text-xs bg-black/10 p-2 rounded overflow-x-auto">
                    {JSON.stringify(context, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
