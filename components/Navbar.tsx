import Link from "next/link"

export default function Navbar() {
  return (
    <header className="header-bar py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Todo Manager</h2>
        </div>
      </div>
    </header>
  )
}
