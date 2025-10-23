"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import TodoCard from "@/components/TodoCard"
import SearchFilter from "@/components/SearchFilter"
import Pagination from "@/components/Pagination"
import TodoForm from "@/components/TodoForm"

export default function HomePage() {
  const [todos, setTodos] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos")
        if (!res.ok) throw new Error("Network error")
        const data = await res.json()
        setTodos(data.slice(0, 50))
        toast.success("Todos loaded successfully")
      } catch {
        toast.error("Failed to load todos")
      }
    }
    loadTodos()
  }, [])

  const filteredTodos = todos.filter((todo) => {
    const matchSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchFilter =
      filter === "completed"
        ? todo.completed
        : filter === "incomplete"
        ? !todo.completed
        : true
    return matchSearch && matchFilter
  })

  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / itemsPerPage))
  const currentTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      setTodos((prev) => prev.filter((t) => t.id !== id))
      toast.success("Todo deleted")
    }
  }

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
    toast.success("Todo status updated")
  }

  const handleEdit = (id: number, newTitle: string) => {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty")
      return
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    )
    toast.success("Todo edited successfully")
  }

  const handleCreate = (title: string) => {
    if (!title.trim()) {
      toast.error("Title cannot be empty")
      return
    }
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    }
    setTodos((prev) => [newTodo, ...prev])
    toast.success("Todo added successfully")
    setCurrentPage(1)
  }

  return (
    <div className="card p-8 bg-white min-h-[68vh]">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">My Todo App</h1>

      <div className="mb-6">
        <TodoForm onSuccess={(t: any) => { handleCreate(t.title) }} />
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>

      <div className="mb-4">
        <TodoCard
          todos={currentTodos}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      </div>

      <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(p: number) => setCurrentPage(p)}
/>

    </div>
  )
}
