import { useRouteError, Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Error = () => {
  const err = useRouteError();
  const status = err?.status || 404;
  const is404 = status === 404;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center bg-slate-50">
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "6rem", md: "8rem" },
          fontWeight: 900,
          color: "#cbd5e1",
          lineHeight: 1,
          mb: 2,
          userSelect: "none",
        }}
      >
        {status}
      </Typography>

      <Typography variant="h4" fontWeight="800" color="#0f172a" gutterBottom>
        {is404 ? "Page Not Found" : "Something Went Wrong"}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 420, mx: "auto", mb: 4, lineHeight: 1.6 }}
      >
        {is404
          ? "The page you are looking for doesn't exist or has been moved. Let's find you something delicious instead."
          : err?.statusText || err?.message || "An unexpected error occurred. Let's get you back on track."}
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        size="large"
        startIcon={<HomeIcon />}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: "50px",
          fontWeight: 700,
          boxShadow: "none",
          "&:hover": {
            bgcolor: "#ea9c13",
            boxShadow: "none",
          },
        }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default Error;