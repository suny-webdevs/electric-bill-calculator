import type { ReactNode } from "react"
import "@/app/globals.css"

export const metadata = {
  title: "Electric Bill Calculator | Made by Suny Shaikh",
  description: "Bangladesh electric bill calculator",
  icons: {
    icon: "/favicon-calculator.png",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
