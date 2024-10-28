import Popup from "./Popup.jsx";

const ProtectedRoute = ({ element }) => {
    const userRole = localStorage.getItem("role");

    // return userRole === "admin" ? element : <Navigate to="/" />; // Arahkan ke homepage jika bukan admin
    return userRole === "admin" ? element : <Popup />;
};

export default ProtectedRoute;
