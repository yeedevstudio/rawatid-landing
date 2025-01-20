import { lazy } from "react";

const HomePage = lazy(() => import("@/module/home"));

export default function Home() {
  return <HomePage />;
}
