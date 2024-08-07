import dynamic from "next/dynamic";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Register",
	alternates: { canonical: "register" }
};

const Form = dynamic(() => import("@/components/Session/Register/form"), { ssr: false });

export default function Register() {
	return (
		<div className="h-full flex flex-col items-center justify-center space-y-[4rem]">
			<div>
				<h1 className="select-none font-medium text-[3rem] xl:text-[5rem]">{process.env.Name}</h1>
			</div>

			<Form />
		</div>
	);
}