"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight, Activity, Cpu, Database } from "lucide-react";

interface TimelineItem {
  company: string;
  role: string;
  duration: string;
  icon: React.ReactNode;
  highlights: string[];
  achievements: string[];
  tech: string[];
  impactColor: string;
}

const EXPERIENCES: TimelineItem[] = [
  {
    company: "Komodo Health",
    role: "Data Engineer III",
    duration: "June 2025 – Present",
    icon: <Cpu className="w-5 h-5" />,
    highlights: [
      "Building and maintaining data pipelines supporting healthcare analytics at scale (Sentinel API / Data Retrieval API).",
      "Part of the Sentinel on-call rotation, ensuring 24/7 reliability for critical data services.",
      "Exploring agentic AI patterns using LangChain and LangGraph for intelligent data workflows.",
      "Working with MCP (Model Context Protocol) stack — Komodo's framework for secure, authenticated AI agent integrations.",
      "Contributing to Komodo's agentic engineering vision: building shared agent infrastructure that scales across use cases."
    ],
    achievements: [
      "Secured 24/7 high-availability operational SLAs for core healthcare APIs.",
      "Established shared agent infrastructure scaling across use cases."
    ],
    tech: ["LangChain", "LangGraph", "MCP (Model Context Protocol)", "OpenAI", "Vector DBs", "FastAPI"],
    impactColor: "from-violet-500 to-fuchsia-500"
  },
  {
    company: "UnitedHealth Group (Optum)",
    role: "Senior Data Engineer",
    duration: "May 2024 – June 2025",
    icon: <Database className="w-5 h-5" />,
    highlights: [
      "Spearheaded Spark optimization techniques (caching, multithreading, broadcast joins), cutting processing time by 20% on a 12TB dataset with 10B+ records.",
      "Migrated critical legacy processes to Azure cloud, reducing processing time by 20% and improving system scalability.",
      "Developed and automated Kafka-based data pipelines, enabling real-time data streaming and seamless integration.",
      "Improved query performance by 30%, accelerating data retrieval and decision-making across multiple teams.",
      "Led cross-functional collaboration to optimize data workflows, ensuring high availability and reliability of healthcare analytics systems."
    ],
    achievements: [
      "Cut processing times by 20% on massive 12TB datasets (10B+ records).",
      "Accelerated cross-team analytics retrieval speed by 30%."
    ],
    tech: ["Apache Spark", "PySpark", "Apache Kafka", "Azure Databricks", "ADF", "Azure Synapse"],
    impactColor: "from-blue-500 to-cyan-500"
  },
  {
    company: "UnitedHealth Group (Optum)",
    role: "Software Engineer",
    duration: "September 2021 – May 2024",
    icon: <Briefcase className="w-5 h-5" />,
    highlights: [
      "Designed ETL workflows integrating data from 20+ sources, boosting data accessibility by 25%.",
      "Implemented Airflow-based automation, ensuring 99.6% data accuracy in transformation and load operations.",
      "Reduced manual intervention by 60% using machine learning for automated incident logging and anomaly detection.",
      "Delivered impactful data visualizations, supporting strategic decision-making for business leaders.",
      "Conducted in-depth root cause analysis for data discrepancies, improving system integrity."
    ],
    achievements: [
      "Sustained 99.6% data quality accuracy across key clinical workflows.",
      "Reduced manual intervention by 60% through custom ML logging integrations."
    ],
    tech: ["Python", "SQL", "Apache Airflow", "Hadoop", "Hive", "Azure ADLS"],
    impactColor: "from-emerald-500 to-teal-500"
  },
  {
    company: "Centre for Development of Advanced Computing",
    role: "Summer Intern",
    duration: "May 2019 – July 2019",
    icon: <Briefcase className="w-5 h-5" />,
    highlights: [
      "Engineered the DVDMS (Drug Inventory and Distribution Management System) App for Guwahati / Assam.",
      "Designed local database caches to enable offline updates for remote clinics."
    ],
    achievements: [
      "Successfully delivered and demonstrated Assam's DVDMS app utility."
    ],
    tech: ["Android SDK", "Java", "SQLite"],
    impactColor: "from-slate-500 to-slate-700"
  }
];

export function AnimatedTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto py-12">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/80 via-blue-500/50 to-emerald-500/10 transform -translate-x-1/2 hidden md:block" />
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/80 via-blue-500/50 to-emerald-500/10 md:hidden" />

      <div className="space-y-12">
        {EXPERIENCES.map((exp, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`w-10 h-10 rounded-full bg-slate-900 border-2 border-white/20 flex items-center justify-center text-slate-300 shadow-xl`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${exp.impactColor} opacity-20 absolute`} />
                  {exp.icon}
                </motion.div>
              </div>

              {/* Spacer for large screens */}
              <div className="w-full md:w-1/2 hidden md:block" />

              {/* Timeline Card */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8"
              >
                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 hover:bg-slate-900/60 transition-all duration-300">
                  {/* Hover ambient light */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-r ${exp.impactColor} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity duration-300`} />

                  {/* Header info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5`}>
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </span>
                    <span className="text-sm font-semibold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
                      {exp.company}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                    {exp.role}
                  </h3>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-5 text-sm text-slate-400">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Achievements Panel */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 mb-5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      Core Achievements
                    </h4>
                    {exp.achievements.map((ach, i) => (
                      <p key={i} className="text-sm font-medium text-emerald-400 flex items-start gap-2">
                        <span className="text-emerald-500">•</span>
                        <span>{ach}</span>
                      </p>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-white/5 hover:border-white/10 hover:text-white transition-all font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
