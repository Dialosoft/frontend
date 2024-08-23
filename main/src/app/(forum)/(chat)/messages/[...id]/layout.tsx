export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <div className="col-span-2 bg-black-300 bg-opacity-25 gap-2 rounded-xl overflow-hidden">{children}</div>;
}
