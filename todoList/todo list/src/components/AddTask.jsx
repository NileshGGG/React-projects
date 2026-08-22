import Button from "@mui/material/Button";

const AddTask = ({
  newTodo,
  setNewTodo,
  addNewTask,
}) => {
  return (
    <div className="flex justify-center rounded-2xl overflow-hidden">

      <input
        type="text"
        placeholder="Add your tasks..."
        className="w-[300px] bg-white px-4 outline-none"
        value={newTodo}
        onChange={(event) =>
          setNewTodo(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addNewTask();
          }
        }}
      />

      <Button
        variant="contained"
        className="!bg-orange-500 hover:!bg-orange-600 !rounded-none"
        onClick={addNewTask}
      >
        Add +
      </Button>

    </div>
  );
};

export default AddTask;