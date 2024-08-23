import dynamic from "next/dynamic";

/* Variables */
const SITE = process.env.HOST as string;

/* SEO */
import type { Metadata } from "next";
export const metadata: Metadata = {
	metadataBase: new URL(SITE),
	title: {
		template: "%s | " + process.env.Name,
		default: "Home - " + process.env.Name,
	},
	description: process.env.Description,
	category: "forum",
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/logo.png",
	},
};

/* FONT */
import { Poppins } from "next/font/google";
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/* Components */
import "@/app/globals.css";
const Header = dynamic(() => import("@/components/Forum/Header/main"));
const SetTheme = dynamic(() => import("@/components/Hooks/useDark"), { ssr: false });

export default function ForumLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body
				className={`${poppins.className} antialiased text-black-900 bg-secondary dark:text-secondary dark:bg-black-900 min-h-screen flex flex-col`}
			>
				<SetTheme />
				<Header />
				<main className="flex-grow">{children}</main>
			</body>
		</html>
	);
}
