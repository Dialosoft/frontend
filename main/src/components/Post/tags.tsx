export default function PostTags() {
	const tagsList = [
		{ name: "veggie" },
		{ name: "discord" },
		{ name: "english" },
	];

	function tagElement(name: string, i: number) {
		return (
			<p
				className="px-3 bg-black-500 bg-opacity-25 rounded-full border"
				key={`${name}-${i}`}
			>
				{name}
			</p>
		);
	}

	function Tags() {
		return tagsList.map((tag, i) => tagElement(tag.name, i));
	}

	return (
		<div className="flex gap-2 items-center justify-end rounded-full m-3 p-1 ml-auto pr-0">
			<Tags />
		</div>
	);
}
