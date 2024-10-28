import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Users from "./views/Users.jsx";
import UserForm from "./views/UserForm.jsx";
import Products from "./views/Products.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProductForm from "./views/ProductForm.jsx";
import DetailProduct from "./views/DetailProduct.jsx";
import ProductList from "./views/ProductList.jsx";
import PopUpProductDetail from "./views/PopUpProductDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            // {
            //     path: "/users",
            //     element: <Users />,
            // },
            // {
            //     path: "/users/new",
            //     element: <UserForm key="userCreate" />,
            // },
            // {
            //     path: "/users/:id",
            //     element: <UserForm key="userUpdate" />,
            // },
            {
                path: "/users",
                element: <ProtectedRoute element={<Users />} />,
            },
            {
                path: "/users/new",
                element: (
                    <ProtectedRoute element={<UserForm key="userCreate" />} />
                ),
            },
            {
                path: "/users/:id",
                element: (
                    <ProtectedRoute element={<UserForm key="userUpdate" />} />
                ),
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/products/new",
                element: <ProductForm key="productCreate" />,
            },
            {
                path: "/products/:id",
                element: <ProductForm key="productUpdate" />,
            },
            {
                path: "/products/detail/:id",
                element: <DetailProduct />,
            },
            {
                path: "/product-list",
                element: <ProductList />,
            },
            {
                path: "/product-list/detail/:id",
                element: <PopUpProductDetail />,
            },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

export default router;
