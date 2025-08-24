import {Box} from "@mui/material";
import TaskItem from "./TaskItem";

const TaskList = ({ list, onClickItem, setItemComplete, deleteItem }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: "wrap",
        justifyContent: { xs: "flex-start", sm: "center" },
        alignItems: "stretch",
        gap: "20px",
        p: 2,
      }}
    >
      {list?.map((item, index) => (
        <TaskItem
          key={index}
          item={item}
          index={index}
          onClickItem={onClickItem}
          setItemComplete={setItemComplete}
          deleteItem={deleteItem}
        />
      ))}
    </Box>
  );
};

export default TaskList;
