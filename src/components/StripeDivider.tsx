interface StripeDividerProps {
  variant?: 'default' | 'bold' | 'subtle';
  flip?: boolean;
}

export default function StripeDivider({ variant = 'default', flip = false }: StripeDividerProps) {
  const height = variant === 'bold' ? 'h-16 sm:h-24' : variant === 'subtle' ? 'h-8 sm:h-12' : 'h-12 sm:h-16';

  return (
    <div className={`relative ${height} overflow-hidden ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,0 200,100 0,100" fill="#F5A623" opacity="0.12" />
        <polygon points="120,0 400,100 220,100 0,20" fill="#C4C4C4" opacity="0.06" />
        <polygon points="320,0 620,100 440,100 180,0" fill="#F5A623" opacity="0.18" />
        <polygon points="540,0 800,100 640,100 360,0" fill="#0A0A0A" opacity="0.35" />
        <polygon points="720,0 980,100 820,100 560,0" fill="#F5A623" opacity="0.14" />
        <polygon points="900,0 1120,100 980,100 740,0" fill="#C4C4C4" opacity="0.08" />
        <polygon points="1060,0 1280,100 1140,100 920,0" fill="#F5A623" opacity="0.16" />
        <polygon points="1220,0 1440,80 1440,100 1300,100 1100,0" fill="#0A0A0A" opacity="0.25" />

        {variant === 'bold' && (
          <>
            <line x1="0" y1="35" x2="1440" y2="25" stroke="#F5A623" strokeWidth="2" opacity="0.25" />
            <line x1="0" y1="65" x2="1440" y2="55" stroke="#C4C4C4" strokeWidth="1" opacity="0.12" />
            <line x1="0" y1="80" x2="1440" y2="75" stroke="#F5A623" strokeWidth="0.5" opacity="0.15" />
          </>
        )}

        {variant === 'default' && (
          <line x1="0" y1="50" x2="1440" y2="40" stroke="#F5A623" strokeWidth="1" opacity="0.18" />
        )}
      </svg>
    </div>
  );
}
