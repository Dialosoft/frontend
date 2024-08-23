import Link from "next/link";

export default function NotFound() {
	return (
		<div className="h-[80vh] flex text-secondary">
			<div className="container flex flex-col items-center justify-center">
				<h1 className="select-none text-6xl font-bold mb-4">404</h1>
				<p className="select-none text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>

				<Link className="px-6 py-3 bg-primary-400 text-black-900 rounded-md transition-all ease-in-out duration-300 hover:scale-110" href="/">
					<span className="select-none">Go back home</span>
				</Link>
			</div>
		</div>
	);
}
