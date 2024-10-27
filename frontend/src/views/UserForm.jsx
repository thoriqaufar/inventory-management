import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUsers] = useState({
        id: null,
        name: "",
        role: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUsers(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            onChange={(ev) =>
                                setUsers({ ...user, name: ev.target.value })
                            }
                            placeholder="Name"
                        />
                        <select
                            value={user.role}
                            onChange={(ev) =>
                                setUsers({ ...user, role: ev.target.value })
                            }
                            placeholder="Select Role"
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <input
                            value={user.email}
                            onChange={(ev) =>
                                setUsers({ ...user, email: ev.target.value })
                            }
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={(ev) =>
                                setUsers({ ...user, password: ev.target.value })
                            }
                            placeholder="Password"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
