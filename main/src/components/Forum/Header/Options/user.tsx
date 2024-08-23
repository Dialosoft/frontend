"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useEffect, useState } from "react";
import { User as UserIcon } from "lucide-react";

const User = dynamic(() => import("@/components/Forum/Header/User/main"), { ssr: false });

interface UserProps {
	id: string;
	username: string;
	role: RoleProps;
}

interface RoleProps {
	type: string;
	admin: boolean;
	mod: boolean;
}

export default function User_Header({ username, role }: UserProps) {
	const userRef = useRef<HTMLDivElement>(null);
	const [showUser, setUser] = useState(false);

	const toggleUser = () => {
		setUser(!showUser);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (userRef.current && !userRef.current.contains(event.target as Node)) {
				setUser(false);
			}
		}

		if (showUser) {
			document.addEventListener("pointerdown", handleClickOutside);
		} else {
			document.removeEventListener("pointerdown", handleClickOutside);
		}

		return () => document.removeEventListener("pointerdown", handleClickOutside);
	}, [showUser]);

	return (
		<div className="relative flex items-center justify-center" ref={userRef}>
			<button className={`border rounded-full group border-primary-400 ${role.admin && "border-yellow"} ${role.mod && "border-green"}`} onClick={toggleUser}>
				<UserIcon className="m-2 stroke-black-300 transition-colors ease-in-out duration-300 group-hover:stroke-secondary" size={24} />
			</button>

			{showUser && (
				<Suspense>
					<User name={username} admin={role.admin} mod={role.mod} />
				</Suspense>
			)}
		</div>
	);
}
