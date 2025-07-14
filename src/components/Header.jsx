import React, { useState } from "react";
import { ShoppingCart, Menu, X, Home, Package, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge, Tooltip } from "antd";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalQuantity,
  selectCartTotal,
} from "../features/cartSlice";
const Header = () => {
  const navItems = [
    { id: 1, name: "Home", url: "home", icon: Home },
    { id: 2, name: "Products", url: "products", icon: Package },
    { id: 3, name: "Favorite", url: "favoriteProducts", icon: Heart },
  ];

  const [activeItem, setActiveItem] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalQuantity = useSelector(selectTotalQuantity);
  console.log(totalQuantity);

  const isActive = (url) => activeItem === url;
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-full max-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:justify-evenly h-16 items-center w-full">
          <div className="">
            <a href="#" className="text-2xl md:3xl font-bold text-purple-700">
              EssenceHub
            </a>
          </div>
          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-7">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={`${item.url}`}
                  onClick={() => setActiveItem(item.url)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-md font-medium transition-all duration-200 ${
                    isActive(item.url)
                      ? "bg-indigo-100 text-indigo-700 shadow-sm"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <Link to={"cart"} className="cursor-pointer hidden md:block">
            <Badge count={totalQuantity}>
              <ShoppingCart size={25} />
            </Badge>
          </Link>
          {/* Mobile view */}
          <div className="md:hidden flex items-center gap-2">
            <Link to={"cart"} className="cursor-pointer">
              <Badge count={totalQuantity}>
                <ShoppingCart size={25} />
              </Badge>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2 mb-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={`${item.url}`}
                    onClick={() => {
                      setActiveItem(item.url);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(item.url)
                        ? "bg-indigo-100 text-indigo-700 shadow-sm"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-white"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
