import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTask } from "../api/taskApi";
import toast from "react-hot-toast";
import React from "react";

const badge = {
  todo: "bg-gray-200 text-gray-700",
  in_progress: "bg-yellow-200 text-yellow-800",
  done: "bg-green-200 text-green-800",
};

export default function TaskItem({ task }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: async (id) => {
      await queryClient.cancelQueries(["tasks"]);
      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old) =>
        old.filter((t) => t._id !== id)
      );

      return { previous };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks"], context.previous);
      toast.error("Delete failed");
    },
    onSuccess: () => toast.success("Task deleted"),
    onSettled: () => queryClient.invalidateQueries(["tasks"]),
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries(["tasks"]);
      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old) =>
        old.map((t) => (t._id === id ? payload : t))
      );

      return { previous };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks"], context.previous);
      toast.error("Update failed");
    },
    onSuccess: () => toast.success("Task updated"),
    onSettled: () => queryClient.invalidateQueries(["tasks"]),
  });

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs ${badge[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-4 flex gap-3">
        <select
          className="rounded border px-3 py-1 text-sm"
          value={task.status}
          onChange={(e) =>
            updateMutation.mutate({
              id: task._id,
              payload: { ...task, status: e.target.value },
            })
          }
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={() => deleteMutation.mutate(task._id)}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
