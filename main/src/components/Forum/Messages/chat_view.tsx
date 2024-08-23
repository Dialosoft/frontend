import UserChip from "../Header/User/chip";
import { Send, Smile } from "lucide-react";
import ChatMessage from "./chat_message";

const messages = [
	{ content: "Hey sweet potato" },
	{ content: "I hate grapes" },
	{ content: "My mom stopped loving me" },
	{
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat atque facilis, facere hic doloribus nobis praesentium. Provident quidem at unde dolores, saepe a.",
	},
];

interface ChatViewProps {
	name: string | undefined;
	username: string | undefined;
	photo: string | undefined;
}
function isRecipient() {
	return Math.random() < 0.5;
}

function ChatMessages() {
	return (
		<div className="flex flex-col h-full px-3 py-3.5 gap-1 justify-end">
			{messages.map(({ content }, i) => (
				<ChatMessage key={i} recipient={isRecipient()} content={content} />
			))}
		</div>
	);
}

export default function ChatView({ name, username, photo }: ChatViewProps) {
	return (
		<div className="flex flex-col h-full">
			<div className="border-black-500 border rounded-t-xl border-opacity-25 py-1 px-3 h-12">
				<UserChip name={name} username={username} photo={photo} nameSize="m" usernameBeside={true} size="xs" />
			</div>
			<ChatMessages />
			<div className="flex items-center border-black-500 border rounded-b-xl border-opacity-25 py-1 px-3 h-16 gap-3">
				<Smile className="text-black-500" />
				<input
					type="search"
					placeholder="Enter message..."
					className="w-full text-sm bg-transparent placeholder:text-black-500 focus:outline-none appearance-none"
				/>
				<Send className="text-black-500" />
			</div>
		</div>
	);
}
