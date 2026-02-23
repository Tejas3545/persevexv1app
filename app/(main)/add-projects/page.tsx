"use client";

import { useState } from "react";

export default function AddProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    domain: "Data Science",
    summary: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create project");

      setMessage({ type: "success", text: "Project added successfully!" });

      setFormData({
        title: "",
        slug: "",
        domain: "Data Science",
        summary: "",
        content: "",
      });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-card rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-muted">
          Add New Project
        </h1>

        {message.text && (
          <div
            className={`mb-4 p-4 rounded ${
              message.type === "success"
                ? "bg-primary text-primary"
                : "bg-destructive text-destructive"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                Project Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full p-2 border border-muted rounded focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g. Automated Invoice Processing"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                Slug (URL Friendly)
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full p-2 border border-muted rounded focus:ring-2 focus:ring-primary outline-none bg-muted"
              />
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              Domain
            </label>
            <select
              value={formData.domain}
              onChange={(e) =>
                setFormData({ ...formData, domain: e.target.value })
              }
              className="w-full p-2 border border-muted rounded focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="Data Science">Data Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Stock Market">Stock Market & Crypto</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              Short Summary (For Card View)
            </label>
            <textarea
              required
              rows={3}
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              className="w-full p-2 border border-muted rounded focus:ring-2 focus:ring-primary outline-none"
              placeholder="Brief description of the project..."
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              Full Content (Markdown)
            </label>
            <p className="text-xs text-muted mb-2">
              Use # for headers, * for lists. Paste the PDF content here.
            </p>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full p-2 border border-muted rounded focus:ring-2 focus:ring-primary outline-none font-mono text-sm"
              placeholder="## Project Overview..."
            />
          </div>

          {}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-foreground font-semibold rounded-lg transition-colors ${
              loading
                ? "bg-primary cursor-not-allowed"
                : "bg-primary hover:bg-primary"
            }`}
          >
            {loading ? "Saving..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
