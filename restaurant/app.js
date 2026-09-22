import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "./src/components/Header/Header";
import Body from "./src/components/Body/Body";
import Footer from "./src/components/Footer/Footer";
import Contact from "./src/components/Header/Contact";
import Error from "./src/components/Error/Error";
import Cart from "./src/components/Header/Cart";
import RestaurantMenu from "./src/components/RestraurantMenu/RestaurantMenu";
import { CartProvider } from "./src/components/utils/CartContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffaf1a",
      dark: "#ea9c13",
      contrastText: "#0f172a",
    },
    secondary: {
      main: "#059669",
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const MainContainer = () => (
  <CartProvider>
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  </CartProvider>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={appRouter} />
  </ThemeProvider>
);

