import { formatTime } from "@/utils/formatTime";

interface ChatMessageProps {
	recipient: boolean | undefined;
	content: string;
}

const recipientMsgStyling = "bg-black-500 rounded-tl-none";
const senderMsgStyling =
	"bg-primary-500 rounded-tr-none text-black-900 font-medium";

export default function ChatMessage({ recipient, content }: ChatMessageProps) {
	let time = formatTime(new Date());

	return (
		<div className={`${recipient ? "" : "ml-auto"} max-w-[85%]`}>
			<p
				className={`text-xs text-black-500 ${
					recipient ? "" : "text-right"
				}`}
			>
				{time}
			</p>
			<p
				className={`${
					recipient ? recipientMsgStyling : senderMsgStyling
				} text-sm leading-tight rounded p-1 w-max max-w-full`}
			>
				{content}
			</p>
		</div>
	);
}

