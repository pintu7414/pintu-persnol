"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Cpu, Database, Network, ChevronDown, ChevronUp } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "AI Engineering" | "Data Platforms" | "Cloud & Infrastructure";
  challenge: string;
  solution: string;
  impact: string[];
  tech: string[];
  scale?: string;
  diagramType: "incident" | "platform" | "migration" | "monitoring";
}

const PROJECTS: Project[] = [
  {
    id: "incident-engine",
    title: "AI Incident Diagnosis Engine",
    category: "AI Engineering",
    challenge: "Pipeline failures and server timeouts required intensive, high-latency manual troubleshooting from on-call data engineers.",
    solution: "Designed and built an autonomous AI agentic loop using LangGraph, LangChain, and MCP. The agent connects to database and log tools, runs diagnostics, queries a vector knowledge base of historical fixes, and writes complete post-mortem diagnostics.",
    impact: [
      "90% reduction in manual on-call engineer interventions",
      "80% improvement in incident root-cause analysis speed"
    ],
    tech: ["LangChain", "LangGraph", "MCP (Model Context Protocol)", "OpenAI", "Vector DBs", "FastAPI"],
    diagramType: "incident"
  },
  {
    id: "data-platform",
    title: "Enterprise Healthcare Data Platform",
    category: "Data Platforms",
    challenge: "Processing, cleansing, and loading massive clinical and insurance claims data sources with legacy configurations resulted in high ETL failure rates.",
    solution: "Engineered high-throughput Spark and PySpark data pipelines coupled with Kafka stream ingestion and Azure Databricks Delta Lake. Standardized processing frameworks, optimized partition strategies, and cached common queries.",
    scale: "10 Billion Records • 12TB Data Managed",
    impact: [
      "20% improvement in nightly batch processing speed",
      "Integrated 20+ disparate clinical and claim feeds securely"
    ],
    tech: ["Apache Spark", "PySpark", "Azure Databricks", "Apache Kafka", "ADLS Gen2", "Snowflake"],
    diagramType: "platform"
  },
  {
    id: "cloud-migration",
    title: "Cloud Migration Framework",
    category: "Cloud & Infrastructure",
    challenge: "Migrating highly confidential and regulatory-bound on-premise healthcare data workloads into a scalable cloud environment safely.",
    solution: "Designed a multi-tier cloud ingestion framework using Azure Data Factory (ADF), Azure Databricks, and Azure Synapse Analytics, keeping zero-downtime synchronization for active pipelines.",
    impact: [
      "Reduced legacy hardware maintenance cost by 35%",
      "Established fully automated, compliance-hardened cloud architecture"
    ],
    tech: ["Azure Data Factory", "Azure Databricks", "Azure Synapse", "ADLS Gen2", "Key Vault"],
    diagramType: "migration"
  },
  {
    id: "etl-monitoring",
    title: "Automated ETL Monitoring Platform",
    category: "Cloud & Infrastructure",
    challenge: "Traditional threshold-based alerts led to fatigue, while actual silent pipeline failures went undetected for days.",
    solution: "Deployed an intelligent monitoring system with Airflow orchestration and an ML-based anomaly detection module that flags atypical table load volumes and processing times.",
    impact: [
      "60% reduction in manual system checks and developer fatigue",
      "Discovered 100% of silent pipeline drift incidents within 15 minutes"
    ],
    tech: ["Apache Airflow", "Python", "Scikit-Learn", "PagerDuty", "Slack API"],
    diagramType: "monitoring"
  }
];

export function ProjectCard() {
  const [expandedId, setExpandedId] = useState<string | null>("incident-engine");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {PROJECTS.map((project) => {
        const isExpanded = expandedId === project.id;
        return (
          <div
            key={project.id}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-md bg-slate-900/40 hover:bg-slate-900/60 ${
              isExpanded
                ? "border-violet-500/50 shadow-2xl shadow-violet-950/10"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            {/* Header / Clickable Toggle */}
            <div
              onClick={() => toggleExpand(project.id)}
              className="p-6 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    {project.category}
                  </span>
                  {project.scale && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {project.scale}
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden md:inline-block text-xs font-semibold tracking-wider uppercase text-slate-400 group-hover:text-white transition-all">
                  {isExpanded ? "Collapse Details" : "View Case Study"}
                </span>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {/* Expandable Case Study Panel */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-6 pt-0 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Write-up */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          The Challenge
                        </h4>
                        <p className="text-sm leading-relaxed text-slate-300">
                          {project.challenge}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          The Solution
                        </h4>
                        <p className="text-sm leading-relaxed text-slate-300">
                          {project.solution}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Business & Tech Impact
                        </h4>
                        <div className="space-y-2">
                          {project.impact.map((imp, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm font-semibold text-emerald-400">
                                {imp}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Technologies Utilized
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-white/5 font-mono"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Architecture Diagram Visualization */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                      <div className="border border-white/5 bg-slate-950/40 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                            <Network className="w-3.5 h-3.5 text-violet-400" />
                            System Architecture Flow
                          </span>
                          <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 animate-pulse">
                            Interactive Flow
                          </span>
                        </div>

                        {/* Interactive diagram renderings */}
                        <div className="flex-1 flex items-center justify-center py-4">
                          {project.diagramType === "incident" && <IncidentDiagram />}
                          {project.diagramType === "platform" && <PlatformDiagram />}
                          {project.diagramType === "migration" && <MigrationDiagram />}
                          {project.diagramType === "monitoring" && <MonitoringDiagram />}
                        </div>

                        <div className="text-[11px] text-slate-500 text-center mt-3 font-mono">
                          Visualizing agent pipelines, data feeds, and telemetry flow.
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// Subcomponents: High-fidelity animated SVG diagrams

function IncidentDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-[360px] h-auto overflow-visible">
      <defs>
        <linearGradient id="purple-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#8B5CF6" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Nodes */}
      <g filter="url(#shadow)">
        {/* Trigger */}
        <rect x="10" y="70" width="70" height="40" rx="6" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" />
        <text x="45" y="94" fill="#EF4444" fontSize="9" fontWeight="bold" textAnchor="middle">
          Alert Trigger
        </text>

        {/* LangGraph Orchestrator */}
        <rect x="120" y="60" width="90" height="60" rx="8" fill="#1E293B" stroke="url(#purple-glow)" strokeWidth="2" />
        <text x="165" y="90" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
          LangGraph
        </text>
        <text x="165" y="103" fill="#A78BFA" fontSize="8" textAnchor="middle">
          Orchestrator
        </text>

        {/* MCP Context Fetcher */}
        <rect x="250" y="20" width="70" height="40" rx="6" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="285" y="44" fill="#60A5FA" fontSize="9" textAnchor="middle">
          MCP Tools
        </text>

        {/* OpenAI GPT Diagnosis */}
        <rect x="250" y="120" width="70" height="40" rx="6" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
        <text x="285" y="144" fill="#34D399" fontSize="9" textAnchor="middle">
          OpenAI Core
        </text>
      </g>

      {/* Flow Lines */}
      {/* Alert to Orchestrator */}
      <line x1="80" y1="90" x2="120" y2="90" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" />
      
      {/* Orchestrator to MCP (Bi-directional) */}
      <path d="M 175 60 L 175 40 L 250 40" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5 3" className="animate-[dash_10s_linear_infinite]" />
      <path d="M 250 40 L 210 40 L 210 65" fill="none" stroke="#3B82F6" strokeWidth="1.5" />

      {/* Orchestrator to OpenAI */}
      <path d="M 175 120 L 175 140 L 250 140" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 3" />
      <path d="M 250 140 L 210 140 L 210 115" fill="none" stroke="#10B981" strokeWidth="1.5" />

      {/* Output diagnosis */}
      <line x1="210" y1="90" x2="350" y2="90" stroke="#8B5CF6" strokeWidth="2" />
      <polygon points="355,90 348,86 348,94" fill="#8B5CF6" />
      <text x="380" y="93" fill="#A78BFA" fontSize="8" fontWeight="bold" textAnchor="middle">
        Auto-Fix / SLA
      </text>
    </svg>
  );
}

function PlatformDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-[360px] h-auto overflow-visible">
      {/* Sparkles / Stream Nodes */}
      <g>
        {/* Kafka Ingestion */}
        <circle cx="50" cy="100" r="30" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="50" y="103" fill="#60A5FA" fontSize="9" fontWeight="bold" textAnchor="middle">
          Kafka
        </text>

        {/* Spark Processing */}
        <circle cx="160" cy="100" r="35" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
        <text x="160" y="98" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
          Apache
        </text>
        <text x="160" y="111" fill="#FBBF24" fontSize="10" fontWeight="bold" textAnchor="middle">
          Spark
        </text>

        {/* Databricks Delta Lake */}
        <rect x="250" y="70" width="80" height="60" rx="8" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" />
        <text x="290" y="98" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
          Databricks
        </text>
        <text x="290" y="110" fill="#F87171" fontSize="8" textAnchor="middle">
          Delta Lake
        </text>
      </g>

      {/* Streaming Flow Lines */}
      <line x1="80" y1="100" x2="125" y2="100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="8 4" className="animate-[dash_6s_linear_infinite]" />
      <line x1="195" y1="100" x2="250" y2="100" stroke="#FBBF24" strokeWidth="2" strokeDasharray="8 4" className="animate-[dash_4s_linear_infinite]" />

      <path d="M 330 100 L 370 100" fill="none" stroke="#10B981" strokeWidth="1.5" />
      <polygon points="375,100 368,96 368,104" fill="#10B981" />
      <text x="375" y="85" fill="#34D399" fontSize="8" textAnchor="middle">
        BI / APIs
      </text>
    </svg>
  );
}

function MigrationDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-[360px] h-auto overflow-visible">
      {/* Legacy Node */}
      <rect x="10" y="75" width="70" height="50" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
      <text x="45" y="100" fill="#94A3B8" fontSize="9" fontWeight="bold" textAnchor="middle">
        On-Premise
      </text>
      <text x="45" y="112" fill="#64748B" fontSize="8" textAnchor="middle">
        SQL Databases
      </text>

      {/* Azure Data Factory (ADF) */}
      <rect x="120" y="75" width="80" height="50" rx="6" fill="#1E293B" stroke="#0EA5E9" strokeWidth="1.5" />
      <text x="160" y="100" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle">
        Azure ADF
      </text>
      <text x="160" y="112" fill="#0284C7" fontSize="8" textAnchor="middle">
        ETL Pipelines
      </text>

      {/* Databricks Sync */}
      <rect x="240" y="40" width="70" height="40" rx="6" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" />
      <text x="275" y="64" fill="#F87171" fontSize="9" textAnchor="middle">
        Databricks
      </text>

      {/* Synapse Analytics */}
      <rect x="240" y="120" width="70" height="40" rx="6" fill="#1E293B" stroke="#8B5CF6" strokeWidth="1.5" />
      <text x="275" y="144" fill="#A78BFA" fontSize="9" textAnchor="middle">
        Synapse DWH
      </text>

      {/* Ingestion pathways */}
      <line x1="80" y1="100" x2="120" y2="100" stroke="#64748B" strokeWidth="1.5" strokeDasharray="5 3" />
      
      <path d="M 200 90 L 215 90 L 215 60 L 240 60" fill="none" stroke="#0EA5E9" strokeWidth="1.5" />
      <polygon points="240,60 233,56 233,64" fill="#0EA5E9" />

      <path d="M 200 110 L 215 110 L 215 140 L 240 140" fill="none" stroke="#0EA5E9" strokeWidth="1.5" />
      <polygon points="240,140 233,136 233,144" fill="#0EA5E9" />

      <line x1="310" y1="60" x2="350" y2="100" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="310" y1="140" x2="350" y2="100" stroke="#8B5CF6" strokeWidth="1.5" />
      
      <circle cx="360" cy="100" r="10" fill="#10B981" />
      <text x="360" y="103" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
        OK
      </text>
    </svg>
  );
}

function MonitoringDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-[360px] h-auto overflow-visible">
      {/* Airflow scheduler */}
      <rect x="10" y="80" width="70" height="40" rx="6" fill="#1E293B" stroke="#00C49F" strokeWidth="1.5" />
      <text x="45" y="104" fill="#00C49F" fontSize="9" fontWeight="bold" textAnchor="middle">
        Airflow Tasks
      </text>

      {/* Log Collector / Listener */}
      <rect x="120" y="80" width="80" height="40" rx="6" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="160" y="104" fill="#60A5FA" fontSize="9" textAnchor="middle">
        Log Aggregator
      </text>

      {/* ML Anomaly Detection */}
      <rect x="240" y="70" width="80" height="60" rx="6" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
      <text x="280" y="98" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
        ML Engine
      </text>
      <text x="280" y="110" fill="#FBBF24" fontSize="8" textAnchor="middle">
        (Isol. Forest)
      </text>

      {/* Flow */}
      <line x1="80" y1="100" x2="120" y2="100" stroke="#00C49F" strokeWidth="1.5" />
      <line x1="200" y1="100" x2="240" y2="100" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5 3" />
      
      {/* Alert Output */}
      <line x1="320" y1="100" x2="360" y2="100" stroke="#EF4444" strokeWidth="1.5" />
      <polygon points="360,100 353,96 353,104" fill="#EF4444" />
      <text x="380" y="103" fill="#F87171" fontSize="9" fontWeight="bold" textAnchor="middle">
        Alert
      </text>
    </svg>
  );
}
