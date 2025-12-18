import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/taskApi";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Form */}
      <TaskForm />

      {/* Table */}
      <div className="md:col-span-2">
        {isLoading ? (
          <div className="rounded-lg border bg-white p-6 text-center">
            Loading...
          </div>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </div>
  );
}
