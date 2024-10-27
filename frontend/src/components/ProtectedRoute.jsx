import Popup from "./Popup.jsx";

const ProtectedRoute = ({ element }) => {
    const userRole = localStorage.getItem("role"); // Ambil role dari local storage

    // return userRole === "admin" ? element : <Navigate to="/" />; // Arahkan ke homepage jika bukan admin
    return userRole === "admin" ? element : <Popup />; // Arahkan ke homepage jika bukan admin
};

export default ProtectedRoute;
