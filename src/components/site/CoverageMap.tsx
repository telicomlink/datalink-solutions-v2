import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import worldTopo from "world-atlas/countries-110m.json";
import type { Facility } from "@/lib/site-data";

const GEO_STYLE = {
  default: { fill: "var(--tl-map-land)", stroke: "var(--tl-map-border)", strokeWidth: 0.5, outline: "none" },
  hover:   { fill: "var(--tl-map-land)", stroke: "var(--tl-map-border)", strokeWidth: 0.5, outline: "none" },
  pressed: { fill: "var(--tl-map-land)", stroke: "var(--tl-map-border)", strokeWidth: 0.5, outline: "none" },
};

const LABEL_CONFIG: Record<string, { anchor: "start" | "middle" | "end"; dx: number; dy: number }> = {
  Paris:         { anchor: "start",  dx: 8,  dy: -6 },
  Marseille:     { anchor: "start",  dx: 8,  dy: 5  },
  Frankfurt:     { anchor: "end",    dx: -8, dy: -6 },
  Amsterdam:     { anchor: "end",    dx: -8, dy: 5  },
  Bangalore:     { anchor: "end",    dx: -8, dy: -6 },
  Visakhapatnam: { anchor: "start",  dx: 8,  dy: -6 },
  Jakarta:       { anchor: "start",  dx: 8,  dy: 5  },
  Mumbai:        { anchor: "end",    dx: -8, dy: 5  },
  Singapore:     { anchor: "start",  dx: 8,  dy: -6 },
};

export function CoverageMap({
  facilities,
  center,
  zoom,
}: {
  facilities: Facility[];
  center: [number, number];
  zoom: number;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[var(--tl-r-md)] border border-border" style={{ background: "var(--tl-map-bg)" }}>
      <ComposableMap
        projectionConfig={{ center, scale: 155 * zoom }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={worldTopo}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} style={GEO_STYLE} />
            ))
          }
        </Geographies>

        {facilities.map((f) => {
          const cfg = LABEL_CONFIG[f.city] ?? { anchor: "middle", dx: 0, dy: -8 };
          return (
            <Marker key={f.city} coordinates={f.coords}>
              <circle r={6} fill="var(--tl-live)" opacity={0.15}>
                <animate attributeName="r" values="4;9;4" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle r={5} fill="var(--tl-live)" stroke="var(--tl-map-bg)" strokeWidth={1.5} />
              <text
                textAnchor={cfg.anchor}
                dx={cfg.dx}
                dy={cfg.dy}
                style={{
                  fontFamily: "var(--tl-font-mono, monospace)",
                  fontSize: 11,
                  fill: "var(--tl-map-bg)",
                  stroke: "var(--tl-map-bg)",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  pointerEvents: "none",
                  userSelect: "none",
                  fontWeight: 700,
                }}
              >
                {f.city}
              </text>
              <text
                textAnchor={cfg.anchor}
                dx={cfg.dx}
                dy={cfg.dy}
                style={{
                  fontFamily: "var(--tl-font-mono, monospace)",
                  fontSize: 11,
                  fill: "var(--tl-map-label)",
                  pointerEvents: "none",
                  userSelect: "none",
                  fontWeight: 700,
                }}
              >
                {f.city}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
