import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Chip, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import Shimmer from "../Shimmer/Shimmer";
import { CDN_URL, DEFAULT_IMAGE } from "../utils/constents";
import { getRestaurantInfo, getMenuItems } from "../utils/mockData";
import { useCart } from "../utils/CartContext";

const RestaurantMenu = () => {
    const { addToCart, incrementQuantity, decrementQuantity, getItemQuantity } = useCart();
    const { resId } = useParams();
    const [resInfo, setResInfo] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, [resId]);

    const fetchMenu = () => {
        setError(null);
        setLoading(true);
        try {
            const restaurant = getRestaurantInfo(resId);
            const items = getMenuItems(resId);

            if (restaurant) {
                setResInfo(restaurant);
                setMenuItems(items || []);
                return;
            }

            throw new Error("Could not find restaurant menu");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getItemImageUrl = (item) => {
        if (item?.imageUrl) return item.imageUrl;
        if (item?.imageId) {
            if (item.imageId.startsWith("http")) return item.imageId;
            return `${CDN_URL}${item.imageId}`;
        }
        return DEFAULT_IMAGE;
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-8">
                <Shimmer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <Typography variant="h5" fontWeight="800" color="#1e293b" gutterBottom>
                    Could not load menu
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: "auto", mb: 3 }}>
                    The requested restaurant menu could not be loaded.
                </Typography>
                <Button
                    onClick={fetchMenu}
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
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
            <Button
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
                sx={{
                    color: "#d97706",
                    fontWeight: 700,
                    mb: 3,
                    px: 1,
                    "&:hover": { bgcolor: "#fffbeb" },
                }}
            >
                Back to Restaurants
            </Button>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
                <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 flex-1">
                        <Typography variant="h4" fontWeight="800" color="#0f172a">
                            {resInfo?.name || "Restaurant"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight="500">
                            {resInfo?.cuisines?.join(", ") || "Fast Food, Beverages"}
                        </Typography>
                        {resInfo?.areaName && (
                            <Typography variant="caption" color="#94a3b8" display="block">
                                📍 {resInfo?.locality ? `${resInfo.locality}, ` : ""}{resInfo.areaName}
                            </Typography>
                        )}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pt: 1 }}>
                            <Chip
                                icon={<StarIcon sx={{ fontSize: "16px !important", color: "white !important" }} />}
                                label={resInfo?.avgRating || "4.2"}
                                sx={{
                                    bgcolor: "#059669",
                                    color: "white",
                                    fontWeight: 800,
                                    borderRadius: 2.5,
                                    "& .MuiChip-label": { px: 1 },
                                    "& .MuiChip-icon": { ml: 1, mr: -0.5 },
                                }}
                            />
                            <Chip
                                label={String(resInfo?.costForTwoMessage || resInfo?.costForTwo || "₹350").replace(/\s*for\s*(two|2)/gi, "").trim()}
                                variant="outlined"
                                sx={{
                                    fontWeight: 700,
                                    color: "#334155",
                                    borderColor: "#cbd5e1",
                                    borderRadius: 2.5,
                                }}
                            />
                        </Box>
                    </div>

                    <div className="relative shrink-0 flex flex-col items-center pt-1 pb-3">
                        <div className="w-28 h-24 md:w-36 md:h-28 rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                            <img
                                src={
                                    resInfo?.cloudinaryImageId
                                        ? resInfo.cloudinaryImageId.startsWith("http")
                                            ? resInfo.cloudinaryImageId
                                            : `${CDN_URL}${resInfo.cloudinaryImageId}`
                                        : DEFAULT_IMAGE
                                }
                                alt={resInfo?.name || "Restaurant"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = DEFAULT_IMAGE;
                                }}
                            />
                        </div>
                        {getItemQuantity(`res-${resInfo?.id || resId}`) > 0 ? (
                            <div className="absolute bottom-0 flex items-center bg-white border border-emerald-600 rounded-lg shadow-sm overflow-hidden z-10">
                                <button
                                    type="button"
                                    onClick={() => decrementQuantity(`res-${resInfo?.id || resId}`)}
                                    className="w-7 h-7 flex items-center justify-center font-extrabold text-emerald-700 hover:bg-emerald-50 text-base leading-none transition-colors border-none bg-transparent cursor-pointer"
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span className="px-1 text-xs font-bold text-emerald-800 min-w-[18px] text-center">
                                    {getItemQuantity(`res-${resInfo?.id || resId}`)}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => incrementQuantity(`res-${resInfo?.id || resId}`)}
                                    className="w-7 h-7 flex items-center justify-center font-extrabold text-emerald-700 hover:bg-emerald-50 text-base leading-none transition-colors border-none bg-transparent cursor-pointer"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    const parsedCost =
                                        parseInt(
                                            String(resInfo?.costForTwoMessage || resInfo?.costForTwo || "₹200").replace(/\D/g, ""),
                                            10
                                        ) || 200;
                                    addToCart({
                                        id: `res-${resInfo?.id || resId}`,
                                        name: `${resInfo?.name || "Restaurant"} Special`,
                                        price: parsedCost * 100,
                                        imageId: resInfo?.cloudinaryImageId,
                                        imageUrl: resInfo?.cloudinaryImageId?.startsWith("http") ? resInfo.cloudinaryImageId : undefined,
                                        isVeg: resInfo?.veg ? 1 : 0,
                                        description: resInfo?.cuisines?.join(", ") || "Chef's Special Combo",
                                    });
                                }}
                                startIcon={<AddIcon fontSize="small" />}
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    bgcolor: "white",
                                    color: "#047857",
                                    border: "1px solid #6ee7b7",
                                    fontWeight: 800,
                                    fontSize: "0.75rem",
                                    borderRadius: 2.5,
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                                    px: 2,
                                    "&:hover": {
                                        bgcolor: "#ecfdf5",
                                        borderColor: "#10b981",
                                        boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                ADD
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1.5, borderBottom: "1px solid #e2e8f0" }}>
                    <Typography variant="h6" fontWeight="800" color="#0f172a">
                        Menu Items <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#94a3b8" }}>({menuItems.length})</span>
                    </Typography>
                </Box>

                <div className="divide-y divide-slate-100 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {menuItems.map((item) => {
                        const itemImg = getItemImageUrl(item);
                        return (
                            <div
                                key={item.id}
                                className="p-5 md:p-6 flex justify-between items-start gap-4 md:gap-8 hover:bg-slate-50/70 transition-colors"
                            >
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border ${
                                                item.isVeg === 0
                                                    ? "border-red-600 text-red-600"
                                                    : "border-emerald-600 text-emerald-600"
                                            }`}
                                            title={item.isVeg === 0 ? "Non-Veg" : "Pure Veg"}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full ${
                                                    item.isVeg === 0 ? "bg-red-600" : "bg-emerald-600"
                                                }`}
                                            />
                                        </span>
                                        {item.rating && (
                                            <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                                                ★ {item.rating}
                                            </span>
                                        )}
                                    </div>

                                    <Typography variant="subtitle1" fontWeight="700" color="#0f172a">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" fontWeight="800" color="#1e293b">
                                        ₹{((item.price || item.defaultPrice || 25000) / 100).toFixed(0)}
                                    </Typography>
                                    {item.description && (
                                        <Typography variant="body2" color="text.secondary" sx={{ pt: 0.5, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                            {item.description}
                                        </Typography>
                                    )}
                                </div>

                                <div className="relative shrink-0 flex flex-col items-center pt-1 pb-3">
                                    <div className="w-28 h-24 md:w-36 md:h-28 rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                                        <img
                                            src={itemImg}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = DEFAULT_IMAGE;
                                            }}
                                        />
                                    </div>
                                    {getItemQuantity(item.id) > 0 ? (
                                        <div className="absolute bottom-0 flex items-center bg-white border border-emerald-600 rounded-lg shadow-sm overflow-hidden z-10">
                                            <button
                                                type="button"
                                                onClick={() => decrementQuantity(item.id)}
                                                className="w-7 h-7 flex items-center justify-center font-extrabold text-emerald-700 hover:bg-emerald-50 text-base leading-none transition-colors border-none bg-transparent cursor-pointer"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="px-1 text-xs font-bold text-emerald-800 min-w-[18px] text-center">
                                                {getItemQuantity(item.id)}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => incrementQuantity(item.id)}
                                                className="w-7 h-7 flex items-center justify-center font-extrabold text-emerald-700 hover:bg-emerald-50 text-base leading-none transition-colors border-none bg-transparent cursor-pointer"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => addToCart(item)}
                                            startIcon={<AddIcon fontSize="small" />}
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                bgcolor: "white",
                                                color: "#047857",
                                                border: "1px solid #6ee7b7",
                                                fontWeight: 800,
                                                fontSize: "0.75rem",
                                                borderRadius: 2.5,
                                                boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                                                px: 2,
                                                "&:hover": {
                                                    bgcolor: "#ecfdf5",
                                                    borderColor: "#10b981",
                                                    boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                                                },
                                            }}
                                        >
                                            ADD
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
