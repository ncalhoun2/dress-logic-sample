import "./globals.css";

export const metadata = {
  title: "Dress Logic Dumb",
  description: "Dress Logic Dumb landing page",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dress Logic"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f6dfe7"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
