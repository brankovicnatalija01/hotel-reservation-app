import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import MyReservations from "./pages/MyReservations";
import MyReviews from "./pages/MyReviews";
import { Toaster } from "react-hot-toast";
import ApproveBookings from "./pages/adminPages/ApproveBookings";
import AdminCalendar from "./pages/adminPages/AdminCalendar";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/admin/approve" element={<ApproveBookings />} />
          <Route path="/admin/calendar" element={<AdminCalendar />} />

          {/* Wrong URL*/}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen font-serif italic text-2xl">
                404 - Page not found
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
