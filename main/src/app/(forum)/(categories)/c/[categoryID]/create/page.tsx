"use client";

import "./create.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { getCategory } from "@/utils/Categories/getCategories";
import { createPost } from "@/utils/Categories/createPost";

const InputText = dynamic(() => import("@/components/Forum/Account/Settings_Section/input_text"), { ssr: false });
const TextEditor = dynamic(() => import("@/components/Post_Section/create/text_editor"), { ssr: false });

type Props = {
	params: {
		categoryID: string;
		postID: string;
	};
};

export default function Create({ params }: Props) {
	const router = useRouter();
	const [forum, setForum] = useState<any>({});
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
	const [okMessage, setOkMessage] = useState<string | null>(null);
	const [showOkModal, setShowOkModal] = useState<boolean>(false);

	useEffect(() => {
		const fetchForums = async () => {
			const forumsData = await getCategory(params.categoryID);
			if (forumsData.success) {
				setForum(forumsData.data);
			}
		};
		fetchForums();
	}, [params.categoryID]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!title || !content) {
			setErrorMessage("Title and content are required.");
			setShowErrorModal(true);
			setTimeout(() => setShowErrorModal(false), 5000);
			return;
		}
console.log(title, content)
		const result = await createPost({ id: "", title: title, content: content, username: "", image: "", forumId: params.categoryID });
		if (result.success) {
			setOkMessage("Post created successfully!");
			setShowOkModal(true);
			setTimeout(() => {
				setShowOkModal(false);
				router.push(`/c/${params.categoryID}`);
			}, 3000);
		} else {
			console.log('wtf manito')
			setErrorMessage(result.message || "An unexpected error occurred.");
			setShowErrorModal(true);
			setTimeout(() => setShowErrorModal(false), 5000);
		}
	};

	return (
		<div className="container mt-4 space-y-4">
			<div className="font-medium">
				<Link href={`/c/${params.categoryID}`}>
					<button className="flex mb-2 h-8 items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary space-x-1">
						<ChevronLeft className="w-4 h-4" />
						<span className="">Return</span>
					</button>
				</Link>
				<div className="max-h-4 h-4 text-black-500 flex items-center text-sm ">
					<Link href="/" className="hover:text-secondary">
						{forum.category?.name}
					</Link>
					<ChevronRight className="w-4 h-4" />
					<Link href={`/c/${params.categoryID}`} className="hover:text-secondary">
						{forum.name}
					</Link>
					<ChevronRight className="w-4 h-4" />
					<span className="text-secondary">Create</span>
				</div>
			</div>

			<form className="w-full" onSubmit={handleSubmit}>
				<div className="w-80 pb-2">
					<div>Title</div>
					<InputText value={title} placeholder="Enter title..." onChange={newValue => setTitle(newValue)} background="bg-black-300 bg-opacity-25" />
				</div>

				<TextEditor onChange={(newValue: string) => setContent(newValue)} />

				<div className="w-full flex items-center justify-end">
					<button type="submit" className="bg-primary-400 font-medium transition-colors ease-in-out duration-150 hover:bg-primary-500 h-10 text-black-700 rounded-lg px-4 mt-4">
						Submit
					</button>
				</div>
			</form>

			{showErrorModal && (
				<div className="fixed right-[2rem] bottom-[2rem] bg-red py-[1rem] px-[1.5rem] rounded-md shadow-lg transition-opacity duration-1000 opacity-100">
					<span>{errorMessage}</span>
				</div>
			)}

			{showOkModal && (
				<div className="fixed right-[2rem] bottom-[2rem] bg-green py-[1rem] px-[1.5rem] rounded-md shadow-lg transition-opacity duration-1000 opacity-100">
					<span>{okMessage}</span>
				</div>
			)}
		</div>
	);
}
