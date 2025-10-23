import "./globals.css"
import { Toaster } from "sonner"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Todo Manager",
  description: "Todo app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
