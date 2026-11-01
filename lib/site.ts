export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenai-pro.vercel.app'
).origin;
