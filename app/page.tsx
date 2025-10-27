"use client";

import { useEffect, useState } from "react";
import "../globals.css";

export default function Home() {
  const [step, setStep] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

  const messages = [
    "Hey...",
    "I know this might be weird...",
    "But you’re really cute btw 😅",
    "Sooo… can we be friends?"
  ];

  // Show messages one by one
  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => setStep(step + 1), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowButtons(true);
    }
  }, [step]);

  const handleYes = () => {
    setShowButtons(false);
    setShowAdvantages(true);
  };

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 50 - 25;
    setNoBtnPosition({ x, y });
  };

  return (
    <div>
      {!showAdvantages && (
        <div>
          {messages.slice(0, step).map((msg, i) => (
            <div key={i} className="fade show" style={{ margin: "10px 0", fontSize: "20px" }}>
              {msg}
            </div>
          ))}

          {showButtons && (
            <div className="buttons fade show">
              <button onClick={handleYes}>Yes 😄</button>
              <button
                onMouseEnter={handleNoHover}
                style={{
                  transform: `translate(${noBtnPosition.x}px, ${noBtnPosition.y}px)`
                }}
              >
                No 😅
              </button>
            </div>
          )}
        </div>
      )}

      {showAdvantages && (
        <div className="fade show" style={{ fontSize: "20px" }}>
          <h2>Advantages of being friends with me 😎</h2>
          <p>💻 I can code anything (even this site 😏)</p>
          <p>😂 I’ll make you laugh at least once a day</p>
          <p>☕ I bring good vibes (and coffee if needed)</p>
          <p>🎧 Also share cool music sometimes</p>
        </div>
      )}
    </div>
  );
}
