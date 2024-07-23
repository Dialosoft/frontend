import dynamic from "next/dynamic";

/* FONT */
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

/* Components */
import "@/app/globals.css";
const Header = dynamic(() => import("@/components/header/main"));

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html className="dark" lang="en">
			<body className={`${poppins.className} antialiased min-h-screen flex flex-col`}>
				<Header />
				<main className="flex-grow">{children}</main>
			</body>
		</html>
	);
}