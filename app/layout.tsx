import './theme.css';
import '@coinbase/onchainkit/styles.css';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

const projectName = "Builder Score Mini App"
const projectUrl = "https://builderscoreminiapp.vercel.app"
const splashImageUrl = "https://builderscoreminiapp.vercel.app/frame.svg"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const frameMetadata = {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://builderscoreminiapp.vercel.app/frame.svg",
      aspectRatio: "3:2",
      button: {
        title: "Check Builder Score",
        action: {
          type: "launch_frame",
          name: "Builder Score",
          url: projectUrl,
          splashImageUrl: splashImageUrl
        }
      }
    })
  }

  return {
    title: projectName,
    description: "Check your Builder Score on Talent Protocol",
    openGraph: {
      title: projectName,
      description: "Check your Builder Score on Talent Protocol",
      images: [splashImageUrl],
    },
    other: {
      ...frameMetadata
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
