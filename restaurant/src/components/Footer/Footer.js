import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-400 px-6 md:px-12 lg:px-20 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-white tracking-tight">
            NG <span className="text-primary">Restaurant</span>
          </span>
          <span className="text-xs text-slate-500 font-medium">© {new Date().getFullYear()} All rights reserved</span>
        </div>

        <ul className="flex flex-wrap items-center gap-6 md:gap-8 list-none m-0 p-0 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-white transition-colors duration-200">
              Home
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-white transition-colors duration-200">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;