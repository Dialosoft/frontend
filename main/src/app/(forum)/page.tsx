import PostOverview from "@/components/Post/overview";

export default function Home() {
	return (
		<div className="max-w-screen-lg flex flex-column flex-col gap-4 p-4 pl-40">
			<PostOverview />
			<PostOverview />
		</div>
	);
}
