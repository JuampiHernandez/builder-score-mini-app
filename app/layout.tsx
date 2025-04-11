import './theme.css';
import '@coinbase/onchainkit/styles.css';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

const projectName = "Builder Score Mini App"
const projectUrl = "https://builderscoreminiapp.vercel.app"
const frameContent = JSON.stringify({
  version: "next",
  imageUrl: "https://builderscoreminiapp.vercel.app/logo_svg_frame2.svg",
  aspectRatio: "3:2",
  button: {
    title: "Check Builder Score",
    action: {
      type: "launch_frame",
      name: "Builder Score",
      url: "https://builderscoreminiapp.vercel.app",
      splashImageUrl: "https://builderscoreminiapp.vercel.app/logo_svg_frame2.svg"
    }
  }
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: projectName,
    description: "Check your Builder Score on Talent Protocol",
    openGraph: {
      title: projectName,
      description: "Check your Builder Score on Talent Protocol",
      images: ["https://builderscoreminiapp.vercel.app/logo_svg_frame2.svg"],
    },
    other: {
      "fc:frame": frameContent
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
        <meta name="fc:frame" content={frameContent} />
      </head>
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
