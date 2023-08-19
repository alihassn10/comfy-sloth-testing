import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
// import pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthWrapper from "./pages/AuthWrapper";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./pages/PrivateRoute";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";
function App() {
  return (
    <AuthWrapper>

    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>

        <Route exact path="/products">
          <ProductsPage />
        </Route>
        <Route exact path="/products/:id" children={<SingleProductPage />} />
        <PrivateRoute exact path="/checkout">
          <CheckoutPage />
        </PrivateRoute>
        <Route exact path="*">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
     </AuthWrapper> 
  );
}

export default App;
