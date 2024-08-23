import Image from "next/image";

interface UserChipProps {
	name?: string;
	username?: string;
	photo?: string;
	highlighted?: boolean | undefined;
	usernameBeside?: boolean | undefined;
	nameSize: "sm" | "m";
	size: "xs" | "sm";
}

export default function UserChip({ name, username, photo, highlighted, usernameBeside, nameSize, size }: UserChipProps) {
	return (
		<div className="flex gap-3 items-center h-full">
			<Image
				src={""}
				alt={""}
				className={`${highlighted ? "border-primary-500" : "border-secondary"} ${size === "xs" ? "h-9 w-9" : ""} ${
					size === "sm" ? "h-12 w-12" : ""
				} rounded-full ${size === "xs" ? "border" : ""} ${size === "sm" ? "border-2" : ""} border-solid`}
			/>
			<div className={`${usernameBeside ? "flex gap-2 items-center" : ""}`}>
				<p className={`${highlighted ? "text-primary-500" : "text-secondary"} text-${nameSize}`}>{name}</p>
				<p className={"text-black-500 text-sm"}>{`@${username}`}</p>
			</div>
		</div>
	);
}
