import "./globals.css";
import {Inter} from "next/font/google";
import {WishlistProvider} from "./context/WishlistContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <body className={inter.className} style={{ margin: 0, backgroundColor: "#000", color: "white" }}>
      {/* WishlistProvider овозможува сите компоненти внатре да знаат кои се омилени места */}
      <WishlistProvider>
        {children}
      </WishlistProvider>
      </body>
      </html>
  );
}