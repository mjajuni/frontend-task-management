import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/taskApi";
import toast from "react-hot-toast";

export default function TaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,

    onMutate: async (newTask) => {
      await queryClient.cancelQueries(["tasks"]);

      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old = []) => [
        { ...newTask, _id: `temp-${Date.now()}` },
        ...old,
      ]);

      return { previousTasks };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks"], context.previousTasks);
      toast.error("Failed to add task");
    },

    onSuccess: () => {
      toast.success("Task added");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    mutation.mutate(form);
    setForm({ title: "", description: "", status: "todo" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-medium">Add New Task</h2>

      <div className="space-y-4">
        <input
          className="w-full rounded-lg border px-4 py-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full rounded-lg border px-4 py-2"
          placeholder="Description"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full rounded-lg border px-4 py-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
