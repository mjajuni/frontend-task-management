import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  if (!tasks.length)
    return <p className="text-center text-gray-500">No tasks</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}
