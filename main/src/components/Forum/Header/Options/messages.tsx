import Link from "next/link";
import { MessageCircleMore } from "lucide-react";

export default function Notify_Header() {
	return (
		<Link href="/messages" prefetch={false}>
			<MessageCircleMore className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary" />
		</Link>
	);
}
