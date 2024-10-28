import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBSpinner,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBTypography,
} from "mdb-react-ui-kit";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            getUsers();
        });
    };

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        // <div>
        //     <div
        //         style={{
        //             display: "flex",
        //             justifyContent: "space-between",
        //             alignItems: "center",
        //         }}
        //     >
        //         <h1>Users</h1>
        //         <Link className="btn-add" to="/users/new">
        //             Add new
        //         </Link>
        //     </div>
        //     <div className="card animated fadeInDown">
        //         <table>
        //             <thead>
        //                 <tr>
        //                     <th>Name</th>
        //                     <th>Role</th>
        //                     <th>Email</th>
        //                     <th>Actions</th>
        //                 </tr>
        //             </thead>
        //             {loading && (
        //                 <tbody>
        //                     <tr>
        //                         <td colSpan="6" className="text-center">
        //                             Loading...
        //                         </td>
        //                     </tr>
        //                 </tbody>
        //             )}
        //             {!loading && (
        //                 <tbody>
        //                     {users.map((u) => (
        //                         <tr key={u.id}>
        //                             <td>{u.name}</td>
        //                             <td>{u.role}</td>
        //                             <td>{u.email}</td>
        //                             <td>
        //                                 <Link
        //                                     className="btn-edit"
        //                                     to={"/users/" + u.id}
        //                                 >
        //                                     Edit
        //                                 </Link>
        //                                 &nbsp;
        //                                 <button
        //                                     className="btn-delete"
        //                                     onClick={(ev) => onDeleteClick(u)}
        //                                 >
        //                                     Delete
        //                                 </button>
        //                             </td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             )}
        //         </table>
        //     </div>
        // </div>
        <MDBContainer>
            <div className="d-flex justify-content-between align-items-center my-4">
                <MDBTypography tag="h1">Users</MDBTypography>
                <Link to="/users/new">
                    <MDBBtn color="primary">Add New</MDBBtn>
                </Link>
            </div>
            <MDBCard className="shadow-3">
                <MDBCardBody>
                    <MDBTable align="middle" responsive hover>
                        <MDBTableHead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        {loading ? (
                            <MDBTableBody>
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <MDBSpinner role="status" />
                                        <span className="ms-2">Loading...</span>
                                    </td>
                                </tr>
                            </MDBTableBody>
                        ) : (
                            <MDBTableBody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link to={`/users/${user.id}`}>
                                                <MDBBtn
                                                    size="sm"
                                                    color="warning"
                                                    className="me-2"
                                                >
                                                    Edit
                                                </MDBBtn>
                                            </Link>
                                            <MDBBtn
                                                size="sm"
                                                color="danger"
                                                onClick={() =>
                                                    onDeleteClick(user)
                                                }
                                            >
                                                Delete
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        )}
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}
