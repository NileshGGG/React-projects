import { useState } from "react";
import {
  IconButton,
  Popover,
  Box,
  Typography,
  Button,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import StarIcon from "@mui/icons-material/Star";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Filter = ({
  onRatingFilter,
  onVegFilter,
  onResetFilter,
  selectedRating,
  onlyVeg,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const isFilterActive =
    (selectedRating !== null && selectedRating !== undefined) || Boolean(onlyVeg);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReset = () => {
    if (onResetFilter) {
      onResetFilter();
    } else {
      if (onRatingFilter) onRatingFilter(null);
      if (onVegFilter) onVegFilter(false);
    }
  };

  const handleVegChange = (event) => {
    if (onVegFilter) {
      onVegFilter(event.target.checked);
    }
  };

  const handleRatingChange = (rating) => {
    const nextRating = selectedRating === rating ? null : rating;
    if (onRatingFilter) {
      onRatingFilter(nextRating);
    }
  };

  return (
    <div className="relative inline-block">
      <IconButton
        onClick={handleClick}
        aria-label="Filter restaurants"
        disableRipple
        sx={{
          width: 48,
          height: 48,
          bgcolor: "white",
          border: "1px solid",
          borderColor: open || isFilterActive ? "primary.main" : "#e2e8f0",
          color: open || isFilterActive ? "#d97706" : "#475569",
          transition: "none",
          "&:hover": {
            bgcolor: "#f8fafc",
            borderColor: "primary.main",
            color: "#d97706",
          },
          "&:active": {
            transform: "none",
          },
        }}
      >
        <FilterListIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transitionDuration={0}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 230,
              p: 2,
              mt: 1,
              borderRadius: 3,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
              border: "1px solid #e2e8f0",
              transition: "none !important",
              animation: "none !important",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="caption"
            fontWeight="700"
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
          >
            Filter By
          </Typography>
          {isFilterActive && (
            <Button
              size="small"
              onClick={handleReset}
              startIcon={<RestartAltIcon fontSize="small" />}
              sx={{ fontSize: "0.75rem", p: 0, minWidth: "auto", color: "#d97706", fontWeight: 700 }}
            >
              Reset
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <FormGroup sx={{ mb: 1.5 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(onlyVeg)}
                onChange={handleVegChange}
                color="success"
                size="small"
                disableRipple
              />
            }
            label={
              <Typography variant="body2" fontWeight="600" color="#047857">
                Pure Veg Only
              </Typography>
            }
            sx={{
              m: 0,
              px: 1,
              py: 0.5,
              borderRadius: 2,
              bgcolor: onlyVeg ? "#ecfdf5" : "transparent",
              border: onlyVeg ? "1px solid #a7f3d0" : "1px solid transparent",
              transition: "none",
              "&:hover": { bgcolor: "#f0fdf4" },
            }}
          />
        </FormGroup>

        <Divider sx={{ mb: 1.5 }} />

        <Typography
          variant="caption"
          fontWeight="700"
          color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: 0.5, display: "block", mb: 0.5 }}
        >
          Rating
        </Typography>

        <RadioGroup
          value={selectedRating !== null ? String(selectedRating) : ""}
          onChange={(e) => {
            const clicked = parseFloat(e.target.value);
            handleRatingChange(selectedRating === clicked ? null : clicked);
          }}
        >
          {[4.5, 4.0, 3.5].map((rating) => {
            const isSelected = selectedRating === rating;
            return (
              <FormControlLabel
                key={rating}
                value={String(rating)}
                control={
                  <Radio
                    size="small"
                    disableRipple
                    sx={{
                      color: "#94a3b8",
                      "&.Mui-checked": { color: "#ffaf1a" },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography
                      variant="body2"
                      fontWeight={isSelected ? 700 : 500}
                      color={isSelected ? "#b45309" : "text.primary"}
                    >
                      {rating === 4 ? "4.0" : rating}+ Rating
                    </Typography>
                    <StarIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
                  </Box>
                }
                sx={{
                  m: 0,
                  px: 1,
                  py: 0.5,
                  borderRadius: 2,
                  width: "100%",
                  bgcolor: isSelected ? "#fffbeb" : "transparent",
                  border: isSelected ? "1px solid #fde68a" : "1px solid transparent",
                  transition: "none",
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              />
            );
          })}
        </RadioGroup>
      </Popover>
    </div>
  );
};

export default Filter;