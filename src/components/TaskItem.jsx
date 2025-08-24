import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  IconButton,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const TaskItem = ({ item, index, onClickItem, setItemComplete, deleteItem }) => {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        background: item?.complete
          ? "linear-gradient(135deg, #e0e0e0, #f5f5f5)"
          : "linear-gradient(135deg, #ffffff, #f0f7ff)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: { xs: "1 1 100%", sm: "1 1 45%" },
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent
        onClick={() => onClickItem(index)}
        sx={{
          cursor: "pointer",
          flexGrow: 1,
        }}
      >
        
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: item?.complete ? "text.disabled" : "primary.main",
            textDecoration: item?.complete ? "line-through" : "none",
          }}
        >
          {item?.title}
        </Typography>

        
        {item?.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.8,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {item.description}
          </Typography>
        )}

        {item?.date && (
          <Chip
            label={`${new Date(item.date).toLocaleString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}`}
            size="small"
            sx={{
              mt: 1.5,
              backgroundColor: "rgba(33, 150, 243, 0.1)", 
              color: "primary.main",
              fontWeight: 500,
            }}
          />
        )}
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "space-between",
          px: 2,
          py: 1,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Checkbox
          checked={item?.complete}
          onChange={() => setItemComplete(index)}
          color="success"
        />
        <IconButton
          color="error"
          onClick={() => deleteItem(index)}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255,0,0,0.1)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskItem

