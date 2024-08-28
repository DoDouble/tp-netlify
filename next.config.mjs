/** @type {import('next').NextConfig} */
// https://iamwebwiz.medium.com/how-to-fix-dirname-is-not-defined-in-es-module-scope-34d94a86694d
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory

// console.log('__dirname:', __dirname);
// console.log('__dirname: join:', path.join(__dirname, 'styles'));

const nextConfig = {
    images: {
      domains: ["cdn.sanity.io", "via.placeholder.com"],
    },
    // sassOptions: {
    //   includePaths: [path.join(__dirname, 'styles')],
    // },
    // Enable this to avoid type issues on Vercel Build
    // typescript: {
    //   ignoreBuildErrors: true,
    // }
  };

  export default nextConfig;