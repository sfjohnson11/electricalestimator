export interface MaterialCategory {
  id: string
  name: string
  materials: Material[]
}

export interface Material {
  id: string
  name: string
  unit: "EA" | "LF" | "FT" | "BOX" | "ROLL"
  manhourUnit: number
}

export const materialCategories: MaterialCategory[] = [
  {
    id: "wire-and-conduit",
    name: "Wire & Conduit",
    materials: [
      { id: "mc-cable-power", name: "MC Cable - Power Branch Circuits", unit: "LF", manhourUnit: 0.01 },
      { id: "mc-cable-lighting", name: "MC Cable - Lighting Branch Circuits", unit: "LF", manhourUnit: 0.01 },
      { id: "thhn-12", name: "#12 THHN - Home Runs", unit: "LF", manhourUnit: 0.008 },
      { id: "thhn-1", name: "#1 THHN", unit: "LF", manhourUnit: 0.014 },
      { id: "thhn-8", name: "#8 THHN", unit: "LF", manhourUnit: 0.01 },
      // Add more wire and conduit materials here
    ],
  },
  {
    id: "conduit",
    name: "Conduit",
    materials: [
      { id: "emt-5", name: '5" EMT Conduit', unit: "LF", manhourUnit: 0.27 },
      { id: "emt-1-5", name: '1-1/2" EMT Conduit', unit: "LF", manhourUnit: 0.07 },
      { id: "emt-1", name: '1" EMT Conduit', unit: "LF", manhourUnit: 0.05 },
      { id: "pvc-2", name: '2" PVC Conduit', unit: "LF", manhourUnit: 0.07 },
      { id: "pvc-4", name: '4" PVC Conduit', unit: "LF", manhourUnit: 0.17 },
      // Add more conduit materials here
    ],
  },
  {
    id: "devices",
    name: "Devices & Outlets",
    materials: [
      { id: "duplex", name: "Duplex Receptacle", unit: "EA", manhourUnit: 0.77 },
      { id: "duplex-switched", name: "Duplex Receptacle - Switched", unit: "EA", manhourUnit: 0.77 },
      { id: "quad-floor-box", name: "Quad Floor Box", unit: "EA", manhourUnit: 1.25 },
      { id: "special-receptacle-nema-15-20r", name: "Special Receptacle (NEMA 15/20R)", unit: "EA", manhourUnit: 0.77 },
      { id: "gfci", name: "GFCI Receptacle", unit: "EA", manhourUnit: 0.77 },
      // Add more devices and outlets here
    ],
  },
  {
    id: "switchgear",
    name: "Switchgear",
    materials: [
      { id: "panel-225kva", name: "225KVA Transformer", unit: "EA", manhourUnit: 15 },
      { id: "panel-800-3", name: "800/3 - Site", unit: "EA", manhourUnit: 12 },
      { id: "panel-800-ct", name: "800 CT Cabinet - Site", unit: "EA", manhourUnit: 5 },
      { id: "weatherhead", name: "Weatherhead", unit: "EA", manhourUnit: 1.5 },
      { id: "breaker-20-1", name: "20/1 Breaker", unit: "EA", manhourUnit: 0.1 },
      // Add more switchgear items here
    ],
  },
  {
    id: "lighting",
    name: "Lighting",
    materials: [
      { id: "f1a", name: "F1A Light Fixture", unit: "EA", manhourUnit: 1 },
      { id: "f1a-em", name: "F1A-EM Emergency Light Fixture", unit: "EA", manhourUnit: 1 },
      { id: "ewm2", name: "EWM2 Light Fixture", unit: "EA", manhourUnit: 1 },
      { id: "x1-p", name: "X1/P Light Fixture", unit: "EA", manhourUnit: 1 },
      { id: "f9a", name: "F9A Light Fixture", unit: "EA", manhourUnit: 1 },
      // Add more lighting fixtures here
    ],
  },
  {
    id: "additional-items",
    name: "Additional Items",
    materials: [
      { id: "lift", name: "Lift", unit: "EA", manhourUnit: 0 },
      { id: "connect-security-panel", name: "Connect Security Panel", unit: "EA", manhourUnit: 2 },
      { id: "connect-power-pole", name: "Connect Power Pole", unit: "EA", manhourUnit: 1 },
      { id: "connect-freezer-cooler", name: "Connect Freezer/Cooler", unit: "EA", manhourUnit: 10 },
      { id: "connect-hood", name: "Connect Hood", unit: "EA", manhourUnit: 2 },
      // Add more additional items here
    ],
  },
  {
    id: "panels",
    name: "Panels & Load Centers",
    materials: [
      { id: "panel-100a", name: "100A Main Panel", unit: "EA", manhourUnit: 4.5 },
      { id: "panel-200a", name: "200A Main Panel", unit: "EA", manhourUnit: 6 },
      { id: "panel-400a", name: "400A Main Panel", unit: "EA", manhourUnit: 8 },
      { id: "lc-100a", name: "100A Load Center", unit: "EA", manhourUnit: 3 },
      { id: "lc-200a", name: "200A Load Center", unit: "EA", manhourUnit: 4 },
    ],
  },
  {
    id: "fixtures",
    name: "Fixtures",
    materials: [
      { id: "light-recessed", name: "Recessed Light", unit: "EA", manhourUnit: 1 },
      { id: "light-surface", name: "Surface Mount Light", unit: "EA", manhourUnit: 1.25 },
      { id: "light-pendant", name: "Pendant Light", unit: "EA", manhourUnit: 1.5 },
      { id: "light-track", name: "Track Light", unit: "EA", manhourUnit: 2 },
      { id: "light-flood", name: "Flood Light", unit: "EA", manhourUnit: 1.5 },
    ],
  },
  {
    id: "boxes",
    name: "Boxes & Enclosures",
    materials: [
      { id: "box-device", name: "Device Box", unit: "EA", manhourUnit: 0.25 },
      { id: "box-4square", name: '4" Square Box', unit: "EA", manhourUnit: 0.3 },
      { id: "box-4-11", name: '4-11/16" Square Box', unit: "EA", manhourUnit: 0.35 },
      { id: "box-junct", name: "Junction Box", unit: "EA", manhourUnit: 0.5 },
      { id: "box-pull", name: "Pull Box", unit: "EA", manhourUnit: 1 },
    ],
  },
  {
    id: "wire",
    name: "Wire",
    materials: [
      { id: "thhn-14", name: "#14 THHN Copper Wire", unit: "LF", manhourUnit: 0.005 },
      { id: "thhn-12", name: "#12 THHN Copper Wire", unit: "LF", manhourUnit: 0.006 },
      { id: "thhn-10", name: "#10 THHN Copper Wire", unit: "LF", manhourUnit: 0.007 },
      { id: "thhn-8", name: "#8 THHN Copper Wire", unit: "LF", manhourUnit: 0.008 },
      { id: "thhn-6", name: "#6 THHN Copper Wire", unit: "LF", manhourUnit: 0.01 },
      { id: "thhn-4", name: "#4 THHN Copper Wire", unit: "LF", manhourUnit: 0.012 },
      { id: "thhn-2", name: "#2 THHN Copper Wire", unit: "LF", manhourUnit: 0.014 },
      { id: "thhn-1", name: "#1 THHN Copper Wire", unit: "LF", manhourUnit: 0.016 },
    ],
  },
]

export function getMaterial(materialId: string): Material | undefined {
  for (const category of materialCategories) {
    const material = category.materials.find((m) => m.id === materialId)
    if (material) return material
  }
  return undefined
}
