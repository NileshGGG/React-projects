import { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h4" fontWeight="800" color="#0f172a" gutterBottom>
          Contact <span style={{ color: "#ffaf1a" }}>Us</span>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Have questions, suggestions, or need help with your order? Reach out to us anytime.
        </Typography>
      </Box>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 5,
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          label="Your Name"
          required
          fullWidth
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          label="Email Address"
          type="email"
          required
          fullWidth
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john@example.com"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          label="Message"
          required
          fullWidth
          multiline
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help you?"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SendIcon />}
          sx={{
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: "1rem",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#ea9c13",
              boxShadow: "none",
            },
          }}
        >
          Send Message
        </Button>
      </Paper>
    </div>
  );
};

export default Contact;