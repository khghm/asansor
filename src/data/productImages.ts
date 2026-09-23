// SVG illustrations for elevator products - realistic and high quality

export const productImages: Record<string, string> = {
  // Motor - realistic industrial motor illustration
  'motor': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="motorBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6b7280"/>
      <stop offset="30%" style="stop-color:#4b5563"/>
      <stop offset="70%" style="stop-color:#374151"/>
      <stop offset="100%" style="stop-color:#1f2937"/>
    </linearGradient>
    <linearGradient id="motorShine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#9ca3af;stop-opacity:0.6"/>
      <stop offset="50%" style="stop-color:#d1d5db;stop-opacity:0.8"/>
      <stop offset="100%" style="stop-color:#9ca3af;stop-opacity:0.6"/>
    </linearGradient>
    <radialGradient id="copperWind" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#f59e0b"/>
      <stop offset="50%" style="stop-color:#d97706"/>
      <stop offset="100%" style="stop-color:#92400e"/>
    </radialGradient>
    <filter id="shadow1"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <rect x="0" y="480" width="800" height="120" fill="#e2e8f0" opacity="0.5"/>
  <!-- Motor base -->
  <rect x="200" y="420" width="400" height="60" rx="5" fill="#374151" filter="url(#shadow1)"/>
  <rect x="220" y="430" width="360" height="10" rx="2" fill="#4b5563"/>
  <!-- Motor body -->
  <ellipse cx="400" cy="300" rx="180" ry="140" fill="url(#motorBody)" filter="url(#shadow1)"/>
  <!-- Cooling fins -->
  ${Array.from({length: 16}, (_, i) => {
    const angle = (i * 22.5) * Math.PI / 180;
    const x = 400 + Math.cos(angle) * 170;
    const y = 300 + Math.sin(angle) * 130;
    return `<rect x="${x-3}" y="${y-15}" width="6" height="30" rx="2" fill="#4b5563" transform="rotate(${i*22.5}, ${x}, ${y})"/>`;
  }).join('')}
  <!-- Motor front face -->
  <ellipse cx="400" cy="300" rx="120" ry="90" fill="#374151"/>
  <ellipse cx="400" cy="300" rx="100" ry="75" fill="url(#copperWind)"/>
  <!-- Center shaft -->
  <circle cx="400" cy="300" r="30" fill="#1f2937"/>
  <circle cx="400" cy="300" r="20" fill="#374151"/>
  <circle cx="400" cy="300" r="8" fill="#6b7280"/>
  <!-- Shine effect -->
  <ellipse cx="360" cy="260" rx="40" ry="20" fill="white" opacity="0.15"/>
  <!-- Mounting bolts -->
  <circle cx="240" cy="440" r="8" fill="#6b7280"/>
  <circle cx="560" cy="440" r="8" fill="#6b7280"/>
  <circle cx="240" cy="440" r="4" fill="#374151"/>
  <circle cx="560" cy="440" r="4" fill="#374151"/>
  <!-- Terminal box -->
  <rect x="350" y="160" width="100" height="50" rx="5" fill="#374151"/>
  <rect x="360" y="170" width="80" height="30" rx="3" fill="#1f2937"/>
  <circle cx="380" cy="185" r="5" fill="#ef4444"/>
  <circle cx="400" cy="185" r="5" fill="#22c55e"/>
  <circle cx="420" cy="185" r="5" fill="#3b82f6"/>
</svg>`)}`,

  // Control panel
  'panel': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="panelBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e5e7eb"/>
      <stop offset="50%" style="stop-color:#d1d5db"/>
      <stop offset="100%" style="stop-color:#9ca3af"/>
    </linearGradient>
    <linearGradient id="screen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#064e3b"/>
      <stop offset="100%" style="stop-color:#065f46"/>
    </linearGradient>
    <filter id="shadow2"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.25"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Panel body -->
  <rect x="200" y="80" width="400" height="460" rx="10" fill="url(#panelBody)" filter="url(#shadow2)"/>
  <rect x="210" y="90" width="380" height="440" rx="8" fill="#f3f4f6" stroke="#9ca3af" stroke-width="2"/>
  <!-- Screen -->
  <rect x="240" y="120" width="320" height="120" rx="5" fill="url(#screen)"/>
  <text x="400" y="170" text-anchor="middle" fill="#10b981" font-family="monospace" font-size="24">ARMAND</text>
  <text x="400" y="200" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="14">FLOOR: 5 | STATUS: OK</text>
  <text x="400" y="225" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="12">SPEED: 1.5 m/s</text>
  <!-- Buttons row 1 -->
  ${Array.from({length: 8}, (_, i) => `<rect x="${250 + i*40}" y="270" width="30" height="30" rx="4" fill="${i<3?'#374151':'#6b7280'}" stroke="#4b5563" stroke-width="1"/><circle cx="${265 + i*40}" cy="285" r="4" fill="${i<3?'#ef4444':'#22c55e'}"/>`).join('')}
  <!-- Buttons row 2 -->
  ${Array.from({length: 6}, (_, i) => `<rect x="${270 + i*45}" y="320" width="35" height="35" rx="5" fill="#374151" stroke="#4b5563" stroke-width="1"/><text x="${287 + i*45}" y="342" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="sans-serif">${i+1}</text>`).join('')}
  <!-- LED indicators -->
  ${Array.from({length: 10}, (_, i) => `<circle cx="${260 + i*30}" cy="390" r="6" fill="${i%3===0?'#22c55e':i%3===1?'#eab308':'#ef4444'}" opacity="0.9"/>`).join('')}
  <!-- Circuit board area -->
  <rect x="240" y="420" width="320" height="80" rx="5" fill="#065f46" opacity="0.8"/>
  ${Array.from({length: 20}, (_, i) => `<rect x="${250 + (i%10)*30}" y="${430 + Math.floor(i/10)*35}" width="20" height="12" rx="2" fill="#1f2937"/>`).join('')}
  ${Array.from({length: 15}, (_, i) => `<line x1="${255 + i*20}" y1="425" x2="${255 + i*20}" y2="495" stroke="#10b981" stroke-width="0.5" opacity="0.5"/>`).join('')}
  <!-- Label -->
  <rect x="300" y="510" width="200" height="20" rx="3" fill="#374151"/>
  <text x="400" y="524" text-anchor="middle" fill="#d1d5db" font-size="10" font-family="sans-serif">MODEL: ARD-2024-PRO</text>
</svg>`)}`,

  // Rail
  'rail': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="steel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#9ca3af"/>
      <stop offset="30%" style="stop-color:#e5e7eb"/>
      <stop offset="50%" style="stop-color:#f3f4f6"/>
      <stop offset="70%" style="stop-color:#e5e7eb"/>
      <stop offset="100%" style="stop-color:#9ca3af"/>
    </linearGradient>
    <filter id="shadow3"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Rails -->
  <g filter="url(#shadow3)">
    <rect x="150" y="100" width="60" height="420" rx="2" fill="url(#steel)"/>
    <rect x="160" y="100" width="40" height="420" fill="#d1d5db"/>
    <rect x="170" y="100" width="20" height="420" fill="#e5e7eb"/>
  </g>
  <g filter="url(#shadow3)">
    <rect x="300" y="80" width="60" height="440" rx="2" fill="url(#steel)"/>
    <rect x="310" y="80" width="40" height="440" fill="#d1d5db"/>
    <rect x="320" y="80" width="20" height="440" fill="#e5e7eb"/>
  </g>
  <g filter="url(#shadow3)">
    <rect x="450" y="100" width="60" height="420" rx="2" fill="url(#steel)"/>
    <rect x="460" y="100" width="40" height="420" fill="#d1d5db"/>
    <rect x="470" y="100" width="20" height="420" fill="#e5e7eb"/>
  </g>
  <g filter="url(#shadow3)">
    <rect x="600" y="90" width="60" height="430" rx="2" fill="url(#steel)"/>
    <rect x="610" y="90" width="40" height="430" fill="#d1d5db"/>
    <rect x="620" y="90" width="20" height="430" fill="#e5e7eb"/>
  </g>
  <!-- T-shape top details -->
  ${[150,300,450,600].map(x => `<rect x="${x-10}" y="${x===300?75:95}" width="80" height="15" rx="2" fill="#9ca3af"/>`).join('')}
  <!-- Mounting holes -->
  ${[150,300,450,600].map(x => Array.from({length: 5}, (_, i) => `<circle cx="${x+30}" cy="${150+i*80}" r="5" fill="#6b7280"/><circle cx="${x+30}" cy="${150+i*80}" r="2" fill="#374151"/>`).join('')).join('')}
  <!-- Label -->
  <text x="400" y="565" text-anchor="middle" fill="#6b7280" font-size="14" font-family="sans-serif">T89/A GUIDE RAIL</text>
</svg>`)}`,

  // Cable
  'cable': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6b7280"/>
      <stop offset="30%" style="stop-color:#d1d5db"/>
      <stop offset="50%" style="stop-color:#f3f4f6"/>
      <stop offset="70%" style="stop-color:#d1d5db"/>
      <stop offset="100%" style="stop-color:#6b7280"/>
    </linearGradient>
    <radialGradient id="coilGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#9ca3af"/>
      <stop offset="60%" style="stop-color:#6b7280"/>
      <stop offset="100%" style="stop-color:#4b5563"/>
    </radialGradient>
    <filter id="shadow4"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.25"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Cable coil -->
  <ellipse cx="400" cy="320" rx="200" ry="180" fill="url(#coilGrad)" filter="url(#shadow4)"/>
  <ellipse cx="400" cy="320" rx="160" ry="140" fill="#4b5563"/>
  <ellipse cx="400" cy="320" rx="120" ry="100" fill="#374151"/>
  <!-- Cable strands -->
  ${Array.from({length: 24}, (_, i) => {
    const angle = (i * 15) * Math.PI / 180;
    const r = 140 + (i % 3) * 20;
    const x = 400 + Math.cos(angle) * r;
    const y = 320 + Math.sin(angle) * (r * 0.7);
    return `<circle cx="${x}" cy="${y}" r="4" fill="url(#cableGrad)" stroke="#9ca3af" stroke-width="0.5"/>`;
  }).join('')}
  <!-- Cable end coming out -->
  <path d="M 580 280 Q 620 260 660 240 Q 700 220 720 200" stroke="url(#cableGrad)" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M 580 280 Q 620 260 660 240 Q 700 220 720 200" stroke="#d1d5db" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
  <!-- Inner strands visible -->
  ${Array.from({length: 7}, (_, i) => {
    const angle = (i * 51) * Math.PI / 180;
    const x = 400 + Math.cos(angle) * 60;
    const y = 320 + Math.sin(angle) * 42;
    return `<circle cx="${x}" cy="${y}" r="12" fill="#6b7280" stroke="#9ca3af" stroke-width="1"/><circle cx="${x}" cy="${y}" r="6" fill="#d1d5db"/>`;
  }).join('')}
  <!-- Label -->
  <text x="400" y="550" text-anchor="middle" fill="#6b7280" font-size="14" font-family="sans-serif">STEEL WIRE ROPE 8mm</text>
</svg>`)}`,

  // Door
  'door': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="doorSteel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#9ca3af"/>
      <stop offset="20%" style="stop-color:#e5e7eb"/>
      <stop offset="40%" style="stop-color:#f9fafb"/>
      <stop offset="60%" style="stop-color:#e5e7eb"/>
      <stop offset="80%" style="stop-color:#d1d5db"/>
      <stop offset="100%" style="stop-color:#9ca3af"/>
    </linearGradient>
    <linearGradient id="doorFrame" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4b5563"/>
      <stop offset="100%" style="stop-color:#1f2937"/>
    </linearGradient>
    <filter id="shadow5"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Door frame -->
  <rect x="150" y="60" width="500" height="480" rx="5" fill="url(#doorFrame)" filter="url(#shadow5)"/>
  <rect x="165" y="75" width="470" height="450" rx="3" fill="#374151"/>
  <!-- Left door panel -->
  <rect x="175" y="85" width="220" height="430" rx="2" fill="url(#doorSteel)"/>
  <rect x="185" y="95" width="200" height="410" rx="1" fill="none" stroke="#d1d5db" stroke-width="1"/>
  <!-- Right door panel -->
  <rect x="405" y="85" width="220" height="430" rx="2" fill="url(#doorSteel)"/>
  <rect x="415" y="95" width="200" height="410" rx="1" fill="none" stroke="#d1d5db" stroke-width="1"/>
  <!-- Center line -->
  <line x1="400" y1="85" x2="400" y2="515" stroke="#6b7280" stroke-width="2"/>
  <!-- Door handles -->
  <rect x="370" y="280" width="8" height="40" rx="4" fill="#374151"/>
  <rect x="422" y="280" width="8" height="40" rx="4" fill="#374151"/>
  <!-- Reflection effects -->
  <rect x="200" y="100" width="3" height="380" fill="white" opacity="0.3"/>
  <rect x="430" y="100" width="3" height="380" fill="white" opacity="0.3"/>
  <rect x="250" y="100" width="1" height="380" fill="white" opacity="0.15"/>
  <rect x="480" y="100" width="1" height="380" fill="white" opacity="0.15"/>
  <!-- Sensor -->
  <rect x="360" y="65" width="80" height="15" rx="3" fill="#1f2937"/>
  <circle cx="400" cy="72" r="4" fill="#22c55e"/>
  <!-- Floor indicator -->
  <rect x="350" y="30" width="100" height="25" rx="5" fill="#1f2937"/>
  <text x="400" y="48" text-anchor="middle" fill="#22c55e" font-family="monospace" font-size="16">▲ ▼</text>
</svg>`)}`,

  // Cabin
  'cabin': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b"/>
      <stop offset="30%" style="stop-color:#fbbf24"/>
      <stop offset="50%" style="stop-color:#fcd34d"/>
      <stop offset="70%" style="stop-color:#fbbf24"/>
      <stop offset="100%" style="stop-color:#d97706"/>
    </linearGradient>
    <linearGradient id="mirror" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e0f2fe"/>
      <stop offset="50%" style="stop-color:#bae6fd"/>
      <stop offset="100%" style="stop-color:#7dd3fc"/>
    </linearGradient>
    <linearGradient id="ceiling" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#fef3c7"/>
      <stop offset="100%" style="stop-color:#fde68a"/>
    </linearGradient>
    <filter id="shadow6"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Cabin walls - perspective -->
  <!-- Floor -->
  <polygon points="100,500 700,500 650,350 150,350" fill="#78350f"/>
  <polygon points="100,500 700,500 650,350 150,350" fill="url(#gold)" opacity="0.3"/>
  <!-- Back wall -->
  <rect x="150" y="100" width="500" height="250" fill="url(#gold)"/>
  <!-- Left wall -->
  <polygon points="100,500 150,350 150,100 50,200" fill="#d97706"/>
  <!-- Right wall -->
  <polygon points="700,500 650,350 650,100 750,200" fill="#b45309"/>
  <!-- Ceiling -->
  <polygon points="50,200 150,100 650,100 750,200" fill="url(#ceiling)"/>
  <!-- Ceiling light -->
  <ellipse cx="400" cy="140" rx="80" ry="20" fill="#fef3c7" opacity="0.8"/>
  <ellipse cx="400" cy="140" rx="50" ry="12" fill="white" opacity="0.6"/>
  <!-- Mirror on back wall -->
  <rect x="250" y="130" width="300" height="200" rx="5" fill="url(#mirror)" filter="url(#shadow6)"/>
  <rect x="255" y="135" width="290" height="190" rx="3" fill="none" stroke="url(#gold)" stroke-width="3"/>
  <!-- Handrail -->
  <rect x="170" y="280" width="460" height="8" rx="4" fill="url(#gold)"/>
  <!-- Floor pattern -->
  ${Array.from({length: 5}, (_, i) => `<line x1="${200+i*80}" y1="350" x2="${150+i*100}" y2="500" stroke="#92400e" stroke-width="1" opacity="0.3"/>`).join('')}
  <!-- Button panel -->
  <rect x="600" y="180" width="40" height="120" rx="5" fill="#374151"/>
  ${Array.from({length: 5}, (_, i) => `<circle cx="620" cy="${200+i*22}" r="6" fill="#1f2937" stroke="#6b7280" stroke-width="1"/><text x="620" y="${204+i*22}" text-anchor="middle" fill="#d1d5db" font-size="8">${i+1}</text>`).join('')}
</svg>`)}`,

  // Inverter
  'inverter': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="invBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af"/>
      <stop offset="50%" style="stop-color:#1e3a8a"/>
      <stop offset="100%" style="stop-color:#172554"/>
    </linearGradient>
    <linearGradient id="invScreen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0c4a6e"/>
      <stop offset="100%" style="stop-color:#082f49"/>
    </linearGradient>
    <filter id="shadow7"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Main body -->
  <rect x="220" y="80" width="360" height="440" rx="10" fill="url(#invBody)" filter="url(#shadow7)"/>
  <rect x="230" y="90" width="340" height="420" rx="8" fill="#1e3a8a" stroke="#2563eb" stroke-width="1"/>
  <!-- Display screen -->
  <rect x="260" y="120" width="280" height="100" rx="5" fill="url(#invScreen)"/>
  <text x="400" y="155" text-anchor="middle" fill="#22d3ee" font-family="monospace" font-size="20">VVVF DRIVE</text>
  <text x="400" y="180" text-anchor="middle" fill="#67e8f9" font-family="monospace" font-size="14">50Hz | 380V | 15kW</text>
  <text x="400" y="205" text-anchor="middle" fill="#22d3ee" font-family="monospace" font-size="12">▶ RUNNING</text>
  <!-- LED bar -->
  ${Array.from({length: 8}, (_, i) => `<rect x="${280+i*30}" y="240" width="20" height="8" rx="2" fill="${i<6?'#22c55e':'#374151'}"/>`).join('')}
  <!-- Control buttons -->
  ${Array.from({length: 4}, (_, i) => `<circle cx="${300+i*60}" cy="290" r="15" fill="#172554" stroke="#3b82f6" stroke-width="2"/><text x="${300+i*60}" y="295" text-anchor="middle" fill="#93c5fd" font-size="10">${['RUN','STOP','FWD','REV'][i]}</text>`).join('')}
  <!-- Ventilation grills -->
  ${Array.from({length: 12}, (_, i) => `<rect x="260" y="${330+i*12}" width="280" height="4" rx="2" fill="#172554"/>`).join('')}
  <!-- Terminal connections -->
  <rect x="260" y="480" width="280" height="20" rx="3" fill="#172554"/>
  ${Array.from({length: 6}, (_, i) => `<circle cx="${290+i*45}" cy="490" r="6" fill="#374151" stroke="#6b7280" stroke-width="1.5"/>`).join('')}
  <!-- Brand label -->
  <rect x="340" y="100" width="120" height="15" rx="3" fill="#2563eb"/>
  <text x="400" y="111" text-anchor="middle" fill="white" font-size="9" font-weight="bold" font-family="sans-serif">ARMAND DRIVE</text>
</svg>`)}`,

  // Brake
  'brake': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="brakeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6b7280"/>
      <stop offset="50%" style="stop-color:#9ca3af"/>
      <stop offset="100%" style="stop-color:#4b5563"/>
    </linearGradient>
    <radialGradient id="brakeDisc" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#d1d5db"/>
      <stop offset="50%" style="stop-color:#9ca3af"/>
      <stop offset="100%" style="stop-color:#6b7280"/>
    </radialGradient>
    <filter id="shadow8"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Brake disc -->
  <circle cx="400" cy="300" r="160" fill="url(#brakeDisc)" filter="url(#shadow8)"/>
  <circle cx="400" cy="300" r="140" fill="#9ca3af"/>
  <circle cx="400" cy="300" r="120" fill="#6b7280"/>
  <!-- Disc pattern -->
  ${Array.from({length: 36}, (_, i) => {
    const angle = (i * 10) * Math.PI / 180;
    const x1 = 400 + Math.cos(angle) * 60;
    const y1 = 300 + Math.sin(angle) * 60;
    const x2 = 400 + Math.cos(angle) * 130;
    const y2 = 300 + Math.sin(angle) * 130;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#4b5563" stroke-width="1" opacity="0.3"/>`;
  }).join('')}
  <!-- Center hub -->
  <circle cx="400" cy="300" r="50" fill="#4b5563"/>
  <circle cx="400" cy="300" r="35" fill="#374151"/>
  <circle cx="400" cy="300" r="15" fill="#1f2937"/>
  <!-- Hub bolts -->
  ${Array.from({length: 6}, (_, i) => {
    const angle = (i * 60) * Math.PI / 180;
    const x = 400 + Math.cos(angle) * 25;
    const y = 300 + Math.sin(angle) * 25;
    return `<circle cx="${x}" cy="${y}" r="5" fill="#6b7280"/><circle cx="${x}" cy="${y}" r="2" fill="#374151"/>`;
  }).join('')}
  <!-- Brake caliper -->
  <rect x="320" y="140" width="160" height="60" rx="10" fill="url(#brakeMetal)" filter="url(#shadow8)"/>
  <rect x="340" y="155" width="120" height="30" rx="5" fill="#ef4444"/>
  <text x="400" y="175" text-anchor="middle" fill="white" font-size="12" font-weight="bold">BRAKE</text>
  <!-- Brake pads -->
  <rect x="340" y="200" width="50" height="30" rx="3" fill="#78350f"/>
  <rect x="410" y="200" width="50" height="30" rx="3" fill="#78350f"/>
  <!-- Mounting bracket -->
  <rect x="350" y="430" width="100" height="40" rx="5" fill="#4b5563"/>
  <circle cx="375" cy="450" r="6" fill="#6b7280"/>
  <circle cx="425" cy="450" r="6" fill="#6b7280"/>
</svg>`)}`,

  // Safety gear / Parachute
  'safety': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="safetyBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#dc2626"/>
      <stop offset="50%" style="stop-color:#b91c1c"/>
      <stop offset="100%" style="stop-color:#991b1b"/>
    </linearGradient>
    <linearGradient id="safetyMetal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6b7280"/>
      <stop offset="50%" style="stop-color:#d1d5db"/>
      <stop offset="100%" style="stop-color:#6b7280"/>
    </linearGradient>
    <filter id="shadow9"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Main housing -->
  <rect x="280" y="100" width="240" height="380" rx="10" fill="url(#safetyBody)" filter="url(#shadow9)"/>
  <rect x="290" y="110" width="220" height="360" rx="8" fill="#b91c1c" stroke="#dc2626" stroke-width="2"/>
  <!-- Warning stripes -->
  ${Array.from({length: 8}, (_, i) => `<rect x="290" y="${120+i*45}" width="220" height="20" fill="${i%2===0?'#fbbf24':'#1f2937'}" opacity="0.8"/>`).join('')}
  <!-- Safety text -->
  <rect x="320" y="200" width="160" height="40" rx="5" fill="#1f2937"/>
  <text x="400" y="225" text-anchor="middle" fill="#fbbf24" font-size="16" font-weight="bold" font-family="sans-serif">SAFETY</text>
  <!-- Mechanical parts -->
  <rect x="310" y="280" width="180" height="60" rx="5" fill="url(#safetyMetal)"/>
  <circle cx="350" cy="310" r="15" fill="#4b5563"/>
  <circle cx="400" cy="310" r="15" fill="#4b5563"/>
  <circle cx="450" cy="310" r="15" fill="#4b5563"/>
  <circle cx="350" cy="310" r="8" fill="#1f2937"/>
  <circle cx="400" cy="310" r="8" fill="#1f2937"/>
  <circle cx="450" cy="310" r="8" fill="#1f2937"/>
  <!-- Guide rails connection -->
  <rect x="250" y="370" width="30" height="100" rx="3" fill="url(#safetyMetal)"/>
  <rect x="520" y="370" width="30" height="100" rx="3" fill="url(#safetyMetal)"/>
  <!-- Springs -->
  ${Array.from({length: 5}, (_, i) => `<path d="M 340 ${400+i*12} Q 350 ${406+i*12} 360 ${400+i*12} Q 370 ${394+i*12} 380 ${400+i*12}" stroke="#6b7280" stroke-width="3" fill="none"/>`).join('')}
  ${Array.from({length: 5}, (_, i) => `<path d="M 420 ${400+i*12} Q 430 ${406+i*12} 440 ${400+i*12} Q 450 ${394+i*12} 460 ${400+i*12}" stroke="#6b7280" stroke-width="3" fill="none"/>`).join('')}
  <!-- Warning symbol -->
  <polygon points="400,130 420,165 380,165" fill="#fbbf24" stroke="#1f2937" stroke-width="2"/>
  <text x="400" y="160" text-anchor="middle" fill="#1f2937" font-size="20" font-weight="bold">!</text>
</svg>`)}`,

  // Sensor/Eye
  'sensor': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="sensorBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1f2937"/>
      <stop offset="100%" style="stop-color:#111827"/>
    </linearGradient>
    <radialGradient id="lens" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#ef4444"/>
      <stop offset="40%" style="stop-color:#dc2626"/>
      <stop offset="100%" style="stop-color:#7f1d1d"/>
    </radialGradient>
    <filter id="shadow10"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.3"/></filter>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Sensor body -->
  <rect x="280" y="200" width="240" height="200" rx="20" fill="url(#sensorBody)" filter="url(#shadow10)"/>
  <rect x="290" y="210" width="220" height="180" rx="15" fill="#1f2937" stroke="#374151" stroke-width="2"/>
  <!-- Lens -->
  <circle cx="400" cy="300" r="60" fill="#111827"/>
  <circle cx="400" cy="300" r="50" fill="url(#lens)" filter="url(#glow)"/>
  <circle cx="400" cy="300" r="30" fill="#7f1d1d"/>
  <circle cx="400" cy="300" r="15" fill="#450a0a"/>
  <circle cx="385" cy="285" r="8" fill="white" opacity="0.4"/>
  <!-- IR LEDs -->
  ${Array.from({length: 8}, (_, i) => {
    const angle = (i * 45) * Math.PI / 180;
    const x = 400 + Math.cos(angle) * 75;
    const y = 300 + Math.sin(angle) * 75;
    return `<circle cx="${x}" cy="${y}" r="6" fill="#7f1d1d" stroke="#991b1b" stroke-width="1"/>`;
  }).join('')}
  <!-- Status LED -->
  <circle cx="320" cy="240" r="5" fill="#22c55e" filter="url(#glow)"/>
  <text x="335" y="244" fill="#6b7280" font-size="10" font-family="sans-serif">PWR</text>
  <circle cx="460" cy="240" r="5" fill="#ef4444" filter="url(#glow)"/>
  <text x="475" y="244" fill="#6b7280" font-size="10" font-family="sans-serif">SIG</text>
  <!-- Cable -->
  <rect x="380" y="400" width="40" height="20" rx="5" fill="#374151"/>
  <path d="M 400 420 Q 400 460 420 480 Q 440 500 440 530" stroke="#374151" stroke-width="8" fill="none" stroke-linecap="round"/>
  <!-- Mounting bracket -->
  <rect x="260" y="280" width="20" height="40" rx="3" fill="#6b7280"/>
  <rect x="520" y="280" width="20" height="40" rx="3" fill="#6b7280"/>
  <circle cx="270" cy="290" r="4" fill="#374151"/>
  <circle cx="270" cy="310" r="4" fill="#374151"/>
  <circle cx="530" cy="290" r="4" fill="#374151"/>
  <circle cx="530" cy="310" r="4" fill="#374151"/>
</svg>`)}`,

  // Button panel
  'button': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="btnPanel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#e5e7eb"/>
      <stop offset="100%" style="stop-color:#9ca3af"/>
    </linearGradient>
    <linearGradient id="btnFace" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f9fafb"/>
      <stop offset="100%" style="stop-color:#d1d5db"/>
    </linearGradient>
    <filter id="shadow11"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.2"/></filter>
    <filter id="btnGlow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Panel -->
  <rect x="280" y="60" width="240" height="480" rx="15" fill="url(#btnPanel)" filter="url(#shadow11)"/>
  <rect x="290" y="70" width="220" height="460" rx="12" fill="#d1d5db" stroke="#9ca3af" stroke-width="2"/>
  <!-- Display -->
  <rect x="320" y="90" width="160" height="60" rx="8" fill="#1f2937"/>
  <text x="400" y="125" text-anchor="middle" fill="#22d3ee" font-family="monospace" font-size="28" filter="url(#btnGlow)">5</text>
  <text x="400" y="142" text-anchor="middle" fill="#67e8f9" font-family="monospace" font-size="10">FLOOR</text>
  <!-- Buttons grid -->
  ${Array.from({length: 10}, (_, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = 330 + col * 80;
    const y = 170 + row * 60;
    const num = 10 - i;
    const isActive = num === 5;
    return `
      <circle cx="${x+25}" cy="${y+25}" r="22" fill="${isActive?'#1e40af':'#374151'}" filter="url(#shadow11)"/>
      <circle cx="${x+25}" cy="${y+25}" r="18" fill="url(#btnFace)"/>
      <text x="${x+25}" y="${y+30}" text-anchor="middle" fill="${isActive?'#1e40af':'#374151'}" font-size="14" font-weight="bold" font-family="sans-serif">${num}</text>
      ${isActive?`<circle cx="${x+25}" cy="${y+25}" r="22" fill="none" stroke="#3b82f6" stroke-width="2" filter="url(#btnGlow)"/>`:''}
    `;
  }).join('')}
  <!-- Emergency buttons -->
  <circle cx="350" cy="470" r="18" fill="#dc2626" filter="url(#shadow11)"/>
  <text x="350" y="475" text-anchor="middle" fill="white" font-size="10" font-weight="bold">🔔</text>
  <circle cx="450" cy="470" r="18" fill="#eab308" filter="url(#shadow11)"/>
  <text x="450" y="475" text-anchor="middle" fill="#1f2937" font-size="10" font-weight="bold">☎</text>
  <!-- Open/Close buttons -->
  <rect x="320" y="500" width="60" height="20" rx="10" fill="#374151"/>
  <text x="350" y="514" text-anchor="middle" fill="#d1d5db" font-size="10">◀ ▶</text>
  <rect x="420" y="500" width="60" height="20" rx="10" fill="#374151"/>
  <text x="450" y="514" text-anchor="middle" fill="#d1d5db" font-size="10">▶ ◀</text>
</svg>`)}`,

  // Gearless motor
  'gearless': `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="gearlessBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e5e7eb"/>
      <stop offset="30%" style="stop-color:#f3f4f6"/>
      <stop offset="70%" style="stop-color:#d1d5db"/>
      <stop offset="100%" style="stop-color:#9ca3af"/>
    </linearGradient>
    <radialGradient id="magnet" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#1e40af"/>
      <stop offset="50%" style="stop-color:#1e3a8a"/>
      <stop offset="100%" style="stop-color:#172554"/>
    </radialGradient>
    <filter id="shadow12"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="800" height="600" fill="#f8fafc"/>
  <!-- Motor housing -->
  <ellipse cx="400" cy="300" rx="170" ry="150" fill="url(#gearlessBody)" filter="url(#shadow12)"/>
  <ellipse cx="400" cy="300" rx="155" ry="135" fill="#d1d5db"/>
  <!-- Cooling fins (radial) -->
  ${Array.from({length: 24}, (_, i) => {
    const angle = (i * 15) * Math.PI / 180;
    const x1 = 400 + Math.cos(angle) * 140;
    const y1 = 300 + Math.sin(angle) * 120;
    const x2 = 400 + Math.cos(angle) * 165;
    const y2 = 300 + Math.sin(angle) * 145;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#9ca3af" stroke-width="3" stroke-linecap="round"/>`;
  }).join('')}
  <!-- Inner ring - magnets -->
  <circle cx="400" cy="300" r="100" fill="#374151"/>
  ${Array.from({length: 12}, (_, i) => {
    const angle = (i * 30) * Math.PI / 180;
    const x = 400 + Math.cos(angle) * 80;
    const y = 300 + Math.sin(angle) * 80;
    return `<rect x="${x-12}" y="${y-8}" width="24" height="16" rx="3" fill="url(#magnet)" transform="rotate(${i*30}, ${x}, ${y})"/>`;
  }).join('')}
  <!-- Center shaft -->
  <circle cx="400" cy="300" r="40" fill="#4b5563"/>
  <circle cx="400" cy="300" r="30" fill="#374151"/>
  <circle cx="400" cy="300" r="15" fill="#6b7280"/>
  <circle cx="400" cy="300" r="5" fill="#9ca3af"/>
  <!-- Keyway -->
  <rect x="396" y="270" width="8" height="20" fill="#1f2937"/>
  <!-- Shine -->
  <ellipse cx="360" cy="250" rx="30" ry="15" fill="white" opacity="0.2"/>
  <!-- Mounting base -->
  <rect x="300" y="440" width="200" height="30" rx="5" fill="#6b7280"/>
  <rect x="310" y="445" width="180" height="20" rx="3" fill="#4b5563"/>
  <circle cx="340" cy="455" r="6" fill="#374151"/>
  <circle cx="460" cy="455" r="6" fill="#374151"/>
  <!-- Label -->
  <rect x="340" y="475" width="120" height="20" rx="3" fill="#1e40af"/>
  <text x="400" y="489" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">GEARLESS</text>
</svg>`)}`
};

// Map categories to image keys
export const categoryImageMap: Record<string, string> = {
  'موتور آسانسور': 'motor',
  'تابلو فرمان': 'panel',
  'ریلس و ریل‌براکت': 'rail',
  'سیم بکسل': 'cable',
  'درب آسانسور': 'door',
  'کابین و دکوراسیون': 'cabin',
  'قطعات الکتریکی': 'inverter',
  'قطعات مکانیکی': 'brake',
  'سیستم ایمنی': 'safety',
  'لوازم جانبی': 'sensor'
};

// Map product IDs to specific images
export const productImageMap: Record<string, string> = {
  '1': 'motor',
  '2': 'panel',
  '3': 'rail',
  '4': 'cable',
  '5': 'door',
  '6': 'cabin',
  '7': 'inverter',
  '8': 'brake',
  '9': 'safety',
  '10': 'sensor',
  '11': 'button',
  '12': 'gearless'
};

export const getProductImage = (productId: string, category: string): string => {
  return productImageMap[productId] 
    ? productImages[productImageMap[productId]] 
    : productImages[categoryImageMap[category]] || productImages['motor'];
};
