import Layouot from "@/components/Layouot";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  return (
    <Layouot>
      <ToastContainer limit={1} />
      <Component {...pageProps} />
    </Layouot>
  );
}
