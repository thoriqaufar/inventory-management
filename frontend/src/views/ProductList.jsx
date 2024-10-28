import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBRipple,
    MDBBtn,
    MDBCardTitle,
} from "mdb-react-ui-kit";
import "./ecommerce-category-product.css";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
import PopUpProductDetail from "./PopUpProductDetail.jsx";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axiosClient.get("products-list").then(({ data }) => {
            setProducts(data.data);
        });
    };

    return (
        <>
            <MDBContainer fluid>
                <MDBRow className="justify-content-center mb-0">
                    <MDBCol md="12" xl="10">
                        {products.map((p) => (
                            <MDBCard
                                key={p.id}
                                className={
                                    "shadow-0 border rounded-3 mt-5 mb-3"
                                }
                            >
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol
                                            md="12"
                                            lg="3"
                                            className="mb-4 mb-lg-0"
                                        >
                                            <MDBRipple
                                                rippleColor="light"
                                                rippleTag="div"
                                                className="bg-image rounded hover-zoom hover-overlay"
                                            >
                                                <MDBCardImage
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                                                    fluid
                                                    className="w-100"
                                                />
                                                <a href="#!">
                                                    <div
                                                        className="mask"
                                                        style={{
                                                            backgroundColor:
                                                                "rgba(251, 251, 251, 0.15)",
                                                        }}
                                                    ></div>
                                                </a>
                                            </MDBRipple>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <br />
                                            <br />
                                            <h5>{p.name}</h5>
                                            <div className="mt-1 mb-0 text-muted small">
                                                <span>Lorem Ipsum</span>
                                                <span className="text-primary">
                                                    {" "}
                                                    •{" "}
                                                </span>
                                                <span>Lorem Ipsum</span>
                                                <span className="text-primary">
                                                    {" "}
                                                    •{" "}
                                                </span>
                                                <span>
                                                    Lorem Ipsum
                                                    <br />
                                                </span>
                                            </div>
                                            <div className="mb-2 text-muted small">
                                                <span>Lorem Ipsum</span>
                                                <span className="text-primary">
                                                    {" "}
                                                    •{" "}
                                                </span>
                                                <span>Lorem Ipsum</span>
                                                <span className="text-primary">
                                                    {" "}
                                                    •{" "}
                                                </span>
                                                <span>
                                                    Lorem Ipsum
                                                    <br />
                                                </span>
                                            </div>
                                            <p className="text-truncate mb-4 mb-md-0">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit,
                                                sed do eiusmod tempor incididunt
                                                ut labore et dolore magna
                                                aliqua.
                                            </p>
                                        </MDBCol>
                                        <MDBCol
                                            md="6"
                                            lg="3"
                                            className="border-sm-start-none border-start"
                                        >
                                            <br />
                                            <br />
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                {p.is_discount_active ? (
                                                    <>
                                                        <h4 className="mb-1 me-1">
                                                            {p.discounted_price}
                                                        </h4>
                                                        <span className="text-danger">
                                                            <s>{p.price}</s>
                                                        </span>
                                                    </>
                                                ) : (
                                                    <h4 className="mb-1 me-1">
                                                        {p.discounted_price}
                                                    </h4>
                                                )}
                                            </div>
                                            <h6 className="text-success">
                                                Stock: {p.stock}
                                            </h6>
                                            <div className="d-flex flex-column mt-4">
                                                <MDBBtn
                                                    href={
                                                        "/product-list/detail/" +
                                                        p.id
                                                    }
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Details
                                                </MDBBtn>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        ))}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
}
