import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Carlos Leon - Portfolio",
    template: "%s | Carlos Leon",
  },
  description: "Portfolio website showcasing my work and projects",
  keywords: ["portfolio", "web development", "software engineer"],
  authors: [{ name: "Carlos Leon" }],
  creator: "Carlos Leon",
  metadataBase: new URL("https://carlosleon.tech"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://carlosleon.tech",
    title: "Carlos Leon - Portfolio",
    description: "Portfolio website showcasing my work and projects",
    siteName: "Carlos Leon Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Carlos Leon Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Leon - Portfolio",
    description: "Portfolio website showcasing my work and projects",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
