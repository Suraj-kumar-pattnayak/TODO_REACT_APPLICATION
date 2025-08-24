import { useEffect, useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";

const InputTask = ({ handleInputSubmit, selectedValue, selectedDate, selectedDesc }) => {
  const [value, setValue] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [dateError, setDateError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleInput = (e) => {
    setValue(e.target.value);
    setTitleError(false);
  };

  const handleDateTime = (e) => {
    setDateTime(e.target.value);
    setDateError(false);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const onSubmit = () => {
    if (!value.trim()) {
      setTitleError(true);
      return;
    }
    if (!dateTime) {
      setDateError(true);
      return;
    }

    handleInputSubmit({ title: value, dateTime, description });
    setValue("");
    setDateTime("");
    setDescription("");
    setDateError(false);
    setTitleError(false);
  };

  useEffect(() => {
    setValue(selectedValue || "");
    setDateTime(selectedDate || "");
    setDescription(selectedDesc || "");
  }, [selectedValue, selectedDate, selectedDesc]);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        maxWidth: 400,
        mx: "auto",
        bgcolor: "#ffffff",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 600, textAlign: "center", mb: 2 }}
      >
        Add New Task
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Enter Task"
          variant="outlined"
          value={value}
          onChange={handleInput}
          fullWidth
          required
          error={titleError}
          helperText={titleError ? "Task title cannot be empty" : ""}
        />

        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={3}
          value={description}
          onChange={handleDescription}
          fullWidth
        />

        <TextField
          label="Date & Time"
          type="datetime-local"
          value={dateTime}
          onChange={handleDateTime}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          error={dateError}
          helperText={dateError ? "Please select a date & time" : ""}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          size="large"
          sx={{ mt: 1, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          Submit Task
        </Button>
      </Box>
    </Paper>
  );
};

export default InputTask;
