import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProducts] = useState({
        id: null,
        name: "",
        stock: "",
        price: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/products/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setProducts(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (product.id) {
            axiosClient
                .put(`/products/${product.id}`, product)
                .then(() => {
                    navigate("/products");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/products", product)
                .then(() => {
                    navigate("/products");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    console.log(err);
                });
        }
    };

    return (
        <>
            {product.id && <h1>Update Product: {product.name}</h1>}
            {!product.id && <h1>New Product</h1>}
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
                            value={product.name}
                            onChange={(ev) =>
                                setProducts({
                                    ...product,
                                    name: ev.target.value,
                                })
                            }
                            placeholder="Name"
                        />
                        <input
                            value={product.stock}
                            onChange={(ev) =>
                                setProducts({
                                    ...product,
                                    stock: ev.target.value,
                                })
                            }
                            placeholder="Stock"
                        />
                        <input
                            value={product.price}
                            onChange={(ev) =>
                                setProducts({
                                    ...product,
                                    price: ev.target.value,
                                })
                            }
                            placeholder="Price"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
