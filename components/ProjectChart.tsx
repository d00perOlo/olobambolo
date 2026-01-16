import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CHART_DATA } from '../constants';

const ProjectChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{x: number, y: number, text: string} | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !svgRef.current) return;

    const wrapper = wrapperRef.current;
    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;
    const margin = { top: 40, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "transparent");

    svg.selectAll("*").remove();

    const g = svg.append("g");
    
    // Gradient definitions
    const defs = svg.append("defs");
    
    // Gradient for Completed Line area (Neon Green)
    const gradient = defs.append("linearGradient")
      .attr("id", "completed-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
      
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#c2fd12") // Neon Green
      .attr("stop-opacity", 0.2);
      
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#c2fd12")
      .attr("stop-opacity", 0);

    // Scales
    const x = d3.scaleTime()
      .domain(d3.extent(CHART_DATA, d => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(CHART_DATA, d => d.scope) as number * 1.1])
      .range([height - margin.bottom, margin.top]);

    // Grid lines
    const yAxisGrid = d3.axisLeft(y)
      .tickSize(-(width - margin.left - margin.right))
      .ticks(5)
      .tickFormat(() => '');

    g.append("g")
      .attr("class", "grid-lines opacity-20")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxisGrid)
      .selectAll("line")
      .attr("stroke", "#333"); // Darker grid lines

    // Generators
    const area = d3.area<any>()
      .curve(d3.curveMonotoneX)
      .x(d => x(d.date))
      .y0(height - margin.bottom)
      .y1(d => y(d.completed));

    const lineCompleted = d3.line<any>()
      .curve(d3.curveMonotoneX)
      .x(d => x(d.date))
      .y(d => y(d.completed));

    const lineScope = d3.line<any>()
      .curve(d3.curveStepAfter)
      .x(d => x(d.date))
      .y(d => y(d.scope));

    // Draw Areas/Lines
    // Scope Line (Dashed)
    const scopePath = g.append("path")
      .datum(CHART_DATA)
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 4")
      .attr("d", lineScope);

    // Completed Area
    g.append("path")
      .datum(CHART_DATA)
      .attr("fill", "url(#completed-gradient)")
      .attr("d", area);

    // Completed Line (Neon)
    const path = g.append("path")
      .datum(CHART_DATA)
      .attr("fill", "none")
      .attr("stroke", "#c2fd12")
      .attr("stroke-width", 1.5)
      .attr("d", lineCompleted);

    // Animation for line
    const totalLength = path.node()?.getTotalLength() || 0;
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);

    // Axes
    const xAxis = d3.axisBottom(x)
        .ticks(width > 600 ? 10 : 5)
        .tickFormat(d3.timeFormat("%d.%m") as any);
        
    const xAxisGroup = g.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);
      
    xAxisGroup.select(".domain").attr("stroke", "#333");
    xAxisGroup.selectAll("line").attr("stroke", "#333");
    xAxisGroup.selectAll("text").attr("fill", "#8a8a8a").attr("font-family", "JetBrains Mono").attr("font-size", "10px");

    // Interaction overlay
    const overlay = g.append("rect")
      .attr("class", "overlay")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("fill", "transparent")
      .on("mousemove", function(event) {
        const mouseX = d3.pointer(event)[0];
        const dateX = x.invert(mouseX);
        
        // Find closest data point
        const bisect = d3.bisector((d: any) => d.date).left;
        const i = bisect(CHART_DATA, dateX, 1);
        const d0 = CHART_DATA[i - 1];
        const d1 = CHART_DATA[i];
        const d = dateX.getTime() - d0.date.getTime() > d1.date.getTime() - dateX.getTime() ? d1 : d0;

        // Draw vertical indicator line
        g.selectAll(".focus-line").remove();
        g.append("line")
            .attr("class", "focus-line")
            .attr("x1", x(d.date))
            .attr("x2", x(d.date))
            .attr("y1", margin.top)
            .attr("y2", height - margin.bottom)
            .attr("stroke", "#555")
            .attr("stroke-dasharray", "2 2");
            
        g.selectAll(".focus-circle").remove();
        g.append("circle")
            .attr("class", "focus-circle")
            .attr("cx", x(d.date))
            .attr("cy", y(d.completed))
            .attr("r", 3)
            .attr("fill", "#000")
            .attr("stroke", "#c2fd12")
            .attr("stroke-width", 2);

        setTooltip({
            x: event.clientX,
            y: event.clientY,
            text: `DATE: ${d3.timeFormat("%Y-%m-%d")(d.date)}\nACTUAL: ${Math.round(d.completed)}\nSCOPE : ${d.scope}`
        });
      })
      .on("mouseout", () => {
        g.selectAll(".focus-line").remove();
        g.selectAll(".focus-circle").remove();
        setTooltip(null);
      });

  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full relative overflow-hidden bg-[#050505] border border-[#1f1f1f]">
      <div className="absolute top-0 left-0 px-3 py-1 bg-[#050505] border-b border-r border-[#1f1f1f] text-cyber-teal text-[10px] tracking-[2px] uppercase z-10">
          Velocity Chart
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyber-teal"></div>
              <span className="text-cyber-muted">COMPLETED</span>
          </div>
          <div className="flex items-center gap-2">
              <div className="w-2 h-2 border border-dashed border-[#555]"></div>
              <span className="text-[#555]">SCOPE</span>
          </div>
      </div>
      
      <svg ref={svgRef} className="w-full h-full"></svg>
      
      {tooltip && (
        <div 
            className="fixed z-50 bg-[#000] border border-cyber-teal p-2 shadow-lg text-[10px] font-mono pointer-events-none"
            style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
        >
            <pre className="text-cyber-text whitespace-pre-wrap">{tooltip.text}</pre>
        </div>
      )}
    </div>
  );
};

export default ProjectChart;