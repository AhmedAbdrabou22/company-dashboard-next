"use client";
// ── Overview Card Component ──────────────────────────────────

const OverviewCard = () => {
    const items = [
        { label: "Profit", value: "$37,406", percent: 60, color: "#1A2A4B" },
        { label: "Tickets", value: "$1,519", percent: 23, color: "#8B96AE" },
        { label: "Expenses", value: "$17,214", percent: 12, color: "#E53935" },
    ];

    return (
        <div style={{
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 4px 24px rgba(26,42,75,0.08), 0 1px 4px rgba(26,42,75,0.04)",
            padding: "28px 32px",
        }}>

            {/* Title */}
            <p style={{ fontSize: "17px", fontWeight: 700, color: "#e28576", marginBottom: "24px" }}>
                Overview
            </p>

            {/* Progress List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {items.map((item) => (
                    <div key={item.label} style={{ display: "flex", flexDirection: "column", marginBottom: "18px" }}>

                        {/* Row: label + value */}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: 600, color: "#e28576" }}>
                                {item.label}
                            </span>
                            <span style={{ fontSize: "13px", color: "#64748b" }}>
                                <strong style={{ color: "#e28576", fontWeight: 700 }}>{item.value}</strong>
                                {` (${item.percent}%)`}
                            </span>
                        </div>

                        {/* Progress Track */}
                        <div style={{
                            width: "100%", height: "7px",
                            background: "#e9eef5", borderRadius: "99px",
                            overflow: "hidden",
                        }}>
                            <div style={{
                                height: "100%",
                                width: `${item.percent}%`,
                                background: item.color,
                                borderRadius: "99px",
                                transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                            }} />
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default OverviewCard;