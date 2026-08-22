import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const TodoHeader = () => {
  return (
    <h1 className="text-3xl pt-1">
      TODO LIST
      <AssignmentTurnedInIcon className="!text-[34px]" />
    </h1>
  );
};

export default TodoHeader;