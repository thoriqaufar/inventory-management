import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBSpinner,
} from "mdb-react-ui-kit";
import * as PropTypes from "prop-types";

function MDBAlert(props) {
    return null;
}

MDBAlert.propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
};
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
            {/*{product.id && <h1>Update Product: {product.name}</h1>}*/}
            {/*{!product.id && <h1>New Product</h1>}*/}
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
            {/*                value={product.name}*/}
            {/*                onChange={(ev) =>*/}
            {/*                    setProducts({*/}
            {/*                        ...product,*/}
            {/*                        name: ev.target.value,*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                placeholder="Name"*/}
            {/*            />*/}
            {/*            <input*/}
            {/*                value={product.stock}*/}
            {/*                onChange={(ev) =>*/}
            {/*                    setProducts({*/}
            {/*                        ...product,*/}
            {/*                        stock: ev.target.value,*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                placeholder="Stock"*/}
            {/*            />*/}
            {/*            <input*/}
            {/*                value={product.price}*/}
            {/*                onChange={(ev) =>*/}
            {/*                    setProducts({*/}
            {/*                        ...product,*/}
            {/*                        price: ev.target.value,*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                placeholder="Price"*/}
            {/*            />*/}
            {/*            <button className="btn">Save</button>*/}
            {/*        </form>*/}
            {/*    )}*/}
            {/*</div>*/}

            <MDBCard className="shadow-3 animated fadeInDown">
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
                                value={product.name || ""}
                                onChange={(ev) =>
                                    setProducts({
                                        ...product,
                                        name: ev.target.value,
                                    })
                                }
                                wrapperClass="mb-4"
                            />
                            <MDBInput
                                label="Stock"
                                type="number"
                                value={product.stock || ""}
                                onChange={(ev) =>
                                    setProducts({
                                        ...product,
                                        stock: ev.target.value,
                                    })
                                }
                                wrapperClass="mb-4"
                            />
                            <MDBInput
                                label="Price"
                                type="number"
                                value={product.price || ""}
                                onChange={(ev) =>
                                    setProducts({
                                        ...product,
                                        price: ev.target.value,
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
        </>
    );
}
