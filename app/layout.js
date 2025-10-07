import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description: "Luxury cabin hotel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} background-image
        min-h-screen flex flex-col   bg-primary-950 
          text-primary-100 `}
      >
        <Header />

        <div className="flex-1  grid   px-8 py-12">
          <main className="  mx-auto  w-full ">{children}</main>
        </div>
      </body>
    </html>
  );
}
