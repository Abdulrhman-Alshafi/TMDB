const CircularProgress = ({
  percent = 0,
  size = 80,
  strokeWidth = 8,
  trackColor = "#204529",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  // Determine color based on percentage
  let progressColor;
  if (percent < 50) progressColor = "#ff3b3b"; // red
  else if (percent < 75) progressColor = "#ffa500"; // orange
  else progressColor = "#21d07a"; // green

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: size * 0.3,
          color: progressColor,
        }}
      >
        {percent}%
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <CircularProgress percent={70} size={100} />
    </>
  );
}

export default App;
