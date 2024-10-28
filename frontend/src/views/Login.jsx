import { useRef, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBInput,
    MDBTypography,
} from "mdb-react-ui-kit";

export default function login() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const emailRef = useRef();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const passwordRef = useRef();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { setUser, setToken } = useStateContext();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState(null);

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setError(null);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    console.log(response.data);
                    setError("Email or password are incorrect");
                }
            });
    };

    return (
        // <div className="login-signup-form animated fadeinDown">
        //     <div className="form">
        //         <h1 className="title">Login To Your Account</h1>
        //         {error && <p className="alert">{error}</p>}
        //         <form onSubmit={Submit}>
        //             <input ref={emailRef} type="email" placeholder="Email" />
        //             <input
        //                 ref={passwordRef}
        //                 type="password"
        //                 placeholder="Password"
        //             />
        //             <button className="btn btn-block">Login</button>
        //         </form>
        //     </div>
        // </div>
        <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
            <MDBCard className="shadow-5" style={{ maxWidth: "400px" }}>
                <MDBCardBody>
                    <MDBTypography tag="h1" className="text-center mb-4">
                        Login To Your Account
                    </MDBTypography>
                    {error && <p className="alert alert-danger">{error}</p>}
                    <form onSubmit={Submit}>
                        <MDBInput
                            ref={emailRef}
                            type="email"
                            label="Email"
                            className="mb-4"
                            size="lg"
                        />
                        <MDBInput
                            ref={passwordRef}
                            type="password"
                            label="Password"
                            className="mb-4"
                            size="lg"
                        />
                        <MDBBtn
                            type="submit"
                            color="primary"
                            className="w-100 mb-4"
                        >
                            Login
                        </MDBBtn>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}
