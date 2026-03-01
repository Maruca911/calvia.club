interface StripeDividerProps {
  variant?: 'default' | 'bold' | 'subtle';
  flip?: boolean;
}

export default function StripeDivider({ variant = 'default', flip = false }: StripeDividerProps) {
  const height = variant === 'bold' ? 'h-20 sm:h-28' : variant === 'subtle' ? 'h-10 sm:h-14' : 'h-14 sm:h-20';

  return (
    <div className={`relative ${height} overflow-hidden ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,0 280,100 0,100" className="fill-amber-500/[0.06]" />
        <polygon points="200,0 560,100 320,100 0,0" className="fill-silver-300/[0.04]" />
        <polygon points="480,0 800,100 620,100 280,0" className="fill-amber-500/[0.08]" />
        <polygon points="720,0 1020,100 860,100 540,0" className="fill-charcoal-800/30" />
        <polygon points="960,0 1200,100 1060,100 800,0" className="fill-silver-300/[0.05]" />
        <polygon points="1140,0 1440,80 1440,100 1200,100 960,0" className="fill-amber-500/[0.06]" />

        {variant === 'bold' && (
          <>
            <line x1="0" y1="50" x2="1440" y2="30" stroke="#F5A623" strokeWidth="1" opacity="0.15" />
            <line x1="0" y1="70" x2="1440" y2="60" stroke="#C4C4C4" strokeWidth="0.5" opacity="0.08" />
          </>
        )}
      </svg>
    </div>
  );
}
