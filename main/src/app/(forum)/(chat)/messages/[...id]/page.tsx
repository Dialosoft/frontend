import dynamic from "next/dynamic";

const ChatView = dynamic(() => import("@/components/Forum/Messages/chat_view"));

export default function Chat() {
	const usersList = [
		{ name: "Rich Riley", username: "rich51", photo: "" },
		{ name: "Carl Shirley", username: "curlycarl", photo: "" },
		{ name: "Marion Hipólito", username: "marionnaise", photo: "" },
	];

	const user = getUser("rich51");

	function getUser(username: string) {
		const user = usersList.find(user => user.username === username) || {};

		return { name: user.name, username: user.username };
	}

	return <ChatView name={user.name} username={user.username} photo={""} />;
}
