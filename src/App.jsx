import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Voice from "./pages/Voice/Voice";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Navigate replace to="dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="product" element={<Products />} />
                    <Route path="anna" element={<Voice />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
