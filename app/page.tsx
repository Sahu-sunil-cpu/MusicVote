import Image from "next/image";
import { AppProvider } from "./contexts/AppContext";
import LandingPage from "./components/Landing";

export default function Home() {
  return (
  <AppProvider>
    <LandingPage/>
  </AppProvider>
  );
}
