type Props = {
  width?: number;
  height?: number;
};

function Beta() {
  return (
    <span className="absolute -top-2 -right-8">
      <span className="inline-flex items-center justify-center px-1 py-1 text-xs leading-none text-black bg-secondary rounded-md">
        beta
      </span>
    </span>
  );
}

export default function Logo({ width = 186, height = 30 }: Props) {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        <text
          style={{
            fill: "#f9a31a",
            fontSize: "34px",
            fontFamily: "Verdana, Verdana",
          }}
          transform="translate(0 26.92)"
        >
          <tspan x="0" y="0">
            turistik
          </tspan>
        </text>
        <text
          style={{
            fill: "#3397e6",
            fontSize: "34px",
            fontFamily: "Verdana, Verdana",
          }}
          transform="translate(118.86 27.08)"
        >
          <tspan x="0" y="0">
            rota
          </tspan>
        </text>
      </svg>
      <Beta />
    </div>
  );
}