import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Voice2 from "./pages/Voice/Voice2";

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
            path="anna"
            element={
              // <ProtectedRoute>
                <Voice2 />
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
