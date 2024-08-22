import Article from "./article";
export default function LastArticles() {
	const article = [
		{ title: "Invade Event: Poland", user: "@alejandro", date: "2h" },
		{ title: "Invade Event: Poland", user: "@alejandro", date: "2h" },
		,
		{ title: "Invade Event: Poland", user: "@alejandro", date: "2h" },
		,
		{ title: "Invade Event: Poland", user: "@alejandro", date: "2h" },
	];

	return (
		<div className="w-full flex-col space-y-4 ">
			<h2 className=" text-3xl font-semibold">Last Articles</h2>
			<div className="bg-black-300 bg-opacity-25 p-2 space-y-2 rounded-lg">
				{article.map((article, index) => (
					<Article
						key={index}
						title={article.title}
						user={article.user}
						time={article.date}
					/>
				))}
			</div>
		</div>
	);
}
