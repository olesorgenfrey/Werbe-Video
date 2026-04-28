import React from 'react';
import { COLORS } from '../constants';

// Simulates an outdated, cluttered, visually ugly website UI
export const FakeWebsiteOld: React.FC = () => (
  <div
    style={{
      width: 680,
      backgroundColor: COLORS.dark,
      borderRadius: 16,
      overflow: 'hidden',
      border: `2px solid ${COLORS.gray}`,
      fontFamily: 'Georgia, serif',
    }}
  >
    {/* Old browser chrome */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 18px',
        backgroundColor: COLORS.gray,
        borderBottom: `2px solid ${COLORS.gray}`,
        gap: 10,
      }}
    >
      <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
      <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
      <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#28C840' }} />
      <div
        style={{
          flex: 1,
          height: 28,
          backgroundColor: COLORS.bg,
          borderRadius: 4,
          border: `1px solid ${COLORS.dark}`,
          marginLeft: 8,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <span style={{ color: COLORS.gray, fontSize: 15 }}>http://meinewebsite.de</span>
      </div>
    </div>

    {/* Outdated hero area */}
    <div style={{ backgroundColor: COLORS.gray, padding: '20px 24px' }}>
      <div style={{ color: COLORS.text, fontSize: 28, fontWeight: 900, textAlign: 'center' }}>
        ★ WILLKOMMEN BEI UNS ★
      </div>
      <div style={{ color: COLORS.text, fontSize: 14, textAlign: 'center', marginTop: 6 }}>
        Klicken Sie hier für mehr Informationen!!!
      </div>
    </div>

    {/* Body content */}
    <div style={{ padding: '18px 24px', display: 'flex', gap: 12, backgroundColor: COLORS.bg }}>
      {/* Left column */}
      <div style={{ flex: 1 }}>
        <div style={{ border: `1px solid ${COLORS.dark}`, padding: 10, backgroundColor: COLORS.bg }}>
          <div style={{ color: COLORS.accent, fontSize: 13, fontWeight: 'bold', textDecoration: 'underline' }}>
            Über uns
          </div>
          <div style={{ width: '100%', height: 8, backgroundColor: COLORS.gray, marginTop: 6, borderRadius: 2 }} />
          <div style={{ width: '80%', height: 8, backgroundColor: COLORS.gray, marginTop: 4, borderRadius: 2 }} />
          <div style={{ width: '90%', height: 8, backgroundColor: COLORS.gray, marginTop: 4, borderRadius: 2 }} />
        </div>
        <div style={{ border: `1px solid ${COLORS.dark}`, padding: 10, backgroundColor: COLORS.bg, marginTop: 6 }}>
          <div style={{ color: COLORS.gray, fontSize: 12, fontWeight: 'bold' }}>Neuigkeiten</div>
          <div style={{ color: COLORS.text, fontSize: 11, marginTop: 4 }}>
            ▶ Wichtige Information 2009
          </div>
        </div>
      </div>
      {/* Right: ugly image placeholder */}
      <div
        style={{
          width: 120,
          backgroundColor: COLORS.gray,
          border: `2px solid ${COLORS.dark}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          color: COLORS.text,
          textAlign: 'center',
          padding: 6,
        }}
      >
        BILD<br />NICHT<br />VERFÜGBAR
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        backgroundColor: COLORS.dark,
        borderTop: `2px solid ${COLORS.gray}`,
        padding: '8px 24px',
        fontSize: 11,
        color: COLORS.text,
        textAlign: 'center',
      }}
    >
      © 2009 Muster GmbH | Impressum | Datenschutz | Sitemap
    </div>
  </div>
);
