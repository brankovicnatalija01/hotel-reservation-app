import React, { useState } from "react";
import {
  Mail,
  Lock,
  Phone,
  X,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { registerUser } from "../../api/authApi";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
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
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl p-14 animate-in fade-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-10 right-10 text-slate-400 hover:text-amber-600 transition-colors"
        >
          <X size={28} />
        </button>

        <div className="mb-10">
          <h2 className="text-4xl font-serif italic text-slate-800 mb-3 tracking-tight">
            Create Account
          </h2>
          <p className="text-slate-500 text-lg">
            Join the Pine Mountain Lodge community.
          </p>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-4 p-5 bg-red-50 border border-red-100 text-red-600 rounded-3xl ">
            <AlertCircle size={22} />
            <span className="text-sm font-bold uppercase tracking-wider">
              {error}
            </span>
          </div>
        )}

        {success ? (
          <div className="text-center py-10 animate-bounce">
            <CheckCircle2 size={80} className="text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800">
              Welcome Aboard!
            </h3>
            <p className="text-slate-500">Redirecting to login...</p>
          </div>
        ) : (
          <form className="space-y-6 -mt-2" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[12px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-2">
                  First Name
                </label>
                <input
                  name="firstName"
                  required
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-amber-100 rounded-[1.2rem] py-4 px-6 text-base focus:border-amber-500 outline-none transition-all"
                  placeholder="Natalija"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-2">
                  Last Name
                </label>
                <input
                  name="lastName"
                  required
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-amber-100 rounded-[1.2rem] py-4 px-6 text-base focus:border-amber-500 outline-none transition-all"
                  placeholder="Brankovic"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-600"
                  size={20}
                />
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-amber-100 rounded-[1.2rem] py-4 pl-14 pr-6 text-base focus:border-amber-500 outline-none transition-all"
                  placeholder="natalija@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-2">
                Phone
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-600"
                  size={20}
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-amber-100 rounded-[1.2rem] py-4 pl-14 pr-6 text-base focus:border-amber-500 outline-none transition-all"
                  placeholder="+381..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-600"
                  size={20}
                />
                <input
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-amber-100 rounded-[1.2rem] py-4 pl-14 pr-6 text-base focus:border-amber-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-slate-900 text-amber-50 py-5 rounded-3xl font-bold uppercase tracking-[0.25em] text-sm flex items-center justify-center gap-4 hover:bg-amber-600 transition-all duration-300 mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Register Now"
              )}
            </button>
          </form>
        )}
        {!success && (
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400 font-medium">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-amber-600 font-bold hover:underline ml-1 transition-colors"
              >
                Login here
              </button>
            </p>
          </div>
        )}
        {/* ---------------------------- */}
      </div>
    </div>
  );
};

export default RegisterModal;
