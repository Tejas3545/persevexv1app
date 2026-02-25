"use client";

import React, { useState } from "react";
import { createBlog } from "./actions";

export default function AddBlogPage() {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [showMetadata, setShowMetadata] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!slug || !content) {
      alert("Slug and Content are required fields.");
      return;
    }

    setIsSubmitting(true);

    const result = await createBlog({
      slug,
      title: title || undefined,
      author: author || undefined,
      description: description || undefined,
      content,
    });

    setIsSubmitting(false);

    if (result.success) {
      alert("Blog post created successfully!");
      setSlug("");
      setTitle("");
      setAuthor("");
      setDescription("");
      setContent("");
      setShowMetadata(true);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-card">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="text-sm text-muted hover:text-muted transition"
          >
            {showMetadata ? "Hide" : "Show"} metadata
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-foreground text-foreground text-sm rounded-full hover:bg-card transition disabled:bg-muted"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>

        {showMetadata && (
          <div className="space-y-6 mb-12 pb-12 border-b border-border">
            <div>
              <input
                type="text"
                value={slug}
                onChange={(e) =>
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w-]+/g, "")
                  )
                }
                placeholder="URL Slug (e.g., my-awesome-post)"
                className="w-full text-base text-muted placeholder-muted border-none outline-none focus:ring-0 p-0"
              />
            </div>
            <div>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name (optional)"
                className="w-full text-base text-muted placeholder-muted border-none outline-none focus:ring-0 p-0"
              />
            </div>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description (optional)"
                rows={2}
                className="w-full text-base text-muted placeholder-muted border-none outline-none focus:ring-0 resize-none p-0"
              />
            </div>
          </div>
        )}

        <div className="mb-8">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            rows={1}
            className="w-full text-5xl font-bold text-card placeholder-muted border-none outline-none focus:ring-0 resize-none p-0 leading-tight"
            style={{ minHeight: "60px" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />
        </div>

        <div className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            className="w-full text-xl text-muted placeholder-muted border-none outline-none focus:ring-0 resize-none p-0 leading-relaxed font-serif"
            style={{ minHeight: "60vh" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />
        </div>
      </div>
    </div>
  );
}
