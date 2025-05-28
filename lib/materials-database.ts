export interface Material {
  id: string
  category: string
  name: string
  unit: string
  manhourUnit: number
}

export const materialsDatabase: Material[] = [
  // Conduit
  { id: "conduit-emt-half", category: "Conduit", name: '1/2" EMT Conduit', unit: "LF", manhourUnit: 0.083 },
  { id: "conduit-emt-three-quarter", category: "Conduit", name: '3/4" EMT Conduit', unit: "LF", manhourUnit: 0.094 },
  { id: "conduit-emt-one", category: "Conduit", name: '1" EMT Conduit', unit: "LF", manhourUnit: 0.108 },
  { id: "conduit-emt-one-quarter", category: "Conduit", name: '1-1/4" EMT Conduit', unit: "LF", manhourUnit: 0.12 },
  { id: "conduit-emt-one-half", category: "Conduit", name: '1-1/2" EMT Conduit', unit: "LF", manhourUnit: 0.133 },
  { id: "conduit-emt-two", category: "Conduit", name: '2" EMT Conduit', unit: "LF", manhourUnit: 0.157 },

  // Wire
  { id: "wire-thhn-14", category: "Wire", name: "#14 THHN Wire", unit: "LF", manhourUnit: 0.002 },
  { id: "wire-thhn-12", category: "Wire", name: "#12 THHN Wire", unit: "LF", manhourUnit: 0.002 },
  { id: "wire-thhn-10", category: "Wire", name: "#10 THHN Wire", unit: "LF", manhourUnit: 0.002 },
  { id: "wire-thhn-8", category: "Wire", name: "#8 THHN Wire", unit: "LF", manhourUnit: 0.003 },
  { id: "wire-thhn-6", category: "Wire", name: "#6 THHN Wire", unit: "LF", manhourUnit: 0.003 },
  { id: "wire-thhn-4", category: "Wire", name: "#4 THHN Wire", unit: "LF", manhourUnit: 0.004 },

  // Panels
  { id: "panel-100a", category: "Panels", name: "100A Panel", unit: "EA", manhourUnit: 8 },
  { id: "panel-200a", category: "Panels", name: "200A Panel", unit: "EA", manhourUnit: 12 },
  { id: "panel-400a", category: "Panels", name: "400A Panel", unit: "EA", manhourUnit: 16 },

  // Switches
  { id: "switch-single-pole", category: "Switches", name: "Single Pole Switch", unit: "EA", manhourUnit: 0.5 },
  { id: "switch-three-way", category: "Switches", name: "Three Way Switch", unit: "EA", manhourUnit: 0.75 },
  { id: "switch-four-way", category: "Switches", name: "Four Way Switch", unit: "EA", manhourUnit: 1 },

  // Outlets
  { id: "outlet-standard", category: "Outlets", name: "Standard Outlet", unit: "EA", manhourUnit: 0.5 },
  { id: "outlet-gfci", category: "Outlets", name: "GFCI Outlet", unit: "EA", manhourUnit: 0.75 },
  { id: "outlet-20a", category: "Outlets", name: "20A Outlet", unit: "EA", manhourUnit: 0.6 },

  // Light Fixtures
  { id: "light-standard", category: "Light Fixtures", name: "Standard Light Fixture", unit: "EA", manhourUnit: 1 },
  { id: "light-recessed", category: "Light Fixtures", name: "Recessed Light Fixture", unit: "EA", manhourUnit: 1.5 },
  {
    id: "light-fluorescent",
    category: "Light Fixtures",
    name: "Fluorescent Light Fixture",
    unit: "EA",
    manhourUnit: 2,
  },

  // Add the new circuit breakers
  {
    id: "breaker-1p-10a",
    category: "Circuit Breakers",
    name: "1 Pole 10A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-15a",
    category: "Circuit Breakers",
    name: "1 Pole 15A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-20a",
    category: "Circuit Breakers",
    name: "1 Pole 20A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-25a",
    category: "Circuit Breakers",
    name: "1 Pole 25A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-30a",
    category: "Circuit Breakers",
    name: "1 Pole 30A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-35a",
    category: "Circuit Breakers",
    name: "1 Pole 35A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-40a",
    category: "Circuit Breakers",
    name: "1 Pole 40A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-45a",
    category: "Circuit Breakers",
    name: "1 Pole 45A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-50a",
    category: "Circuit Breakers",
    name: "1 Pole 50A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-60a",
    category: "Circuit Breakers",
    name: "1 Pole 60A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
  {
    id: "breaker-1p-70a",
    category: "Circuit Breakers",
    name: "1 Pole 70A Circuit Breaker",
    unit: "EA",
    manhourUnit: 0.1,
  },
]

export const materialCategories = Array.from(new Set(materialsDatabase.map((m) => m.category)))
