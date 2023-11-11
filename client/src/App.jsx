import { Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Landing from "./pages/Landing";
import PublicRoutes from "./utils/PublicRoutes";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PdfUpload from "./pages/PdfUpload";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route element={<PublicRoutes />}>
          <Route path="/signin" element={<SigninPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/upload" element={<PdfUpload />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
