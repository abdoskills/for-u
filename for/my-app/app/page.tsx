"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [advIndex, setAdvIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [showEnding, setShowEnding] = useState(false);

  const messages = [
    "Hey...",
    "I know this might be weird...",
    "But i think you’re really cute btw ",
    "Sooo… can we be friends?"
  ];

  const advantagesList = [
    "💻 I can code anything (even this site 😏)",
    " I’ll make you laugh at least once a day",
    "☕ I bring good vibes (and coffee if needed)",
    "🎧 Also share cool music sometimes"
  ];

  // Show intro messages
  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => setStep(step + 1), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowButtons(true);
    }
  }, [step]);

  // Show advantages one by one (fade in/out)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAdvantages && advIndex < advantagesList.length) {
      timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setAdvIndex(advIndex + 1);
          setFadeOut(false);
          // Show ending message after last advantage
          if (advIndex + 1 === advantagesList.length) {
            setTimeout(() => setShowEnding(true), 1000);
          }
        }, 1000);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [advIndex, showAdvantages]);

  const handleYes = () => {
    setShowButtons(false);
    setShowAdvantages(true);
    setAdvIndex(0);
  };

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 50 - 25;
    setNoBtnPosition({ x, y });
  };

  // Floating hearts
  const heartsArray = Array.from({ length: 15 });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", textAlign: "center", paddingTop: "50px" }}>
      {heartsArray.map((_, i) => (
        <div key={i} className="hearts" style={{ left: `${Math.random() * 100}%`, animationDuration: `${3 + Math.random() * 3}s` }} />
      ))}

      {!showAdvantages && (
        <div>
          {messages.slice(0, step).map((msg, i) => (
            <div key={i} className="fade show" style={{ margin: "10px 0", fontSize: "20px" }}>
              {msg}
            </div>
          ))}

          {showButtons && (
            <div className="buttons fade show" style={{ marginTop: 20 }}>
              <button onClick={handleYes}>Yes </button>
              <button
                onMouseEnter={handleNoHover}
                style={{ transform: `translate(${noBtnPosition.x}px, ${noBtnPosition.y}px)` }}
              >
                No 
              </button>
            </div>
          )}
        </div>
      )}

      {showAdvantages && advIndex < advantagesList.length && (
        <div className={`fade ${fadeOut ? "hide" : "show"}`} style={{ fontSize: "20px", marginTop: 20 }}>
          <h2>Advantages of being friends with me 😎</h2>
          <p>{advantagesList[advIndex]}</p>
        </div>
      )}

      {showEnding && (
        <div
          className="ending"
          style={{
            marginTop: 50,
            fontSize: 28,
            fontWeight: "bold",
            animation: "slowFadeIn 5s forwards",
          }}
        >
          THE END!
        </div>
      )}

      <style jsx>{`
        @keyframes slowFadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
