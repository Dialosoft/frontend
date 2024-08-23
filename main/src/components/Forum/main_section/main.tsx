"use client";

import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";

const Category = dynamic(() => import("./category"));
const ManageCategory = dynamic(() => import("./manage_category"));

import { getUser } from "@/utils/User/getUser";

export default function MainSection() {
	const [title, setTitle] = useState("");
	const [user, setUser] = useState<any>(null);
	const [showManage, setShowManage] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser();
			setUser(userData);
		};

		fetchUser();
	}, []);

	const category = [
		{
			id: "1",
			type: "Info",
			title: "News and announcements",
			posts: 52,
			comments: 2133,
		},
		{
			id: "2",
			type: "Event",
			title: "Promotions & events",
			posts: 32,
			comments: 8333,
		},
		{
			id: "3",
			type: "Help",
			title: "Rules & FAQs",
			posts: 62,
			comments: 1733,
		},
	];

	const handleInputChange = (newValue: string) => {
		setTitle(newValue);
	};

	return (
		<div className="w-full space-y-4">
			<div className="flex justify-between">
				<h2 className="text-3xl font-semibold">Main Section</h2>

				{true && (
					<button
						onClick={() => {
							setShowManage(!showManage), setTitle(title);
						}}
						className="bg-black-300 bg-opacity-25 border space-x-1 flex font-medium items-center border-black-300 border-opacity-25 text-black-500 hover:text-secondary h-9 px-2 rounded-lg "
					>
						<Settings />
						<div>Manage</div>
					</button>
				)}
			</div>

			<div className="w-full bg-black-300 bg-opacity-25 p-2 grid grid-cols-1 gap-2 rounded-lg">
				{category.map(category => (
					<Link href={`c/${category.id}`} key={uuidv4()}>
						<Category type={category.type} title={category.title} posts={category.posts} comments={category.comments} />
					</Link>
				))}
			</div>
			<div className="flex justify-center">
				{true && (
					<button
						onClick={() => setShowManage(!showManage)}
						className="bg-black-300 flex justify-center w-96 items-center text-xl font-medium bg-opacity-25 border border-black-300 border-opacity-25 text-black-500 hover:text-secondary h-14  rounded-lg "
					>
						New Category
					</button>
				)}
			</div>
			{showManage && <ManageCategory onClose={() => setShowManage(false)} title={title} onChange={newValue => handleInputChange(newValue)} />}
		</div>
	);
}
