import dynamic from "next/dynamic";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Login",
	alternates: { canonical: "login" }
};

const Form = dynamic(() => import("@/components/Session/Login/form"), { ssr: false });

export default function Login() {
	return (
		<div className="h-full flex items-center justify-center">
			<Form />
		</div>
	);
}