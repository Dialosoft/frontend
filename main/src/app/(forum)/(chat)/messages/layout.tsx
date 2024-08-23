import dynamic from "next/dynamic";

const InboxList = dynamic(() => import("@/components/Forum/Messages/MessageInbox/inbox_list"));

export default function MessagesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="container">
			<div className="grid grid-cols-3 pt-16 gap-2 p-2">
				<InboxList />
				{children}
			</div>
		</div>
	);
}
