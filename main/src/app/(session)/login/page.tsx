import dynamic from "next/dynamic";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Login",
	alternates: { canonical: "login" }
};

const Form = dynamic(() => import("@/components/Session/Login/form"), { ssr: false });

export default function Login() {
	return (
		<div className="h-full flex flex-col items-center justify-center space-y-[4rem]">
			<div>
				<h1 className="select-none font-medium text-[4rem] xl:text-[6rem]">{process.env.Name}</h1>
			</div>

			<Form />
		</div>
	);
}