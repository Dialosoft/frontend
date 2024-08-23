"use client";

import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { Plus, Settings } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ManageCategory = dynamic(() => import("./manage_category"));
const AddForum = dynamic(() => import("./addForum"));
const CategoryForum = dynamic(() => import("./category"));

import { getCategories, createCategory, updateCategory, createForum, getForums } from "@/utils/Categories/getCategories";
import categorySchema from "@/schemas/Categories/category";

interface Category {
	id: string;
	type: string;
	name: string;
	posts: number;
	comments: number;
}

interface Forum {
	category_id: string;
	id: string;
	name: string;
	post_count: number;
	type: string;
	is_active: boolean;
}

export default function MainSection() {
	const [IsLogged, setIsLogged] = useState<boolean | null>(false);
	const [title, setTitle] = useState("");
	const [categoryId, setCategoryId] = useState<string | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [forums, setForums] = useState<Forum[]>([]);
	const [showManage, setShowManage] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showAddForum, setShowAddForum] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string>("");

	// Fetch the categories data
	useEffect(() => {
		const fetchCategories = async () => {
			const categoriesData = await getCategories();
			if (categoriesData.success) {
				setCategories(categoriesData.data);
				setIsLogged(categoriesData.logged as boolean);
			}
		};
		fetchCategories();
	}, []);

	// Fetch the forums data
	useEffect(() => {
		const fetchForums = async () => {
			const forumsData = await getForums();
			if (forumsData) {
				setForums(forumsData);
			} else {
				displayError("Failed to load forums");
			}
		};
		fetchForums();
	}, []);

	// Handle the creation of a new category
	const handleSubmitCategory = async (event: React.FormEvent) => {
		event.preventDefault();

		const result = categorySchema.safeParse({ title });
		if (result.success) {
			const newCategory = await createCategory({ name: title, description: "" });
			if (newCategory.success) {
				const categoriesData = await getCategories();
				if (categoriesData.success) {
					setCategories(categoriesData.data);
					setIsLogged(categoriesData.logged as boolean);
				}
			} else {
				displayError(newCategory.message);
			}
			setShowManage(false);
		}
	};

	// Handle the update of an existing category
	const handleManageCategory = async (event: React.FormEvent) => {
		event.preventDefault();

		const result = categorySchema.safeParse({ title });
		if (result.success && categoryId) {
			const updatedCategory = await updateCategory({ id: categoryId, name: title, description: "" });
			if (updatedCategory.success) {
				const categoriesData = await getCategories();
				if (categoriesData.success) {
					setCategories(categoriesData.data);
					setIsLogged(categoriesData.logged as boolean);
				}
				setShowEdit(false);
			} else {
				displayError(updatedCategory.message);
			}
		}
	};

	// Handle input changes for title
	const handleInputChange = (newValue: string) => {
		setTitle(newValue);
	};

	// Handle option changes for forum type
	const handleOptionChange = (newOption: string) => {
		setSelectedOption(newOption);
	};

	// Display error modal
	const displayError = (message: string | undefined) => {
		setErrorMessage(message || "An unexpected error occurred");
		setShowErrorModal(true);
		setTimeout(() => setShowErrorModal(false), 5000);
	};

	// Handle the creation of a new forum
	const handleSubmitForum = async (event: React.FormEvent) => {
		event.preventDefault();

		const result = await createForum({ name: title, category: categoryId as string, description: "", type: selectedOption });
		if (result.success) {
			const forumsData = await getForums();
			if (forumsData) {
				setForums(forumsData);
			}
		} else {
			displayError(result.message);
		}

		setShowAddForum(false);
	};

	return (
		<div className="w-full space-y-4">
			{categories.map(category => (
				<div key={uuidv4()} className="space-y-2">
					<div className="flex justify-between">
						<h2 className="text-3xl font-semibold">{category.name}</h2>

						{IsLogged && (
							<div className="flex space-x-4">
								<button
									onClick={() => {
										setShowAddForum(true);
										setTitle("");
									}}
									className="bg-black-300 bg-opacity-25 border space-x-1 flex font-medium items-center border-black-300 border-opacity-25 text-black-500 hover:text-secondary h-9 px-2 rounded-lg"
								>
									<Plus className="w-4 h-4" />
									<div className="max-sm:hidden">Add Forum</div>
								</button>

								<button
									onClick={() => {
										setTitle(category.name);
										setCategoryId(category.id);
										setShowEdit(true);
									}}
									className="bg-black-300 bg-opacity-25 border space-x-1 flex font-medium items-center border-black-300 border-opacity-25 text-black-500 hover:text-secondary h-9 px-2 rounded-lg"
								>
									<Settings className="w-4 h-4" />
									<div className="max-sm:hidden">Manage</div>
								</button>
							</div>
						)}
					</div>

					{(forums.filter(forum => forum.category_id === category.id).length > 0) && (
						<div className="w-full bg-black-300 bg-opacity-25 p-2 grid grid-cols-1 gap-2 rounded-lg">
							{forums
								.filter(forum => forum.category_id === category.id)
								.map(forum => (
									<Link href={`c/${forum.id}`} key={uuidv4()}>
										<CategoryForum type={forum.type} title={forum.name} posts={forum.post_count} comments={0} />
									</Link>
								))}
						</div>
					)}
				</div>
			))}

			{IsLogged && (
				<div className="flex justify-center">
					<button
						onClick={() => setShowManage(true)}
						className="bg-black-300 flex justify-center w-96 items-center text-xl font-medium bg-opacity-25 border border-black-300 border-opacity-25 text-black-500 hover:text-secondary h-14 rounded-lg"
					>
						New Category
					</button>
				</div>
			)}

			{showEdit && IsLogged && <ManageCategory onSubmit={handleManageCategory} onClose={() => setShowEdit(false)} title={title} onChange={handleInputChange} isEditMode={true} />}

			{showManage && IsLogged && <ManageCategory onSubmit={handleSubmitCategory} onClose={() => setShowManage(false)} title={title} onChange={handleInputChange} isEditMode={false} />}

			{showAddForum && IsLogged && (
				<AddForum
					onSubmit={handleSubmitForum}
					onClose={() => setShowAddForum(false)}
					title={title}
					onChange={handleInputChange}
					onOptionChange={handleOptionChange}
					selectedOption={selectedOption}
				/>
			)}

			{showErrorModal && (
				<div className="fixed right-[2rem] bottom-[2rem] bg-red py-[1rem] px-[1.5rem] rounded-md shadow-lg transition-opacity duration-1000 opacity-100">
					<span>{errorMessage}</span>
				</div>
			)}
		</div>
	);
}
