"use client"

export default function SearchFilter({ searchTerm, setSearchTerm, filter, setFilter }: any) {
  return (
    <div className="flex gap-3 items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
        className="flex-1 border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-red-200 rounded px-3 py-2"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  )
}
