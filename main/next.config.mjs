/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		HOST: process.env.HOST,
		Name: process.env.Name
	}
};

export default nextConfig;