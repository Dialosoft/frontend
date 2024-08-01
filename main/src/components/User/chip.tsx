interface UserChipProps {
	highlighted?: boolean | undefined;
}

export default function UserChip({ highlighted }: UserChipProps) {
	return (
		<div className="flex gap-3 items-center">
			<img src={"https://flussen.dev/me.webp"} alt={""} className={`${ highlighted ? "border-primary-500" : "border-secondary"} h-12 w-12 rounded-full border-2 border-solid`} />
			<div>
				<p className={`${ highlighted ? "text-primary-500" : "text-secondary"} text-sm`}>{"Scrum Master"}</p>
				<p className={`text-black-500 text-sm`}>{`@${"Flussen"}`}</p>
			</div>
		</div>
	);
}
