"use client";

import { useState, useEffect } from "react";
import { Loader2, Search, Filter } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Project = {
  id: string;
  title: string;
  domain: string;
  summary: string;
  slug: string;
  content: string;
  createdAt: string;
};

const DOMAINS = [
  "Data Science",
  "Cybersecurity",
  "Cyber Security",
  "Stock Market",
  "Full Stack Development",
  "Web Development",
  "Machine Learning",
  "Artificial Intelligence",
  "Cloud Computing",
  "Other",
];

export default function AdminViewProjects() {
  const [selectedDomain, setSelectedDomain] = useState("Data Science");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async (domain: string) => {
    setLoading(true);
    setError("");
    setProjects([]);
    try {
      const res = await fetch(
        `/api/admin/projects?domain=${encodeURIComponent(domain)}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch projects");

      setProjects(data.projects);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProjects(selectedDomain);
  }, [selectedDomain]);

  return (
    <div className="min-h-screen bg-muted p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-card">
              Project Dashboard
            </h1>
            <p className="text-muted mt-1">
              Manage and view all projects by domain
            </p>
          </div>

          <div className="flex items-center gap-2 bg-card p-2 rounded-lg border border-border shadow-sm">
            <Filter className="w-5 h-5 text-muted ml-2" />
            <select
              title="Filter by domain"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="border-none focus:ring-0 text-muted-foreground font-medium bg-transparent cursor-pointer outline-none"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </header>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted font-medium">
              Showing {projects.length} results for{" "}
              <span className="text-primary">"{selectedDomain}"</span>
            </div>

            {projects.length === 0 ? (
              <div className="bg-card rounded-xl shadow-sm border border-border p-16 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted" />
                </div>
                <h3 className="text-lg font-medium text-card">
                  No projects found
                </h3>
                <p className="text-muted mt-2">
                  Try selecting a different domain from the dropdown.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent text-primary uppercase tracking-wide">
                              {project.domain}
                            </span>
                            <span className="text-xs text-muted font-mono">
                              slug: {project.slug}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-card mt-2">
                            {project.title}
                          </h2>
                        </div>
                        <div className="text-sm text-muted">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="prose prose-sm prose-slate max-w-none bg-muted p-4 rounded-lg border border-border mb-4">
                        <p className="text-muted">{project.summary}</p>
                      </div>

                      <details className="group">
                        <summary className="flex items-center gap-2 text-sm font-medium text-primary cursor-pointer hover:text-primary select-none">
                          <span>View Full Content</span>
                          <span className="transition-transform group-open:rotate-180">
                            ▼
                          </span>
                        </summary>
                        <div className="mt-4 pt-4 border-t border-border prose prose-blue max-w-none">
                          <ReactMarkdown>{project.content}</ReactMarkdown>
                        </div>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
