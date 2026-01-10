import React, { useState, useRef, useEffect } from "react";
import {
  User,
  LogIn,
  UserPlus,
  TreePine,
  LogOut,
  CalendarDays,
  MessageSquare,
} from "lucide-react";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import AdminMenu from "../components/AdminMenu";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openRegisterAndCloseLogin = () => {
    setIsLoginOpen(false);
    setTimeout(() => {
      setIsRegisterOpen(true);
    }, 100);
  };

  return (
    <>
      <nav className="bg-white border-b border-amber-100/50 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/10">
              <span className="text-amber-500 font-serif text-xl font-bold italic">
                <TreePine />
              </span>
            </div>
            <span className="text-xl font-serif tracking-widest text-slate-800 uppercase font-bold ml-2">
              Pine Mountain <span className="text-amber-600">Lodge</span>
            </span>
          </div>

          {/* Navigation Links & Auth */}
          <div className="flex items-center gap-8">
            {/* Auth Tabs */}
            <div
              className={`flex items-center gap-8 ${
                isLoggedIn ? "border-r border-amber-100 pr-8" : ""
              }`}
            >
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] font-semibold text-slate-500 hover:text-amber-600 transition-colors duration-300"
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] font-semibold text-slate-500 hover:text-amber-600 transition-colors duration-300"
                  >
                    <UserPlus size={18} />
                    Register
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-slate-400 border border-slate-100 px-3 py-1 rounded-full">
                    {userEmail}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] font-semibold text-red-400 hover:text-red-600 transition-colors duration-300"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Profile Dropdown - only if the user is logged in*/}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`relative p-2 rounded-full border transition-all duration-300 ${
                    isDropdownOpen
                      ? "border-amber-500 bg-amber-50 shadow-md"
                      : "border-amber-200 hover:border-amber-500"
                  }`}
                >
                  <User
                    size={20}
                    className={
                      isDropdownOpen ? "text-amber-600" : "text-slate-700"
                    }
                  />
                  {/* Login indicator */}
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 border-2 border-white rounded-full"></span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-amber-100 rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-60">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                        Account
                      </p>
                    </div>

                    {/* My Reservations */}
                    <button
                      onClick={() => {
                        navigate("/my-reservations");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      <CalendarDays size={18} className="text-amber-600" />
                      <span className="font-medium">My Reservations</span>
                    </button>

                    {/* My Reviews */}
                    <button
                      onClick={() => {
                        navigate("/my-reviews");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      <MessageSquare size={18} className="text-amber-600" />
                      <span className="font-medium">My Reviews</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Admin section */}
            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <div className="border-r border-amber-100 pr-6 mr-2">
                <AdminMenu />
              </div>
            )}
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={openRegisterAndCloseLogin}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;
