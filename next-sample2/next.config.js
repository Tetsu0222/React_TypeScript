/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //ここを追加して使用できるようにする。
  compiler : {
    styledComponents: true,
  },


}

module.exports = nextConfig
