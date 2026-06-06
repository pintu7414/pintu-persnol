"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const PRESETS = [
  { q: "Who is Pintu Singh?", key: "who" },
  { q: "Explain your AI Incident Diagnosis Engine.", key: "engine" },
  { q: "What technologies do you specialize in?", key: "tech" },
  { q: "Tell me about your healthcare experience.", key: "healthcare" },
  { q: "Explain Agentic AI.", key: "agentic" }
];

const RESPONSES: Record<string, string> = {
  who: `Pintu Singh (Pintu Singh) is a Senior Data Engineer, Agentic AI Engineer, and Healthcare AI Specialist currently serving as a Data Engineer 3 at Komodo Health. 

Known professionally as Pintu, Pintu combines 5+ years of enterprise data engineering expertise (building pipelines processing 10B+ records and managing 12TB+ datasets) with state-of-the-art Generative AI frameworks. He is an alumnus of NIT Silchar, an ex-UnitedHealth Group (Optum) engineer, and a future startup founder dedicated to building autonomous, self-healing platforms.`,

  engine: `The AI Incident Diagnosis Engine is one of Pintu's headline innovations at Komodo Health. 

• **The Challenge:** Pipeline failures and server errors historically required manual, high-stress developer troubleshooting.
• **The AI Solution:** Pintu designed autonomous troubleshooting workflows utilizing **LangChain, LangGraph, Model Context Protocol (MCP), and Vector Databases**.
• **How It Works:** When an incident triggers, AI agents dynamically query log sources via MCP, run diagnostics, analyze recent code changes, match error patterns in a vector knowledge base, and draft root-cause analyses.
• **The Impact:** **90% reduction** in on-call manual interventions and **80% faster** root-cause analysis.`,

  tech: `Pintu's technical expertise spans data engineering, machine learning pipelines, and agentic AI systems:

• **Agentic AI & LLMs:** LangChain, LangGraph, OpenAI APIs, Model Context Protocol (MCP), Prompt Engineering, RAG Systems, Vector Databases.
• **Big Data & Pipelines:** Apache Spark, PySpark, Apache Kafka, Apache Airflow, Databricks, Snowflake, Azure Synapse, Azure Data Factory (ADF), ADLS.
• **Cloud & Platforms:** Azure, AWS, Docker, Kubernetes, FastAPI, PostgreSQL, and Enterprise Data Modeling.`,

  healthcare: `Pintu has a deep focus on healthcare technologies, building secure, high-throughput systems that comply with regulatory requirements:

• **Komodo Health (June 2025 – Present):** Developing resilient APIs and ingestion engines for large-scale clinical/claims data, implementing AI-driven system diagnostics to guarantee platform stability.
• **UnitedHealth Group / Optum (2021 – 2025):** Optimized critical Spark pipelines processing over **10 Billion records**, managed a massive **12TB healthcare dataset**, achieved **99.6% data quality standards**, and led cloud migrations to Azure.`,

  agentic: `Agentic AI represents a paradigm shift where AI models act as autonomous agents rather than static chatbots. 

Pintu builds systems where models can:
1. **Reason:** Break complex operational goals into sequences of logical actions.
2. **Use Tools:** Dynamically run SQL queries, inspect server logs via MCP (Model Context Protocol), and consult internal wikis.
3. **Collaborate:** Use multi-agent state machines (via LangGraph) to delegate tasks (e.g., one agent parses logs while another queries vector DBs).
4. **Self-Correct:** Re-attempt queries if an initial tool output fails, automating complex, multi-step engineering investigations.`,

  default: `I'm Pintu's AI assistant! I'd love to tell you more. You can ask me about his:
• **Experience** (Komodo Health, Optum / UnitedHealth Group)
• **Key Projects** (AI Incident Engine, 12TB Spark Platform)
• **Research** (His published paper on Abstractive Text Summarization)
• **Skills** (LangGraph, Databricks, PySpark, Azure)
• **Contact Information** (To hire or book a consult!)

Or, click one of the suggested questions below!`
};

// Simple keyword matching for typed inputs
const getResponseForQuery = (query: string): string => {
  const q = query.toLowerCase();
  if (q.includes("who") || q.includes("Pintu") || q.includes("pintu") || q.includes("profile") || q.includes("background") || q.includes("real name")) {
    return RESPONSES.who;
  }
  if (q.includes("engine") || q.includes("incident") || q.includes("troubleshoot") || q.includes("diagnosis") || q.includes("monitoring")) {
    return RESPONSES.engine;
  }
  if (q.includes("tech") || q.includes("skills") || q.includes("python") || q.includes("spark") || q.includes("stack") || q.includes("language")) {
    return RESPONSES.tech;
  }
  if (q.includes("health") || q.includes("optum") || q.includes("united") || q.includes("komodo") || q.includes("clinical")) {
    return RESPONSES.healthcare;
  }
  if (q.includes("agent") || q.includes("langgraph") || q.includes("langchain") || q.includes("mcp")) {
    return RESPONSES.agentic;
  }
  if (q.includes("publication") || q.includes("paper") || q.includes("research") || q.includes("summarization") || q.includes("thesis")) {
    return `Pintu is the author of the research publication: **"Abstractive Text Summarization Approaches with Analysis of Evaluation Techniques"**.

His research reviews modern LLM-based abstractive summarization, analyzes automatic metrics (like ROUGE, BLEU, BERTScore), and explores how qualitative human preferences align with automated evaluations. It highlights his early foundation in advanced NLP and LLM technologies.`;
  }
  if (q.includes("education") || q.includes("nit") || q.includes("silchar") || q.includes("college") || q.includes("degree")) {
    return "Pintu completed his Bachelor of Technology (B.Tech) from the **National Institute of Technology (NIT), Silchar**, a premier engineering institute in India. This academic foundation paved his path into distributed systems and advanced software engineering.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("linkedin") || q.includes("github") || q.includes("hire") || q.includes("consult") || q.includes("phone") || q.includes("number") || q.includes("call")) {
    return `You can connect with Pintu through multiple channels:
• **Email:** pintu7414@gmail.com
• **Phone:** +91-9079187620
• **LinkedIn:** linkedin.com/in/Pintu02
• **GitHub:** github.com/Pintusingh (Open source contributions)
• **Consultation:** You can use the "Book a Consultation" button in the Hero section to schedule a deep-dive call on Data Platform Architecture or AI Integrations.`;
  }
  return RESPONSES.default;
};

export function InteractiveChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I'm Pintu's AI Assistant. Ask me anything about his skills, incident diagnosis engine, healthcare background, or engineering career.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string, responseKey?: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      let botResponse = "";
      if (responseKey && RESPONSES[responseKey]) {
        botResponse = RESPONSES[responseKey];
      } else {
        botResponse = getResponseForQuery(text);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botResponse,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-lg hover:shadow-violet-500/20 transition-all duration-300 border border-violet-400/30"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-2"
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm font-semibold tracking-wide hidden md:inline-block">Ask Pintu's AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[90vw] md:w-[420px] h-[550px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-slate-950/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    Pintu's Assistant
                    <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                  </h3>
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online • Agentic AI Engine v1.0
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-300 border border-white/5"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none font-medium"
                        : "bg-white/5 text-slate-100 border border-white/5 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-slate-300">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 text-slate-400 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 border-t border-white/10 bg-slate-950/30 overflow-x-auto flex gap-2 no-scrollbar scroll-smooth">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p.q, p.key)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/5 text-slate-300 hover:text-white transition-all whitespace-nowrap"
                >
                  {p.q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-white/10 bg-slate-950/60 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Spark, LangGraph, Optum..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-500 text-white transition-all border border-violet-400/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
