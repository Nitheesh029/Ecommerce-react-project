import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home, Products, Cart, ProductDetails } from "./pages";

export const productDetailsLoader = async ({ params }) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/${params.id}`
  );
  if (!response.ok) {
    throw new Error("Product not found");
  }
  return response.json();
};

export const productsLoader = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return response.json();
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="products" element={<Products />} loader={productsLoader} />
      <Route
        path="product/:id"
        element={<ProductDetails />}
        loader={productDetailsLoader}
      />
      <Route path="cart" element={<Cart />} />
    </Route>
  )
);

// Root
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
