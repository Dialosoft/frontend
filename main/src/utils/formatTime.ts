export function formatTime(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
	  hour: "numeric",
	  minute: "2-digit",
	  hour12: true,
	}).format(date).toLowerCase();
}

export function formatRelativeTime(date: Date): string {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
	const diffInDays = Math.floor(diffInSeconds / 86400);

	if (diffInSeconds < 60) {
	  return "just now";
	} else if (diffInSeconds < 3600) {
	  const minutes = Math.floor(diffInSeconds / 60);
	  return `${minutes}m ago`;
	} else if (diffInSeconds < 86400) {
	  const hours = Math.floor(diffInSeconds / 3600);
	  return `${hours}h ago`;
	} else if (diffInDays === 1) {
	  return "yesterday";
	} else if (diffInDays < 7) {
	  return `${diffInDays}d ago`;
	} else {
	  return date.toLocaleDateString();
	}
}

export function formatDateDayMonthYear(dateString: string) {
	const date = new Date(dateString);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}