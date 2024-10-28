import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBInput,
    MDBSpinner,
    MDBTypography,
} from "mdb-react-ui-kit";
import * as PropTypes from "prop-types";

function MDBAlert(props) {
    return null;
}

MDBAlert.propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
};

function MDBSelect(props) {
    return null;
}

MDBSelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    wrapperClass: PropTypes.string,
    children: PropTypes.node,
};

function MDBSelectInput(props) {
    return null;
}

MDBSelectInput.propTypes = { placeholder: PropTypes.string };
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
            {/*{user.id && <h1>Update User: {user.name}</h1>}*/}
            {/*{!user.id && <h1>New User</h1>}*/}
            {/*<div className="card animated fadeInDown">*/}
            {/*    {loading && <div className="text-center">Loading...</div>}*/}
            {/*    {errors && (*/}
            {/*        <div className="alert">*/}
            {/*            {Object.keys(errors).map((key) => (*/}
            {/*                <p key={key}>{errors[key][0]}</p>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    {!loading && (*/}
            {/*        <form onSubmit={onSubmit}>*/}
            {/*            <input*/}
            {/*                value={user.name}*/}
            {/*                onChange={(ev) =>*/}
            {/*                    setUsers({ ...user, name: ev.target.value })*/}
            {/*                }*/}
            {/*                placeholder="Name"*/}
            {/*            />*/}
            {/*            <select*/}
            {/*                value={user.role}*/}
            {/*                onChange={(ev) =>*/}
            {/*                    setUsers({ ...user, role: ev.target.value })*/}
            {/*                }*/}
            {/*                placeholder="Select Role"*/}
            {/*            >*/}
            {/*                <option value="" disabled>*/}
            {/*                    Select Role*/}
            {/*                </option>*/}
            {/*                <option value="admin">Admin</option>*/}
            {/*                <option value="user">User</option>*/}
            {/*            </select>*/}
            {/*            <input*/}
            {/*                value={user.email}*/}
            {/*                onChange={(ev) =>*/}
            {/*                    setUsers({ ...user, email: ev.target.value })*/}
            {/*                }*/}
            {/*                placeholder="Email"*/}
            {/*            />*/}
            {/*            <input*/}
            {/*                type="password"*/}
            {/*                onChange={(ev) =>*/}
            {/*                    setUsers({ ...user, password: ev.target.value })*/}
            {/*                }*/}
            {/*                placeholder="Password"*/}
            {/*            />*/}
            {/*            <button className="btn">Save</button>*/}
            {/*        </form>*/}
            {/*    )}*/}
            {/*</div>*/}

            <MDBContainer>
                <MDBTypography tag="h1" className="mb-4">
                    {user.id ? `Update User: ${user.name}` : "New User"}
                </MDBTypography>
                <MDBCard className="shadow-3">
                    <MDBCardBody>
                        {loading && (
                            <div className="text-center">
                                <MDBSpinner role="status" />
                                <span className="ms-2">Loading...</span>
                            </div>
                        )}
                        {errors && (
                            <MDBAlert color="danger">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </MDBAlert>
                        )}
                        {!loading && (
                            <form onSubmit={onSubmit}>
                                <MDBInput
                                    label="Name"
                                    value={user.name || ""}
                                    onChange={(ev) =>
                                        setUsers({
                                            ...user,
                                            name: ev.target.value,
                                        })
                                    }
                                    wrapperClass="mb-4"
                                />

                                <select
                                    className="mdb-select mb-4"
                                    value={user.role}
                                    onChange={(ev) =>
                                        setUsers({
                                            ...user,
                                            role: ev.target.value,
                                        })
                                    }
                                    placeholder="Select Role"
                                >
                                    <option value="" disabled>
                                        Select Role
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>

                                <MDBInput
                                    label="Email"
                                    type="email"
                                    value={user.email || ""}
                                    onChange={(ev) =>
                                        setUsers({
                                            ...user,
                                            email: ev.target.value,
                                        })
                                    }
                                    wrapperClass="mb-4"
                                />
                                <MDBInput
                                    label="Password"
                                    type="password"
                                    onChange={(ev) =>
                                        setUsers({
                                            ...user,
                                            password: ev.target.value,
                                        })
                                    }
                                    wrapperClass="mb-4"
                                />
                                <MDBBtn
                                    color="primary"
                                    type="submit"
                                    className="w-100"
                                >
                                    Save
                                </MDBBtn>
                            </form>
                        )}
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    );
}
