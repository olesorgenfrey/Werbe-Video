/**
 * Generates voice-over audio for the 16s Werbe-Video using Fish Audio TTS API.
 * Usage: FISH_API_KEY=<key> [FISH_VOICE_ID=<id>] node scripts/generate-voiceover.mjs
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const API_KEY = process.env.FISH_API_KEY;
// Default: Bella voice (Fish Audio built-in German-capable voice)
// Replace with your own reference_id if you have a custom voice
const VOICE_ID = process.env.FISH_VOICE_ID || 'b0418b09f45b4327a4dd03a0e6b0e782';

const VOICEOVER_TEXT =
  'Deine Website kostet dich Kunden. ' +
  'Sie ist langsam, unmodern und unsichtbar. ' +
  'Das ändern wir. ' +
  'Wir bauen Websites, die verkaufen – schnell, modern, automatisch. ' +
  'Jetzt kostenlos beraten lassen.';

if (!API_KEY) {
  console.error('Error: FISH_API_KEY environment variable is required.');
  console.error('Usage: FISH_API_KEY=<your-key> node scripts/generate-voiceover.mjs');
  process.exit(1);
}

async function generateVoiceOver() {
  console.log('Generating voice-over via Fish Audio API...');
  console.log(`Text: "${VOICEOVER_TEXT}"`);
  console.log(`Voice ID: ${VOICE_ID}`);

  const response = await fetch('https://api.fish.audio/v1/tts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: VOICEOVER_TEXT,
      reference_id: VOICE_ID,
      format: 'mp3',
      mp3_bitrate: 128,
      normalize: true,
      latency: 'normal',
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Fish Audio API error ${response.status}: ${errText}`);
  }

  const buffer = await response.arrayBuffer();
  const outputDir = join(ROOT, 'public');
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, 'voiceover.mp3');
  writeFileSync(outputPath, Buffer.from(buffer));

  console.log(`\nVoice-over saved to: public/voiceover.mp3`);
  console.log(`File size: ${(buffer.byteLength / 1024).toFixed(1)} KB`);
}

generateVoiceOver().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});
