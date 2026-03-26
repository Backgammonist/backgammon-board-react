import React, { useRef, useState } from "react";
import { Backgammon } from "../../src/components/Backgammon";
import { presets } from "../../src/helpers/presets";
import { positionsPresets } from "../tests/presets";
import type {
  BoardState,
  DieValue,
  Direction,
  DoublingCube,
  Theme,
} from "../../src/types";

// ── Position state types ────────────────────────────────────────────────────

type PointData = { owner: "player" | "opponent" | null; count: number };

type PositionEditorState = {
  points: PointData[]; // length 24, index 0 = board point 1
  barPlayer: number;
  barOpponent: number;
  bornOffPlayer: number;
  bornOffOpponent: number;
};

const EMPTY_POS_STATE: PositionEditorState = {
  points: Array.from({ length: 24 }, () => ({ owner: null, count: 0 })),
  barPlayer: 0,
  barOpponent: 0,
  bornOffPlayer: 0,
  bornOffOpponent: 0,
};

function positionsToState(
  positions: BoardState["positions"],
): PositionEditorState {
  const state = structuredClone(EMPTY_POS_STATE);
  for (const pos of positions ?? []) {
    if (pos.position === "bar") {
      if (pos.playerType === "player") state.barPlayer = pos.numberOfCheckers;
      else state.barOpponent = pos.numberOfCheckers;
    } else if (pos.position === 0) {
      state.bornOffPlayer = pos.numberOfCheckers;
    } else if (pos.position === 25) {
      state.bornOffOpponent = pos.numberOfCheckers;
    } else {
      const idx = (pos.position as number) - 1;
      if (idx >= 0 && idx < 24) {
        state.points[idx] = {
          owner: pos.playerType,
          count: pos.numberOfCheckers,
        };
      }
    }
  }
  return state;
}

function stateToPositions(s: PositionEditorState): BoardState["positions"] {
  const result: NonNullable<BoardState["positions"]> = [];
  s.points.forEach((pt, i) => {
    if (pt.owner && pt.count > 0) {
      result.push({
        position: (i + 1) as never,
        playerType: pt.owner,
        numberOfCheckers: pt.count as never,
      });
    }
  });
  if (s.barPlayer > 0)
    result.push({
      position: "bar",
      playerType: "player",
      numberOfCheckers: s.barPlayer as never,
    });
  if (s.barOpponent > 0)
    result.push({
      position: "bar",
      playerType: "opponent",
      numberOfCheckers: s.barOpponent as never,
    });
  if (s.bornOffPlayer > 0)
    result.push({
      position: 0,
      playerType: "player",
      numberOfCheckers: s.bornOffPlayer as never,
    });
  if (s.bornOffOpponent > 0)
    result.push({
      position: 25,
      playerType: "opponent",
      numberOfCheckers: s.bornOffOpponent as never,
    });
  return result;
}

// ── Position editor component ───────────────────────────────────────────────

function CountInput({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <input
      type="number"
      min={min}
      max={15}
      value={value}
      onChange={(e) =>
        onChange(Math.max(min, Math.min(15, Number(e.target.value))))
      }
      style={{
        width: 40,
        fontSize: 11,
        padding: "1px 3px",
        border: "1px solid #ddd",
        borderRadius: 3,
        textAlign: "center",
        fontFamily: "ui-monospace, monospace",
      }}
    />
  );
}

function OwnerBtn({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "1px 6px",
        fontSize: 10,
        fontWeight: 700,
        border: "1px solid",
        borderRadius: 3,
        cursor: "pointer",
        lineHeight: 1.5,
        borderColor: active ? color : "#ddd",
        background: active ? color : "#fafafa",
        color: active ? "#fff" : "#bbb",
      }}
    >
      {label}
    </button>
  );
}

function PositionEditor({
  value,
  onChange,
}: {
  value: PositionEditorState;
  onChange: (v: PositionEditorState) => void;
}) {
  const toggleOwner = (i: number, owner: "player" | "opponent") => {
    const pt = value.points[i];
    const newOwner = pt.owner === owner ? null : owner;
    const newPoints = value.points.map((p, j) =>
      j === i ? { owner: newOwner, count: newOwner ? p.count || 1 : 0 } : p,
    );
    onChange({ ...value, points: newPoints });
  };

  const setCount = (i: number, count: number) => {
    const newPoints = value.points.map((p, j) =>
      j === i ? { ...p, count } : p,
    );
    onChange({ ...value, points: newPoints });
  };

  return (
    <div style={{ fontSize: 12 }}>
      {/* Points 1–24 */}
      <div
        style={{
          maxHeight: 300,
          overflowY: "auto",
          border: "1px solid #ebebeb",
          borderRadius: 4,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                position: "sticky",
                top: 0,
                background: "#f0f0f0",
                zIndex: 1,
              }}
            >
              <th
                style={{
                  padding: "4px 6px",
                  textAlign: "left",
                  fontSize: 10,
                  color: "#999",
                  fontWeight: 700,
                  width: 22,
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Pt
              </th>
              <th
                style={{
                  padding: "4px 6px",
                  fontSize: 10,
                  color: "#999",
                  fontWeight: 700,
                  textAlign: "center",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Owner
              </th>
              <th
                style={{
                  padding: "4px 6px",
                  fontSize: 10,
                  color: "#999",
                  fontWeight: 700,
                  textAlign: "center",
                  width: 46,
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {value.points.map((pt, i) => (
              <tr
                key={i}
                style={{
                  background:
                    pt.owner === "player"
                      ? "#eff6ff"
                      : pt.owner === "opponent"
                        ? "#fff1f1"
                        : i % 2 === 0
                          ? "#fafafa"
                          : "#fff",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <td
                  style={{
                    padding: "3px 6px",
                    color: "#777",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: 11,
                  }}
                >
                  {i + 1}
                </td>
                <td style={{ padding: "3px 6px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      justifyContent: "center",
                    }}
                  >
                    <OwnerBtn
                      label="P"
                      active={pt.owner === "player"}
                      color="#2563eb"
                      onClick={() => toggleOwner(i, "player")}
                    />
                    <OwnerBtn
                      label="O"
                      active={pt.owner === "opponent"}
                      color="#dc2626"
                      onClick={() => toggleOwner(i, "opponent")}
                    />
                  </div>
                </td>
                <td style={{ padding: "3px 6px", textAlign: "center" }}>
                  {pt.owner && (
                    <CountInput
                      value={pt.count}
                      onChange={(v) => setCount(i, v)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar */}
      <div
        style={{
          marginTop: 10,
          padding: "8px 10px",
          background: "#fafafa",
          border: "1px solid #ebebeb",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 6,
          }}
        >
          Bar
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 5,
          }}
        >
          <span
            style={{
              width: 58,
              fontSize: 12,
              color: "#2563eb",
              fontWeight: 600,
            }}
          >
            Player
          </span>
          <CountInput
            value={value.barPlayer}
            min={0}
            onChange={(v) => onChange({ ...value, barPlayer: v })}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 58,
              fontSize: 12,
              color: "#dc2626",
              fontWeight: 600,
            }}
          >
            Opponent
          </span>
          <CountInput
            value={value.barOpponent}
            min={0}
            onChange={(v) => onChange({ ...value, barOpponent: v })}
          />
        </div>
      </div>

      {/* Borne off */}
      <div
        style={{
          marginTop: 8,
          padding: "8px 10px",
          background: "#fafafa",
          border: "1px solid #ebebeb",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 6,
          }}
        >
          Borne Off
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 5,
          }}
        >
          <span
            style={{
              width: 58,
              fontSize: 12,
              color: "#2563eb",
              fontWeight: 600,
            }}
          >
            Player
          </span>
          <CountInput
            value={value.bornOffPlayer}
            min={0}
            onChange={(v) => onChange({ ...value, bornOffPlayer: v })}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 58,
              fontSize: 12,
              color: "#dc2626",
              fontWeight: 600,
            }}
          >
            Opponent
          </span>
          <CountInput
            value={value.bornOffOpponent}
            min={0}
            onChange={(v) => onChange({ ...value, bornOffOpponent: v })}
          />
        </div>
      </div>
    </div>
  );
}

// ── Theme helpers ───────────────────────────────────────────────────────────

type ThemeKey = keyof Theme;

const THEME_LABELS: [ThemeKey, string][] = [
  ["backgroundColor", "Background"],
  ["borderColor", "Border"],
  ["pointColor", "Point"],
  ["altPointColor", "Alt Point"],
  ["pointNumberColor", "Point Number"],
  ["playerCheckerColor", "Player Checker"],
  ["playerCheckerBorderColor", "Player Checker Border"],
  ["opponentCheckerColor", "Opponent Checker"],
  ["opponentCheckerBorderColor", "Opponent Checker Border"],
  ["doublingCubeColor", "Doubling Cube"],
];

const DOUBLING_VALUES: DoublingCube["value"][] = [2, 4, 8, 16, 32, 64];

// ── Shared UI primitives ────────────────────────────────────────────────────

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isValidHex =
    value.startsWith("#") && (value.length === 4 || value.length === 7);
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
    >
      <input
        type="color"
        value={isValidHex ? value : "#000000"}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 32,
          height: 24,
          padding: 1,
          border: "1px solid #ccc",
          borderRadius: 3,
          cursor: "pointer",
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 13, color: "#333", flex: 1 }}>{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 80,
          fontSize: 11,
          fontFamily: "ui-monospace, monospace",
          padding: "2px 4px",
          border: "1px solid #ddd",
          borderRadius: 3,
          color: "#555",
        }}
      />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: "1px solid #ebebeb",
      }}
    >
      {children}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "5px 8px",
  fontSize: 13,
  border: "1px solid #ccc",
  borderRadius: 4,
  background: "#fff",
  cursor: "pointer",
};

function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1,
            padding: "5px 0",
            fontSize: 12,
            border: "1px solid",
            borderRadius: 4,
            cursor: "pointer",
            borderColor: value === opt.value ? "#007aff" : "#ccc",
            background: value === opt.value ? "#007aff" : "#fff",
            color: value === opt.value ? "#fff" : "#444",
            fontWeight: value === opt.value ? 600 : 400,
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── Main editor ─────────────────────────────────────────────────────────────

export function Editor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [direction, setDirection] = useState<Direction>("clockwise");
  const [diceCount, setDiceCount] = useState<0 | 1 | 2>(2);
  const [die1, setDie1] = useState<DieValue>(1);
  const [die2, setDie2] = useState<DieValue>(6);
  const [showDoublingCube, setShowDoublingCube] = useState(false);
  const [doublingValue, setDoublingValue] = useState<DoublingCube["value"]>(2);
  const [doublingOwner, setDoublingOwner] =
    useState<DoublingCube["owner"]>(null);
  const [posState, setPosState] = useState<PositionEditorState>(() =>
    positionsToState(positionsPresets.default),
  );
  const [theme, setTheme] = useState<Theme>({ ...presets.default });

  const previewRef = useRef<HTMLDivElement>(null);

  const dice: BoardState["dice"] =
    diceCount === 0 ? [] : diceCount === 1 ? [die1] : [die1, die2];

  const positions = stateToPositions(posState);

  const doublingCube: DoublingCube | undefined = showDoublingCube
    ? { value: doublingValue, owner: doublingOwner }
    : undefined;

  const updateThemeColor = (key: ThemeKey, value: string) =>
    setTheme((t) => ({ ...t, [key]: value }));

  const applyThemePreset = (name: keyof typeof presets) =>
    setTheme({ ...presets[name] });

  const downloadSVG = () => {
    const svg = previewRef.current?.querySelector("svg");
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backgammon.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateCode = (): string => {
    const parts: string[] = [];

    if (direction !== "clockwise") parts.push(`  direction="${direction}"`);

    const diceArr =
      diceCount === 0
        ? "[]"
        : diceCount === 1
          ? `[${die1}]`
          : `[${die1}, ${die2}]`;
    parts.push(`  dice={${diceArr}}`);

    if (doublingCube) {
      const ownerVal =
        doublingCube.owner == null ? "null" : `"${doublingCube.owner}"`;
      parts.push(
        `  doublingCube={{ value: ${doublingCube.value}, owner: ${ownerVal} }}`,
      );
    }

    if (positions?.length) {
      const posStr = JSON.stringify(positions, null, 2).replace(/\n/g, "\n  ");
      parts.push(`  positions={${posStr}}`);
    }

    const themeLines = THEME_LABELS.map(
      ([key]) => `    ${key}: "${theme[key]}"`,
    ).join(",\n");
    parts.push(`  theme={{\n${themeLines},\n  }}`);

    return `<Backgammon\n${parts.join("\n")}\n/>`;
  };

  const presetBtnStyle: React.CSSProperties = {
    flex: 1,
    padding: "4px 0",
    fontSize: 11,
    border: "1px solid #ccc",
    borderRadius: 4,
    cursor: "pointer",
    background: "#fafafa",
    color: "#444",
    textTransform: "capitalize",
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 14,
        background: "#f5f5f5",
      }}
    >
      {/* ── Controls panel ── */}
      <div
        style={{
          width: sidebarOpen ? 300 : 36,
          flexShrink: 0,
          overflowY: sidebarOpen ? "auto" : "hidden",
          overflowX: "hidden",
          background: "#fff",
          borderRight: "1px solid #e0e0e0",
          transition: "width 0.2s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: sidebarOpen ? "16px 14px 0" : "10px 0",
            flexShrink: 0,
            flexDirection: sidebarOpen ? "row" : "column",
          }}
        >
          <h2
            style={{
              margin: sidebarOpen ? "0 0 18px" : 0,
              fontSize: 16,
              fontWeight: 700,
              color: "#1a1a1a",
              whiteSpace: "nowrap",
              opacity: sidebarOpen ? 1 : 0,
              transition: "opacity 0.15s ease",
            }}
          >
            Board Editor
          </h2>
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            style={{
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e0e0e0",
              borderRadius: 4,
              background: "transparent",
              cursor: "pointer",
              fontSize: 10,
              color: "#aaa",
              flexShrink: 0,
              marginBottom: sidebarOpen ? 18 : 0,
            }}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: sidebarOpen ? "0 14px 16px" : 0,
            opacity: sidebarOpen ? 1 : 0,
            transition: "opacity 0.15s ease",
            pointerEvents: sidebarOpen ? "auto" : "none",
          }}
        >
          {/* Direction */}
          <Section>
            <SectionLabel>Direction</SectionLabel>
            <SegmentedControl
              options={[
                { label: "Clockwise", value: "clockwise" as Direction },
                { label: "Anticlockwise", value: "anticlockwise" as Direction },
              ]}
              value={direction}
              onChange={setDirection}
            />
          </Section>

          {/* Dice */}
          <Section>
            <SectionLabel>Dice</SectionLabel>
            <div style={{ marginBottom: 8 }}>
              <SegmentedControl
                options={[
                  { label: "None", value: 0 as 0 | 1 | 2 },
                  { label: "1 die", value: 1 as 0 | 1 | 2 },
                  { label: "2 dice", value: 2 as 0 | 1 | 2 },
                ]}
                value={diceCount}
                onChange={setDiceCount}
              />
            </div>
            {diceCount >= 1 && (
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>
                    Die 1
                  </div>
                  <select
                    style={selectStyle}
                    value={die1}
                    onChange={(e) =>
                      setDie1(Number(e.target.value) as DieValue)
                    }
                  >
                    {[1, 2, 3, 4, 5, 6].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
                {diceCount === 2 && (
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontSize: 11, color: "#999", marginBottom: 4 }}
                    >
                      Die 2
                    </div>
                    <select
                      style={selectStyle}
                      value={die2}
                      onChange={(e) =>
                        setDie2(Number(e.target.value) as DieValue)
                      }
                    >
                      {[1, 2, 3, 4, 5, 6].map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </Section>

          {/* Doubling cube */}
          <Section>
            <SectionLabel>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={showDoublingCube}
                  onChange={(e) => setShowDoublingCube(e.target.checked)}
                />
                Doubling Cube
              </label>
            </SectionLabel>
            {showDoublingCube && (
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>
                    Value
                  </div>
                  <select
                    style={selectStyle}
                    value={doublingValue}
                    onChange={(e) =>
                      setDoublingValue(
                        Number(e.target.value) as DoublingCube["value"],
                      )
                    }
                  >
                    {DOUBLING_VALUES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>
                    Owner
                  </div>
                  <select
                    style={selectStyle}
                    value={doublingOwner ?? "none"}
                    onChange={(e) =>
                      setDoublingOwner(
                        e.target.value === "none"
                          ? null
                          : (e.target.value as "player" | "opponent"),
                      )
                    }
                  >
                    <option value="none">None</option>
                    <option value="player">Player</option>
                    <option value="opponent">Opponent</option>
                  </select>
                </div>
              </div>
            )}
          </Section>

          {/* Positions */}
          <Section>
            <SectionLabel>Positions</SectionLabel>
            <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
              {(["default", "overload", "random"] as const).map((name) => (
                <button
                  key={name}
                  style={presetBtnStyle}
                  onClick={() =>
                    setPosState(positionsToState(positionsPresets[name]))
                  }
                >
                  {name}
                </button>
              ))}
              <button
                style={{ ...presetBtnStyle, color: "#888" }}
                onClick={() => setPosState(structuredClone(EMPTY_POS_STATE))}
              >
                clear
              </button>
            </div>
            <PositionEditor value={posState} onChange={setPosState} />
          </Section>

          {/* Theme */}
          <div>
            <SectionLabel>Theme</SectionLabel>
            <select
              style={{
                ...selectStyle,
                marginBottom: 12,
                textTransform: "capitalize",
              }}
              onChange={(e) =>
                applyThemePreset(e.target.value as keyof typeof presets)
              }
              defaultValue=""
            >
              <option value="" disabled>
                Load preset…
              </option>
              {(Object.keys(presets) as (keyof typeof presets)[]).map(
                (name) => (
                  <option
                    key={name}
                    value={name}
                    style={{ textTransform: "capitalize" }}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </option>
                ),
              )}
            </select>
            {THEME_LABELS.map(([key, label]) => (
              <ColorField
                key={key}
                label={label}
                value={theme[key]}
                onChange={(v) => updateThemeColor(key, v)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Preview + Code panel ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            borderBottom: "1px solid #e0e0e0",
            background: "#fff",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>
            Live Preview
          </span>
          <button
            onClick={downloadSVG}
            style={{
              padding: "6px 16px",
              background: "#007aff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Download SVG
          </button>
        </div>

        {/* Preview */}
        <div
          ref={previewRef}
          style={{
            flex: 1,
            padding: 24,
            overflow: "auto",
            minHeight: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: 640 }}>
            <Backgammon
              direction={direction}
              dice={dice}
              positions={positions}
              theme={theme}
              doublingCube={doublingCube}
            />
          </div>
        </div>

        {/* Generated code */}
        <div
          style={{
            flexShrink: 0,
            borderTop: "1px solid #e0e0e0",
            background: "#1e1e1e",
            height: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "6px 14px",
              background: "#2a2a2a",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 11, color: "#999", fontWeight: 600 }}>
              React Code
            </span>
          </div>
          <textarea
            readOnly
            value={generateCode()}
            style={{
              flex: 1,
              padding: "12px 14px",
              fontFamily: "ui-monospace, 'Cascadia Code', monospace",
              fontSize: 12,
              color: "#d4d4d4",
              background: "transparent",
              border: "none",
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
              lineHeight: 1.65,
              overflowY: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}
