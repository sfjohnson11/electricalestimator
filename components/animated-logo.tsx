import type React from "react"

const AnimatedLogo: React.FC = () => {
  return (
    <div className="w-64 h-64 mx-auto">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer circle */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" strokeWidth="2" className="animate-pulse" />

        {/* Inner gear */}
        <g className="animate-spin" style={{ transformOrigin: "center", animationDuration: "10s" }}>
          {[0, 60, 120, 180, 240, 300].map((angle, index) => (
            <rect key={index} x="48" y="10" width="4" height="15" fill="#3B82F6" transform={`rotate(${angle} 50 50)`} />
          ))}
        </g>

        {/* Lightning bolt */}
        <path
          d="M50 20 L60 50 L40 50 L50 80"
          fill="none"
          stroke="#FCD34D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />

        {/* Dollar sign */}
        <text
          x="50"
          y="55"
          fontSize="24"
          fontWeight="bold"
          fill="#10B981"
          textAnchor="middle"
          dominantBaseline="middle"
          className="animate-bounce"
        >
          $
        </text>

        {/* Text */}
        <text x="50" y="95" fontSize="10" fontWeight="bold" fill="#3B82F6" textAnchor="middle">
          E-Deck Estimator
        </text>
      </svg>
    </div>
  )
}

export default AnimatedLogo
