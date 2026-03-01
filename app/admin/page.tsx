"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  FolderOpen,
  BookOpen,
  TrendingUp,
  Calendar,
  Activity,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

type Stats = {
  totalStudents: number;
  totalProjects: number;
  totalBlogs: number;
  recentStudents: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalProjects: 0,
    totalBlogs: 0,
    recentStudents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      href: "/admin/add-students",
    },
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FolderOpen,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      href: "/admin/view-projects",
    },
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: BookOpen,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      href: "/admin/add-blog",
    },
    {
      title: "Recent Students",
      value: stats.recentStudents,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "Last 30 days",
    },
  ];

  const quickActions = [
    {
      title: "Add Students",
      description: "Upload CSV file with student data",
      icon: Users,
      href: "/admin/add-students",
      color: "text-blue-500",
    },
    {
      title: "Import Projects",
      description: "Bulk import projects from JSON",
      icon: FolderOpen,
      href: "/admin/bulk-projects",
      color: "text-purple-500",
    },
    {
      title: "View Projects",
      description: "Manage and view all projects",
      icon: FolderOpen,
      href: "/admin/view-projects",
      color: "text-green-500",
    },
    {
      title: "Create Blog",
      description: "Write and publish a new blog post",
      icon: BookOpen,
      href: "/admin/add-blog",
      color: "text-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                {card.href && (
                  <Link
                    href={card.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {card.value.toLocaleString()}
                </p>
                {card.description && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-muted`}>
                    <Icon className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">System Status</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">
              Database Status
            </span>
            <span className="text-sm font-medium text-green-500">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">API Status</span>
            <span className="text-sm font-medium text-green-500">Running</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">
              Last Updated
            </span>
            <span className="text-sm font-medium text-foreground">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
