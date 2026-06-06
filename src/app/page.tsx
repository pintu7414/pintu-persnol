"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  FileText,
  Terminal,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Code,
  Activity,
  Cpu,
  Database,
  ArrowUpRight,
  Send,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Users
} from "lucide-react";

// Local SVG icons for brands (since Lucide v0.400+ doesn't export brand icons directly)
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import confetti from "canvas-confetti";

// Component imports
import { CanvasNetwork } from "@/components/ui/canvas-network";
import { InteractiveChatbot } from "@/components/ui/interactive-chatbot";
import { AnimatedTimeline } from "@/components/ui/animated-timeline";
import { InteractiveSkills } from "@/components/ui/interactive-skills";
import { ProjectCard } from "@/components/ui/project-card";

// Stats configurations
const STATS = [
  { value: "10B+", label: "Records Processed" },
  { value: "12TB", label: "Healthcare Data Managed" },
  { value: "20+", label: "Data Sources Integrated" },
  { value: "99.6%", label: "Data Quality SLA" },
  { value: "90%", label: "Reduction in Incident Response" },
  { value: "80%", label: "Faster Root Cause Analysis" }
];

// Services configurations
const SERVICES = [
  { title: "Data Engineering Consulting", desc: "Designing production-hardened batch/streaming pipelines with PySpark and Airflow." },
  { title: "AI Solution Development", desc: "Custom LLM integrations, multi-agent frameworks, and structured outputs." },
  { title: "RAG Implementation", desc: "High-fidelity database context retrieval using pgvector and advanced semantic models." },
  { title: "Healthcare Analytics Consulting", desc: "Establishing HIPAA-aligned workflows, clinical terminologies parsing, and claims ETLs." },
  { title: "Cloud Migration Consulting", desc: "Transitioning heavy legacy systems smoothly to Azure Lakehouse configurations." },
  { title: "Spark Optimization", desc: "Tuning memory configurations, diagnosing shuffles, and streamlining Databricks clusters." },
  { title: "Architecture Reviews", desc: "Evaluating infrastructure security, scaling capabilities, and technical debt mitigation." },
  { title: "Technical Mentoring & Coaching", desc: "Accelerating team capabilities in cloud engineering, system design, and AI tooling." }
];

export default function Home() {
  const [terminalCmd, setTerminalCmd] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    budget: "$10k - $25k",
    call: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Trigger confetti for resume download
  const handleDownloadResume = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#8b5cf6", "#3b82f6", "#10b981"]
    });
    
    // Trigger real file download
    const link = document.createElement("a");
    link.href = "/pintu_singh_cv.pdf";
    link.download = "Pintu_Singh_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit contact form
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const web3formsKey = "29001641-c0ab-4eb8-a612-efe0411e518c";
      const endpoint = "https://api.web3forms.com/submit";

      const formDataToSend = new FormData(e.currentTarget);
      formDataToSend.append("access_key", web3formsKey);
      formDataToSend.append("subject", `New Portfolio Inquiry from ${formData.name}${formData.company ? ` (${formData.company})` : ""}`);
      formDataToSend.append("from_name", "Portfolio Inquiry Form");
      
      // Override checkbox and budget values with clean formatting
      formDataToSend.set("schedule_call", formData.call ? "Yes (15m call requested)" : "No");
      formDataToSend.set("budget", formData.budget || "Not Specified");

      const response = await fetch(endpoint, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10b981", "#3b82f6", "#8b5cf6"]
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        description: "",
        budget: "$10k - $25k",
        call: false
      });

      // Reset submission message state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setSubmitError(err.message || "Failed to submit. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock terminal console command execution in AI Lab
  const executeTerminal = (cmd: string) => {
    const output: string[] = [];
    const lowerCmd = cmd.trim().toLowerCase();

    if (lowerCmd === "help") {
      output.push(
        "Available commands:",
        "  help                 - List available diagnostic commands",
        "  run agent            - Initialize and execute the troubleshooting agent",
        "  mcp list-servers     - List connected Model Context Protocol servers",
        "  check delta-tables   - Run data skew and integrity audit",
        "  clear                - Clear terminal logs"
      );
    } else if (lowerCmd === "run agent") {
      output.push(
        "⚡ Initializing LangGraph state coordinator...",
        "⚙️ Exposing file-reader and sql-query tools via MCP...",
        "🤖 LLM agent matched event: 'Spark OutOfMemory Error'",
        "🔍 Querying Vector DB for past incident occurrences...",
        "✅ Match found: Incident #482 (Shuffle Partition Skew)",
        "🛠️ Suggesting fix: 'set spark.sql.shuffle.partitions = 2000'",
        "🎉 Incident diagnosed in 1.4 seconds. Manual SLA saved."
      );
    } else if (lowerCmd === "mcp list-servers") {
      output.push(
        "Connected MCP Servers:",
        "  🟢 pg-logger-tool   (Exposes: tail_logs, search_logs)",
        "  🟢 azure-billing    (Exposes: get_compute_costs)",
        "  🟢 databricks-api   (Exposes: inspect_spark_plan, kill_cluster)"
      );
    } else if (lowerCmd === "check delta-tables") {
      output.push(
        "📊 Scanning Delta tables... (Komodo Health Analytics)",
        "  - patient_claims_gold: 99.78% integrity [OK]",
        "  - clinical_events_silver: 99.64% integrity [OK]",
        "  - data_science_features: 0 skew [OK]",
        "✨ No anomalies detected. SLA thresholds within bounds."
      );
    } else if (lowerCmd === "clear") {
      setTerminalOutput([]);
      setTerminalCmd("");
      return;
    } else if (lowerCmd === "") {
      return;
    } else {
      output.push(`Command not found: '${cmd}'. Type 'help' for available queries.`);
    }

    setTerminalOutput((prev) => [...prev, `> ${cmd}`, ...output]);
    setTerminalCmd("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cinematic Ambient Glow Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Network Background */}
      <CanvasNetwork />

      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 font-display">
              Pintu Singh
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold tracking-wider">
              AI & Data Lead
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">Who I Am</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#lab" className="hover:text-white transition-colors">AI Lab</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
            <a href="#research" className="hover:text-white transition-colors">Research</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              Resume
            </button>
            <a
              href="#contact"
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-lg hover:shadow-violet-600/25 border border-violet-400/25 transition-all duration-300"
            >
              Book Consult
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-[calc(100vh-64px)] flex flex-col justify-between max-w-7xl mx-auto px-6 py-12 md:py-20 relative">
          <div className="flex-1 flex flex-col justify-center max-w-4xl space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Data Engineer 3 @ Komodo Health
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400">
                  Ex-UnitedHealth Group
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400">
                  NIT Silchar Alumnus
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7.5xl font-extrabold tracking-tight font-display leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-100 to-slate-500">
                Building Intelligent <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 text-glow">
                  Healthcare Data Systems
                </span>{" "}
                with AI
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-sans max-w-3xl">
              Senior Data Engineer at Komodo Health specializing in Agentic AI, Large Scale Data Platforms, Healthcare Analytics, Cloud Architecture, and Generative AI Solutions.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center gap-2 border border-violet-400/20 shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={handleDownloadResume}
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-semibold flex items-center gap-2 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </button>
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-semibold flex items-center gap-2 transition-all duration-300"
              >
                Book a Consultation
                <ArrowUpRight className="w-4 h-4 text-violet-400" />
              </a>
            </div>
          </div>

          {/* Animated Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 pt-16 border-t border-white/5 mt-12">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 font-display">
                  {stat.value}
                </div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 font-sans leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
                Foundations
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                Who I Am
              </h2>
              <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
              
              {/* Profile Headshot */}
              <div className="pt-4">
                <img
                  src="/Pintu.jpg"
                  alt="Pintu Singh"
                  className="w-full max-w-[260px] aspect-square object-cover rounded-2xl border border-white/10 shadow-2xl shadow-violet-950/15"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed font-sans">
                I am a Data Engineer and AI Engineer with expertise in large-scale healthcare platforms, cloud-native architectures, distributed systems, and Agentic AI solutions.
              </p>
              <p className="text-base text-slate-400 leading-relaxed">
                Over the past 5+ years, I have worked on enterprise healthcare platforms serving millions of users and processing billions of healthcare records. My work focuses on combining Data Engineering with Artificial Intelligence to create autonomous systems capable of reasoning, diagnosing, and solving operational problems.
              </p>

              {/* Key expertise grids */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                {[
                  { title: "Data Engineering", desc: "Apache Spark, partition optimization, Kafka pipeline ingestion.", icon: <Database className="w-5 h-5 text-blue-400" /> },
                  { title: "AI Engineering", desc: "LangChain, LangGraph state-charts, OpenAI models, RAG.", icon: <Cpu className="w-5 h-5 text-violet-400" /> },
                  { title: "Healthcare Analytics", desc: "HIPAA-compliant platforms, clinical/claims analytics.", icon: <Activity className="w-5 h-5 text-emerald-400" /> },
                  { title: "Platform Architecture", desc: "Azure Databricks, Synapse, Airflow orchestrator schemas.", icon: <Layers className="w-5 h-5 text-fuchsia-400" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-slate-900/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
              Career Trajectory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Professional Milestones
            </h2>
            <p className="text-sm text-slate-400">
              Detailed tenure representing core contributions to enterprise healthcare systems and AI platforms.
            </p>
          </div>

          <AnimatedTimeline />
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
              Architectural Showcases
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Engineering Case Studies
            </h2>
            <p className="text-sm text-slate-400">
              Explore challenge, solution, and detailed interactive architecture diagrams.
            </p>
          </div>

          <ProjectCard />
        </section>

        {/* AI LAB SECTION */}
        <section id="lab" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
                Innovation hub
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                AI Engineering Lab
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-sans">
                A sandbox showcasing expertise in agentic state-charts, RAG implementations, and Model Context Protocol (MCP) servers. My lab projects integrate advanced reasoning frameworks directly into core data pipelines.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Stateful Multi-Agent Workflows via LangGraph",
                  "Direct file & system access using MCP servers",
                  "High-accuracy RAG vectors with pgvector embeddings",
                  "Asynchronous microservices with FastAPI",
                  "Structured output prompt validations for pipeline inputs"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Terminal Sandbox */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden font-mono text-sm">
                {/* Terminal Header */}
                <div className="px-4 py-3 bg-slate-900 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] text-slate-400 ml-2">agentic-diagnostic-console (~/sandbox)</span>
                  </div>
                  <Terminal className="w-4 h-4 text-slate-500" />
                </div>

                {/* Terminal Log Output */}
                <div className="p-5 h-[280px] overflow-y-auto space-y-2 text-slate-300 scrollbar-thin scrollbar-thumb-white/5">
                  <div className="text-slate-500">// Type 'help' to see list of valid diagnostic tools.</div>
                  <div className="text-slate-500">// Or execute 'run agent' to execute a live AI pipeline troubleshooting demo.</div>
                  {terminalOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.startsWith(">")
                          ? "text-white font-bold"
                          : line.startsWith("🟢") || line.startsWith("✅") || line.startsWith("🎉")
                          ? "text-emerald-400"
                          : line.startsWith("⚡") || line.startsWith("⚙️")
                          ? "text-violet-400"
                          : "text-slate-400"
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Terminal Input Form */}
                <div className="p-3 bg-slate-900/50 border-t border-white/5 flex items-center gap-2">
                  <span className="text-violet-400 font-bold">$</span>
                  <input
                    type="text"
                    value={terminalCmd}
                    onChange={(e) => setTerminalCmd(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        executeTerminal(terminalCmd);
                      }
                    }}
                    placeholder="run agent..."
                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder-slate-600 text-sm font-mono"
                  />
                  <button
                    onClick={() => executeTerminal(terminalCmd)}
                    className="text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all font-mono"
                  >
                    Execute
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Technical Competencies
            </h2>
            <p className="text-sm text-slate-400">
              Interactive map of core frameworks, pipeline languages, and cloud systems.
            </p>
          </div>

          <InteractiveSkills />
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
              Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Professional Certifications
            </h2>
            <p className="text-sm text-slate-400">
              Validated training in Deep Learning, Generative AI, and Cloud Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Improving Deep Neural Networks", org: "DeepLearning.AI", focus: "Hyperparameter tuning, Regularization and Optimization" },
              { title: "Neural Network and Deep Learning", org: "DeepLearning.AI", focus: "Feedforward structures, backpropagation tuning, weight initializations" },
              { title: "Convolutional Neural Networks", org: "DeepLearning.AI", focus: "Computer vision algorithms, object detection, residual connections" },
              { title: "Generative AI for Beginners", org: "Microsoft / GitHub", focus: "LLM prompts, system instruction design, API configurations" },
              { title: "Microsoft Certified: Azure Fundamentals", org: "Microsoft", focus: "Cloud services, resource management, IAM security framework" }
            ].map((cert, i) => (
              <div
                key={i}
                className="bg-slate-900/25 backdrop-blur-xl border border-white/5 hover:border-violet-500/30 hover:bg-slate-900/50 rounded-2xl p-6 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-2xl group-hover:bg-violet-600/10 transition-all duration-300" />
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-violet-400">
                    {cert.org}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-violet-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cert.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH PUBLICATIONS SECTION */}
        <section id="publications" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
              Contributions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Published Research
            </h2>
            <p className="text-sm text-slate-400">
              Academic peer-reviewed papers exploring abstractive NLP and computer vision recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Abstractive Text Summarization Approaches with Analysis of Evaluation Techniques",
                publisher: "Research Publication",
                focus: "Transformer Architectures • Semantic Drift Analysis • NLP Metrics Evaluator",
                desc: "Investigates algorithmic methodologies for compressing semantic text documents while maintaining contextual accuracy. Outlines neural structures, encoder-decoder transformers, and auto-regressive decoding. Compares qualitative human preference against automatic evaluation metrics (ROUGE, BLEU, BERTScore) to establish alignment benchmarks.",
                links: [
                  { label: "ResearchGate", url: "https://www.researchgate.net/publication/351863178_Abstractive_Text_Summarization_Approaches_with_Analysis_of_Evaluation_Techniques" }
                ]
              },
              {
                title: "Multimodal Recipe Recommendation System Using Deep Learning and Rule-Based Approach",
                publisher: "Springer / SN Computer Science",
                focus: "Computer Vision • Dietary Rule Systems • Personalized Recommendations",
                desc: "Presents a novel recommendation architecture combining deep neural network classification for multi-ingredient food recognition with semantic logical rule sets. Recommends customized, allergen-safe dietary pathways dynamically aligned with user profile profiles.",
                links: [
                  { label: "Springer Link", url: "https://link.springer.com/article/10.1007/s42979-023-01870-6" }
                ]
              }
            ].map((paper, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[90px] pointer-events-none group-hover:bg-violet-600/10 transition-all duration-300" />
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-violet-400" />
                    <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
                      {paper.publisher}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug group-hover:text-violet-400 transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {paper.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    {paper.focus}
                  </span>
                  <div className="flex gap-4">
                    {paper.links.map((lnk, lIdx) => (
                      <a
                        key={lIdx}
                        href={lnk.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-violet-400 flex items-center gap-1 font-semibold hover:text-white transition-colors"
                      >
                        {lnk.label} <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
              Collaboration
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Professional Consulting Services
            </h2>
            <p className="text-sm text-slate-400">
              Partnering with startups and enterprise teams to scale data engines and integrate agentic models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((serv, i) => (
              <div
                key={i}
                className="bg-slate-900/20 backdrop-blur-xl border border-white/5 hover:border-white/15 hover:bg-slate-900/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-violet-950/5 min-h-[160px]"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-violet-400 transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {serv.desc}
                  </p>
                </div>
                <div className="pt-4 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                  Enquire
                  <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FUTURE VISION SECTION */}
        <section id="vision" className="py-20 max-w-4xl mx-auto px-6 border-t border-white/5">
          <div className="bg-gradient-to-r from-violet-900/10 via-slate-900/40 to-emerald-900/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500" />
            
            <Sparkles className="w-10 h-10 text-violet-400 mx-auto animate-spin" style={{ animationDuration: '6s' }} />
            
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-white">
              Building the Future of Healthcare AI
            </h3>

            <p className="text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
              The future of healthcare will be driven by intelligent systems capable of understanding, reasoning, and acting on complex healthcare data. My mission is to create autonomous AI-powered platforms that improve operational efficiency, data quality, and patient outcomes.
            </p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 md:py-28 max-w-5xl mx-auto px-6 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest font-bold text-violet-400">
                Get in touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                Let's Build Something Extraordinary
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Whether you represent a high-growth startup, an enterprise clinical platform, or a recruiting lead, I'm always open to architectural discussions or advisory partnerships.
              </p>

              <div className="space-y-4 pt-4 text-sm text-slate-300 font-medium">
                <a href="mailto:pintu7414@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  pintu7414@gmail.com
                </a>
                <a href="tel:+919079187620" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  +91-9079187620
                </a>
                <a href="https://linkedin.com/in/Pintu02" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  linkedin.com/in/Pintu02
                </a>
                <a href="https://github.com/Pintusingh" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  github.com/Pintusingh
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 relative">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleContactSubmit}
                      className="space-y-4"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Alex Mercer"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Google / Stripe / Startup"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Description</label>
                        <textarea
                          required
                          name="message"
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Describe your goals, tech requirements, or hiring pipeline details..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Budget</label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                          >
                            <option>$10k - $25k</option>
                            <option>$25k - $50k</option>
                            <option>$50k+</option>
                            <option>Recruiting Inquiry / Full-time</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-3 pt-6">
                          <input
                            type="checkbox"
                            name="schedule_call"
                            id="schedule-call"
                            checked={formData.call}
                            onChange={(e) => setFormData({ ...formData, call: e.target.checked })}
                            className="w-4 h-4 rounded border-white/10 bg-white/5 text-violet-600 focus:ring-violet-500 focus:ring-offset-slate-900"
                          />
                          <label htmlFor="schedule-call" className="text-xs font-semibold text-slate-300 cursor-pointer select-none">
                            Schedule Intro Call (15m)
                          </label>
                        </div>
                      </div>

                      {submitError && (
                        <div className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-2 text-center">
                          {submitError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center justify-center gap-2 border border-violet-400/20 shadow-lg hover:shadow-violet-600/25 transition-all duration-300 disabled:bg-slate-800 disabled:text-slate-500 disabled:border-none"
                      >
                        {isSubmitting ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            Submit Inquiry
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      className="text-center py-12 space-y-4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                        <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                          Thank you for reaching out. Pintu will review your request and get back to you within 24 hours.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950/80 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400 font-display">Pintu Singh</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/Pintusingh" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/Pintu02" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:pintu7414@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant Chatbot */}
      <InteractiveChatbot />
    </div>
  );
}
