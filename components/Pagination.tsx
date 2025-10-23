"use client"

export default function Pagination({ currentPage, totalPages, onPageChange }: any) {
  const prev = () => onPageChange(Math.max(1, currentPage - 1))
  const next = () => onPageChange(Math.min(totalPages, currentPage + 1))

  return (
    <div className="flex items-center justify-between mt-6">
      <button onClick={prev} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <button onClick={next} className="px-3 py-1 bg-gray-200 rounded">Next</button>
    </div>
  )
}
