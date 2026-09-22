import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton, Badge } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginModal from "../Login/LoginModal";
import { useCart } from "../utils/CartContext";

const logoUrl = new URL("../../../assets/foodLogoPng.png", import.meta.url).href;

const Header = () => {
  const { totalItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 relative bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-3.5">
        <div className="flex items-center">
          <Link to="/" className="block" onClick={closeMenu}>
            <img
              src={logoUrl}
              alt="Logo"
              className="h-11 sm:h-12 w-auto cursor-pointer transition-transform duration-200 hover:scale-105"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-6 md:gap-8 list-none m-0 p-0">
            <li>
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm md:text-base font-bold text-slate-800 hover:text-amber-600 transition-colors"
              >
                <HomeIcon fontSize="small" sx={{ color: "#475569" }} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-1.5 text-sm md:text-base font-bold text-slate-800 hover:text-amber-600 transition-colors"
              >
                <EmailOutlinedIcon fontSize="small" sx={{ color: "#475569" }} />
                <span>Contact Us</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center gap-1.5 text-sm md:text-base font-bold text-slate-800 hover:text-amber-600 transition-colors"
              >
                <Badge
                  badgeContent={totalItems}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.68rem",
                      height: 18,
                      minWidth: 18,
                      fontWeight: 800,
                    },
                  }}
                >
                  <ShoppingCartIcon fontSize="small" sx={{ color: "#475569" }} />
                </Badge>
                <span>Cart</span>
              </Link>
            </li>
            <li>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAuthButtonClick}
                startIcon={isLoggedIn ? <LogoutIcon fontSize="small" /> : <LoginIcon fontSize="small" />}
                sx={{
                  borderRadius: "50px",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100,
                  py: 0.8,
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#ea9c13",
                    boxShadow: "none",
                  },
                }}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </Button>
            </li>
          </ul>
        </nav>

        <div className="flex md:hidden items-center">
          <IconButton
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: 2.5,
              bgcolor: "white",
              color: "#0f172a",
              "&:hover": { bgcolor: "#f8fafc", borderColor: "#ffaf1a" },
            }}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xl px-6 py-4 flex flex-col gap-3.5 transition-all">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 py-2 text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors"
          >
            <HomeIcon fontSize="small" sx={{ color: "#64748b" }} />
            <span>Home</span>
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className="flex items-center gap-3 py-2 text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors"
          >
            <EmailOutlinedIcon fontSize="small" sx={{ color: "#64748b" }} />
            <span>Contact Us</span>
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
            className="flex items-center justify-between py-2 text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShoppingCartIcon fontSize="small" sx={{ color: "#64748b" }} />
              <span>Cart</span>
            </div>
            {totalItems > 0 && (
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Account</span>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                closeMenu();
                handleAuthButtonClick();
              }}
              startIcon={isLoggedIn ? <LogoutIcon fontSize="small" /> : <LoginIcon fontSize="small" />}
              sx={{
                borderRadius: "50px",
                width: 100,
                minWidth: 100,
                maxWidth: 100,
                py: 0.8,
                fontWeight: 700,
                fontSize: "0.875rem",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#ea9c13",
                  boxShadow: "none",
                },
              }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setIsLoginModalOpen(false);
        }}
      />
    </header>
  );
};

export default Header;