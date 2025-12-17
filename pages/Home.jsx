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
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        <TaskForm />
        <div className="md:col-span-2">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <TaskList tasks={tasks} />
          )}
        </div>
      </div>
    </div>
  );
}
