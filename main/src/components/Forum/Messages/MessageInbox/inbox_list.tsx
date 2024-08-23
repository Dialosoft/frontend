import InboxChatPreview from "./chat_preview";

function SearchDummyComponent() {
	return (
		<div className="pt-2 pb-2">
			<div className="bg-red h-12 rounded-full"></div>
		</div>
	);
}

function isOpened() {
	return Math.random() < 0.5;
}

function InboxList() {
	const usersList = [
		{ name: "Rich Riley", username: "rich51", photo: "" },
		{ name: "Carl Shirley", username: "curlycarl", photo: "" },
		{ name: "Marion Hipólito", username: "marionnaise", photo: "" },
	];

	const InboxChatPreviews = () => (
		<div className="flex flex-col bg-black-300 bg-opacity-25 gap-1 rounded-xl p-1.5">
			{usersList.map(function renderChips(user) {
				return (
					<InboxChatPreview
						key={user.username}
						name={user.name}
						username={user.username}
						photo={user.photo}
						opened={isOpened()}
					/>
				);
			})}
		</div>
	);

	return (
		<section className="flex flex-col">
			<h1 className="text-3xl font-semibold">Messages</h1>
			<div>
				<SearchDummyComponent />
				<InboxChatPreviews />
			</div>
		</section>
	);
}

export default InboxList;
