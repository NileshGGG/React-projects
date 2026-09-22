# 🍔 NG Restaurant — Food Delivery Web Application

A modern, production-grade Food Delivery Single Page Application (SPA) built with **React 19**, **Parcel**, **Tailwind CSS**, and **Material UI**. Features real-time search, multi-criteria composite filtering, deep-linked restaurant menus, and an end-to-end shopping cart managed with **React Context**.

---

## 🌟 Key Features

- **🔍 Real-Time Instant Search:** Filter restaurants instantaneously by name, cuisines, or cost without reloading.
- **🎯 Multi-Criteria Composite Filtering:** Combine multiple filters simultaneously:
  - Top Rated (Rating ≥ 4.0)
  - Fast Delivery (Delivery time ≤ 30 mins)
  - Pure Veg badge & filter
  - Budget-friendly bands (Under ₹250, Under ₹300)
- **🍽️ Interactive Restaurant Menus (`/restaurants/:resId`):**
  - Dynamic routing with `useParams`
  - Featured item showcase with direct **ADD** button
  - Category sections with dietary indicator badges (Veg / Non-Veg)
  - Price formatting (converts paise/rupee values consistently)
- **🛒 Complete Cart & Checkout Flow (`/cart`):**
  - Global state management using React Context API
  - Immutable CRUD actions (Add, Increment, Decrement, Remove, Clear)
  - Quantity steppers (`-` / `+`) with auto-removal on 0
  - Live item count badge in header
  - **Free Delivery Calculation:** Automatically unlocks free delivery for orders ₹200 and above, featuring a dynamic threshold reminder banner.
  - Complete order summary breakdown (Subtotal, Delivery Fee, Platform Fee, Grand Total).
- **⚡ Perceived Performance with Shimmer UI:** Skeleton loader cards rendered while fetching restaurant listings and menus to eliminate layout shift.
- **👤 User Authentication Modal:** Popup modal supporting seamless sign-in with active session status in the navigation bar.
- **🛡️ Custom Error Handling:** Graceful 404 / route error boundary with friendly illustrations and navigation buttons.
- **📱 Fully Responsive Design:** Mobile-first responsive layout (1 column on mobile, 2 on tablet, 3–4 on desktop).

---

## 🛠️ Tech Stack & Tooling

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Library** | React 19 (`react`, `react-dom`) | Component-driven declarative UI architecture |
| **Bundler** | Parcel 2 | Zero-config bundler with blazing-fast Hot Module Replacement (HMR) |
| **Routing** | React Router DOM v6 | Client-side routing with `createBrowserRouter` & `RouterProvider` |
| **Styling** | Tailwind CSS v3 & PostCSS | Utility-first styling with custom design tokens |
| **UI Components** | Material UI (MUI v9) | Accessible dialogs, icons (`@mui/icons-material`), and buttons |
| **Typography** | Google Fonts | `Plus Jakarta Sans` for clean, modern readability |

---

## 📁 Project Architecture & Folder Structure

```text
restaurant/
├── assets/                          # Images, logos, and static assets
│   ├── foodLogo.jpg
│   └── foodLogoPng.png
├── src/
│   └── components/
│       ├── Body/                    # Main restaurant feed & cards
│       │   ├── Body.js              # Feed controller (search, filter state, grid)
│       │   └── ResCard.js           # Individual restaurant card component
│       ├── Filter/                  # Filter bar with rating, veg, & price chips
│       │   └── Filter.js
│       ├── SearchBar/               # Debounced search bar component
│       │   └── Search.js
│       ├── RestraurantMenu/         # Menu page with categories & menu items
│       │   └── RestaurantMenu.js
│       ├── Header/                  # Top navigation & header views
│       │   ├── Header.js            # Sticky navbar with logo, nav links & cart badge
│       │   ├── Cart.js              # Cart drawer / checkout page with order summary
│       │   └── Contact.js           # Contact & support page
│       ├── Login/                   # Authentication modal dialog
│       │   └── LoginModal.js
│       ├── Shimmer/                 # Skeleton loading states
│       │   └── Shimmer.js
│       ├── Error/                   # Custom route error page
│       │   └── Error.js
│       └── utils/                   # Shared utilities & state
│           ├── CartContext.js       # React Context provider for cart state
│           ├── constents.js         # Cloudinary CDN endpoints & constants
│           └── mockData.js          # Structured restaurant & menu data
├── .gitignore                       # Ignored build artifacts & dependencies
├── .postcssrc                       # PostCSS Tailwind integration
├── app.js                           # App root, ThemeProvider, & Router configuration
├── index.html                       # HTML template with root mount point
├── package.json                     # Project dependencies & scripts
├── package-lock.json                # Locked dependency tree
├── style.css                        # Global styles & Tailwind directives
└── tailwind.config.js               # Tailwind theme configuration
```

---

## 🧠 State Management: CartContext

Cart state is globally accessible via a custom hook `useCart()` with immutable array updates:

```javascript
const {
  cartItems,          // Array of { item, quantity }
  addToCart,          // Adds new item or increments existing
  incrementQuantity,  // Increases item count (+1)
  decrementQuantity,  // Decreases item count (-1) or removes if 0
  removeFromCart,     // Directly removes item by ID
  clearCart,          // Empties the cart
  totalItems,         // Total quantity across all items
  subtotal            // Calculated item total
} = useCart();
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NileshGGG/React-projects.git
   ```

2. **Navigate to the restaurant project folder:**
   ```bash
   cd React-projects/restaurant
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the local development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   ```text
   http://localhost:1234
   ```

---

## 📦 Production Build

To bundle the application for production deployment:

```bash
npm run build
```

This creates an optimized, minified bundle in the `dist/` directory ready for hosting on Vercel, Netlify, or GitHub Pages.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
