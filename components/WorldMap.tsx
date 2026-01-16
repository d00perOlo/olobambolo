import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const WorldMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run if wrapper is available
    if (!wrapperRef.current || !svgRef.current) return;

    const width = wrapperRef.current.clientWidth;
    const height = wrapperRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "transparent");

    // Clear previous renders
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Projection setup
    const projection = d3.geoMercator()
      .scale(width / 6.5)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Mock heat data for countries (ISO 3166-1 numeric or id matches)
    // US, RU, CN, DE, etc.
    const heatData: Record<string, number> = {
      "840": 0.9, // USA
      "643": 0.7, // Russia
      "276": 0.8, // Germany
      "356": 0.6, // India
      "156": 0.5, // China
      "036": 0.4, // Australia
      "124": 0.3, // Canada
      "076": 0.6, // Brazil
    };

    // Color Scale
    const colorScale = d3.scaleLinear<string>()
      .domain([0, 1])
      .range(["#1e293b", "#ef4444"]); // Slate to Red

    // Load Data
    // Using a reliable CDN for World TopoJSON
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((data: any) => {
        setLoading(false);
        const countries = topojson.feature(data, data.objects.countries);

        g.selectAll("path")
          .data((countries as any).features)
          .enter()
          .append("path")
          .attr("d", path as any)
          .attr("fill", (d: any) => {
             // Randomize slightly for the "cyber" feel if no data
             const val = heatData[d.id] || Math.random() * 0.1; 
             return colorScale(val);
          })
          .attr("stroke", "#0f172a")
          .attr("stroke-width", 0.5)
          .attr("class", "hover:opacity-80 transition-opacity cursor-pointer")
          .on("mouseover", function(event, d) {
             d3.select(this).attr("stroke", "#14b8a6").attr("stroke-width", 1);
          })
          .on("mouseout", function(event, d) {
             d3.select(this).attr("stroke", "#0f172a").attr("stroke-width", 0.5);
          });
          
      })
      .catch(err => {
        console.error("Error loading map data", err);
        setLoading(false);
      });

  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-cyber-teal animate-pulse">
          <span className="font-mono text-xs">ŁADOWANIE MAPY...</span>
        </div>
      )}
      <svg ref={svgRef} className="w-full h-full"></svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-cyber-900/80 p-2 rounded border border-slate-700 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] text-slate-400">0</span>
          <div className="w-32 h-2 bg-gradient-to-r from-slate-800 to-red-500 rounded-sm"></div>
          <span className="text-[10px] text-slate-400">&gt; 2000</span>
        </div>
        <div className="flex justify-between w-full px-4">
             <div className="w-[1px] h-1 bg-slate-500"></div>
             <div className="w-[1px] h-1 bg-slate-500"></div>
             <div className="w-[1px] h-1 bg-slate-500"></div>
             <div className="w-[1px] h-1 bg-slate-500"></div>
        </div>
        <div className="flex justify-between w-full px-2 text-[9px] text-slate-500 font-mono mt-1">
            <span>1</span>
            <span>100</span>
            <span>500</span>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-10 right-4 flex flex-col gap-1">
        <button className="p-1.5 bg-cyber-800 border border-slate-700 text-slate-400 hover:text-white rounded shadow-sm hover:bg-slate-700 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
        <button className="p-1.5 bg-cyber-800 border border-slate-700 text-slate-400 hover:text-white rounded shadow-sm hover:bg-slate-700 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
        </button>
         <button className="p-1.5 bg-cyber-800 border border-slate-700 text-slate-400 hover:text-white rounded shadow-sm hover:bg-slate-700 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
        </button>
      </div>

    </div>
  );
};

export default WorldMap;
