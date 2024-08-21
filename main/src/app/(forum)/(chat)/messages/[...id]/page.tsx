import ChatView from "@/components/Forum/Messages/chat_view";

export default function Chat({ params }) {
	const { username } = params;

	const usersList = [
		{ name: "Rich Riley", username: "rich51", photo: "" },
		{ name: "Carl Shirley", username: "curlycarl", photo: "" },
		{ name: "Marion Hipólito", username: "marionnaise", photo: "" },
	];

	const user = getUser(username);

	function getUser(username: string) {
		let user = usersList.find(user => user.username === username) || {};

		return user;
	}

	return <ChatView name={user.name} username={user.username} photo={""} />;
}
