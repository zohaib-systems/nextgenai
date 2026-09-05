import { notFound } from "next/navigation";
import { getPromptById } from "@/lib/supabase";
import PromptDetail from "@/components/PromptDetail";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;
  const prompt = await getPromptById(id);

  if (!prompt) {
    return {
      title: 'Prompt Not Found',
      robots: { index: false, follow: true },
    };
  }

  const cleanImageUrl = prompt.image_url.replace(/\[.*\]\((.*)\)/, "$1");

  return {
    title: `${prompt.title} - NextGenAI Prompt Library`,
    alternates: { canonical: `/prompt/${id}` },
    description: prompt.description,
    openGraph: {
      url: `/prompt/${id}`,
      title: prompt.title,
      description: prompt.description,
      images: [{ url: cleanImageUrl }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: prompt.title,
      description: prompt.description,
      images: [cleanImageUrl],
    },
  };
}

export default async function PromptDetailPage({ params }: Props) {
  const { id } = await params;
  const prompt = await getPromptById(id);
  if (!prompt) {
    notFound();
  }
  return <PromptDetail prompt={prompt} />;
}
