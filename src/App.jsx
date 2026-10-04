import BottleStage from "./components/BottleStage";
import ConvergenceSection from "./components/ConvergenceSection";
import { useScrollProgress } from "./hooks/useScrollProgress";
import vanillaSplash from "./assets/images/vanilla-splash.png";
import chocoSplash from "./assets/images/choco-splash.png";

export default function App() {
  const { scrollY, offsets } = useScrollProgress([
    "heroSection",
    "flavors",
    "vanillaBreakdown",
    "chocoBreakdown",
    "preorder",
  ]);
  const splashOpacity = Math.max(0, 1 - scrollY / 90);

  return (
    <div className="relative">
      <div
        className="splash-background"
        aria-hidden="true"
        style={{ opacity: splashOpacity }}
      >
        <img
          src={vanillaSplash}
          alt=""
          className="splash-image splash-image-vanilla"
        />
        <img
          src={chocoSplash}
          alt=""
          className="splash-image splash-image-chocolate"
        />
      </div>
      <BottleStage scrollY={scrollY} offsets={offsets} />

      <main className="relative">
        <section
          id="heroSection"
          className="relative min-h-screen flex items-center justify-center px-6"
        >
          <div className="hero-copy text-center max-w-4xl relative z-30 pointer-events-none">
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-center leading-none text-ink">
              FUEL YOUR{" "}
              <span className="text-gradient-vanilla">POTENTIAL.</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-center text-stone-500 text-sm sm:text-base">
              Two flavors. Zero compromise. Thirty grams of ultra-pure grass-fed
              whey isolate per bottle.
            </p>
          </div>
        </section>

        <ConvergenceSection />

        <section
          id="vanillaBreakdown"
          className="scene scene-vanilla min-h-[105vh] flex items-center px-6"
        >
          <div className="breakdown-copy max-w-md ml-auto mr-[8vw]">
            <span className="eyebrow eyebrow-vanilla">01 / Vanilla formula</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-ink mt-3">
              Soft taste.<br />Serious fuel.
            </h2>
            <p className="text-stone-500 mt-5 leading-relaxed">
              Madagascar vanilla, grass-fed whey isolate, and a clean finish made
              for the everyday work of getting stronger.
            </p>
            <div className="nutrition-grid mt-8">
              <div><strong>30g</strong><span>Protein</span></div>
              <div><strong>0g</strong><span>Added sugar</span></div>
              <div><strong>160</strong><span>Calories</span></div>
            </div>
          </div>
        </section>

        <section
          id="chocoBreakdown"
          className="scene scene-chocolate min-h-[105vh] flex items-center px-6"
        >
          <div className="breakdown-copy max-w-md mr-auto ml-[8vw]">
            <span className="eyebrow eyebrow-chocolate">02 / Chocolate formula</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-ink mt-3">
              Dark cocoa.<br />Deep recovery.
            </h2>
            <p className="text-stone-500 mt-5 leading-relaxed">
              Dutch cocoa and essential amino acids in a rich, balanced shake
              that works as hard as you do, without the sugar crash.
            </p>
            <div className="nutrition-grid mt-8">
              <div><strong>30g</strong><span>Protein</span></div>
              <div><strong>7g</strong><span>BCAAs</span></div>
              <div><strong>165</strong><span>Calories</span></div>
            </div>
          </div>
        </section>

        <section
          id="preorder"
          className="scene scene-preorder min-h-screen flex items-center justify-center px-6"
        >
          <div className="preorder-panel text-center max-w-xl">
            <span className="eyebrow">The first pour is almost here</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-ink mt-3">
              Pick your fuel.
            </h2>
            <p className="text-stone-500 mt-5">
              Join the early access list for first-batch availability and launch-day pricing.
            </p>
            <form className="preorder-form mt-8" onSubmit={(event) => event.preventDefault()}>
              <input type="email" aria-label="Email address" placeholder="Your email address" required />
              <button type="submit">Get early access</button>
            </form>
          </div>
        </section>
      </main>
      <footer className="border-t border-stone-200 px-6 py-8 text-stone-500 text-xs flex flex-col sm:flex-row justify-between gap-3">
        <span className="font-display font-bold tracking-[0.2em] text-ink">PULSE / PROTEIN</span>
        <span>Vanilla + Chocolate / Made for momentum</span>
      </footer>
    </div>
  );
}