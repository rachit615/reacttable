import React from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import CustomLayout from "./components/Layouts/CustomLayout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Users = lazy(() => import("./pages/Users"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <CustomLayout>
                <Dashboard />
              </CustomLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <CustomLayout>
                <Dashboard />
              </CustomLayout>
            }
          />
          <Route
            path="/products"
            element={
              <CustomLayout>
                <Products />
              </CustomLayout>
            }
          />
          <Route
            path="/users"
            element={
              <CustomLayout>
                <Users />
              </CustomLayout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
