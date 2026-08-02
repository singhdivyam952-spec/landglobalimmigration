const BrandLogo = ({
  className = 'h-11 w-11',
  showText = true,
  textClassName = '',
  inverted = false,
}) => (
  <div className={`flex min-w-0 items-center gap-2 sm:gap-3 ${textClassName}`}>
    <img
      src="/logo.png"
      alt="Land Global Immigration"
      className={`${className} shrink-0 rounded-full bg-white object-contain p-0.5 shadow-sm ring-1 ring-black/10`}
    />
    {showText && (
      <div className="min-w-0 leading-tight">
        <p
          className={`truncate text-sm font-bold sm:text-base md:text-lg ${
            inverted ? 'text-white' : 'text-navy'
          }`}
        >
          Land <span className="text-primary">Global</span>
        </p>
        <p
          className={`text-[9px] font-semibold uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.2em] ${
            inverted ? 'text-white/70' : 'text-muted'
          }`}
        >
          Immigration
        </p>
      </div>
    )}
  </div>
);

export default BrandLogo;
