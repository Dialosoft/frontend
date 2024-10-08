/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		HOST: process.env.HOST,
		Name: process.env.Name,
		Description: process.env.Description,
	},
};

export default nextConfig;
