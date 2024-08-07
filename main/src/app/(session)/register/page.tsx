import dynamic from "next/dynamic";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Register",
	alternates: { canonical: "register" }
};

const Form = dynamic(() => import("@/components/Session/Register/form"), { ssr: false });

export default function Register() {
	return (
		<div className="h-full flex items-center justify-center">
			<Form />
		</div>
	);
}