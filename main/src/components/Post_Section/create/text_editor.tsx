"use client"; // Solo si usas Next.js con React 18 y arriba.
import { useRef } from "react";
import Placeholder from "@tiptap/extension-placeholder";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapBold from "@tiptap/extension-bold";
import TiptapItalic from "@tiptap/extension-italic";
import TiptapTextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import Strike from "@tiptap/extension-strike";
import TiptapUnderline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import TiptapCode from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import { Heading } from "@tiptap/extension-heading"; // Importa la extensión Heading

import { Heading1, Heading2, Bold, Underline, Italic, AlignLeft, AlignCenter, RemoveFormatting, AlignRight, List, ListOrdered, Strikethrough, Code, Quote, Link2, Palette } from "lucide-react";

export default function BasicEditor() {
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextStyle,
			TiptapBold,
			TiptapItalic,
			TiptapTextAlign.configure({ types: ["heading", "paragraph"] }),
			BulletList,
			OrderedList,
			Blockquote,
			Strike,
			TiptapUnderline,
			Color,
			Placeholder.configure({
				// Use a placeholder:
				placeholder: "Write something …",
				// Use different placeholders depending on the node type:
				// placeholder: ({ node }) => {
				//   if (node.type.name === 'heading') {
				//     return 'What’s the title?'
				//   }

				//   return 'Can you add some further context?'
				// },
			}),
			TiptapCode,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https",
			}),
			Heading.configure({
				levels: [1, 2, 3, 4, 5, 6],
			}),
		],

		editorProps: {
			attributes: {
				class: "outline-none bg-black-300 bg-opacity-25 rounded-lg min-h-[150px] p-4 border border-black-300 border-opacity-25",
			},
		},
	});
	const addLink = () => {
		if (editor) {
			const url = prompt("Enter the URL");
			if (url) {
				editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
			}
		}
	};

	const removeLink = () => {
		if (editor) {
			editor.chain().focus().unsetLink().run();
		}
	};
	const clearFormatting = () => {
		if (editor) {
			editor.chain().focus().clearNodes().unsetAllMarks().run();
		}
	};
	const colorInputRef = useRef<HTMLInputElement>(null);

	const handleColorButtonClick = () => {
		if (colorInputRef.current) {
			colorInputRef.current.click();
		}
	};
	// const handleHeadingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	// 	const level = parseInt(event.target.value, 10);

	// 	if (level >= 1 && level <= 6) {
	// 		if (editor) {
	// 			editor
	// 				.chain()
	// 				.focus()
	// 				.toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
	// 				.run();
	// 		}
	// 	}
	// };
	if (!editor) {
		return null;
	}

	return (
		<div className="w-full space-y-4 ">
			<div className="flex items-center button-group space-x-4">
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					className={editor.isActive("heading", { level: 1 }) ? "text-primary-400" : "text-black-500 hover:text-secondary"}
				>
					<Heading1 className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					className={editor.isActive("heading", { level: 2 }) ? "text-primary-400" : "text-black-500 hover:text-secondary"}
				>
					<Heading2 className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive("bold") ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<Bold className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive("italic") ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<Italic className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive({ textAlign: "left" }) ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<AlignLeft className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive({ textAlign: "center" }) ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<AlignCenter className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive({ textAlign: "right" }) ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<AlignRight className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive("underline") ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<Underline className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive("strike") ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<Strikethrough className="h-5 w-5" />
				</button>
				<button
					onClick={handleColorButtonClick}
					className={`h-6  flex items-center justify-center space-x-1 w-fit ${
						editor.isActive("color") // Adjust this logic as needed
							? "text-primary-400"
							: "text-black-500 hover:text-secondary"
					}`}
				>
					<Palette className="h-5 w-5" />
					<input
						ref={colorInputRef}
						type="color"
						onInput={event => editor.chain().focus().setColor(event.currentTarget.value).run()}
						value={editor.getAttributes("textStyle").color || "#D3D3ED"}
						data-testid="setColor"
						className="w-2"
						id="style1"
					/>
				</button>
				<button
					onClick={() => editor.chain().focus().toggleCode().run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive("code") ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<Code className="h-5 w-5" />
				</button>

				<button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "text-primary-400" : "text-black-500 hover:text-secondary"}>
					<List className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive("orderedList") ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<ListOrdered className="h-5 w-5" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive("blockquote") ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<Quote className="h-5 w-5" />
				</button>

				<button
					onClick={clearFormatting} // Añadir botón para limpiar formato
					className={`h-6 w-6 flex items-center justify-center ${
						editor.isActive("") // Puedes ajustar esta lógica según lo que desees resaltar como activo
							? "text-black-500 hover:text-secondary"
							: "text-black-500 hover:text-secondary"
					}`}
				>
					<RemoveFormatting className="h-5 w-5" />
				</button>
				<button
					onClick={editor.isActive("link") ? removeLink : addLink}
					className={`h-6 w-6 flex items-center justify-center ${editor.isActive("link") ? "text-primary-400" : "text-black-500 hover:text-secondary"}`}
				>
					<Link2 className="h-5 w-5" />
				</button>

				{/*  Selector funcional pero no, se ve mal y es cosa de la libreria}
				{/* <select
					onChange={handleHeadingChange}
					className="h-8 w-fit flex outline-none items-center justify-center bg-black-300 rounded-lg  bg-opacity-25 px-1 hover:text-secondary"
				>
					<option className="bg-black-300 " value="5">
						Small
					</option>
					<option className="bg-black-300 " value="4">
						Normal
					</option>
					<option className="bg-black-300 " value="3">
						Medium
					</option>

					<option className="bg-black-300 " value="2">
						Large
					</option>
					<option className="bg-black-300 " value="1">
						<span className="text-[1.4rem]">Extra Large</span>
					</option>
				</select> */}
			</div>
			<EditorContent editor={editor} className=" " />
		</div>
	);
}
