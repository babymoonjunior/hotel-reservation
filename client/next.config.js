/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "imageupload.io",
      "cdn.pic.in.th",
      "thumbs4.imagebam.com",
      "i.postimg.cc",
      "xjaplqknbkbdqgzwtjsp.supabase.co",
      "picsum.photos",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
