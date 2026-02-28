const fs = require('fs');
const path = require('path');

const heroPath = path.join(__dirname, 'src', 'components', 'Hero.jsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');

// Replace the glitch effect loop with ScrambleText
const startIdx = heroContent.indexOf('{Array.from("FORGING DIGITAL EXCELLENCE").map((char, i) => (');
const endIdxStr = '))}';
const endIdx = heroContent.indexOf(endIdxStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const chunkToReplace = heroContent.slice(startIdx, endIdx + endIdxStr.length);
    heroContent = heroContent.replace(chunkToReplace, '<ScrambleText text="FORGING DIGITAL EXCELLENCE" delay={1.8} />');
    fs.writeFileSync(heroPath, heroContent);
    console.log('Hero patched successfully.');
} else {
    console.log('Hero pattern not found.');
}

// Services.jsx Enhancement (Dynamic Spotlight Card)
// The enhancement requested adding a specific styling to making the Glass Card more interactive or the icon specifically highlighted.
// But wait, the assessment said: "Implement a Cursor-Tracking Spotlight effect."
// TiltCard ALREADY has this! We just need to make sure the inner icon div doesn't block it or we can enhance the tilt card to accept a dynamic color.
// I will patch TiltCard.jsx to accept a SpotlightColor prop instead of hardcoded red.
const tiltCardPath = path.join(__dirname, 'src', 'components', 'ui', 'TiltCard.jsx');
let tiltContent = fs.readFileSync(tiltCardPath, 'utf8');

tiltContent = tiltContent.replace(
    'export default function TiltCard({ children, className = "", style = {}, ...props }) {',
    'export default function TiltCard({ children, className = "", spotlightColor = "rgba(255, 46, 46, 0.2)", style = {}, ...props }) {'
);

tiltContent = tiltContent.replace(
    /rgba\(255, 46, 46, 0\.2\)/g,
    '${spotlightColor}'
);

fs.writeFileSync(tiltCardPath, tiltContent);
console.log('TiltCard patched successfully.');


// Experience.jsx - SVG Path Draw
const expPath = path.join(__dirname, 'src', 'components', 'Experience.jsx');
let expContent = fs.readFileSync(expPath, 'utf8');

const oldExpDiv = `<motion.div
                        style={{
                            position: 'absolute',
                            left: '0px',
                            top: 0,
                            bottom: 0,
                            width: '2px', // Line width
                            background: 'var(--glass-border)',
                            transform: 'translateX(50%)',
                            scaleY: scrollYProgress,
                            originY: 0
                        }}
                        className="md-center-line"
                    />`;

// Since formatting might differ, I will use regex to find the motion.div representing the md-center-line
const lineRegex = /<motion\.div[\s\S]*?className="md-center-line"[\s\S]*?\/>/;

const newExpSvg = `
                    <div 
                        className="md-center-line" 
                        style={{ 
                            position: 'absolute', 
                            left: '0px', 
                            top: 0, 
                            bottom: 0, 
                            width: '2px', // Line width
                            transform: 'translateX(50%)',
                        }}
                    >
                        <svg width="2" height="100%" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                            <motion.line
                                x1="1"
                                y1="0"
                                x2="1"
                                y2="100%"
                                stroke="var(--accent-color)"
                                strokeWidth="2"
                                strokeDasharray="10 10"
                                style={{ pathLength: scrollYProgress }}
                                strokeOpacity={0.6}
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), transparent)', zIndex: -1 }}></div>
                    </div>`;

if (lineRegex.test(expContent)) {
    expContent = expContent.replace(lineRegex, newExpSvg);
    fs.writeFileSync(expPath, expContent);
    console.log('Experience patched successfully.');
} else {
    // try looser replace
    const fallbackRegex = /<motion\.div[^>]*className="md-center-line"[^>]*\/>/s;
    if (fallbackRegex.test(expContent)) {
        expContent = expContent.replace(fallbackRegex, newExpSvg);
        fs.writeFileSync(expPath, expContent);
        console.log('Experience patched successfully (fallback).');
    } else {
        console.log('Experience md-center-line not found.');
    }
}
