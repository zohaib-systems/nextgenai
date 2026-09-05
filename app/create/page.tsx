"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImagePlus, Lock, X } from "lucide-react";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export default function CreatePromptPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promptText, setPromptText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState("Writing");
  const [tags, setTags] = useState("");
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = "";
    if (!file) return;

    if (!ALLOWED_TYPES.has(file.type)) {
      toast.error("Only JPEG, PNG, WebP, and GIF images are allowed");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Image must be 5 MB or smaller");
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError(false);

    if (submitting) return;
    setSubmitting(true);
    try {
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      let finalImage = DEFAULT_IMAGE;

      if (imageFile) {
        const form = new FormData();
        form.append("passcode", passcode);
        form.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: form,
        });
        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok || !uploadResult.success) {
          setPasscodeError(uploadRes.status === 401);
          toast.error(uploadResult.error || "Image upload failed");
          return;
        }
        finalImage = uploadResult.url as string;
      }

      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        console.error("Create prompt error:", result.error);
        toast.error(result.error || "Failed to publish prompt");
        return;
      }

      const newId = result.data?.[0]?.id;
      toast.success("Prompt published successfully!");
      if (newId) {
        router.push(`/prompt/${newId}`);
      } else {
        router.push("/library");
      }
    } catch {
      toast.error("Unable to publish. Check your connection and try again.");
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
          <label className="block mb-1 font-medium" htmlFor="imageFile">
            Cover image (optional)
          </label>
          <div className="rounded-md border border-zinc-700 bg-zinc-800 p-3">
            {imagePreview ? (
              <div className="relative overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Selected cover preview"
                  className="h-44 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageFile(null)}
                  className="absolute right-2 top-2 inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                  aria-label="Remove selected image"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="imageFile"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-zinc-600 px-4 py-8 text-center text-zinc-400 hover:border-violet-500/50 hover:text-zinc-200"
              >
                <ImagePlus size={22} />
                <span className="text-sm font-medium">Upload image</span>
                <span className="text-xs text-zinc-500">
                  JPEG, PNG, WebP, or GIF · max 5 MB
                </span>
              </label>
            )}
            <input
              id="imageFile"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              className="sr-only"
            />
            {imageFile && (
              <p className="mt-2 truncate text-xs text-zinc-400">
                {imageFile.name} · {(imageFile.size / 1024).toFixed(0)} KB
              </p>
            )}
          </div>
          <p className="mt-1 text-sm text-zinc-400">
            Uploads to Supabase Storage. If skipped, a default image is used.
          </p>
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

        <div className="relative z-10">
          <label className="mb-1 flex items-center font-medium" htmlFor="adminPasscode">
            <Lock className="mr-1 h-4 w-4" /> Admin Passcode
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
              ${passcodeError ? "border border-red-500 bg-red-900 focus:ring-red-500" : "bg-zinc-800 focus:ring-primary"}`}
          />
          <p id="passcode-help" className="mt-1 text-sm text-zinc-400" role={passcodeError ? "alert" : undefined}>
            {passcodeError ? "Invalid admin passcode. Please try again." : "Required to publish new prompts."}
          </p>
        </div>

        <button
          type="submit"
          disabled={!passcode || submitting}
          className={`btn-primary w-full rounded-md ${!passcode ? "cursor-not-allowed opacity-55" : ""}`}
          style={{ borderRadius: 8 }}
        >
          {submitting ? "Publishing..." : "Publish Prompt"}
        </button>
      </form>
    </section>
  );
}
