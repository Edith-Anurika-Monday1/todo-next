"use client"

import { useState } from "react"

export default function TodoCard({ todos, onDelete, onToggle, onEdit }: any) {
  const [editId, setEditId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  return (
    <div>
      {todos.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No todos found</div>
      ) : (
        todos.map((todo: any) => (
          <div key={todo.id} className={`flex items-center justify-between mb-3 p-3 rounded border ${todo.completed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!todo.completed}
                onChange={() => onToggle(todo.id)}
                className="w-4 h-4"
              />
              {editId === todo.id ? (
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
              ) : (
                <span className="text-gray-800">{todo.title}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {editId === todo.id ? (
                <>
                  <button
                    onClick={() => {
                      onEdit(todo.id, editValue)
                      setEditId(null)
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditId(null)
                    }}
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditId(todo.id)
                      setEditValue(todo.title)
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
