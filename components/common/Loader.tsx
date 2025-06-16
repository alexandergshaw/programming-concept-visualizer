import React from "react";

const ACCENT_COLOR = "#00319b"; // Match landing page blue

const loaderStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#fff",
  },
  loader: {
    display: "flex",
    gap: "0.5em",
  },
  dot: {
    width: "1em",
    height: "1em",
    background: ACCENT_COLOR,
    borderRadius: "50%",
    animation: "bounce 0.7s infinite alternate",
  },
};

const bounceKeyframes = `
@keyframes bounce {
  to {
    transform: translateY(-1em);
    opacity: 0.7;
  }
}
`;

const Loader = () => (
  <div style={loaderStyles.container}>
    <style>{bounceKeyframes}</style>
    <div style={loaderStyles.loader}>
      <div
        style={{
          ...loaderStyles.dot,
          animationDelay: "0s",
        }}
      />
      <div
        style={{
          ...loaderStyles.dot,
          animationDelay: "0.2s",
        }}
      />
      <div
        style={{
          ...loaderStyles.dot,
          animationDelay: "0.4s",
        }}
      />
    </div>
  </div>
);

export default Loader;