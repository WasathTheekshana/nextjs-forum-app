import Layouot from "@/components/Layouot";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layouot>
      <Component {...pageProps} />
    </Layouot>
  );
}
