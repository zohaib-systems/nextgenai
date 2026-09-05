"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock } from "lucide-react";


export default function CreatePromptPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promptText, setPromptText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Writing");
  const [tags, setTags] = useState(""); // comma‑separated string
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError(false);

    if (submitting) return;
    setSubmitting(true);
    try {

      // Prepare payload
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const finalImage = imageUrl?.trim()
        ? imageUrl.trim()
        : "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800";

      // Call server‑side API route for secure insertion
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode,
          title,
          description,
          prompt_text: promptText,
          image_url: finalImage,
          category,
          tags: tagsArray,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        setPasscodeError(response.status === 401);
        console.error('Create prompt error:', result.error);
        toast.error(result.error || 'Failed to publish prompt');
        return;
      }
      // result.data may contain inserted row(s)
      const newId = result.data?.[0]?.id;
      toast.success('Prompt published successfully!');
      if (newId) {
        router.push(`/prompt/${newId}`);
      } else {
        router.push('/library');
      }
    } catch {
      toast.error('Unable to publish. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-zinc-900 text-zinc-100 rounded-lg shadow-lg mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Prompt</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md bg-zinc-800 p-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md bg-zinc-800 p-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="promptText">
            Prompt Text
          </label>
          <textarea
            id="promptText"
            required
            rows={4}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="w-full rounded-md bg-zinc-800 p-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="imageUrl">
            Image URL (optional)
          </label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md bg-zinc-800 p-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md bg-zinc-800 p-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Writing</option>
            <option>Development</option>
            <option>Marketing</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. AI, productivity"
            className="w-full rounded-md bg-zinc-800 p-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {/* Admin Passcode */}
        <div className="relative z-10">
          <label className="block mb-1 font-medium flex items-center" htmlFor="adminPasscode">
            <Lock className="w-4 h-4 mr-1" /> Admin Passcode
          </label>
          <input
            id="adminPasscode"
            type="password"
            autoComplete="current-password"
            aria-invalid={passcodeError}
            aria-describedby="passcode-help"
            required
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className={`w-full rounded-md p-3 text-base md:text-sm focus:outline-none focus:ring-2 
              ${passcodeError ? "bg-red-900 border border-red-500 focus:ring-red-500" : "bg-zinc-800 focus:ring-primary"}`}
          />
          <p id="passcode-help" className="text-sm text-zinc-400 mt-1" role={passcodeError ? "alert" : undefined}>
            {passcodeError ? "Invalid admin passcode. Please try again." : "Required to publish new prompts."}
          </p>
        </div>
        <button
          type="submit"
          disabled={!passcode || submitting}
          className={`w-full min-h-[44px] rounded-md font-semibold 
            ${!passcode ? "bg-zinc-700 cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`}
        >
          {submitting ? "Publishing?" : "Publish Prompt"}
        </button>
      </form>
    </section>
  );
}
