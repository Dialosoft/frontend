"use client";

import "./create.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const InputText = dynamic(() => import("@/components/Forum/Account/Settings_Section/input_text"), { ssr: false });
const TextEditor = dynamic(() => import("@/components/Post_Section/create/text_editor"), { ssr: false });

type Props = {
	params: {
		categoryID: string;
		postID: string;
	};
};

export default function Create({ params }: Props) {
	const [title, setTitle] = useState("");
	const CategoryInfo = [
		{
			id: "1",
			title: " News and announcements",
		},
		{
			id: "2",
			title: "Promotions & events",
		},
		{
			id: "3",
			title: "Rules & FAQs",
		},
	];

	const Category = CategoryInfo.find(category => category.id === params.categoryID);
	const [categoryID, setCategoryID] = useState(params.postID);

	useEffect(() => {
		const urlSegments = window.location.pathname.split("/");
		const lastSegment = urlSegments[urlSegments.length - 1];
		setCategoryID(lastSegment);
	}, []);

	return (
		<div className="container mt-4 space-y-4">
			<div className="  font-medium ">
				<Link href={`/c/${params.categoryID}`}>
					<button className="flex mb-2 h-8 items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary space-x-1">
						<ChevronLeft className="w-4 h-4" />
						<span className="">Return</span>
					</button>
				</Link>
				<div className="max-h-4 h-4 text-black-500 flex items-center text-sm ">
					<Link href="/" className="hover:text-secondary">
						Main category
					</Link>
					<ChevronRight className="w-4 h-4" />
					<Link href={`/c/${params.categoryID}`} className="hover:text-secondary">
						{Category?.title}
					</Link>
					<ChevronRight className="w-4 h-4" />
					<span className="text-secondary">Create</span>
				</div>
			</div>
			<div className="w-80">
				<div>Title</div>
				<InputText value={title} placeholder="Enter title..." onChange={newValue => setTitle(newValue)} background="bg-black-300 bg-opacity-25" />
			</div>
			<TextEditor />
		</div>
	);
}
