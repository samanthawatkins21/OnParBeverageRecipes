import "./globals.css";

export const metadata = {
  title: "On Par Beverage Recipes",
  description: "Cocktail recipe costing dashboard for On Par.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
