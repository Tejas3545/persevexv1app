"use client";

import React from "react";

interface OrbIcon {
  label: string;
  bg: string;
  textColor?: string;
}

interface OrbitData {
  center: { label: string; bg: string };
  inner: OrbIcon[];
  outer: OrbIcon[];
}

const courseOrbitMap: Record<string, OrbitData> = {
  "artificial-intelligence": {
    center: { label: "AI", bg: "#2563eb" },
    inner: [
      { label: "Python", bg: "#3776AB" },
      { label: "TF", bg: "#FF6F00" },
      { label: "NLP", bg: "#7B2FBE" },
      { label: "CV", bg: "#0F766E" },
    ],
    outer: [
      { label: "GPT", bg: "#10A37F" },
      { label: "DL", bg: "#1565C0" },
      { label: "LLM", bg: "#B91C1C" },
      { label: "RL", bg: "#D97706" },
      { label: "Keras", bg: "#D00000" },
      { label: "Torch", bg: "#EE4C2C" },
    ],
  },
  "machine-learning": {
    center: { label: "ML", bg: "#6D28D9" },
    inner: [
      { label: "Python", bg: "#3776AB" },
      { label: "Sklearn", bg: "#F89939", textColor: "#1a1a1a" },
      { label: "Pandas", bg: "#150458" },
      { label: "NumPy", bg: "#013243" },
    ],
    outer: [
      { label: "XGB", bg: "#1565C0" },
      { label: "SVM", bg: "#7B2FBE" },
      { label: "RF", bg: "#166534" },
      { label: "MLP", bg: "#FF6F00" },
      { label: "KNN", bg: "#B91C1C" },
      { label: "Colab", bg: "#F9AB00", textColor: "#1a1a1a" },
    ],
  },
  "web-development": {
    center: { label: "</>", bg: "#0EA5E9" },
    inner: [
      { label: "React", bg: "#20232A", textColor: "#61DAFB" },
      { label: "JS", bg: "#F7DF1E", textColor: "#1a1a1a" },
      { label: "HTML", bg: "#E34F26" },
      { label: "CSS", bg: "#1572B6" },
    ],
    outer: [
      { label: "Node", bg: "#339933" },
      { label: "Next", bg: "#000000" },
      { label: "TS", bg: "#3178C6" },
      { label: "SQL", bg: "#4479A1" },
      { label: "Git", bg: "#F05032" },
      { label: "REST", bg: "#059669" },
    ],
  },
  "cloud-computing": {
    center: { label: "☁", bg: "#0284C7" },
    inner: [
      { label: "AWS", bg: "#FF9900", textColor: "#1a1a1a" },
      { label: "Azure", bg: "#0078D4" },
      { label: "GCP", bg: "#4285F4" },
      { label: "K8s", bg: "#326CE5" },
    ],
    outer: [
      { label: "Docker", bg: "#2496ED" },
      { label: "CI/CD", bg: "#D33833" },
      { label: "IaC", bg: "#623CE4" },
      { label: "S3", bg: "#569A31" },
      { label: "VPC", bg: "#FF4F00" },
      { label: "IAM", bg: "#7D4698" },
    ],
  },
  "cybersecurity": {
    center: { label: "🔐", bg: "#DC2626" },
    inner: [
      { label: "Kali", bg: "#268BEE" },
      { label: "OSINT", bg: "#1E3A8A" },
      { label: "SOC", bg: "#B91C1C" },
      { label: "VAPT", bg: "#0F766E" },
    ],
    outer: [
      { label: "Nmap", bg: "#4B5563" },
      { label: "Burp", bg: "#FF8800" },
      { label: "SIEM", bg: "#1E3A8A" },
      { label: "IDS", bg: "#065F46" },
      { label: "PKI", bg: "#7C3AED" },
      { label: "ZeroT", bg: "#6B21A8" },
    ],
  },
  "digital-marketing": {
    center: { label: "📈", bg: "#16A34A" },
    inner: [
      { label: "SEO", bg: "#4285F4" },
      { label: "Meta", bg: "#0866FF" },
      { label: "Google", bg: "#DB4437" },
      { label: "Email", bg: "#F59E0B", textColor: "#1a1a1a" },
    ],
    outer: [
      { label: "GA4", bg: "#FF6300" },
      { label: "SEM", bg: "#34A853" },
      { label: "CRO", bg: "#EA4335" },
      { label: "SMM", bg: "#1877F2" },
      { label: "PPC", bg: "#FBBC05", textColor: "#1a1a1a" },
      { label: "SEMrush", bg: "#FF6B35" },
    ],
  },
  "finance": {
    center: { label: "₹", bg: "#059669" },
    inner: [
      { label: "Excel", bg: "#217346" },
      { label: "P&L", bg: "#1E40AF" },
      { label: "DCF", bg: "#7C3AED" },
      { label: "Risk", bg: "#DC2626" },
    ],
    outer: [
      { label: "Tally", bg: "#005CFF" },
      { label: "IFRS", bg: "#1E293B" },
      { label: "CFA", bg: "#1B4FBB" },
      { label: "M&A", bg: "#6B21A8" },
      { label: "GST", bg: "#B45309" },
      { label: "ROI", bg: "#15803D" },
    ],
  },
  "human-resource": {
    center: { label: "HR", bg: "#7C3AED" },
    inner: [
      { label: "Recruit", bg: "#2563EB" },
      { label: "L&D", bg: "#059669" },
      { label: "Payroll", bg: "#D97706" },
      { label: "OKR", bg: "#DC2626" },
    ],
    outer: [
      { label: "ATS", bg: "#6D28D9" },
      { label: "HRMS", bg: "#0369A1" },
      { label: "CB", bg: "#1E40AF" },
      { label: "IRL", bg: "#B45309" },
      { label: "PMS", bg: "#065F46" },
      { label: "TA", bg: "#9D174D" },
    ],
  },
  "data-science": {
    center: { label: "DS", bg: "#0891B2" },
    inner: [
      { label: "Python", bg: "#3776AB" },
      { label: "SQL", bg: "#4479A1" },
      { label: "Spark", bg: "#E25A1C" },
      { label: "R", bg: "#276DC3" },
    ],
    outer: [
      { label: "Tableau", bg: "#E97627" },
      { label: "Power BI", bg: "#F2C811", textColor: "#1a1a1a" },
      { label: "Pandas", bg: "#150458" },
      { label: "Stats", bg: "#7C3AED" },
      { label: "ML", bg: "#059669" },
      { label: "BigData", bg: "#FF6D00" },
    ],
  },
  "iot": {
    center: { label: "IoT", bg: "#10B981" },
    inner: [
      { label: "Arduino", bg: "#00979D" },
      { label: "RPi", bg: "#C8193C" },
      { label: "MQTT", bg: "#660066" },
      { label: "Sensors", bg: "#F59E0B", textColor: "#1a1a1a" },
    ],
    outer: [
      { label: "AWS IoT", bg: "#FF9900", textColor: "#1a1a1a" },
      { label: "BLE", bg: "#0082FC" },
      { label: "WiFi", bg: "#0077CC" },
      { label: "LoRa", bg: "#4C1D95" },
      { label: "Edge", bg: "#065F46" },
      { label: "Cloud", bg: "#2563EB" },
    ],
  },
  "embedded-systems": {
    center: { label: "ES", bg: "#B45309" },
    inner: [
      { label: "C/C++", bg: "#00599C" },
      { label: "ARM", bg: "#0091BD" },
      { label: "RTOS", bg: "#6B21A8" },
      { label: "GPIO", bg: "#166534" },
    ],
    outer: [
      { label: "STM32", bg: "#03234B" },
      { label: "AVR", bg: "#CC4040" },
      { label: "CAN", bg: "#D97706" },
      { label: "SPI/I2C", bg: "#1E40AF" },
      { label: "PWM", bg: "#0F766E" },
      { label: "Debug", bg: "#4B5563" },
    ],
  },
  "vlsi-design": {
    center: { label: "VLSI", bg: "#4F46E5" },
    inner: [
      { label: "Verilog", bg: "#9C27B0" },
      { label: "VHDL", bg: "#1565C0" },
      { label: "FPGA", bg: "#C62828" },
      { label: "ASIC", bg: "#00838F" },
    ],
    outer: [
      { label: "Cadence", bg: "#C0392B" },
      { label: "Synopsys", bg: "#1ABC9C" },
      { label: "SPICE", bg: "#7D3C98" },
      { label: "DFT", bg: "#2E4053" },
      { label: "STA", bg: "#0E6655" },
      { label: "RTL", bg: "#1A5276" },
    ],
  },
  "autocad": {
    center: { label: "CAD", bg: "#e5002b" },
    inner: [
      { label: "2D", bg: "#CC0000" },
      { label: "3D", bg: "#E65100" },
      { label: "BIM", bg: "#1565C0" },
      { label: "Revit", bg: "#1976D2" },
    ],
    outer: [
      { label: "SolidWorks", bg: "#CC0000" },
      { label: "Layout", bg: "#FF8F00" },
      { label: "CAM", bg: "#33691E" },
      { label: "Drafting", bg: "#37474F" },
      { label: "Tolerances", bg: "#4527A0" },
      { label: "CNC", bg: "#00695C" },
    ],
  },
  "drone-mechanics": {
    center: { label: "🚁", bg: "#1565C0" },
    inner: [
      { label: "Flight", bg: "#0288D1" },
      { label: "FC", bg: "#01579B" },
      { label: "ESC", bg: "#283593" },
      { label: "GPS", bg: "#1B5E20" },
    ],
    outer: [
      { label: "Props", bg: "#BF360C" },
      { label: "FPV", bg: "#4527A0" },
      { label: "PID", bg: "#00695C" },
      { label: "Betaflight", bg: "#F57F17" },
      { label: "LiDAR", bg: "#880E4F" },
      { label: "MAVLink", bg: "#0D47A1" },
    ],
  },
  "hev": {
    center: { label: "EV", bg: "#16A34A" },
    inner: [
      { label: "BMS", bg: "#15803D" },
      { label: "Motor", bg: "#0369A1" },
      { label: "HV", bg: "#DC2626" },
      { label: "Regen", bg: "#7C3AED" },
    ],
    outer: [
      { label: "Li-Ion", bg: "#D97706" },
      { label: "OBC", bg: "#0891B2" },
      { label: "CAN", bg: "#B45309" },
      { label: "Thermal", bg: "#B91C1C" },
      { label: "MATLAB", bg: "#0076A8" },
      { label: "DCDC", bg: "#166534" },
    ],
  },
  "stock-market-crypto": {
    center: { label: "₿", bg: "#F97316" },
    inner: [
      { label: "Stocks", bg: "#1565C0" },
      { label: "Crypto", bg: "#F59E0B", textColor: "#1a1a1a" },
      { label: "TA", bg: "#7C3AED" },
      { label: "Options", bg: "#DC2626" },
    ],
    outer: [
      { label: "DeFi", bg: "#8B5CF6" },
      { label: "NFT", bg: "#EC4899" },
      { label: "ETH", bg: "#627EEA" },
      { label: "RSI", bg: "#059669" },
      { label: "MACD", bg: "#B45309" },
      { label: "Zerodha", bg: "#387ED1" },
    ],
  },
  "logistics-supply-chain": {
    center: { label: "SCM", bg: "#0369A1" },
    inner: [
      { label: "ERP", bg: "#1565C0" },
      { label: "WMS", bg: "#166534" },
      { label: "3PL", bg: "#7C3AED" },
      { label: "EOQ", bg: "#B45309" },
    ],
    outer: [
      { label: "SAP", bg: "#0557A6" },
      { label: "SCOR", bg: "#1B5E20" },
      { label: "JIT", bg: "#9C27B0" },
      { label: "Lean", bg: "#0891B2" },
      { label: "Customs", bg: "#B91C1C" },
      { label: "KPI", bg: "#D97706" },
    ],
  },
  "business-analytics": {
    center: { label: "BA", bg: "#7C3AED" },
    inner: [
      { label: "Power BI", bg: "#F2C811", textColor: "#1a1a1a" },
      { label: "SQL", bg: "#4479A1" },
      { label: "Excel", bg: "#217346" },
      { label: "Python", bg: "#3776AB" },
    ],
    outer: [
      { label: "Tableau", bg: "#E97627" },
      { label: "Stats", bg: "#6D28D9" },
      { label: "ML", bg: "#059669" },
      { label: "KPI", bg: "#D97706" },
      { label: "A/B Test", bg: "#DC2626" },
      { label: "DAX", bg: "#1565C0" },
    ],
  },
};

const defaultOrbit: OrbitData = {
  center: { label: "PX", bg: "#2563eb" },
  inner: [
    { label: "Skills", bg: "#3776AB" },
    { label: "Projects", bg: "#FF6F00" },
    { label: "Mentor", bg: "#7B2FBE" },
    { label: "Jobs", bg: "#0F766E" },
  ],
  outer: [
    { label: "Resume", bg: "#10A37F" },
    { label: "Cert", bg: "#1565C0" },
    { label: "LMS", bg: "#B91C1C" },
    { label: "Live", bg: "#D97706" },
    { label: "AI", bg: "#4A148C" },
    { label: "Network", bg: "#166534" },
  ],
};

interface Props {
  slug: string;
}

function buildOrbitCss(slug: string, data: typeof defaultOrbit): string {
  const s = `os-${slug.replace(/[^a-z0-9]/gi, "-")}`;
  const centerCfs = data.center.label.length > 2 ? "18px" : "22px";

  const outerRules = data.outer.map((icon, i) => {
    const delay = `-${(((i / data.outer.length) * 360) / 360) * 42}s`;
    const ifs = icon.label.length > 4 ? "9px" : icon.label.length > 3 ? "10px" : "12px";
    return (
      `.${s} .oi-cw-${i}{animation-delay:${delay}}` +
      `.${s} .oi-cw-ic-${i}{background:${icon.bg};color:${icon.textColor ?? "white"};font-size:${ifs};animation-delay:${delay}}`
    );
  }).join("");

  const innerRules = data.inner.map((icon, i) => {
    const delay = `-${(((i / data.inner.length) * 360) / 360) * 28}s`;
    const ifs = icon.label.length > 4 ? "9px" : icon.label.length > 3 ? "10px" : "12px";
    return (
      `.${s} .oi-ccw-${i}{animation-delay:${delay}}` +
      `.${s} .oi-ccw-ic-${i}{background:${icon.bg};color:${icon.textColor ?? "white"};font-size:${ifs};animation-delay:${delay}}`
    );
  }).join("");

  return (
    `.${s} .orbit-glow{background:radial-gradient(circle at center,${data.center.bg}25 0%,${data.center.bg}08 50%,transparent 75%)}` +
    `.${s} .orbit-ring-outer{border-color:${data.center.bg}}` +
    `.${s} .orbit-ring-inner{border-color:${data.center.bg}}` +
    `.${s} .orbit-center{background:linear-gradient(135deg,${data.center.bg}EE,${data.center.bg}99);` +
      `box-shadow:0 0 0 8px ${data.center.bg}22,0 0 40px ${data.center.bg}55;font-size:${centerCfs}}` +
    outerRules +
    innerRules
  );
}

export default function CourseHeroAnimation({ slug }: Props) {
  const data = courseOrbitMap[slug] || defaultOrbit;
  const scope = `os-${slug.replace(/[^a-z0-9]/gi, "-")}`;
  const css = buildOrbitCss(slug, data);

  return (
    <>
      {/* Scoped dynamic styles — no inline style attributes needed */}
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        className={`relative flex items-center justify-center select-none orbit-container ${scope}`}
        aria-hidden="true"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none orbit-glow" />

        {/* Outer dashed orbit ring */}
        <div className="absolute rounded-full border border-dashed opacity-30 orbit-ring-outer" />

        {/* Inner dashed orbit ring */}
        <div className="absolute rounded-full border border-dashed opacity-20 orbit-ring-inner" />

        {/* Outer orbit — CW */}
        {data.outer.map((icon, i) => (
          <div key={`outer-${i}`} className={`orbit-item orbit-item-cw oi-cw-${i}`}>
            <div className="orbit-arm-outer">
              <div className={`flex items-center justify-center rounded-xl font-bold shadow-md orbit-icon orbit-icon-cw oi-cw-ic-${i}`}>
                {icon.label}
              </div>
            </div>
          </div>
        ))}

        {/* Inner orbit — CCW */}
        {data.inner.map((icon, i) => (
          <div key={`inner-${i}`} className={`orbit-item orbit-item-ccw oi-ccw-${i}`}>
            <div className="orbit-arm-inner">
              <div className={`flex items-center justify-center rounded-xl font-bold shadow-md orbit-icon orbit-icon-ccw oi-ccw-ic-${i}`}>
                {icon.label}
              </div>
            </div>
          </div>
        ))}

        {/* Center circle */}
        <div className="relative z-10 flex items-center justify-center rounded-full text-white font-black shadow-2xl orbit-center">
          {data.center.label}
        </div>
      </div>
    </>
  );
}
