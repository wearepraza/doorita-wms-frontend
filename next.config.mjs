// next.config.mjs
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'public/styles')],
    prependData: `@import "variables.scss";`, 
  },
};

export default nextConfig;
