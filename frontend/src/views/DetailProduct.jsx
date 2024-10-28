import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";

export default function DetailProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProducts] = useState({
        id: null,
        name: "",
        stock: "",
        price: "",
        discount: "",
        date_started: "",
        date_ended: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/products-list/detail/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setProducts(data);
                    console.log(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    return (
        <>
            {/*{product.id && <h1>Update Product: {product.name}</h1>}*/}
            {/*{!product.id && <h1>New Product</h1>}*/}
            {/*<div className={"card animated fadeInDown"}>*/}
            {/*    <div className={"text text-center"}>*/}
            {/*        <p>Product: {product.name}</p>*/}
            {/*        <p>Stock: {product.stock}</p>*/}
            {/*        <p>Price: {product.price}</p>*/}
            {/*        <p>Discount: {product.discount}</p>*/}
            {/*        <p>Discount Start: {product.date_started}</p>*/}
            {/*        <p>Discount End: {product.date_ended}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div style={styles.card}>
                <h3 style={styles.title}>Product Details</h3>
                <div style={styles.content}>
                    <p style={styles.text}>
                        <strong>Product:</strong> {product.name}
                    </p>
                    <p style={styles.text}>
                        <strong>Stock:</strong> {product.stock}
                    </p>
                    <p style={styles.text}>
                        <strong>Price:</strong> ${product.price}
                    </p>
                    {product.discount ? (
                        <>
                            <p style={styles.text}>
                                <strong>Discount:</strong> {product.discount}%
                            </p>
                            <p style={styles.text}>
                                <strong>Discount Period:</strong>
                            </p>
                            <p style={styles.subText}>
                                {product.date_started} - {product.date_ended}
                            </p>
                        </>
                    ) : (
                        <p style={styles.text}>
                            <strong>No Discount Available</strong>
                        </p>
                    )}
                </div>
            </div>
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
            {/*        <form>*/}
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
            {/*            <input*/}
            {/*                value={product.discount}*/}
            {/*                onChange={(ev) =>*/}
            {/*                    setProducts({*/}
            {/*                        ...product,*/}
            {/*                        stock: ev.target.value,*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                placeholder="Discount"*/}
            {/*            />*/}
            {/*            /!*<button className="btn">Save</button>*!/*/}
            {/*        </form>*/}
            {/*    )}*/}
            {/*</div>*/}
        </>
    );
}

const styles = {
    // card: {
    //     border: '1px solid #ddd',
    //     borderRadius: '10px',
    //     padding: '20px',
    //     width: '350px',
    //     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    //     backgroundColor: '#f9f9f9',
    // },
    // title: {
    //     fontSize: '22px',
    //     fontWeight: 'bold',
    //     color: '#333',
    //     textAlign: 'center',
    //     marginBottom: '20px',
    //     textTransform: 'uppercase',
    //     letterSpacing: '1px',
    // },
    // content: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     gap: '10px',
    // },
    // text: {
    //     fontSize: '16px',
    //     color: '#555',
    //     margin: '0',
    // },
    // subText: {
    //     fontSize: '14px',
    //     color: '#777',
    //     margin: '0',
    //     paddingLeft: '10px',
    // },
    card: {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "350px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: "20px",
        textTransform: "uppercase",
        letterSpacing: "1px",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    text: {
        fontSize: "16px",
        color: "#555",
        margin: "0",
    },
    subText: {
        fontSize: "14px",
        color: "#777",
        margin: "0",
        paddingLeft: "10px",
    },
};
