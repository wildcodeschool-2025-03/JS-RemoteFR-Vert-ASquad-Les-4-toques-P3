import "./App.css";
import { Outlet } from "react-router";
import { AuthProvider } from "./Auth/authContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
