// src/components/HmpiMap.jsx
export default function HmpiMap() {
  return (
    <div className="w-full h-[90vh]">
      <iframe
        src="/hmpi_map.html"
        title="HMPI Map"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        className="min-h-screen"
      />
    </div>
  );
}
