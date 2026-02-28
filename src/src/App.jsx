import { useEffect } from "react";
import axios from "axios";
import * as Cesium from "cesium";

const BACKEND = "https://sentinel-backend-p99q.onrender.com";

export default function App() {
  useEffect(() => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      terrainProvider: Cesium.createWorldTerrain(),
    });

    axios.get(`${BACKEND}/events`).then((res) => {
      res.data.forEach((event) => {
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            event.longitude || 0,
            event.latitude || 0
          ),
          point: {
            pixelSize: 10,
            color: Cesium.Color.RED,
          },
          description: `<h3>${event.title}</h3><p>${event.summary}</p>`,
        });
      });
    });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Sentinel Global Peace Monitor
      </h1>
      <div
        id="cesiumContainer"
        style={{ width: "100%", height: "90vh" }}
      ></div>
    </div>
  );
}
