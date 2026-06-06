"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  type: "ai" | "data" | "health" | "normal";
  pulse: number;
  pulseSpeed: number;
}

interface Pipeline {
  from: number;
  to: number;
  progress: number;
  speed: number;
  size: number;
  color: string;
}

export function CanvasNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes: Node[] = [];
    const nodeCount = Math.min(100, Math.floor((width * height) / 15000));
    
    const colors = {
      ai: "rgba(147, 51, 234, 0.7)",      // Purple
      data: "rgba(59, 130, 246, 0.7)",    // Cyber blue
      health: "rgba(16, 185, 129, 0.7)",  // Emerald green
      normal: "rgba(148, 163, 184, 0.35)" // Slate/gray
    };

    const types: ("ai" | "data" | "health" | "normal")[] = ["ai", "data", "health", "normal"];

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + (type !== "normal" ? 2.5 : 1),
        color: colors[type],
        type,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    // Initialize data pipeline pulses between nodes
    const pipelines: Pipeline[] = [];
    const maxPipelines = Math.floor(nodeCount / 2);
    
    const findCloseNode = (idx: number): number => {
      let minDist = Infinity;
      let closeIdx = -1;
      const nodeA = nodes[idx];
      for (let j = 0; j < nodes.length; j++) {
        if (idx === j) continue;
        const nodeB = nodes[j];
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dist = dx * dx + dy * dy;
        if (dist < minDist && dist < 250000) { // under 500px distance
          minDist = dist;
          closeIdx = j;
        }
      }
      return closeIdx;
    };

    for (let i = 0; i < maxPipelines; i++) {
      const from = Math.floor(Math.random() * nodes.length);
      const to = findCloseNode(from);
      if (to !== -1 && from !== to) {
        pipelines.push({
          from,
          to,
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.004,
          size: 1.5 + Math.random() * 2,
          color: nodes[from].color,
        });
      }
    }

    // Handle resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw ambient grid (subtle background structure)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connection lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = 180 * 180;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            let alpha = (1 - dist / 180) * 0.15;
            
            // Highlight connections near cursor
            if (mouseRef.current.active) {
              const mDx = (nodeA.x + nodeB.x) / 2 - mouseRef.current.x;
              const mDy = (nodeA.y + nodeB.y) / 2 - mouseRef.current.y;
              const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
              if (mDist < mouseRef.current.radius) {
                alpha += (1 - mDist / mouseRef.current.radius) * 0.25;
              }
            }

            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Clamp inside bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Mouse interaction (repel slightly and highlight)
        if (mouseRef.current.active) {
          const dx = node.x - mouseRef.current.x;
          const dy = node.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            // Push away
            node.x += (dx / dist) * force * 0.5;
            node.y += (dy / dist) * force * 0.5;
          }
        }

        // Animate pulsing size
        node.pulse += node.pulseSpeed;
        const pulseFactor = Math.sin(node.pulse) * 0.5 + 0.5;
        const radius = node.radius + (node.type !== "normal" ? pulseFactor * 1.5 : 0);

        // Draw glow
        if (node.type !== "normal") {
          const glowGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            radius * 4
          );
          glowGrad.addColorStop(0, node.color.replace("0.7", "0.25"));
          glowGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw core node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw data pipeline pulses (the flowing packages)
      pipelines.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          // Randomize endpoint to keep graph dynamic
          p.from = Math.floor(Math.random() * nodes.length);
          p.to = findCloseNode(p.from);
          if (p.to === -1 || p.from === p.to) {
            p.to = (p.from + 1) % nodes.length;
          }
          p.color = nodes[p.from].color;
        }

        const nodeFrom = nodes[p.from];
        const nodeTo = nodes[p.to];
        if (nodeFrom && nodeTo) {
          const px = nodeFrom.x + (nodeTo.x - nodeFrom.x) * p.progress;
          const py = nodeFrom.y + (nodeTo.y - nodeFrom.y) * p.progress;

          // Draw the signal pulse
          const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
          pulseGrad.addColorStop(0, p.color.replace("0.7", "0.9"));
          pulseGrad.addColorStop(0.5, p.color.replace("0.7", "0.3"));
          pulseGrad.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = pulseGrad;
          ctx.beginPath();
          ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(px, py, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 block bg-slate-950"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
