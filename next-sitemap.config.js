/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || 'https://github.com/HoSeopLee/next-vercel-test',
  generateRobotsTxt: true, // (optional)
  // ...other options
};
