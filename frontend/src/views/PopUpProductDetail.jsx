import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
} from "mdb-react-ui-kit";
import "./ecommerce-category-product.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";

export default function PopUpProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = () => {
        axiosClient.get(`/products-list/detail/${id}`).then(({ data }) => {
            setProduct(data);
            console.log(data);
        });
    };

    return (
        <MDBContainer fluid className="my-5">
            <MDBRow className="justify-content-center">
                <MDBCol md="6">
                    {product && (
                        <>
                            <MDBCard className="text-black">
                                <MDBCardImage
                                    // src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/3.webp"
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                                    position="top"
                                    alt="Apple Computer"
                                />
                                <MDBCardBody>
                                    <div className="text-center">
                                        <MDBCardTitle>
                                            {product.name}
                                        </MDBCardTitle>
                                        <p className="text-muted mb-4">
                                            Stock : {product.stock}
                                        </p>
                                    </div>
                                    <div>
                                        {product.is_discount_active ? (
                                            <>
                                                <div className="d-flex justify-content-between">
                                                    <span>Discount</span>
                                                    <span>
                                                        {product.discount * 100}
                                                        %
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Normal Price</span>
                                                    <span
                                                        className={
                                                            "text-danger"
                                                        }
                                                    >
                                                        <s>{product.price}</s>
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>
                                                        Discounted Price
                                                    </span>
                                                    <span>
                                                        {
                                                            product.discounted_price
                                                        }
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Date Started</span>
                                                    <span>
                                                        {product.date_started}
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Date Ended</span>
                                                    <span>
                                                        {product.date_ended}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="d-flex justify-content-between">
                                                    <span>Price</span>
                                                    <span>{product.price}</span>
                                                </div>
                                                <div className="text-center">
                                                    <br />
                                                    <br />
                                                    <p className="text-muted mb-4">
                                                        There is no discount for
                                                        this product at this
                                                        moment.
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </>
                    )}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
