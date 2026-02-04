const DemotIcon = ({
  h = 100,
  w = 100,
}: { h?: number; w?: number } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 200 200"
      fill="white"
      strokeMiterlimit={10}
      style={{
        shapeRendering: 'geometricPrecision',
        fillRule: 'evenodd',
      }}
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="#FFD700"
        stroke="#FFD700"
        strokeWidth="4"
      />

      {/* Eyes */}
      <circle cx="70" cy="80" r="16" fill="#000000" />
      <circle cx="70" cy="80" r="8" fill="#FFFFFF" />
      <circle cx="130" cy="90" r="12" fill="#000000" />
      <circle cx="130" cy="90" r="4" fill="#ffffff" />

      {/* Mouth */}
      <path
        d="M60,140 Q100,100 140,140"
        stroke="#000000"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
export default DemotIcon
