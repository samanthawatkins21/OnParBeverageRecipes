import "./globals.css";

export const metadata = {
  title: "On Par Beverage Dashboard",
  description: "Beverage costing and inventory dashboard for On Par.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
