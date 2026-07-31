export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt_text: string;
  image_url: string;
  category: string;
  tags: string[];
}

export const MOCK_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Creative Story Starter",
    description: "Kick‑start a short story with a vivid opening line.",
    prompt_text: "Write the first paragraph of a sci‑fi story set in a floating city...",
    image_url: "/images/story_starter.png",
    category: "Writing",
    tags: ["creative", "storytelling", "sci‑fi"]
  },
  {
    id: "2",
    title: "SEO Meta Description Generator",
    description: "Generate SEO‑friendly meta descriptions for blog posts.",
    prompt_text: "Create a 155‑character meta description for a blog post about ...",
    image_url: "/images/seo_meta.png",
    category: "Marketing",
    tags: ["seo", "copywriting", "meta"]
  },
  {
    id: "3",
    title: "Code Review Assistant",
    description: "Provide constructive feedback for a JavaScript code snippet.",
    prompt_text: "Review the following JavaScript function for readability and performance...",
    image_url: "/images/code_review.png",
    category: "Development",
    tags: ["code", "review", "javascript"]
  },
  {
    id: "4",
    title: "Product Tagline Generator",
    description: "Craft catchy one‑liners for new SaaS products.",
    prompt_text: "Generate three tagline options for a SaaS platform that helps teams manage OKRs...",
    image_url: "/images/tagline.png",
    category: "Marketing",
    tags: ["branding", "tagline", "saas"]
  },
  {
    id: "5",
    title: "Travel Itinerary Planner",
    description: "Create a 3‑day itinerary for a city trip with food & culture highlights.",
    prompt_text: "Plan a 3‑day itinerary for a visit to Kyoto, focusing on local cuisine and historic sites...",
    image_url: "/images/travel.png",
    category: "Lifestyle",
    tags: ["travel", "itinerary", "culture"]
  },
  {
    id: "6",
    title: "Interview Question Generator",
    description: "Generate senior‑level interview questions for a given role.",
    prompt_text: "Provide five senior‑level interview questions for a Full‑Stack Engineer role...",
    image_url: "/images/interview.png",
    category: "HR",
    tags: ["interview", "questions", "senior"]
  }
];
