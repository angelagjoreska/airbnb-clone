import "./globals.css";
import {ToastProvider} from "./components/ToastProvider";
import {WishlistProvider} from "./context/WishlistContext";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#000", color: "white", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* WishlistProvider овозможува сите компоненти внатре да знаат кои се омилени места */}
      <ToastProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </ToastProvider>
      </body>
      </html>
  );
}
