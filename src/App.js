import './App.css';
import { useState } from 'react';
import InputTask from './components/InputTask';
import TaskList from './components/TaskList';
import {Box, Paper, Modal, Button, Typography, ButtonGroup } from '@mui/material';
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

function App() {
  const [list, setList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");
  const [open, setOpen] = useState(false);


  const [filter, setFilter] = useState("all"); 

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedValue("");
    setSelectedDate("");
    setSelectedDesc("");
    setOpen(false);
  };

  const handleInputSubmit = (task) => {
    const { title, dateTime, description } = task;
    const updatedList = [...list, { title, complete: false, date: dateTime, description }];
    updatedList.sort((a, b) => new Date(a.date) - new Date(b.date));
    setList(updatedList);
    handleClose();
  };

  const onClickItem = (index) => {
    setSelectedValue(list[index]?.title);
    setSelectedDate(list[index]?.date);
    setSelectedDesc(list[index]?.description);
    setOpen(true);
  };

  const setItemComplete = (index) => {
    const updatedList = [...list];
    updatedList[index].complete = !updatedList[index].complete;
    setList(updatedList);
  };

  const deleteItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };


  const filteredList = list.filter((task) => {
    if (filter === "completed") return task.complete;
    if (filter === "pending") return !task.complete;
    return true; 
  });

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box display="flex" justifyContent="center" minHeight="100vh" sx={{ width: { xs: "100%", sm: "600px" } }}>
        <Paper
          elevation={3}
          sx={{
            p: 0,
            width: '100%',
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >

          
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              bgcolor: "background.paper",
              p: 2,
              borderBottom: "1px solid #ddd",
              display: "flex",
              flexDirection: "row", 
              gap: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap", 
            }}
          >
            
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ flexShrink: 0 }}
            >
              Add Task
            </Button>

            
            <ButtonGroup
              variant="outlined"
              size="small"
              sx={{
                flexWrap: "wrap",
                "& .MuiButton-root": {
                  flex: "0 0 auto", 
                  minWidth: 90,     
                },
              }}
            >
              <Button
                onClick={() => setFilter("all")}
                variant={filter === "all" ? "contained" : "outlined"}
              >
                All
              </Button>
              <Button
                onClick={() => setFilter("completed")}
                variant={filter === "completed" ? "contained" : "outlined"}
              >
                Completed
              </Button>
              <Button
                onClick={() => setFilter("pending")}
                variant={filter === "pending" ? "contained" : "outlined"}
              >
                Pending
              </Button>
            </ButtonGroup>
          </Box>



          
          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            {filteredList.length === 0 ? (
              <Box textAlign="center" p={5} color="text.secondary">
                <AssignmentTurnedInIcon sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="h6" fontWeight="medium">
                  {list.length === 0
                    ? "You don’t have any tasks yet"
                    : filter === "completed"
                      ? "No tasks marked as completed yet"
                      : filter === "pending"
                        ? "All tasks are done!"
                        : "Nothing to show here"}
                </Typography>

                {list.length === 0 && (
                  <Typography variant="body2">
                    Start by adding your first task above
                  </Typography>
                )}
              </Box>
            ) : (
              <TaskList
                list={filteredList}
                onClickItem={onClickItem}
                setItemComplete={setItemComplete}
                deleteItem={deleteItem}
              />
            )}
          </Box>

          
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                borderRadius: 2,
              }}
            >
              <InputTask
                handleInputSubmit={handleInputSubmit}
                selectedValue={selectedValue}
                selectedDate={selectedDate}
                selectedDesc={selectedDesc}
              />
            </Box>
          </Modal>
        </Paper>
      </Box>
    </Box>
  );
}

export default App;
