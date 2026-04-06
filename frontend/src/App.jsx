import { useEffect, useRef, useState } from "react";

const demoImages = ["img1.png", "img2.png", "img3.png"];

export default function App() {
  const [selectedImage, setSelectedImage] = useState(demoImages[0]);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  const imageRef = useRef(null);

  useEffect(() => {
    fetchDetections(selectedImage);
  }, [selectedImage]);

  async function fetchDetections(imageName) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_name: imageName }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch detections from backend.");
      }

      const data = await response.json();
      setDetections(data.detections || []);
    } catch (err) {
      console.error(err);
      setError("Could not load detections.");
      setDetections([]);
    } finally {
      setLoading(false);
    }
  }

  function updateDisplaySize() {
    if (!imageRef.current) {
      return;
    }

    setDisplaySize({
      width: imageRef.current.clientWidth,
      height: imageRef.current.clientHeight,
    });
  }

  useEffect(() => {
    function handleResize() {
      updateDisplaySize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        fontFamily: "Arial, sans-serif",
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>Aircraft Defect Detection Demo</h1>
        <p style={{ marginTop: 0, color: "#94a3b8" }}>
          Prototype visualization using pre-annotated aircraft inspection images.
        </p>

        <div
          style={{
            marginTop: "24px",
            marginBottom: "24px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <label htmlFor="image-select">Select demo image:</label>
          <select
            id="image-select"
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #334155",
              backgroundColor: "#1e293b",
              color: "#e2e8f0",
            }}
          >
            {demoImages.map((imageName) => (
              <option key={imageName} value={imageName}>
                {imageName}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p style={{ color: "#cbd5e1", marginBottom: "16px" }}>
            Running detection...
          </p>
        )}

        {error && (
          <p style={{ color: "#fca5a5", marginBottom: "16px" }}>{error}</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "16px" }}>Detection View</h2>

            <div
              style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                borderRadius: "12px",
                backgroundColor: "#020617",
              }}
            >
              <img
                ref={imageRef}
                src={`/images/${selectedImage}`}
                alt={selectedImage}
                onLoad={updateDisplaySize}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                }}
              />

              {displaySize.width > 0 &&
                detections.map((detection, index) => {
                  const x =
                    (detection.x_center - detection.width / 2) * displaySize.width;
                  const y =
                    (detection.y_center - detection.height / 2) * displaySize.height;
                  const boxWidth = detection.width * displaySize.width;
                  const boxHeight = detection.height * displaySize.height;

                  return (
                    <div
                      key={`${selectedImage}-${index}`}
                      style={{
                        position: "absolute",
                        left: `${x}px`,
                        top: `${y}px`,
                        width: `${boxWidth}px`,
                        height: `${boxHeight}px`,
                        border: "2px solid #ef4444",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-28px",
                          left: "0",
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                          fontSize: "12px",
                          fontWeight: "bold",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {detection.label} {Math.round(detection.confidence * 100)}%
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "16px" }}>Detection Summary</h2>

            <p style={{ color: "#94a3b8", marginTop: 0 }}>
              Image: <span style={{ color: "#e2e8f0" }}>{selectedImage}</span>
            </p>

            <p style={{ color: "#94a3b8" }}>
              Total detections:{" "}
              <span style={{ color: "#e2e8f0", fontWeight: "bold" }}>
                {detections.length}
              </span>
            </p>

            <div style={{ marginTop: "20px" }}>
              {detections.length === 0 ? (
                <p style={{ color: "#94a3b8" }}>No detections found.</p>
              ) : (
                detections.map((detection, index) => (
                  <div
                    key={`summary-${index}`}
                    style={{
                      padding: "12px",
                      marginBottom: "12px",
                      borderRadius: "10px",
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                    }}
                  >
                    <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                      {detection.label}
                    </div>
                    <div style={{ fontSize: "14px", color: "#cbd5e1" }}>
                      Confidence: {Math.round(detection.confidence * 100)}%
                    </div>
                    <div style={{ fontSize: "14px", color: "#cbd5e1" }}>
                      Center: ({detection.x_center.toFixed(3)},{" "}
                      {detection.y_center.toFixed(3)})
                    </div>
                    <div style={{ fontSize: "14px", color: "#cbd5e1" }}>
                      Size: {detection.width.toFixed(3)} ×{" "}
                      {detection.height.toFixed(3)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}