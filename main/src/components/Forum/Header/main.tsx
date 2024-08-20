import Link from "next/link";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

export default function Main_Header() {
	const session = cookies().has("_rtkn");

	return (
		<header className="py-[1rem] border-b border-black-500">
			<div className="container z-10 flex items-center justify-between">
				<Link href="/"><span className="select-none font-semibold text-xl lg:text-3xl">{process.env.Name}</span></Link>

				<div>
					{ session ? (
						<></>
					) : (
						<div className="flex items-center space-x-[.5rem]">
							<Link href="/login">
								<button className="bg-black-300 py-[.5rem] px-[1rem] rounded-md transition-transform ease-in-out duration-300 hover:scale-105 select-none">Login</button>
							</Link>

							<Link href="/register">
								<button className="bg-primary-400 py-[.5rem] px-[1.5rem] rounded-md transition-transform ease-in-out duration-300 hover:scale-105 select-none text-black-900">Register</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}