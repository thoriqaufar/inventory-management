import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";
import { Link } from "react-router-dom";

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
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Products</h1>
                <Link className="btn-add" to="/products/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.stock}</td>
                                    <td>{p.price}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/products/" + p.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={(ev) => onDeleteClick(p)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
