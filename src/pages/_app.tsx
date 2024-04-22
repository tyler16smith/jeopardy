import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import DocumentHeader from "@/components/DocumentHead";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable} bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white h-screen w-screen overflow-auto`}>
      <DocumentHeader />
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
