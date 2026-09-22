import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 2.5,
          },
        },
      }}
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <Typography variant="h6" fontWeight="700" color="#0f172a">
          Login
        </Typography>
        <IconButton size="small" onClick={onClose} aria-label="Close">
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      <DialogContent sx={{ px: 0, py: 2 }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <TextField
            label="Username or Email"
            type="text"
            size="small"
            required
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            size="small"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 1,
              py: 1,
              borderRadius: 2,
              fontWeight: 700,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#ea9c13",
                boxShadow: "none",
              },
            }}
          >
            Login
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
