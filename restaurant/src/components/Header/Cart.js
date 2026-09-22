import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useCart } from "../utils/CartContext";
import { CDN_URL, DEFAULT_IMAGE } from "../utils/constents";

const Cart = () => {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
  } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = subtotal >= 200 || subtotal === 0 ? 0 : 35;
  const platformFee = subtotal > 0 ? 5 : 0;
  const grandTotal = subtotal + deliveryFee + platformFee;

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  const getItemImage = (item) => {
    if (item?.imageUrl) return item.imageUrl;
    if (item?.imageId) {
      if (item.imageId.startsWith("http")) return item.imageId;
      return `${CDN_URL}${item.imageId}`;
    }
    return DEFAULT_IMAGE;
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <Box
          sx={{
            width: 84,
            height: 84,
            bgcolor: "#ecfdf5",
            color: "#059669",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
            border: "2px solid #a7f3d0",
          }}
        >
          <CheckCircleOutlinedIcon sx={{ fontSize: 48 }} />
        </Box>
        <Typography variant="h4" fontWeight="800" color="#0f172a" gutterBottom>
          Order Placed!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your delicious food is being prepared and will be delivered shortly. Thank you for ordering!
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            px: 4,
            py: 1.3,
            borderRadius: "50px",
            fontWeight: 700,
            boxShadow: "none",
            "&:hover": { bgcolor: "#ea9c13", boxShadow: "none" },
          }}
        >
          Order More Food
        </Button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <Typography variant="h4" fontWeight="800" color="#0f172a" gutterBottom>
          Your Cart is Empty
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: "auto", mb: 4 }}>
          Good food is always waiting for you. Explore the top-rated restaurants near you!
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<RestaurantIcon />}
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
          Browse Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#64748b",
            fontWeight: 700,
            "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" },
          }}
        >
          Continue Shopping
        </Button>

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={clearCart}
          startIcon={<DeleteOutlinedIcon fontSize="small" />}
          sx={{
            borderRadius: 2.5,
            fontWeight: 700,
            fontSize: "0.8rem",
            px: 2,
          }}
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <Typography variant="h6" fontWeight="800" color="#0f172a">
              Selected Items
            </Typography>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {cartItems.map((item) => {
              const itemPrice = (item.price || item.defaultPrice || 25000) / 100;
              const itemLineTotal = itemPrice * item.quantity;
              const isVeg = item.isVeg === 1 || item.veg === true;

              return (
                <div
                  key={item.id}
                  className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <img
                      src={getItemImage(item)}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_IMAGE;
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`w-3.5 h-3.5 border-2 rounded-[2px] flex items-center justify-center shrink-0 ${
                            isVeg ? "border-emerald-600" : "border-red-600"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isVeg ? "bg-emerald-600" : "bg-red-600"
                            }`}
                          />
                        </span>
                        <h4
                          className="text-sm font-bold text-slate-800 truncate"
                          title={item.name}
                        >
                          {item.name}
                        </h4>
                      </div>

                      <p className="text-xs font-semibold text-slate-500">
                        ₹{itemPrice.toFixed(0)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-xs">
                      <button
                        type="button"
                        onClick={() => decrementQuantity(item.id)}
                        className="w-7 h-7 flex items-center justify-center font-extrabold text-slate-700 hover:bg-slate-200 text-sm leading-none border-none bg-transparent cursor-pointer transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-1.5 text-xs font-bold text-slate-900 min-w-[18px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => incrementQuantity(item.id)}
                        className="w-7 h-7 flex items-center justify-center font-extrabold text-slate-700 hover:bg-slate-200 text-sm leading-none border-none bg-transparent cursor-pointer transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-slate-800 min-w-[60px] text-right">
                      ₹{itemLineTotal.toFixed(0)}
                    </span>

                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      sx={{
                        color: "#94a3b8",
                        "&:hover": { color: "#ef4444", bgcolor: "#fef2f2" },
                      }}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6 sticky top-24">
          <Typography variant="h6" fontWeight="800" color="#0f172a" gutterBottom>
            Order Summary
          </Typography>

          <div className="space-y-3 pt-2 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Item Total</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toFixed(0)}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Platform Fee</span>
              <span className="font-semibold text-slate-800">₹{platformFee}</span>
            </div>

            {deliveryFee > 0 && subtotal < 200 && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/60 text-[11px] text-amber-800 font-medium">
                Add ₹{(200 - subtotal).toFixed(0)} more to get FREE Delivery!
              </div>
            )}

            <Divider sx={{ my: 2 }} />

            <div className="flex items-center justify-between text-base font-extrabold text-slate-900">
              <span>To Pay</span>
              <span className="text-lg text-emerald-700">₹{grandTotal.toFixed(0)}</span>
            </div>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleCheckout}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "none",
                "&:hover": { bgcolor: "#ea9c13", boxShadow: "none" },
              }}
            >
              Proceed to Pay ₹{grandTotal.toFixed(0)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;