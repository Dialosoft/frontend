import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Register",
	alternates: { canonical: "register" },
};

const Form = dynamic(() => import("@/components/Session/Register/form"), { ssr: false });

export default function Register() {
	return (
		<div className="h-full flex flex-col items-center justify-center space-y-[4rem]">
			<Link href="/" prefetch={false} className="flex items-center justify-center space-x-[1rem]">
				<Image className="order-1 select-none" src="/logo.png" alt="Forum Logo" width={100} height={100} style={{ width: "100%", height: "auto" }} />
				<h1 className="order-2 select-none font-medium text-[4rem] xl:text-[6rem]">{process.env.Name}</h1>
			</Link>

			<Form />
		</div>
	);
}