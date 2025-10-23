"use client"

import { useState } from "react"
import { toast } from "sonner"

export default function TodoForm({ existingTodo, onSuccess }: any) {
  const [title, setTitle] = useState(existingTodo?.title || "")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Todo title cannot be empty", { id: "error-empty" })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: existingTodo ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: existingTodo?.id,
          title,
          completed: existingTodo?.completed || false,
          userId: 1,
        }),
      })

      const data = await res.json()

      onSuccess?.({
        id: data.id || Date.now(),
        title,
        completed: existingTodo?.completed || false,
      })

      toast.success(
        existingTodo ? "Todo updated successfully" : "Todo created successfully",
        { id: "success" }
      )

      setTitle("")
    } catch (error) {
      toast.error("Something went wrong while saving todo", { id: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6 bg-white p-4 rounded-lg shadow border border-green-200"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo..."
        className="flex-1 border border-green-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white font-medium transition ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Saving..." : existingTodo ? "Update" : "Add"}
      </button>
    </form>
  )
}
