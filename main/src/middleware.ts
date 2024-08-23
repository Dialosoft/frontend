import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import refreshToken from "@/utils/Session/refreshToken";

function generateNonce() {
	const array = new Uint8Array(30);
	crypto.getRandomValues(array);
	return btoa(String.fromCharCode(...array));
}

export async function middleware(req: NextRequest) {
	/* Add headers */
	const nonce = generateNonce();
	const cspHeader = `
		default-src 'self';
		connect-src 'self';
		script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""};
		script-src-elem 'self' 'nonce-${nonce}' 'strict-dynamic';
		script-src-attr 'self' 'nonce-${nonce}' 'strict-dynamic';
		style-src 'self' 'nonce-${nonce}';
		style-src-elem 'self' 'unsafe-inline';
		style-src-attr 'self' 'unsafe-inline';
		img-src 'self' blob: data:;
		font-src 'self';
		object-src 'none';
		base-uri 'none';
		form-action 'self';
		frame-ancestors 'none';
		upgrade-insecure-requests;`;

	/* Client - Headers */
	const requestHeaders = new Headers(req.headers);
	requestHeaders.set("x-nonce", nonce);
	requestHeaders.set("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, " ").trim());

	/* Redirects */
	const normalizedUrl = req.nextUrl.pathname.toLowerCase();

	// Session
	if (["/login", "/register"].includes(normalizedUrl)) {
		if (req.cookies.has("_rtkn")) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	// Session: Reset password
	if (normalizedUrl.startsWith("/reset-password/token")) {
		const token = req.nextUrl.searchParams.get("id");
		const username = req.nextUrl.searchParams.get("user");

		if (!token || !username) {
			return NextResponse.redirect(new URL("/reset-password", req.url));
		}
	}

	// Account
	if (normalizedUrl.startsWith("/a")) {
		if (normalizedUrl === "/a") {
			return NextResponse.redirect(new URL("/a/profile", req.url));
		}

		// Verify cookies
		if (!req.cookies.has("_rtkn")) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	/* Server - Headers */
	const response = NextResponse.next({ request: { headers: requestHeaders } });

	// Verify Session: Access Token
	if (req.cookies.has("_atkn")) {
		if (req.cookies.get("_atkn")?.value === "") {
			response.cookies.delete("_atkn");
		}
	}

	// Verify Session: Refresh Token
	if (req.cookies.has("_rtkn")) {
		if (req.cookies.get("_rtkn")?.value === "") {
			response.cookies.delete("_rtkn");
		}
	}

	// Session: Access Token
	if (req.cookies.has("_atkn") && !req.cookies.has("_rtkn")) {
		response.cookies.delete("_atkn");
	}

	// Session: Refresh Token
	if (!req.cookies.has("_atkn") && req.cookies.has("_rtkn")) {
		const statusRefresh = await refreshToken();

		if (statusRefresh.redirect && normalizedUrl !== "/") {
			return NextResponse.redirect(new URL("/", req.url));
		} else {
			if (statusRefresh.status === "delete") {
				response.cookies.delete("_rtkn");
			} else {
				response.cookies.set("_atkn", statusRefresh.token, {
					httpOnly: true,
					secure: false,
					sameSite: "strict",
					maxAge: statusRefresh.time,
					path: "/",
				});
			}
		}
	}

	response.headers.set("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, " ").trim());
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-XSS-Protection", "1; mode=block");
	response.headers.set("Referrer-Policy", "no-referrer");

	response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
	response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
	response.headers.set("X-Download-Options", "noopen");
	response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
	response.headers.set("Origin-Agent-Cluster", "?1");
	response.headers.set("Permissions-Policy", "camera=(), display-capture=(), fullscreen=(), geolocation=(), microphone=()");

	return response;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
