import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const Menu = dynamic(() => import("@/components/Forum/Header/menu"));

export default function Main_Header() {
	const session = cookies().has("_rtkn");

	return (
		<header className="py-[1rem] border-b border-black-500">
			<div className="container z-10 flex items-center justify-between">
				<Link className="flex items-center justify-center space-x-2" href="/">
					<Image className="order-1 select-none" src="/logo.png" alt="Forum Logo" width={35} height={35} />
					<span className="order-2 select-none font-bold text-xl lg:text-3xl">{process.env.Name}</span>
				</Link>

				<div>
					{ session ? (
						<Suspense>
							<Menu />
						</Suspense>
					) : (
						<div className="flex items-center space-x-[.5rem]">
							<Link href="/login">
								<button className="bg-black-300 py-[.5rem] px-[1rem] rounded-md transition-transform ease-in-out duration-300 hover:scale-105 select-none font-medium">Login</button>
							</Link>

							<Link href="/register">
								<button className="bg-primary-400 py-[.5rem] px-[1.5rem] rounded-md transition-transform ease-in-out duration-300 hover:scale-105 select-none font-medium text-black-900">Register</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}