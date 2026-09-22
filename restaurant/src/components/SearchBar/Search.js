import { useState } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Filter from "../Filter/Filter";

const Search = ({
  onRatingFilter,
  onVegFilter,
  onResetFilter,
  selectedRating,
  onlyVeg,
  onSearch,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleClear = () => {
    setSearchText("");
    onSearch("");
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-6 pb-4">
      <TextField
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="Search restaurants, cuisines or food..."
        size="small"
        sx={{
          flex: 1,
          minWidth: 260,
          bgcolor: "white",
          borderRadius: "50px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            pr: 1,
            "& fieldset": { borderColor: "#e2e8f0" },
            "&:hover fieldset": { borderColor: "#ffaf1a" },
            "&.Mui-focused fieldset": { borderColor: "#ffaf1a" },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#94a3b8" }} />
              </InputAdornment>
            ),
            endAdornment: searchText ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClear} aria-label="Clear search">
                  <ClearIcon fontSize="small" sx={{ color: "#94a3b8" }} />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          px: 3,
          py: 1,
          borderRadius: "50px",
          fontWeight: 700,
          fontSize: "0.95rem",
          boxShadow: "none",
          "&:hover": {
            bgcolor: "#ea9c13",
            boxShadow: "none",
          },
        }}
      >
        Search
      </Button>

      <Filter
        onRatingFilter={onRatingFilter}
        onVegFilter={onVegFilter}
        onResetFilter={onResetFilter}
        selectedRating={selectedRating}
        onlyVeg={onlyVeg}
      />
    </div>
  );
};

export default Search;

