export const PageLoader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "var(--color-bg-secondary)",
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "3px solid rgba(155, 116, 245, 0.2)",
        borderTopColor: "var(--color-purple-accent)",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)
