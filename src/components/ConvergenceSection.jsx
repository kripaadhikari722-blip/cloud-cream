export default function ConvergenceSection() {
  return (
    <section id="flavors" className="relative md:h-[190vh]">
      <div className="md:sticky md:top-0 md:h-screen overflow-hidden flex flex-col items-center justify-center px-6 py-16 md:py-0">
        <div className="max-w-5xl w-full mx-auto text-center mb-8 md:mb-12">
          <span className="eyebrow eyebrow-vanilla">
            Dual Formula Fusion
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-ink mt-2 mb-4">
            Two Iconic Flavors. Perfected Science.
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto text-sm sm:text-base">
            Scroll down to lock both formulas into their individual breakdown
            stations.
          </p>
        </div>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Vanilla card */}
          <div
            id="vanillaCard"
            className="flavor-card flavor-card-vanilla rounded-3xl p-6 sm:p-8 h-[340px] sm:h-[430px] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 font-display font-black text-8xl text-amber-400 select-none pointer-events-none">
              01
            </div>
            <div className="flavor-card-copy relative z-30 max-w-[55%] sm:max-w-[48%]">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 md:mb-4">
                Creamy Vanilla Bean
              </div>
              <h3 className="text-xl sm:text-3xl font-display font-bold text-ink">
                Pure Velvet Hydration
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-2">
                Crafted with authentic Madagascar vanilla extract and
                micro-filtered whey for a smooth milk-shake finish.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-stone-600 pt-3 md:pt-4 border-t border-amber-500/30">
              <span>30g Isolate</span>
              <span>0g Sugar</span>
              <span>160 Calories</span>
            </div>
          </div>

          {/* Chocolate card */}
          <div
            id="chocoCard"
            className="flavor-card flavor-card-chocolate rounded-3xl p-6 sm:p-8 h-[340px] sm:h-[430px] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 font-display font-black text-8xl text-amber-600 select-none pointer-events-none">
              02
            </div>
            <div className="flavor-card-copy relative z-30 max-w-[55%] sm:max-w-[48%]">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-700/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 md:mb-4">
                Dutch Dark Cocoa
              </div>
              <h3 className="text-xl sm:text-3xl font-display font-bold text-ink">
                Decadent Cocoa Crush
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-2">
                Rich organic dark cocoa fused with essential amino acids to
                deliver maximum muscle recovery without sugar crash.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-stone-600 pt-3 md:pt-4 border-t border-orange-700/20">
              <span>30g Isolate</span>
              <span>7g BCAAs</span>
              <span>165 Calories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}