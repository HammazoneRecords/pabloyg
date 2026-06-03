import { Info } from 'lucide-react';
export default function WorkingDraftBanner({ artist }: { artist: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] px-4 py-2 flex items-center justify-center gap-2"
      style={{ background: 'rgba(245,158,11,0.08)', borderTop: '1px solid rgba(245,158,11,0.2)' }}>
      <Info size={13} style={{ color: 'rgba(251,191,36,0.85)', flexShrink: 0 }} />
      <p className="font-ui text-[10px] uppercase tracking-widest text-center" style={{ color: 'rgba(251,191,36,0.65)' }}>
        Working draft — buyer assumes responsibility for clearing image &amp; likeness rights with {artist}. Available for{' '}
        <a href="https://mindwaveja.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>purchase</a>.
      </p>
    </div>
  );
}
