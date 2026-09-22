import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ResCard from "./ResCard";
import Search from "../SearchBar/Search";
import Shimmer from "../Shimmer/Shimmer";
import { resList } from "../utils/mockData";

const Body = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filterRestaurants, setFilterRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [selectedRating, setSelectedRating] = useState(null);
    const [onlyVeg, setOnlyVeg] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setError(null);
        setLoading(true);
        try {
            if (resList && Array.isArray(resList) && resList.length > 0) {
                setRestaurants(resList);
                setFilterRestaurants(resList);
                return;
            }
            throw new Error("No restaurant records available");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = (searchVal, ratingVal, vegVal, sourceList = restaurants) => {
        let result = sourceList;

        if (searchVal && searchVal.trim() !== "") {
            const query = searchVal.trim().toLowerCase();
            result = result.filter((restaurant) =>
                restaurant.name.toLowerCase().includes(query)
            );
        }

        if (ratingVal !== null && ratingVal !== undefined) {
            result = result.filter(
                (restaurant) => parseFloat(restaurant.avgRating) >= ratingVal
            );
        }

        if (vegVal) {
            result = result.filter((restaurant) => Boolean(restaurant.veg));
        }

        setFilterRestaurants(result);
    };

    const ratingHandler = (rating) => {
        setSelectedRating(rating);
        applyFilters(searchText, rating, onlyVeg);
    };

    const vegHandler = (isVeg) => {
        setOnlyVeg(isVeg);
        applyFilters(searchText, selectedRating, isVeg);
    };

    const searchHandler = (text) => {
        setSearchText(text);
        applyFilters(text, selectedRating, onlyVeg);
    };

    const resetHandler = () => {
        setSelectedRating(null);
        setOnlyVeg(false);
        applyFilters(searchText, null, false);
    };

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                <Typography variant="h5" fontWeight="800" color="#1e293b" gutterBottom>
                    Unable to Load Restaurants
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: "auto", mb: 3 }}>
                    Please try refreshing the page.
                </Typography>
                <Button
                    onClick={fetchData}
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshIcon />}
                    sx={{
                        borderRadius: "50px",
                        px: 4,
                        py: 1.2,
                        fontWeight: 700,
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#ea9c13", boxShadow: "none" },
                    }}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Search
                onRatingFilter={ratingHandler}
                onVegFilter={vegHandler}
                onResetFilter={resetHandler}
                selectedRating={selectedRating}
                onlyVeg={onlyVeg}
                onSearch={searchHandler}
            />

            {loading ? (
                <Shimmer />
            ) : (
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20 pt-4">
                    {filterRestaurants.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm my-6">
                            <Typography variant="h5" fontWeight="800" color="#1e293b" gutterBottom>
                                No restaurants found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Try adjusting your search or rating filter
                            </Typography>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                            {filterRestaurants.map((restaurant) => (
                                <ResCard
                                    key={restaurant.id}
                                    ResCard={restaurant}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Body;
