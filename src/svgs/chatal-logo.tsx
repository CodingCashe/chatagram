// import type React from "react"

// interface ChatalLogoProps {
//   width?: number
//   height?: number
//   color?: string
// }

// const ChatalLogo: React.FC<ChatalLogoProps> = ({ width = 100, height = 100, color = "#0066cc" }) => {
//   return (
//     <div>
//     <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect width="100" height="100" rx="10" fill={color} />
//       <path d="M20 30H80V70L60 50H20V30Z" fill="white" stroke="white" strokeWidth="2" />
//       <circle cx="35" cy="50" r="5" fill={color} />
//       <circle cx="50" cy="50" r="5" fill={color} />
//       <circle cx="65" cy="50" r="5" fill={color} />

//       <text
//           x="110"
//           y="50"
//           fontFamily="Arial, sans-serif"
//           fontSize="28"
//           fontWeight="bold"
//           fill="#405DE6"
//           filter="url(#glow)"
//         >
//           Chatal
//         </text>

//         {/* Tagline */}
//         <text x="110" y="75" fontFamily="Arial, sans-serif" fontSize="14" fill="#833AB4">
//           Engage.Automate.Grow
//         </text>
//     </svg>
//     </div>
//   )
// }

// export default ChatalLogo

import type React from "react";

interface ChatalLogoProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChatalLogo: React.FC<ChatalLogoProps> = ({
  width = 100,
  height = 100,
  color = "#3352CC",
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="10" fill={color} />
        <path
          d="M20 30H80V70L60 50H20V30Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="35" cy="50" r="5" fill={color} />
        <circle cx="50" cy="50" r="5" fill={color} />
        <circle cx="65" cy="50" r="5" fill={color} />
      </svg>
      <div>
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#3352CC",
            margin: 0,
          }}
        >
          Chatal
        </p>
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            color: "#3352CC",
            margin: 0,
          }}
        >
          Engage. Automate. Grow
        </p>
      </div>
    </div>
  );
};

export default ChatalLogo;
