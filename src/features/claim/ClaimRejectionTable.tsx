import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ClaimRejectionTable = () => {
  const [openRow, setOpenRow] = useState<string | null>(null);

  const rows = [
    {
      claimId: "CLM-001",
      codeType: "ICD",
      icdCode: "Z23",
      activityCode: "",
      activityType: "",
      rejectionReason: "The ICD code is not appropriate to be used as the principal diagnosis.",
      relationType: "ICD-principal",
      level: "Edit",
      message: "The ICD code is not valid based on the claim policy.",
    },
    {
      claimId: "CLM-002",
      codeType: "Activity",
      icdCode: "",
      activityCode: "1230",
      activityType: "CPT",
      rejectionReason: "The ICD code is not appropriate to be used as the principal diagnosis.",
      relationType: "CPT-ICD",
      level: "Activity",
      message:
        "The selected CPT code is not clinically supported by the provided ICD diagnosis.",
    },
  ];

  return (
    <div style={{ padding: "48px 32px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          {/* ================= HEADER ================= */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1.2fr 1fr 1fr 1.2fr 2fr 1.2fr 1fr 1fr",
              gap: "16px",
              padding: "20px 32px",
              fontSize: "13px",
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
              color: "white",
              borderBottom: "3px solid #2563eb",
            }}
          >
            <div>Claim ID</div>
            <div>Code Type</div>
            <div>Code</div>
            <div>Activity Type</div>
            <div>Main Rejection Reason</div>
            <div>Relation Type</div>
            <div>Level</div>
            <div style={{ textAlign: "right" }}>Actions</div>
          </div>

          {/* ================= ROWS ================= */}
          {rows.map((row) => {
            const isOpen = openRow === row.claimId;

            return (
              <div key={row.claimId}>
                {/* -------- MAIN ROW -------- */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1.2fr 1fr 1fr 1.2fr 2fr 1.2fr 1fr 1fr",
                    gap: "16px",
                    padding: "24px 32px",
                    alignItems: "center",
                    fontSize: "14px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {/* Claim ID */}
                  <div style={{ fontWeight: 700 }}>{row.claimId}</div>

                  {/* Code Type */}
                  <div style={{ fontWeight: 600 }}>{row.codeType}</div>

                  {/* Code */}
                  <div style={codeStyle}>
                    {row.codeType === "ICD"
                      ? row.icdCode
                      : row.activityCode}
                  </div>

                  {/* Activity Type */}
                  <div>
                    {row.codeType === "Activity" ? (
                      <span style={badgeStyle}>{row.activityType}</span>
                    ) : (
                      <span style={{ color: "#94a3b8" }}>—</span>
                    )}
                  </div>

                  {/* Rejection Reason */}
                  <div style={{ color: "#475569" }}>
                    {row.rejectionReason}
                  </div>

                  {/* Relation Type */}
                  <div style={{ fontWeight: 600 }}>{row.relationType}</div>

                  {/* Level */}
                  <div style={{ fontWeight: 600 }}>{row.level}</div>

                  {/* Actions */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={() =>
                        setOpenRow(isOpen ? null : row.claimId)
                      }
                      style={{
                        background: isOpen
                          ? "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)"
                          : "transparent",
                        color: isOpen ? "white" : "#1e40af",
                        fontWeight: 600,
                        padding: "10px 18px",
                        border: isOpen
                          ? "none"
                          : "2px solid #2563eb",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      {isOpen ? "Hide Details" : "Show More"}
                    </button>
                  </div>
                </div>

                {/* -------- SHOW MORE -------- */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background:
                          "linear-gradient(to bottom, #eff6ff 0%, #dbeafe 100%)",
                        borderTop: "3px solid #93c5fd",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ padding: "32px 40px" }}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "40px",
                          }}
                        >
                          <Detail
                            title="Relation Type"
                            value={row.relationType}
                          />
                          <Detail
                            title="Message"
                            value={row.message}
                          />
                          <Detail
                            title="Level"
                            value={row.level}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ================= HELPERS ================= */

const badgeStyle = {
  padding: "6px 14px",
  borderRadius: "20px",
  backgroundColor: "#dbeafe",
  color: "#1e40af",
  fontSize: "13px",
  fontWeight: 600,
  border: "1.5px solid #93c5fd",
};

const codeStyle = {
  fontFamily: "monospace",
  fontWeight: 700,
  color: "#1e3a8a",
};

const Detail = ({ title, value }: { title: string; value: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    <div
      style={{
        fontWeight: 700,
        color: "#1e40af",
        fontSize: "11px",
        letterSpacing: "0.1em",
      }}
    >
      {title}
    </div>
    <div
      style={{
        background: "white",
        padding: "16px 20px",
        borderRadius: "10px",
        border: "2px solid #bfdbfe",
        fontWeight: 600,
      }}
    >
      {value}
    </div>
  </div>
);

export default ClaimRejectionTable;
