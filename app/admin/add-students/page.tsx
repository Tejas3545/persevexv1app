"use client";

import { useState } from "react";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Info,
  PlusCircle,
  Download,
  AlertCircle,
} from "lucide-react";

type StudentData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  course1: string;
  role1: string;
  month: string;
  domains?: string[];
  status: "pending" | "uploading" | "success" | "error" | "skipped" | "updated";
  message?: string;
};

const EXPECTED_HEADERS = [
  "email",
  "firstName",
  "lastName",
  "username",
  "password",
  "course1",
  "role1",
];

export default function AddStudents() {
  const [month, setMonth] = useState<string>("");
  const [students, setStudents] = useState<StudentData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [csvError, setCsvError] = useState<string>("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvError("");
    setStudents([]);

    try {
      const text = await file.text();
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);

      if (lines.length === 0) {
        setCsvError("CSV file is empty. Please upload a valid CSV file.");
        return;
      }

      // Validate headers
      const headerLine = lines[0];
      const headers = headerLine.split(",").map((h) => h.trim());

      // Check if headers match expected format
      const headersMatch = EXPECTED_HEADERS.every(
        (expected, index) =>
          headers[index]?.toLowerCase() === expected.toLowerCase(),
      );

      if (!headersMatch || headers.length !== EXPECTED_HEADERS.length) {
        setCsvError(
          `Invalid CSV headers. Expected: ${EXPECTED_HEADERS.join(", ")}\nFound: ${headers.join(", ")}`,
        );
        return;
      }

      const parsedStudents: StudentData[] = [];

      // Parse data rows (skip header)
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        const cols = line.split(",").map((c) => c.trim());

        // Skip rows with insufficient columns
        if (cols.length < 7) {
          continue;
        }

        const [email, firstName, lastName, username, password, course1, role1] =
          cols;

        // Skip rows with empty required fields
        if (
          !email ||
          !firstName ||
          !lastName ||
          !username ||
          !password ||
          !course1 ||
          !role1
        ) {
          continue;
        }

        parsedStudents.push({
          id: crypto.randomUUID(),
          email,
          firstName,
          lastName,
          username,
          password,
          course1,
          role1,
          month: "",
          status: "pending",
        });
      }

      if (parsedStudents.length === 0) {
        setCsvError(
          "No valid student data found in CSV. Please ensure the file contains data rows.",
        );
        return;
      }

      setStudents(parsedStudents);
      setUploadProgress(0);
    } catch (error: any) {
      setCsvError(`Error reading CSV file: ${error.message}`);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `${EXPECTED_HEADERS.join(",")}\nexample@email.com,John,Doe,johndoe,password123,Web Development,Student\n`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_upload_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (!month) {
      alert("Please select a month first.");
      return;
    }
    if (students.length === 0) {
      alert("No students to upload.");
      return;
    }

    setIsUploading(true);
    let successCount = 0;

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      if (["success", "updated", "skipped"].includes(student.status)) {
        successCount++;
        continue;
      }

      setStudents((prev) => {
        const newArr = [...prev];
        newArr[i] = { ...newArr[i], status: "uploading" };
        return newArr;
      });

      try {
        const res = await fetch("/api/admin/add-students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: student.email,
            firstName: student.firstName,
            lastName: student.lastName,
            username: student.username,
            password: student.password,
            course1: student.course1,
            role1: student.role1,
            month: month,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setStudents((prev) => {
            const newArr = [...prev];

            const newStatus =
              data.status === "created"
                ? "success"
                : data.status === "updated"
                  ? "updated"
                  : data.status === "skipped"
                    ? "skipped"
                    : "success";

            newArr[i] = {
              ...newArr[i],
              status: newStatus,
              message: data.message,
              domains: data.student?.domains || [student.course1],
            };
            return newArr;
          });
          successCount++;
        } else {
          setStudents((prev) => {
            const newArr = [...prev];
            newArr[i] = { ...newArr[i], status: "error", message: data.error };
            return newArr;
          });
        }
      } catch (error: any) {
        setStudents((prev) => {
          const newArr = [...prev];
          newArr[i] = { ...newArr[i], status: "error", message: error.message };
          return newArr;
        });
      }

      setUploadProgress(Math.round(((i + 1) / students.length) * 100));
    }

    setIsUploading(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-muted">
          Batch Student Upload
        </h1>
        {students.length > 0 && (
          <div className="text-sm font-medium text-muted">
            {
              students.filter((s) =>
                ["success", "updated", "skipped"].includes(s.status),
              ).length
            }{" "}
            / {students.length} Processed
          </div>
        )}
      </div>

      {/* CSV Format Instructions */}
      <div className="bg-accent border border-border rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-primary mb-2">
              CSV Format Requirements
            </h3>
            <p className="text-sm text-primary mb-3">
              Your CSV file must have the following columns in this exact order:
            </p>
            <div className="bg-card rounded border border-border p-3 mb-3">
              <code className="text-xs text-muted font-mono">
                {EXPECTED_HEADERS.join(", ")}
              </code>
            </div>
            <p className="text-xs text-primary mb-3">
              <strong>Example:</strong>
            </p>
            <div className="bg-card rounded border border-border p-3 mb-3 overflow-x-auto">
              <code className="text-xs text-muted font-mono whitespace-pre">
                {EXPECTED_HEADERS.join(",")}
                {"\n"}
                john.doe@example.com,John,Doe,johndoe,password123,Web
                Development,Student
              </code>
            </div>
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CSV Template
            </button>
          </div>
        </div>
      </div>

      {/* CSV Error Display */}
      {csvError && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-destructive mb-1">
                CSV Validation Error
              </h3>
              <p className="text-sm text-destructive whitespace-pre-line">
                {csvError}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label htmlFor="month-select" className="block text-sm font-medium text-muted-foreground mb-2">
              Select Batch Month
            </label>
            <select
              id="month-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-2 border border-muted rounded-md focus:ring-2 focus:ring-primary"
              disabled={isUploading}
              title="Select Batch Month"
            >
              <option value="">-- Select Month --</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="csv-upload" className="block text-sm font-medium text-muted-foreground mb-2">
              Select CSV File
            </label>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isUploading}
              className="w-full p-2 border border-muted rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-primary hover:file:bg-accent"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={isUploading || students.length === 0 || !month}
            className={`w-full py-2.5 px-4 text-foreground font-medium rounded-md transition-colors ${
              isUploading || students.length === 0 || !month
                ? "bg-muted cursor-not-allowed"
                : "bg-primary hover:bg-primary"
            }`}
          >
            {isUploading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Processing...{" "}
                {uploadProgress}%
              </span>
            ) : (
              "Start Upload"
            )}
          </button>
        </div>
      </div>

      {students.length > 0 && (
        <div className="bg-card rounded-lg shadow-md overflow-hidden">
          <div className="relative overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="min-w-full divide-y divide-muted relative">
              <thead className="bg-muted sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Domains
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-muted">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className={student.status === "error" ? "bg-destructive" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.status === "pending" && (
                        <span className="text-muted text-xs">Pending</span>
                      )}
                      {student.status === "uploading" && (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      )}
                      {student.status === "success" && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                      {student.status === "updated" && (
                        <PlusCircle className="w-5 h-5 text-primary" />
                      )}
                      {student.status === "skipped" && (
                        <Info className="w-5 h-5 text-secondary" />
                      )}
                      {student.status === "error" && (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-card">
                        {student.firstName} {student.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-card">
                        {student.email}
                      </div>
                      <div className="text-xs text-muted">
                        {student.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {student.domains && student.domains.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {student.domains.map((d) => (
                            <span
                              key={d}
                              className="px-2 py-0.5 rounded text-xs bg-muted border border-border"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span>{student.course1}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                      {student.role1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {student.message && (
                        <span
                          className={
                            student.status === "error"
                              ? "text-destructive"
                              : student.status === "updated"
                                ? "text-primary"
                                : student.status === "skipped"
                                  ? "text-secondary"
                                  : "text-primary"
                          }
                        >
                          {student.message}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
