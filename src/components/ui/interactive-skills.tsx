"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, Network, ShieldCheck } from "lucide-react";

interface Skill {
  name: string;
  level: number; // percentage
  category: "ai" | "data" | "cloud" | "all";
  description: string;
}

const SKILLS: Skill[] = [
  // Agentic AI
  { name: "LangChain", level: 95, category: "ai", description: "Orchestrated complex LLM chains and prompt engineering frameworks." },
  { name: "LangGraph", level: 95, category: "ai", description: "Built stateful multi-agent architectures for autonomous issue resolution." },
  { name: "OpenAI APIs", level: 95, category: "ai", description: "Integrated GPT models, embeddings, and fine-tuning configurations." },
  { name: "MCP", level: 90, category: "ai", description: "Model Context Protocol for exposing system tools, logs, and databases to LLMs." },
  { name: "Vector Databases", level: 90, category: "ai", description: "Configured pgvector and ChromaDB for retrieval-augmented generation (RAG)." },
  { name: "Prompt Engineering", level: 95, category: "ai", description: "Structured chain-of-thought, few-shot, and system prompts for agent reliability." },

  // Data Engineering
  { name: "Python", level: 98, category: "data", description: "Primary programming language for scripting, automation, and API design." },
  { name: "SQL", level: 95, category: "data", description: "Advanced analytical queries, window functions, and database schema modeling." },
  { name: "Spark / PySpark", level: 95, category: "data", description: "Optimized distributed computing jobs processing 10B+ records." },
  { name: "Apache Kafka", level: 90, category: "data", description: "Constructed high-throughput, event-driven message ingestion channels." },
  { name: "Apache Airflow", level: 90, category: "data", description: "Scheduled and monitored complex ETL orchestration workflows." },
  { name: "Data Modeling", level: 95, category: "data", description: "Designed relational and dimensional (Star/Snowflake) data architectures." },

  // Cloud & Platforms
  { name: "Azure", level: 92, category: "cloud", description: "Configured enterprise ADF, ADLS, Synapse, and Azure Key Vaults." },
  { name: "Databricks", level: 95, category: "cloud", description: "Leveraged Lakehouse Delta architecture, Unity Catalog, and Spark clusters." },
  { name: "Snowflake", level: 90, category: "cloud", description: "Developed data sharing, zero-copy cloning, and analytical warehouses." },
  { name: "AWS", level: 85, category: "cloud", description: "Managed S3, Lambda functions, Athena, and cloud security IAM policies." },
  { name: "Docker & K8s", level: 88, category: "cloud", description: "Containerized Microservices and managed local/cloud orchestrations." },
  { name: "FastAPI", level: 92, category: "cloud", description: "Built rapid, high-performance, asynchronous REST APIs for health networks." }
];

export function InteractiveSkills() {
  const [activeCategory, setActiveCategory] = useState<"all" | "ai" | "data" | "cloud">("all");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const filteredSkills = SKILLS.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const categories = [
    { id: "all", name: "All Technologies", icon: <Network className="w-4 h-4" /> },
    { id: "ai", name: "Agentic AI & LLMs", icon: <Cpu className="w-4 h-4" /> },
    { id: "data", name: "Data Platform Engineering", icon: <Database className="w-4 h-4" /> },
    { id: "cloud", name: "Cloud & Infrastructure", icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeCategory === cat.id
                ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/15"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Skills Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl p-4 cursor-pointer hover:bg-slate-900/60 hover:shadow-xl hover:shadow-violet-950/10 transition-all duration-300 group"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-slate-200 group-hover:text-white transition-colors text-sm sm:text-base">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono text-slate-400 group-hover:text-violet-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${
                      skill.category === "ai"
                        ? "from-violet-500 to-fuchsia-500"
                        : skill.category === "data"
                        ? "from-blue-500 to-cyan-500"
                        : "from-emerald-500 to-teal-500"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detailed Preview Card */}
        <div className="lg:col-span-1 h-full min-h-[220px]">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between relative overflow-hidden group">
            {/* Background design elements */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-violet-600/10 rounded-full blur-2xl group-hover:bg-violet-600/20 transition-all duration-300" />
            <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all duration-300" />

            <AnimatePresence mode="wait">
              {hoveredSkill ? (
                <motion.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-lg font-bold text-white tracking-wide">
                      {hoveredSkill.name}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border ${
                        hoveredSkill.category === "ai"
                          ? "bg-violet-500/10 border-violet-500/30 text-violet-400"
                          : hoveredSkill.category === "data"
                          ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      }`}
                    >
                      {hoveredSkill.category === "ai"
                        ? "Agentic AI"
                        : hoveredSkill.category === "data"
                        ? "Data Platform"
                        : "Cloud & Ops"}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-300 min-h-[80px]">
                    {hoveredSkill.description}
                  </p>

                  <div className="space-y-2 border-t border-white/10 pt-3">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Proficiency Level:</span>
                      <span className="font-semibold text-white">{hoveredSkill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${
                          hoveredSkill.category === "ai"
                            ? "from-violet-500 to-fuchsia-500"
                            : hoveredSkill.category === "data"
                            ? "from-blue-500 to-cyan-500"
                            : "from-emerald-500 to-teal-500"
                        }`}
                        style={{ width: `${hoveredSkill.level}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center space-y-3 py-6"
                >
                  <Network className="w-12 h-12 text-slate-500 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                      Skill Explorer
                    </h4>
                    <p className="text-xs text-slate-500 max-w-[200px] mt-1.5 leading-relaxed">
                      Hover over any skill chip to read Pintu's specific architectural experience and competency details.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
