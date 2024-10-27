import { useNavigate } from "react-router-dom";

const Popup = ({ message }) => {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const handleOkClick = () => {
        navigate("/"); // Melakukan navigasi ke '/'
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Access Denied</h2>
                <p>{message}</p>
                <button className="btn-ok" onClick={handleOkClick}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default Popup;