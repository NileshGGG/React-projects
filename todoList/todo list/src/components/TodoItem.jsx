import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";

const TaskItem = ({
  todo,
  editingId,
  editValue,
  setEditValue,
  toggleDone,
  startEditing,
  saveEdit,
  deleteTask,
}) => {
  return (
    <li className="flex w-full min-w-0 items-center my-3 px-4">

      {/* done or Undone */}
      <img
        src={todo.completed ? tick : not_tick}
        alt="task status"
        className="h-[28px] shrink-0 cursor-pointer"
        onClick={() => toggleDone(todo.id)}
      />

      {/* editing input */}
      {editingId === todo.id ? (

        <input
          autoFocus
          type="text"
          value={editValue}
          className="flex-1 min-w-0 text-[20px] ml-2 bg-white px-2 outline-none"
          onChange={(event) =>
            setEditValue(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              saveEdit(todo.id);
            }
          }}
        />

      ) : (

        /* normal task text */
        <span
          className={`flex-1 min-w-0 text-[20px] ml-2 cursor-pointer truncate ${
            todo.completed
              ? "line-through text-gray-400"
              : ""
          }`}
          onClick={() => toggleDone(todo.id)}
          title={todo.task}
        >
          {todo.task}
        </span>

      )}

      {/* edit & delete */}
      <div className="flex shrink-0 items-center gap-2 ml-2">

        <EditIcon
          className="!text-[25px] cursor-pointer"
          onClick={() => startEditing(todo)}
        />

        <DeleteForeverIcon
          className="!text-[30px] cursor-pointer"
          onClick={() => deleteTask(todo.id)}
        />

      </div>

    </li>
  );
};

export default TaskItem;