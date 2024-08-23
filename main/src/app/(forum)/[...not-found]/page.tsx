import { notFound } from "next/navigation";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "404",
	alternates: { canonical: "404" },
};

export default function NotFound() {
	notFound();
}