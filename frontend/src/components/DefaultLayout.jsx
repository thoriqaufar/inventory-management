import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        // eslint-disable-next-line no-empty-pattern
        axiosClient.get("/logout").then(({}) => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("role");
        });
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            localStorage.setItem("role", data.role);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        {user.name} ({user.role})
                    </div>
                    <div>
                        <a href="/users" className="btn-logout">
                            {" "}
                            Users
                        </a>
                        <a href="/products" className="btn-logout">
                            {" "}
                            Products
                        </a>
                        <a href="#" onClick={onLogout} className="btn-logout">
                            {" "}
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
