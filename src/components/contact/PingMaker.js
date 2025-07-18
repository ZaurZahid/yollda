export class PingMarker extends window.google.maps.OverlayView {
  constructor(position, map) {
    super();
    this.position = position;
    this.map = map;
    this.div = null;
    this.setMap(map);
  }

  onAdd() {
    this.div = document.createElement("div");
    this.div.className = "ping-marker";
    const panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div);
  }

  draw() {
    if (!this.div) return;
    const projection = this.getProjection();
    const point = projection.fromLatLngToDivPixel(
      new window.google.maps.LatLng(this.position.lat, this.position.lng)
    );
    if (point) {
      this.div.style.left = `${point.x}px`;
      this.div.style.top = `${point.y}px`;
      this.div.style.position = "absolute";
      this.div.style.transform = "translate(-50%, -50%)";
    }
  }

  onRemove() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  }
}
