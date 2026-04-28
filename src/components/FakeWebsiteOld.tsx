import React from 'react';
import { COLORS } from '../constants';

// Simulates an outdated, cluttered, visually ugly website UI
export const FakeWebsiteOld: React.FC = () => (
  <div
    style={{
      width: 680,
      backgroundColor: '#E8E0D0',
      borderRadius: 16,
      overflow: 'hidden',
      border: '2px solid #C8B89A',
      fontFamily: 'Georgia, serif',
    }}
  >
    {/* Old browser chrome */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 18px',
        backgroundColor: '#D0C8B8',
        borderBottom: '2px solid #B8A888',
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
          backgroundColor: '#F5F0E8',
          borderRadius: 4,
          border: '1px solid #B0A080',
          marginLeft: 8,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <span style={{ color: '#888', fontSize: 15 }}>http://meinewebsite.de</span>
      </div>
    </div>

    {/* Outdated hero area */}
    <div style={{ backgroundColor: '#2244AA', padding: '20px 24px' }}>
      <div style={{ color: '#FFFF00', fontSize: 28, fontWeight: 900, textAlign: 'center' }}>
        ★ WILLKOMMEN BEI UNS ★
      </div>
      <div style={{ color: '#FF8800', fontSize: 14, textAlign: 'center', marginTop: 6 }}>
        Klicken Sie hier für mehr Informationen!!!
      </div>
    </div>

    {/* Body content */}
    <div style={{ padding: '18px 24px', display: 'flex', gap: 12 }}>
      {/* Left column */}
      <div style={{ flex: 1 }}>
        {/* Table-based layout sim */}
        <div style={{ border: '1px solid #AAAAAA', padding: 10, backgroundColor: '#F5F5DC' }}>
          <div style={{ color: '#000080', fontSize: 13, fontWeight: 'bold', textDecoration: 'underline' }}>
            Über uns
          </div>
          <div style={{ width: '100%', height: 8, backgroundColor: '#DDDDCC', marginTop: 6, borderRadius: 2 }} />
          <div style={{ width: '80%', height: 8, backgroundColor: '#DDDDCC', marginTop: 4, borderRadius: 2 }} />
          <div style={{ width: '90%', height: 8, backgroundColor: '#DDDDCC', marginTop: 4, borderRadius: 2 }} />
        </div>
        <div style={{ border: '1px solid #AAAAAA', padding: 10, backgroundColor: '#FFFFF0', marginTop: 6 }}>
          <div style={{ color: '#008000', fontSize: 12, fontWeight: 'bold' }}>Neuigkeiten</div>
          <div style={{ color: '#000', fontSize: 11, marginTop: 4 }}>
            ▶ Wichtige Information 2009
          </div>
        </div>
      </div>
      {/* Right: ugly image placeholder */}
      <div
        style={{
          width: 120,
          backgroundColor: '#CCCCFF',
          border: '2px solid #8888CC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          color: '#4444AA',
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
        backgroundColor: '#C0C0C0',
        borderTop: '2px solid #A0A0A0',
        padding: '8px 24px',
        fontSize: 11,
        color: '#444',
        textAlign: 'center',
      }}
    >
      © 2009 Muster GmbH | Impressum | Datenschutz | Sitemap
    </div>
  </div>
);
