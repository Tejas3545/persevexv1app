"use client";

import { useEffect, useState, use, Suspense, useCallback, useRef } from "react";
import ProgressBar from "@/app/components/ProgressBar";
import {
  Loader2,
  User,
  Mail,
  Calendar,
  BookOpen,
  Shield,
  Check,
  Briefcase,
  X,
  Lock,
  Play,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Project = {
  id: string;
  title: string;
  domain: string;
  summary: string;
  slug: string;
  content: string;
};

type StudentProject = {
  id: string;
  project: Project;
  status: string;
  startedAt?: string;
};

type Student = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  domains: string[];
  role1: string;
  month: string;
  createdAt: string;
  projects: StudentProject[];
};

export default function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvingParams = use(params);
  const id = resolvingParams.id;
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [savingProjects, setSavingProjects] = useState(false);
  const [projectError, setProjectError] = useState("");

  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [startingProjectId, setStartingProjectId] = useState<string | null>(
    null
  );
  const [pollingProjectIds, setPollingProjectIds] = useState<Set<string>>(
    new Set()
  );

  const fetchUserData = useCallback(async () => {
    try {
      if (!student) setLoading(true);

      const userPromise = fetch(`/api/user/${id}`);
      const projectsPromise = fetch(`/api/projects?userId=${id}`);

      const [userRes, projectsRes] = await Promise.all([
        userPromise,
        projectsPromise,
      ]);

      if (userRes.status === 401 || userRes.status === 403) {
        router.push("/user");
        return;
      }

      const userData = await userRes.json();
      if (!userRes.ok)
        throw new Error(userData.error || "Failed to fetch user");

      setStudent(userData.student);

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setAvailableProjects(projectsData.projects);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id, router, student]);

  useEffect(() => {
    if (id) fetchUserData();
  }, [id]);

  // Polling effect
  useEffect(() => {
    if (pollingProjectIds.size === 0) return;

    const interval = setInterval(() => {
      fetchUserData();
    }, 5000);

    // Timeout to stop polling after 2 minutes to prevent infinite loops
    const timeout = setTimeout(() => {
      setPollingProjectIds(new Set());
    }, 120000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [pollingProjectIds.size, fetchUserData]);

  // Check if polled projects updated to 'SUBMITTED'
  useEffect(() => {
    if (!student || pollingProjectIds.size === 0) return;

    student.projects.forEach((p) => {
      if (pollingProjectIds.has(p.id) && p.status === "SUBMITTED") {
        setPollingProjectIds((prev) => {
          const next = new Set(prev);
          next.delete(p.id);
          return next;
        });
      }
    });
  }, [student, pollingProjectIds]);

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjectIds((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSaveProjects = async () => {
    if (selectedProjectIds.length < 2) {
      setProjectError("Please select at least 2 projects.");
      return;
    }
    setSavingProjects(true);
    setProjectError("");

    try {
      const res = await fetch(`/api/user/${id}/projects/select`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectIds: selectedProjectIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save projects");

      await fetchUserData();
    } catch (e: any) {
      setProjectError(e.message);
    } finally {
      setSavingProjects(false);
    }
  };

  const handleStartProject = async (projectId: string) => {
    try {
      setStartingProjectId(projectId);
      const res = await fetch("/api/projects/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, projectId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to start project");
      }

      setStudent((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          projects: prev.projects.map((p) => {
            if (p.project.id === projectId) {
              return {
                ...p,
                startedAt: new Date().toISOString(),
                status: "in_progress",
              };
            }
            return p;
          }),
        };
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setStartingProjectId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-card">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-card">
        <div className="text-destructive bg-destructive/20 p-4 rounded-lg border border-destructive">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!student) return null;

  const hasSelectedProjects = student.projects.length >= 2;

  const sortedProjects = [...student.projects].sort((a, b) =>
    a.project.title.localeCompare(b.project.title)
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground font-sans relative">
      { }
      <div className="fixed inset-0 z-0">

      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-12 md:gap-20">
        { }
        <section className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between p-2">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center text-2xl font-bold text-foreground border border-border ring-4 ring-black">
                {student.firstName[0]}
                {student.lastName[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                  {student.firstName} {student.lastName}
                </h1>
                <div className="flex items-center gap-3 mt-1 text-muted-foreground text-sm font-medium">
                  <span>@{student.username}</span>
                  <span className="w-1 h-1 bg-muted rounded-full" />
                  <span className="capitalize text-muted-foreground">
                    {student.role1}
                  </span>
                  <span className="w-1 h-1 bg-muted rounded-full" />
                  <span>{student.month}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-3 border-t md:border-t-0 border-border pt-4 md:pt-0">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                <span className="tracking-wide">{student.email}</span>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {student.domains &&
                  student.domains.map((domain, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded text-xs font-medium text-muted-foreground bg-background border border-border"
                    >
                      {domain}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </section>

        { }
        <section className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-linear-to-br from-primary to-secondary rounded-xl shadow-lg shadow-primary/20">
              <Briefcase className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                {hasSelectedProjects
                  ? "Your Internship Projects"
                  : "Select Your Path"}
              </h2>
              <p className="text-muted-foreground mt-1">
                {hasSelectedProjects
                  ? "Track your progress and manage your deliverables."
                  : "Choose the projects that align with your career goals."}
              </p>
            </div>
          </div>

          {!hasSelectedProjects ? (
            <div className="relative">
              {!availableProjects.length ? (
                <div className="flex flex-col items-center justify-center py-20 rounded-3xl bg-background border border-border text-center">
                  <div className="text-muted mb-4">
                    <Briefcase className="w-12 h-12 opacity-20" />
                  </div>
                  <p className="text-muted-foreground text-lg">
                    No projects available for your specific domains yet.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {availableProjects.map((project) => {
                      const isSelected = selectedProjectIds.includes(
                        project.id
                      );
                      return (
                        <div
                          key={project.id}
                          onClick={() => toggleProjectSelection(project.id)}
                          className={`
                            group relative flex flex-col justify-between p-6 h-full rounded-2xl cursor-pointer transition-all duration-300
                            border backdrop-blur-md
                            ${isSelected
                              ? "bg-primary/10 border-primary/50 shadow-2xl shadow-primary/10 scale-[1.02]"
                              : "bg-card border-border hover:bg-card/80 hover:border-primary/20 hover:-translate-y-1 hover:shadow-xl"
                            }
                          `}
                        >
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border group-hover:border-primary/20 transition-colors">
                                {project.domain}
                              </span>
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected
                                  ? "bg-primary text-primary-foreground scale-100"
                                  : "bg-muted text-transparent scale-90 group-hover:scale-100 group-hover:bg-muted/80"
                                  }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                              {project.summary}
                            </p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingProject(project);
                            }}
                            className="w-full mt-auto py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground hover:border-white/20 transition-all flex items-center justify-center gap-2 group/btn"
                          >
                            <BookOpen className="w-4 h-4 opacity-70 group-hover/btn:opacity-100" />
                            View Details
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  { }
                  <div className="sticky bottom-6 z-20">
                    <div className="max-w-xl mx-auto backdrop-blur-xl bg-card/90 border border-border p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-6 pl-6">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Selected</span>
                        <span className="text-lg font-bold text-foreground">
                          {selectedProjectIds.length}{" "}
                          <span className="text-muted font-normal">
                            / 2 required
                          </span>
                        </span>
                      </div>

                      {projectError && (
                        <div className="text-destructive text-xs md:text-sm font-medium px-2 animate-pulse">
                          {projectError}
                        </div>
                      )}

                      <button
                        onClick={handleSaveProjects}
                        disabled={
                          savingProjects || selectedProjectIds.length < 2
                        }
                        className={`
                             px-8 py-3 rounded-xl font-bold text-foreground shadow-lg transition-all transform
                             ${savingProjects || selectedProjectIds.length < 2
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 hover:scale-105 hover:shadow-primary/25 active:scale-95"
                          }
                          `}
                      >
                        {savingProjects ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />{" "}
                            Saving...
                          </span>
                        ) : (
                          "Confirm Selection"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map(
                (
                  { id: studentProjectId, project, status, startedAt },
                  index
                ) => {
                  let isLocked = false;
                  if (index > 0) {
                    const prevProject = sortedProjects[index - 1];
                    if (!prevProject.startedAt) {
                      isLocked = true;
                    } else if (prevProject.status === "SUBMITTED") {
                      isLocked = false;
                    } else {
                      const prevStart = new Date(
                        prevProject.startedAt
                      ).getTime();
                      const now = new Date().getTime();
                      const daysPassed =
                        (now - prevStart) / (1000 * 60 * 60 * 24);
                      if (daysPassed < 20) {
                        isLocked = true;
                      }
                    }
                  }

                  let progressPercent = 0;
                  let daysRemaining = 20;
                  if (startedAt) {
                    const start = new Date(startedAt).getTime();
                    const now = new Date().getTime();
                    const daysPassed = (now - start) / (1000 * 60 * 60 * 24);
                    progressPercent = Math.min((daysPassed / 20) * 100, 100);
                    daysRemaining = Math.max(0, Math.ceil(20 - daysPassed));
                  }

                  return (
                    <div
                      key={project.id}
                      className={`
                        group relative bg-background backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 shadow-lg 
                        ${isLocked
                          ? "border-white/5 opacity-70 cursor-not-allowed"
                          : "border-white/5 hover:border-border hover:bg-card/[0.07] hover:shadow-2xl hover:-translate-y-1"
                        }
                      `}
                    >
                      { }
                      <div
                        className={`h-1 w-full ${status === "completed" || progressPercent >= 100
                          ? "bg-primary"
                          : "bg-primary"
                          }`}
                      />

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-background text-muted-foreground border border-border">
                            {project.domain}
                          </span>
                          {!isLocked && startedAt && (
                            <span
                              className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${progressPercent >= 100
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-primary/10 text-primary border-primary/20"
                                }`}
                            >
                              {progressPercent >= 100
                                ? "Completed"
                                : "In Progress"}
                            </span>
                          )}
                          {isLocked && (
                            <Lock className="w-4 h-4 text-muted" />
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                          {project.summary}
                        </p>

                        <div className="mt-auto">
                          {isLocked ? (
                            <div className="w-full py-2.5 border border-white/5 text-muted font-semibold rounded-lg bg-card/2 text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                              <Lock className="w-4 h-4" />
                              Locked
                            </div>
                          ) : !startedAt ? (
                            <button
                              onClick={() => handleStartProject(project.id)}
                              disabled={startingProjectId === project.id}
                              className="w-full py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                            >
                              {startingProjectId === project.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Play className="w-4 h-4 fill-current" />
                              )}
                              Start Project
                            </button>
                          ) : (
                            <div className="space-y-3">
                              <ProgressBar
                                value={progressPercent}
                                label="Project completion progress"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                                <span>
                                  {Math.round(progressPercent)}% Complete
                                </span>
                                <span>{daysRemaining} days left</span>
                              </div>
                              <button
                                onClick={() => setViewingProject(project)}
                                className="w-full py-2.5 border border-border text-muted-foreground font-semibold rounded-lg hover:bg-background hover:text-foreground hover:border-white/20 transition-all text-sm flex items-center justify-center gap-2"
                              >
                                <BookOpen className="w-4 h-4" />
                                View Details
                              </button>
                              {status === "SUBMITTED" ? (
                                <button
                                  disabled
                                  className="w-full py-2.5 bg-primary/20 text-primary border border-primary/20 font-semibold rounded-lg text-sm flex items-center justify-center gap-2 cursor-not-allowed"
                                >
                                  <Check className="w-4 h-4" />
                                  Project Submitted
                                </button>
                              ) : (
                                <a
                                  href={`https://docs.google.com/forms/d/e/1FAIpQLSf1Dn-CU2np8Rs_tmLs_U1oYGH6MqOMYhlIXEmK_5goGwJw7w/viewform?usp=pp_url&entry.281151996=${studentProjectId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => {
                                    setPollingProjectIds((prev) =>
                                      new Set(prev).add(studentProjectId)
                                    );
                                  }}
                                  className="w-full py-2.5 bg-primary/10 text-primary border border-primary/20 font-semibold rounded-lg hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all text-sm flex items-center justify-center gap-2"
                                >
                                  {pollingProjectIds.has(studentProjectId) ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                      Verifying...
                                    </>
                                  ) : (
                                    <>
                                      Submit Project
                                    </>
                                  )}
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </section>
      </main>

      { }
      {viewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-card/80 backdrop-blur-sm transition-opacity"
            onClick={() => setViewingProject(null)}
          />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in duration-300 overflow-hidden">
            { }
            <div className="p-6 border-b border-border bg-background flex justify-between items-start shrink-0">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 mb-3">
                  {viewingProject.domain}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {viewingProject.title}
                </h2>
              </div>
              <button
                onClick={() => setViewingProject(null)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-background rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            { }
            <div className="relative flex-1 p-8 overflow-y-auto custom-scrollbar">
              <article className="prose prose-invert prose-primary max-w-none prose-headings:font-bold prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground">
                <ReactMarkdown>{viewingProject.content}</ReactMarkdown>
              </article>
            </div>

            { }
            <div className="p-6 border-t border-border bg-background flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setViewingProject(null)}
                className="px-6 py-2.5 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
