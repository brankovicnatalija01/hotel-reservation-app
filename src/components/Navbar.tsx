import React, { useState } from "react";
import { User, LogIn, UserPlus, TreePine, LogOut } from "lucide-react";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";

const Navbar: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-white border-b border-amber-100/50 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => (window.location.href = "/")}
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
            <div className="flex items-center gap-8 border-r border-amber-100 pr-8">
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
                    onClick={() => setIsRegisterOpen(true)} // Otvaranje Register modala
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

            {/* Profile Icon / Account Area */}
            <button className="relative group p-2 rounded-full border border-amber-200 hover:border-amber-500 transition-all duration-300">
              <User
                size={20}
                className="text-slate-700 group-hover:text-amber-600 transition-colors"
              />

              {isLoggedIn && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 border-2 border-white rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Login Modal Component */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => setIsRegisterOpen(true)}
      />

      {/* Register Modal Component */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
};

export default Navbar;
