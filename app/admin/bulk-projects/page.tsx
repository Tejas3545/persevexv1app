"use client";

import { useState } from "react";

export default function BulkImportPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info";
    msg: string;
  } | null>(null);

  const handleImport = async () => {
    setLoading(true);
    setStatus({ type: "info", msg: "Validating JSON..." });

    try {
      let parsedData;
      try {
        parsedData = JSON.parse(jsonInput);
      } catch (e) {
        throw new Error("Invalid JSON format. Please check your syntax.");
      }

      if (!Array.isArray(parsedData)) {
        throw new Error("Data must be an array [...]");
      }

      setStatus({
        type: "info",
        msg: `Sending ${parsedData.length} projects to database...`,
      });

      const res = await fetch("/api/admin/bulk-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Import failed.");
      }

      setStatus({
        type: "success",
        msg: `Success! Processed ${data.count} projects. (Created/Updated)`,
      });
      setJsonInput("");
    } catch (error: any) {
      setStatus({ type: "error", msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-card rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-muted">
          Bulk Import Projects
        </h1>
        <p className="text-muted mb-6 text-sm">
          Paste the JSON array generated from the PDFs below. Existing projects
          with the same "slug" will be updated.
        </p>

        {}
        {status && (
          <div
            className={`mb-4 p-4 rounded-md text-sm font-medium ${
              status.type === "success"
                ? "bg-primary text-primary"
                : status.type === "error"
                ? "bg-destructive text-destructive"
                : "bg-accent text-primary"
            }`}
          >
            {status.msg}
          </div>
        )}

        {}
        <div className="mb-4">
          <label className="block text-sm font-medium text-muted mb-2">
            JSON Data Array
          </label>
          <textarea
            className="w-full h-96 p-4 font-mono text-xs border border-muted rounded-lg focus:ring-2 focus:ring-primary outline-none bg-card text-primary"
            placeholder='[ { "title": "Example", ... }, { ... } ]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>

        {}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setJsonInput("")}
            className="px-4 py-2 text-muted hover:bg-muted rounded-lg transition-colors"
            disabled={loading}
          >
            Clear
          </button>
          <button
            onClick={handleImport}
            disabled={loading || !jsonInput.trim()}
            className={`px-6 py-2 text-foreground font-semibold rounded-lg transition-all ${
              loading || !jsonInput.trim()
                ? "bg-primary cursor-not-allowed"
                : "bg-primary hover:bg-primary shadow-md"
            }`}
          >
            {loading ? "Importing..." : "Run Import"}
          </button>
        </div>
      </div>
    </div>
  );
}
