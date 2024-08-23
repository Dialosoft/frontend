"use client";

import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Settings, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { getCategories } from "@/utils/Categories/getCategories";
const Category = dynamic(() => import("./category"));
const CreateCategory = dynamic(() => import("./manage_category"));
const AddForum = dynamic(() => import("./addForum"));
import { getUser } from "@/utils/User/getUser";
import categorySchema from "@/schemas/Categories/category";
const EditCategory = dynamic(() => import("./newCategory"));

interface UserProps {
	created_at: string;
	uuid: string;
	username: string;
	role: {
		admin_role: boolean;
		mod_role: boolean;
	};
}
interface CategoriesProps {}

export default function MainSection() {
	const [title, setTitle] = useState("");
	const [user, setUser] = useState<UserProps | null>(null);
	const [showManage, setShowManage] = useState(false);
	const [showAddForum, setShowAddForum] = useState(false);
	const [categories, setCategories] = useState([]);
	const [showEdit, setShowEdit] = useState(false);
	const [description, setDescription] = useState("");

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser();
			console.log("Perr: " + userData);
			setUser(userData);
		};

		fetchUser();
	}, []);

	useEffect(() => {
		const fetchCategories = async () => {
			const userData = await getCategories();
			console.log("Perr: " + userData);
		};

		fetchCategories();
	}, []);

	const handleSubmitCategory = async (event: React.FormEvent) => {
		event.preventDefault();
		const result = categorySchema.safeParse({ title, description });
		if (result.success) {
			console.log("succed");
			setShowManage(false);
		}
	};
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
					<div className="flex space-x-4">
						<button
							onClick={() => {
								setShowAddForum(!showAddForum);
								setTitle(title);
							}}
							className="bg-black-300 bg-opacity-25 border space-x-1 flex font-medium items-center border-black-300 border-opacity-25 text-black-500 hover:text-secondary h-9 px-2 rounded-lg "
						>
							<Plus className="w-4 h-4" />
							<div className="max-sm:hidden">Add Forum</div>
						</button>

						<button
							onClick={() => {
								setTitle(title);
							}}
							className="bg-black-300 bg-opacity-25 border space-x-1 flex font-medium items-center border-black-300 border-opacity-25 text-black-500 hover:text-secondary h-9 px-2 rounded-lg "
						>
							<Settings className="w-4 h-4" />
							<div className="max-sm:hidden">Manage</div>
						</button>
					</div>
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
			</div>{" "}
			{showEdit && <EditCategory onSubmit={handleSubmitCategory} onClose={() => setShowManage(false)} title={title} onChange={newValue => handleInputChange(newValue)} />}
			{showManage && <CreateCategory onSubmit={handleSubmitCategory} onClose={() => setShowManage(false)} title={title} onChange={newValue => handleInputChange(newValue)} />}
			{showAddForum && <AddForum onClose={() => setShowAddForum(false)} title={title} onChange={newValue => handleInputChange(newValue)} />}
		</div>
	);
}
