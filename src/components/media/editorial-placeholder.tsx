export function EditorialPlaceholder({ label, tone = "purple", className = "" }: { label: string; tone?: "purple" | "gold" | "ink" | "ivory"; className?: string }) {
  const tones = {
    purple: "from-asoebi-purple-950 via-asoebi-purple-700 to-asoebi-purple-300 text-white",
    gold: "from-asoebi-gold-950 via-asoebi-gold-500 to-asoebi-gold-100 text-asoebi-ink",
    ink: "from-asoebi-ink via-asoebi-graphite to-asoebi-purple-900 text-white",
    ivory: "from-asoebi-mist via-asoebi-ivory to-asoebi-gold-100 text-asoebi-ink",
  };
  return <div role="img" aria-label={`${label} , development media placeholder`} className={`relative overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}><div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(115deg,transparent_0,transparent_12%,currentColor_12.2%,transparent_12.6%)]"/><span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.2em]">{label} · image pending</span></div>;
}
