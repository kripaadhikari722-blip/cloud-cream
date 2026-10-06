import { motion } from "motion/react";
import { useState, useEffect } from "react";
import vanillaBottle from "../assets/images/vanilla-can.png";
import chocoBottle from "../assets/images/choco-can.png";

const clamp01 = (t) => Math.max(0, Math.min(1, t));
const lerp = (a, b, t) => a + (b - a) * t;

// ============================================================
// MOBILE STAGE
// ============================================================
function MobileBottleStage({ scrollY, offsets }) {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const cx = vw / 2;
  const cy = vh / 2;

  const tFlavors = offsets.flavors || 0;
  const tVanilla = offsets.vanillaBreakdown || tFlavors + vh * 3;
  const tChoco   = offsets.chocoBreakdown   || tVanilla + vh * 1.5;
  const tPre     = offsets.preorder         || tChoco + vh * 2;

  // ---- Read card positions each frame so bottles track the cards ----
  const vcEl = document.getElementById("vanillaCard");
  const ccEl = document.getElementById("chocoCard");
  const vcR = vcEl ? vcEl.getBoundingClientRect() : null;
  const ccR = ccEl ? ccEl.getBoundingClientRect() : null;

  // Bottle anchors: right side of card, mid-height. Computed as offset from viewport center.
  const cardBottleOffsetX = -vw * 0.14; // inward from card right edge to bottle center
  // Bottles ride with their cards; once a card is far off the top, hold just above the viewport
  const clampY = (y) => Math.max(-vh * 0.75, y);
  const vanillaCardTarget = vcR
    ? {
        x: vcR.right + cardBottleOffsetX - cx,
        y: clampY(vcR.top + vcR.height * 0.44 - cy),
      }
    : { x: vw * 0.32, y: -vh * 0.15 };
  const chocoCardTarget = ccR
    ? {
        x: ccR.right + cardBottleOffsetX - cx,
        y: clampY(ccR.top + ccR.height * 0.44 - cy),
      }
    : { x: vw * 0.32, y: vh * 0.28 };

  // Breakdown lock positions — right-hand column beside the copy (copy is 65% wide, left-aligned)
  const vanillaBreakdown = { x: vw * 0.31, y: -vh * 0.1 };
  const chocoBreakdown   = { x: vw * 0.31, y: -vh * 0.1 };

  // Hero positions — bottles sit side by side below the heading so they never cover it
  const heroV = { x: -vw * 0.24, y: vh * 0.28 };
  const heroC = { x:  vw * 0.24, y: vh * 0.28 };

  // Off-screen
  const offTop = { x: vanillaBreakdown.x, y: -vh * 0.85 };
  const offR = { x:  vw * 0.85, y: chocoBreakdown.y };

  // Nothing may show over the "Pick your fuel" section
  const cHide = tPre - vh * 0.39;

  // Document position of the chocolate card's bottom edge
  const chocoCardBottom = ccR ? ccR.bottom + scrollY : tVanilla - vh * 0.5;
  // Moment the chocolate card has been scrolled past
  const cardsPassed = chocoCardBottom - vh * 0.35;

  // ---------- VANILLA ----------
  let vX, vY, vS, vR, vO = 1;

  // Glide from the hero into the cards while the vanilla card scrolls up the screen,
  // so both bottles are already sitting in their cards by the time the cards are in view
  const vanillaCardTop = vcR ? vcR.top + scrollY : tFlavors + vh * 0.3;
  const vA = Math.max(vanillaCardTop - vh, 40);
  const vB = Math.max(vanillaCardTop - vh * 0.3, vA + 1);
  const vC = Math.min(cardsPassed, tVanilla - vh * 0.2);
  const vD = tVanilla + vh * 0.1;
  const vE = tChoco - vh * 0.45;
  const vF = tChoco - vh * 0.1;

  if (scrollY < vA) {
    vX = heroV.x; vY = heroV.y; vS = 0.8; vR = -10;
  } else if (scrollY < vB) {
    const t = clamp01((scrollY - vA) / (vB - vA));
    vX = lerp(heroV.x, vanillaCardTarget.x, t);
    vY = lerp(heroV.y, vanillaCardTarget.y, t);
    vS = lerp(0.8, 0.58, t);
    vR = lerp(-10, 0, t);
  } else if (scrollY < vC) {
    vX = vanillaCardTarget.x; vY = vanillaCardTarget.y; vS = 0.58; vR = 0;
  } else if (scrollY < vD) {
    const t = clamp01((scrollY - vC) / (vD - vC));
    vX = lerp(vanillaCardTarget.x, vanillaBreakdown.x, t);
    vY = lerp(vanillaCardTarget.y, vanillaBreakdown.y, t);
    vS = lerp(0.58, 0.92, t);
    vR = lerp(0, -4, t);
  } else if (scrollY < vE) {
    vX = vanillaBreakdown.x; vY = vanillaBreakdown.y; vS = 0.92; vR = -4;
  } else if (scrollY < vF) {
    const t = clamp01((scrollY - vE) / (vF - vE));
    vX = lerp(vanillaBreakdown.x, offTop.x, t);
    vY = lerp(vanillaBreakdown.y, offTop.y, t);
    vS = lerp(0.92, 0.6, t);
    vR = lerp(-4, -12, t);
    vO = 1 - t;
  } else {
    vX = offTop.x; vY = offTop.y; vS = 0.6; vR = -12; vO = 0;
  }
  if (scrollY >= cHide) vO = 0;

  // ---------- CHOCOLATE ----------
  let cX, cY, cS, cR, cO = 1;

  const cA = vA;
  const cB = vB;
  const cC = Math.max(cardsPassed, cB + 1); // card scrolled past: vanish
  const cD = cC + vh * 0.06;                               // gone almost instantly
  const cE = tChoco - vh * 0.25;    // slide in as the chocolate section arrives
  const cF = tChoco + vh * 0.1;     // locked beside the chocolate copy (mirrors vanilla)
  const cG = Math.max(tPre - vh * 0.45, cF + 1); // hold until just before "Pick your fuel"
  const cH = cG + vh * 0.06;                     // then vanish almost instantly

  if (scrollY < cA) {
    cX = heroC.x; cY = heroC.y; cS = 0.8; cR = 10;
  } else if (scrollY < cB) {
    const t = clamp01((scrollY - cA) / (cB - cA));
    cX = lerp(heroC.x, chocoCardTarget.x, t);
    cY = lerp(heroC.y, chocoCardTarget.y, t);
    cS = lerp(0.8, 0.58, t);
    cR = lerp(10, 0, t);
  } else if (scrollY < cC) {
    cX = chocoCardTarget.x; cY = chocoCardTarget.y; cS = 0.58; cR = 0;
  } else if (scrollY < cD) {
    const t = clamp01((scrollY - cC) / (cD - cC));
    cX = chocoCardTarget.x; cY = chocoCardTarget.y;
    cS = lerp(0.58, 0.5, t); cR = 0;
    cO = 1 - t;
  } else if (scrollY < cE) {
    cX = offR.x; cY = offR.y; cS = 0.6; cR = 12; cO = 0;
  } else if (scrollY < cF) {
    const t = clamp01((scrollY - cE) / (cF - cE));
    cX = lerp(offR.x, chocoBreakdown.x, t);
    cY = chocoBreakdown.y;
    cS = lerp(0.6, 0.92, t);
    cR = lerp(12, -4, t);
    cO = t;
  } else if (scrollY < cG) {
    cX = chocoBreakdown.x; cY = chocoBreakdown.y; cS = 0.92; cR = -4; cO = 1;
  } else if (scrollY < cH) {
    const t = clamp01((scrollY - cG) / (cH - cG));
    cX = chocoBreakdown.x; cY = chocoBreakdown.y;
    cS = lerp(0.92, 0.8, t); cR = -4;
    cO = 1 - t;
  } else {
    cX = chocoBreakdown.x; cY = chocoBreakdown.y; cS = 0.8; cR = -4; cO = 0;
  }
  if (scrollY >= cHide) cO = 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      <MobileBottle x={vX} y={vY} scale={vS} rotate={vR} opacity={vO} src={vanillaBottle} alt="Vanilla Protein Bottle" glow="245,158,11" />
      <MobileBottle x={cX} y={cY} scale={cS} rotate={cR} opacity={cO} src={chocoBottle} alt="Chocolate Protein Bottle" glow="217,119,6" />
    </div>
  );
}

function MobileBottle({ x, y, scale, rotate, opacity, src, alt, glow }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "min(26vw, 108px)",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* One-time fade-up on load; scroll movement below is applied directly so the
          bottle stays locked to the page instead of trailing behind it */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          style={{
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`,
            opacity,
            transition: "opacity 150ms linear",
            willChange: "transform, opacity",
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto"
            style={{ filter: `drop-shadow(0 15px 30px rgba(${glow},0.4))` }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// DESKTOP STAGE (unchanged)
// ============================================================
function DesktopBottleStage({ scrollY, offsets }) {
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  const [cardCenters, setCardCenters] = useState({ left: -264, right: 264 });

  useEffect(() => {
    const measure = () => {
      const lc = document.getElementById("vanillaCard");
      const rc = document.getElementById("chocoCard");
      if (!lc || !rc) return;
      const lr = lc.getBoundingClientRect();
      const rr = rc.getBoundingClientRect();
      const cxx = window.innerWidth / 2;
      setCardCenters({
        left: lr.left + lr.width / 2 - cxx,
        right: rr.left + rr.width / 2 - cxx,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    const t1 = setTimeout(measure, 200);
    const t2 = setTimeout(measure, 1000);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const heroEnd       = offsets.flavors          || 0;
  const vanillaStart  = offsets.vanillaBreakdown || 0;
  const chocoStart    = offsets.chocoBreakdown   || 0;
  const preorderStart = offsets.preorder || Number.POSITIVE_INFINITY;

  const stickyWindow = vh * 1.35;
  const glideEnd = Math.max(heroEnd - vh * 0.3, 240);
  const holdEnd  = heroEnd + stickyWindow;
  const transLen = Math.max(vanillaStart - holdEnd, 1);

  const chocoExitStart   = holdEnd;
  const chocoExitEnd     = holdEnd + transLen * 0.28;
  const vanillaMoveStart = holdEnd;
  const vanillaMoveEnd   = holdEnd + transLen * 0.48;
  const vanillaFadeStart = Math.max(chocoStart - vh * 0.58, vanillaMoveEnd + 1);
  const vanillaFadeEnd   = Math.max(chocoStart - vh * 0.3, vanillaFadeStart + 1);
  const chocoInStart     = Math.max(chocoStart - vh * 0.48, vanillaFadeEnd + 1);
  const chocoInEnd       = chocoStart;
  const chocoFadeStart   = Math.max(chocoStart + vh * 0.35, preorderStart - vh * 0.45);
  const chocoFadeEnd     = Math.max(chocoFadeStart + 1, preorderStart);

  const heroVanillaX = -0.4 * vw;
  const heroChocoX   =  0.4 * vw;
  const cardLeftX    = cardCenters.left + Math.min(vw * 0.08, 120);
  const cardRightX   = cardCenters.right + Math.min(vw * 0.08, 120);
  const vanillaSlotX = -0.34 * vw;
  const vanillaOffX  = -0.75 * vw;
  const chocoSlotX   =  0.32 * vw;
  const chocoOffX    =  0.95 * vw;

  let vX, vS, vO = 1, vR;
  if (scrollY < glideEnd) {
    const t = clamp01(scrollY / glideEnd);
    vX = lerp(heroVanillaX, cardLeftX, t);
    vS = lerp(1, 0.55, t);
    vR = lerp(-8, 0, t);
  } else if (scrollY < vanillaMoveStart) {
    vX = cardLeftX; vS = 0.55; vR = 0;
  } else if (scrollY < vanillaMoveEnd) {
    const t = clamp01((scrollY - vanillaMoveStart) / (vanillaMoveEnd - vanillaMoveStart));
    vX = lerp(cardLeftX, vanillaSlotX, t);
    vS = lerp(0.55, 1, t);
    vR = lerp(0, -8, t);
  } else if (scrollY < vanillaFadeStart) {
    vX = vanillaSlotX; vS = 1; vR = -8;
  } else if (scrollY < vanillaFadeEnd) {
    const t = clamp01((scrollY - vanillaFadeStart) / (vanillaFadeEnd - vanillaFadeStart));
    vX = lerp(vanillaSlotX, vanillaOffX, t);
    vS = lerp(1, 0.3, t);
    vO = 1 - t;
    vR = lerp(-8, -25, t);
  } else {
    vX = vanillaOffX; vS = 0.3; vO = 0; vR = -25;
  }

  let cX, cS, cO = 1, cR;
  if (scrollY < glideEnd) {
    const t = clamp01(scrollY / glideEnd);
    cX = lerp(heroChocoX, cardRightX, t);
    cS = lerp(1, 0.55, t);
    cR = lerp(8, 0, t);
  } else if (scrollY < chocoExitStart) {
    cX = cardRightX; cS = 0.55; cR = 0;
  } else if (scrollY < chocoExitEnd) {
    const t = clamp01((scrollY - chocoExitStart) / (chocoExitEnd - chocoExitStart));
    cX = lerp(cardRightX, chocoOffX, t);
    cS = lerp(0.55, 0.2, t);
    cO = 1 - t;
    cR = lerp(0, 25, t);
  } else if (scrollY < chocoInStart) {
    cX = chocoOffX; cS = 0.2; cO = 0; cR = 25;
  } else if (scrollY < chocoInEnd) {
    const t = clamp01((scrollY - chocoInStart) / (chocoInEnd - chocoInStart));
    cX = lerp(chocoOffX, chocoSlotX, t);
    cS = lerp(0.2, 1, t);
    cO = t;
    cR = lerp(25, 8, t);
  } else if (scrollY < chocoFadeStart) {
    cX = chocoSlotX; cS = 1; cO = 1; cR = 8;
  } else if (scrollY < chocoFadeEnd) {
    const t = clamp01((scrollY - chocoFadeStart) / (chocoFadeEnd - chocoFadeStart));
    cX = lerp(chocoSlotX, chocoOffX, t);
    cS = lerp(1, 0.35, t);
    cO = 1 - t;
    cR = lerp(8, 25, t);
  } else {
    cX = chocoOffX; cS = 0.35; cO = 0; cR = 25;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ x: -1.5 * vw, rotate: -35, opacity: 0, scale: 0.5 }}
        animate={{ x: vX, rotate: vR, opacity: vO, scale: vS }}
        transition={{ type: "spring", stiffness: 130, damping: 22 }}
        className="absolute w-[68px] sm:w-[108px] md:w-[165px] lg:w-[195px]"
      >
        <img src={vanillaBottle} alt="Vanilla Protein Bottle" className="w-full h-auto drop-shadow-[0_25px_45px_rgba(245,158,11,0.35)]" />
      </motion.div>
      <motion.div
        initial={{ x: 1.5 * vw, rotate: 35, opacity: 0, scale: 0.5 }}
        animate={{ x: cX, rotate: cR, opacity: cO, scale: cS }}
        transition={{ type: "spring", stiffness: 130, damping: 22 }}
        className="absolute w-[68px] sm:w-[108px] md:w-[165px] lg:w-[195px]"
      >
        <img src={chocoBottle} alt="Chocolate Protein Bottle" className="w-full h-auto drop-shadow-[0_25px_45px_rgba(217,119,6,0.35)]" />
      </motion.div>
    </div>
  );
}

// ============================================================
// MAIN EXPORT
// ============================================================
export default function BottleStage({ scrollY, offsets }) {
  const ready = Object.keys(offsets).length > 0;
  if (!ready) return <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" />;

  const vw = window.innerWidth;
  if (vw < 768) return <MobileBottleStage scrollY={scrollY} offsets={offsets} />;
  return <DesktopBottleStage scrollY={scrollY} offsets={offsets} />;
}