"use client";

import { forwardRef } from "react";
import { getAllBadges, getBadgeSrc, isBadgeUnlocked } from "@/lib/badges";
import type { AxisWrappedData } from "@/lib/types";
import { formatDecimal, formatInteger } from "@/lib/utils";

interface ShareCardProps {
  data: AxisWrappedData;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  function ShareCard({ data }, ref) {
    const stats = [
      { label: "Trajectories", value: formatInteger(data.trajectories) },
      { label: "Verified", value: `${formatDecimal(data.verified)}%` },
      { label: "Avg Score", value: formatDecimal(data.averageScore) },
      { label: "Points", value: formatInteger(data.points) },
    ];
    const badges = getAllBadges();
    const unlockedCount = data.unlockedBadgeIds.length;

    return (
      <div
        ref={ref}
        style={{
          width: 1200,
          height: 675,
          position: "relative",
          overflow: "hidden",
          background: "#040504",
          color: "#f3f6f3",
          fontFamily: "var(--font-display), 'Space Grotesk', sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(243,246,243,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(243,246,243,0.035) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "8%",
            top: "8%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(92,255,154,0.12) 0%, transparent 68%)",
          }}
        />

        {/* Corner marks only — no trajectory lines */}
        <svg
          width="1200"
          height="675"
          viewBox="0 0 1200 675"
          fill="none"
          style={{ position: "absolute", inset: 0 }}
        >
          <line
            x1="48"
            y1="48"
            x2="48"
            y2="72"
            stroke="rgba(243,246,243,0.25)"
            strokeWidth="1"
          />
          <line
            x1="48"
            y1="48"
            x2="72"
            y2="48"
            stroke="rgba(243,246,243,0.25)"
            strokeWidth="1"
          />
          <line
            x1="1152"
            y1="627"
            x2="1152"
            y2="603"
            stroke="rgba(92,255,154,0.45)"
            strokeWidth="1"
          />
          <line
            x1="1152"
            y1="627"
            x2="1128"
            y2="627"
            stroke="rgba(92,255,154,0.45)"
            strokeWidth="1"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(243,246,243,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 56,
            right: 56,
            top: 28,
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(92,255,154,0.55), transparent)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "56px 72px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(92,255,154,0.8)",
                  maxWidth: 520,
                  lineHeight: 1.45,
                }}
              >
                Built to visualize Axis Robotics community contributions
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 52,
                  fontWeight: 600,
                  letterSpacing: "-0.045em",
                  lineHeight: 0.95,
                }}
              >
                AXIS ROBOTICS{" "}
                <span style={{ color: "#5cff9a" }}>WRAPPED</span>
              </div>
            </div>

            <div
              style={{
                textAlign: "right",
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(139,148,139,0.95)",
                paddingTop: 8,
              }}
            >
              Physical AI
              <div style={{ marginTop: 8, color: "rgba(77,85,77,1)" }}>
                Contribution card
              </div>
            </div>
          </div>

          {/* Stats + badges block — username sits just above the stats rule */}
          <div style={{ marginTop: 48, paddingBottom: 8 }}>
            <div
              style={{
                marginBottom: 14,
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.045em",
                lineHeight: 1,
                color: "#f3f6f3",
                whiteSpace: "nowrap",
              }}
            >
              AXIS ROBOTICS{" "}
              <span style={{ color: "#5cff9a" }}>USERNAME</span>
              : {data.username}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
                borderTop: "1px solid rgba(243,246,243,0.12)",
              }}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "22px 18px 18px",
                    borderLeft:
                      index === 0 ? "none" : "1px solid rgba(243,246,243,0.1)",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: "rgba(139,148,139,1)",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily:
                        "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: 36,
                      fontWeight: 600,
                      letterSpacing: "-0.045em",
                      fontVariantNumeric: "tabular-nums",
                      color: "#f3f6f3",
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 8,
                borderTop: "1px solid rgba(243,246,243,0.12)",
                paddingTop: 14,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 18,
              }}
            >
              <div style={{ flexShrink: 0, paddingTop: 4 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "rgba(139,148,139,1)",
                  }}
                >
                  Badges
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    fontSize: 30,
                    fontWeight: 600,
                    letterSpacing: "-0.045em",
                    fontVariantNumeric: "tabular-nums",
                    color: "#f3f6f3",
                  }}
                >
                  {unlockedCount} / {data.badgesTotal}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                  gap: 8,
                  flex: 1,
                }}
              >
                {badges.map((badge) => {
                  const unlocked = isBadgeUnlocked(
                    data.unlockedBadgeIds,
                    badge.id,
                  );
                  return (
                    <div
                      key={badge.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "1 / 1",
                          borderRadius: 3,
                          border: unlocked
                            ? "1px solid rgba(92,255,154,0.4)"
                            : "1px solid rgba(243,246,243,0.1)",
                          background: unlocked
                            ? "rgba(92,255,154,0.06)"
                            : "rgba(0,0,0,0.25)",
                          padding: 2,
                          boxSizing: "border-box",
                        }}
                      >
                        <img
                          src={getBadgeSrc(badge.file)}
                          alt={badge.name}
                          width={72}
                          height={72}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            transform: "scale(1.08)",
                            opacity: unlocked ? 1 : 0.28,
                            filter: unlocked
                              ? "none"
                              : "grayscale(1) brightness(0.75)",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontFamily:
                            "var(--font-mono), 'JetBrains Mono', monospace",
                          fontSize: 7,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          textAlign: "center",
                          lineHeight: 1.15,
                          color: unlocked
                            ? "#ffffff"
                            : "rgba(255,255,255,0.45)",
                          maxWidth: "100%",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {badge.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
