import TaskItem from "./TodoItem";

const TaskList = ({
  todos,
  editingId,
  editValue,
  setEditValue,
  toggleDone,
  startEditing,
  saveEdit,
  deleteTask,
}) => {
  return (
    <div className="flex flex-col items-center w-[90%] mt-8">
      <h2 className="text-xl">
        Tasks to do
      </h2>

      <hr className="w-[70%] border-0 border-t border-black my-3" />

      <ul className="w-[90%]">
        {todos.map((todo) => (
          <TaskItem
            key={todo.id}
            todo={todo}
            editingId={editingId}
            editValue={editValue}
            setEditValue={setEditValue}
            toggleDone={toggleDone}
            startEditing={startEditing}
            saveEdit={saveEdit}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;