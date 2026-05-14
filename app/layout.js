import "./globals.css";

export const metadata = {
  title: "Dress Logic Dumb",
  description: "Dress Logic Dumb landing page"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
