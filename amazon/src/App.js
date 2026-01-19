import "./App.css";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Service from "./components/Service";
import Todo from "./components/Todo";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import TicTacToe from "./components/TicTacToe";
import Admin from "./components/Admin";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Nav />

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* USER ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute role="user">
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/service"
          element={
            <ProtectedRoute role="user">
              <Service />
            </ProtectedRoute>
          }
        />

        <Route
          path="/todo"
          element={
            <ProtectedRoute role="user">
              <Todo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contactus"
          element={
            <ProtectedRoute role="user">
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tictactoe"
          element={
            <ProtectedRoute role="user">
              <TicTacToe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute role="user">
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;