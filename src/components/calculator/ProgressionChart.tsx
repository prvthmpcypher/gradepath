import React from 'react';
import { useGrade } from '../../context/GradeContext';
import { TrendingUp, BarChart2 } from 'lucide-react';

export const ProgressionChart: React.FC = () => {
  const { overall, activeScale, state } = useGrade();
  const semesterResults = overall.semesterResults.filter((r) => r.sgpa !== null);

  if (semesterResults.length < 1) {
    return null;
  }

  const maxScale = activeScale.maxScale || 10;
  const chartHeight = 160;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 25;

  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  // Generate SVG points
  const points = semesterResults.map((res, i) => {
    const x =
      semesterResults.length === 1
        ? chartWidth / 2
        : paddingX + (i / (semesterResults.length - 1)) * innerWidth;
    const sgpaVal = res.sgpa || 0;
    const y = paddingY + innerHeight - (sgpaVal / maxScale) * innerHeight;
    return { x, y, sgpa: sgpaVal, name: state.semesters[i]?.name || `Sem ${i + 1}`, credits: res.totalCredits };
  });

  const polylineStr = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="border border-gpline bg-paper p-5 mb-6 transition-colors">
      <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gpline">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gpblue" />
          <h3 className="font-serif font-bold text-lg text-ink m-0">SGPA Progression & Credit Trend</h3>
        </div>
        <span className="text-xs font-mono text-gpmuted">
          Scale: 0 – {maxScale}
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full max-w-2xl h-auto mx-auto block"
          style={{ minWidth: '320px' }}
        >
          {/* Background Grid Lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={chartWidth - paddingX}
            y2={paddingY}
            stroke="var(--line)"
            strokeDasharray="3,3"
          />
          <text
            x={paddingX - 8}
            y={paddingY + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--muted)"
            fontFamily="Geist Mono, monospace"
          >
            {maxScale}
          </text>

          <line
            x1={paddingX}
            y1={paddingY + innerHeight / 2}
            x2={chartWidth - paddingX}
            y2={paddingY + innerHeight / 2}
            stroke="var(--line)"
            strokeDasharray="3,3"
          />
          <text
            x={paddingX - 8}
            y={paddingY + innerHeight / 2 + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--muted)"
            fontFamily="Geist Mono, monospace"
          >
            {(maxScale / 2).toFixed(1)}
          </text>

          <line
            x1={paddingX}
            y1={chartHeight - paddingY}
            x2={chartWidth - paddingX}
            y2={chartHeight - paddingY}
            stroke="var(--line)"
          />
          <text
            x={paddingX - 8}
            y={chartHeight - paddingY + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--muted)"
            fontFamily="Geist Mono, monospace"
          >
            0
          </text>

          {/* Average CGPA reference line if available */}
          {overall.cgpa && (
            <>
              <line
                x1={paddingX}
                y1={paddingY + innerHeight - (overall.cgpa / maxScale) * innerHeight}
                x2={chartWidth - paddingX}
                y2={paddingY + innerHeight - (overall.cgpa / maxScale) * innerHeight}
                stroke="var(--gold)"
                strokeWidth="1.5"
                strokeDasharray="5,3"
              />
              <text
                x={chartWidth - paddingX + 6}
                y={paddingY + innerHeight - (overall.cgpa / maxScale) * innerHeight + 3}
                fontSize="10"
                fill="var(--gold)"
                fontWeight="bold"
                fontFamily="Geist Mono, monospace"
              >
                CGPA {overall.cgpa.toFixed(2)}
              </text>
            </>
          )}

          {/* Progression Line */}
          {points.length > 1 && (
            <polyline
              fill="none"
              stroke="var(--blue)"
              strokeWidth="2.5"
              points={polylineStr}
            />
          )}

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx} className="cursor-pointer group">
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="var(--blue)"
                stroke="var(--paper)"
                strokeWidth="2"
              />
              <text
                x={p.x}
                y={p.y - 9}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="var(--ink)"
                fontFamily="Geist Mono, monospace"
              >
                {p.sgpa.toFixed(2)}
              </text>
              <text
                x={p.x}
                y={chartHeight - paddingY + 16}
                textAnchor="middle"
                fontSize="10"
                fill="var(--muted)"
                fontFamily="Geist Mono, monospace"
              >
                {p.name.length > 8 ? `S${idx + 1}` : p.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Credit distribution pill summary */}
      <div className="mt-4 pt-3 border-t border-gpline/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-gpmuted">
          <BarChart2 className="w-3.5 h-3.5 text-gpblue" />
          <span>Total Credits Earned: <strong className="text-ink">{overall.totalCredits}</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-gpmuted">
            <span className="w-2.5 h-2.5 bg-gpblue inline-block"></span> SGPA
          </span>
          <span className="flex items-center gap-1 text-gpmuted">
            <span className="w-2.5 h-0.5 bg-gpgold inline-block"></span> Overall CGPA
          </span>
        </div>
      </div>
    </div>
  );
};
