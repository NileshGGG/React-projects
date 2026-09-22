import { Link } from "react-router-dom";
import { CDN_URL, DEFAULT_IMAGE } from "../utils/constents";

const ResCard = ({ ResCard }) => {
  if (!ResCard) return null;

  const resId = ResCard.id || ResCard.restaurantId || "9862";
  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    sla,
    costForTwo,
    locality,
    areaName,
    veg,
  } = ResCard;

  const cuisinesText = Array.isArray(cuisines)
    ? cuisines.slice(0, 3).join(", ") + (cuisines.length > 3 ? "..." : "")
    : cuisines || "Specialty";

  const locationText = areaName || locality || "City Center";
  const ratingValue = parseFloat(avgRating) || 4.2;
  const costText = costForTwo
    ? costForTwo.replace(/\s*for\s*(two|2)/gi, "").trim()
    : "₹250";

  return (
    <Link
      to={`/restaurants/${resId}`}
      className="group block h-full no-underline text-inherit"
    >
      <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/70 overflow-hidden transition-all duration-200">
        <div className="relative w-full h-44 overflow-hidden bg-slate-100">
          <img
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            src={cloudinaryImageId ? CDN_URL + cloudinaryImageId : DEFAULT_IMAGE}
            alt={name || "Restaurant"}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
          />

          {veg && (
            <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2 py-1 bg-white/95 backdrop-blur-sm rounded shadow-sm">
              <span className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center rounded-[2px] shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700">Pure Veg</span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-3.5 bg-white">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3
              className="text-[15px] font-bold text-slate-800 truncate leading-snug group-hover:text-amber-600 transition-colors"
              title={name}
            >
              {name}
            </h3>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-800 shrink-0">
              <span className="text-amber-500 text-sm leading-none">★</span>
              <span>{ratingValue.toFixed(1)}</span>
            </div>
          </div>

          <p
            className="text-xs text-slate-500 font-normal truncate mb-2"
            title={Array.isArray(cuisines) ? cuisines.join(", ") : cuisines}
          >
            {cuisinesText}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-auto pt-2.5 border-t border-slate-100">
            <span>{sla?.deliveryTime || 30} mins</span>
            <span className="text-slate-300">•</span>
            <span className="font-semibold text-slate-700">{costText}</span>
            <span className="text-slate-300">•</span>
            <span
              className="text-slate-400 truncate max-w-[110px]"
              title={locationText}
            >
              {locationText}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResCard;