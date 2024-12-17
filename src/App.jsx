import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Voice from "./pages/Voice/Voice";

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route element={<Layout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route
            path="dashboard"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="product"
            element={
              // <ProtectedRoute>
                <Products />
              // </ProtectedRoute>
            }
          />
          <Route
            path="productvoice"
            element={
              // <ProtectedRoute>
                <Voice />
              // </ProtectedRoute>
            }
          />
          </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
