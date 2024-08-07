/* Variables */
const SITE = process.env.HOST as string;

/* SEO */
import type { Metadata } from "next";
export const metadata: Metadata = {
	metadataBase: new URL(SITE),
	title: {
		template: "%s | " + process.env.Name,
		default: "Session - " + process.env.Name
	},
	category: "forum",
	robots: {
		index: false,
		follow: false,
		nocache: false
	}
};

/* FONT */
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

/* Components */
import "@/app/globals.css";

export default function SessionLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} antialiased dark text-black-900 bg-secondary dark:text-secondary dark:bg-black-900 min-h-screen flex`}>
				<main className="flex-grow">{children}</main>
			</body>
		</html>
	);
}