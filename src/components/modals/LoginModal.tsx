import React, { useState } from "react";
import { Mail, Lock, X, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { loginUser } from "../../api/authApi";
import type { LoginResponse } from "../../types/login";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data: LoginResponse = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userId", data.id.toString());
      onClose();
      window.location.reload();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl p-14 animate-in fade-in zoom-in duration-300">
        {/* Close Button -*/}
        <button
          onClick={onClose}
          className="absolute top-10 right-10 text-slate-400 hover:text-amber-600 transition-colors focus:outline-none"
        >
          <X size={28} />
        </button>

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-serif italic text-slate-800 mb-3 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-lg -mb-2.5">
            Please enter your credentials to continue.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-8 flex items-center gap-4 p-5 bg-red-50 border border-red-100 text-red-600 rounded-3xl animate-shake">
            <AlertCircle size={22} />
            <span className="text-sm font-bold uppercase tracking-wider">
              {error}
            </span>
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Email Input - Povećan py, pl, text-size i ikonice */}
          <div className="space-y-3">
            <label className="text-[13px] uppercase tracking-[0.25em] font-bold text-slate-400 ml-2 mb-4">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-600"
                size={22}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                className="w-full bg-slate-50 border border-amber-100 rounded-3xl py-5 pl-14 pr-6 text-base focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-3">
            <label className="text-[13px] uppercase tracking-[0.25em] font-bold text-slate-400 ml-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-600"
                size={22}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-amber-100 rounded-3xl py-5 pl-14 pr-6 text-base focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-amber-50 py-5 rounded-3xl  font-bold uppercase tracking-[0.25em] text-sm flex items-center justify-center gap-4 hover:bg-amber-600 hover:text-white transition-all duration-300 group shadow-2xl shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                Sign In
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{" "}
            <button
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
              className="text-amber-600 font-bold hover:underline ml-1"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
