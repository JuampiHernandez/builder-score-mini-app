import './theme.css';
import '@coinbase/onchainkit/styles.css';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

const projectName = "Builder Score Mini App"
const projectUrl = "https://builderscoreminiapp.vercel.app"
const splashImageUrl = "https://builderscoreminiapp.vercel.app/images/talent_svg_long.svg"

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
      images: [splashImageUrl],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": splashImageUrl,
      "fc:frame:button:1": "Check Score",
      "fc:frame:post_url": `${projectUrl}/api/frame`,
      "fc:frame:version": "vNext",
      "fc:frame:input:text": "Check your Builder Score"
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
