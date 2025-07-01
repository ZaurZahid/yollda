import React, { useEffect, useRef } from "react";

export default function SvgInteractive({ svgFile, className }) {
    const objectRef = useRef(null);

    useEffect(() => {
        const handleLoad = () => {
            const svgElement = objectRef.current?.contentDocument?.querySelector("svg");
            if (svgElement) {
                svgElement.addEventListener("click", handlePolygonClick);
            }
        };

        const handlePolygonClick = (event) => {
            if (event.target.tagName === "polygon") {
                // Reset all polygons
                const polygons = objectRef.current.contentDocument.querySelectorAll("polygon");
                polygons.forEach((polygon) => (polygon.style.fill = ""));

                console.log(event.target)
                // Highlight clicked polygon
                event.target.style.fill = "blue";
                console.log(`Clicked Polygon Class: ${event.target.getAttribute("class")}`);
            }
        };

        // Attach load event to the <object>
        objectRef.current?.addEventListener("load", handleLoad);

        return () => {
            // Cleanup
            const svgElement = objectRef.current?.contentDocument?.querySelector("svg");
            if (svgElement) {
                svgElement.removeEventListener("click", handlePolygonClick);
            }
            objectRef.current?.removeEventListener("load", handleLoad);
        };
    }, []);

    return (
        <object
            ref={objectRef}
            type="image/svg+xml"
            data={svgFile}
            className={className}
            aria-label="Interactive SVG"
        ></object>
    );
}