"use client"
import { useState } from "react";

interface InputProps {
	value: string;
	placeholder: string;
	onChange: (newValue: string) => void;
}

export default function InputText({value, placeholder, onChange}:InputProps) {
     const [inputValue, setInputValue] = useState(value);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setInputValue(newValue);
			onChange(newValue); 
		};
    return (
		<>
			<input
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				className="bg-transparent border border-black-300 rounded-md outline-none px-4 h-9 font-normal w-full appearance-none placeholder:text-black-500"
			/>
		</>
	);
}