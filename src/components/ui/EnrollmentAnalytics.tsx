'use client';

import React, { useState } from 'react';

interface EnrollmentData {
  label: string;
  value: number;
  color: string;
}

const EnrollmentAnalytics: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const data: EnrollmentData[] = [
    { label: 'Undergraduate', value: 7034, color: '#026892' },
    { label: 'Postgraduate', value: 3210, color: '#10b981' },
    { label: 'Diploma', value: 2103, color: '#f59e0b' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate cumulative angles for SVG
  let cumulativeAngle = -90; // Start from top
  const segments = data.map((item) => {
    const angle = (item.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const radius = 80;
    const innerRadius = 55;

    const x1 = 100 + radius * Math.cos(startRad);
    const y1 = 100 + radius * Math.sin(startRad);
    const x2 = 100 + radius * Math.cos(endRad);
    const y2 = 100 + radius * Math.sin(endRad);

    const ix1 = 100 + innerRadius * Math.cos(startRad);
    const iy1 = 100 + innerRadius * Math.sin(startRad);
    const ix2 = 100 + innerRadius * Math.cos(endRad);
    const iy2 = 100 + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;

    // Calculate label position
    const labelAngle = (startAngle + endAngle) / 2;
    const labelRad = (labelAngle * Math.PI) / 180;
    const labelRadius = radius + 20;
    const labelX = 100 + labelRadius * Math.cos(labelRad);
    const labelY = 100 + labelRadius * Math.sin(labelRad);

    return { path, color: item.color, value: item.value, labelX, labelY };
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-base font-bold text-gray-900">Enrollment Analytics</h2>
      </div>

      {/* Chart Container */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="mb-3"
        >
          {segments.map((segment, index) => (
            <g
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer transition-opacity"
              style={{
                opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
              }}
            >
              <path
                d={segment.path}
                fill={segment.color}
                style={{
                  filter:
                    hoveredIndex === index
                      ? 'drop-shadow(0 4px 12px rgba(2, 104, 146, 0.3))'
                      : 'none',
                  transition: 'all 0.3s ease',
                }}
              />
              {/* Value labels */}
              <text
                x={segment.labelX}
                y={segment.labelY}
                textAnchor="middle"
                dy="0.3em"
                className="text-xs font-bold"
                style={{
                  fill: segment.color,
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {segment.value}
              </text>
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-lg z-20">
            <div className="text-sm font-semibold text-gray-900">
              {data[hoveredIndex].label} : {data[hoveredIndex].value}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-3 mb-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 cursor-pointer transition-opacity"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs font-medium text-gray-700">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollmentAnalytics;
