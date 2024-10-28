import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";
import { Link } from "react-router-dom";
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

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const onDeleteClick = (product) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        axiosClient.delete(`/products/${product.id}`).then(() => {
            getProducts();
        });
        console.log(product);
    };

    const getProducts = () => {
        setLoading(true);
        axiosClient
            .get("/products")
            .then(({ data }) => {
                setLoading(false);
                setProducts(data.data);
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
        //         <h1>Products</h1>
        //         <Link className="btn-add" to="/products/new">
        //             Add new
        //         </Link>
        //     </div>
        //     <div className="card animated fadeInDown">
        //         <table>
        //             <thead>
        //                 <tr>
        //                     <th>Name</th>
        //                     <th>Stock</th>
        //                     <th>Price</th>
        //                     <th>Actions</th>
        //                 </tr>
        //             </thead>
        //             {loading && (
        //                 <tbody>
        //                     <tr>
        //                         <td colSpan="5" className="text-center">
        //                             Loading...
        //                         </td>
        //                     </tr>
        //                 </tbody>
        //             )}
        //             {!loading && (
        //                 <tbody>
        //                     {products.map((p) => (
        //                         <tr key={p.id}>
        //                             <td>{p.name}</td>
        //                             <td>{p.stock}</td>
        //                             <td>{p.price}</td>
        //                             <td>
        //                                 <Link
        //                                     className="btn-edit"
        //                                     to={"/products/" + p.id}
        //                                 >
        //                                     Edit
        //                                 </Link>
        //                                 &nbsp;
        //                                 <button
        //                                     className="btn-delete"
        //                                     onClick={(ev) => onDeleteClick(p)}
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
                <MDBTypography tag="h1">Products</MDBTypography>
                <Link to="/products/new">
                    <MDBBtn color="primary">Add New</MDBBtn>
                </Link>
            </div>
            <MDBCard className="shadow-3">
                <MDBCardBody>
                    <MDBTable align="middle" responsive hover>
                        <MDBTableHead>
                            <tr>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Price</th>
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
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <Link
                                                to={`/products/${product.id}`}
                                            >
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
                                                    onDeleteClick(product)
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
