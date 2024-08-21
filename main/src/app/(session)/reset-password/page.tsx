import Image from "next/image";
import dynamic from "next/dynamic";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Reset Password",
	alternates: { canonical: "reset-password" }
};

const Form = dynamic(() => import("@/components/Session/Reset-Password/form"), { ssr: false });

export default function Register() {
	return (
		<div className="h-full flex flex-col items-center justify-center space-y-[4rem]">
			<div className="flex items-center justify-center space-x-[1rem]">
				<Image className="order-1 select-none" src="/logo.png" alt="Forum Logo" width={100} height={100} />
				<h1 className="order-2 select-none font-medium text-[4rem] xl:text-[6rem]">{process.env.Name}</h1>
			</div>

			<Form />
		</div>
	);
}