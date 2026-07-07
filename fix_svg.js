const fs = require('fs');
const svgPath = '/Users/noorislam/Downloads/Bnner/mithriv-website/public/SVGs/SOP Agents 1.svg';
let svg = fs.readFileSync(svgPath, 'utf8');

// Replace stroke="#262728" with stroke="#1C1E21"
svg = svg.replace(/stroke="#262728"/g, 'stroke="#1C1E21"');

// Generate lines with 6px spacing
let linesStr = '';
for (let x = -40; x <= 310; x += 6) {
    linesStr += `<line x1="${x}.8536" y1="108.146" x2="${x + 128}.854" y2="236.146" stroke="#1C1E21"/>\n`;
}

// Replace the existing lines block
const regex = /<line[^>]*stroke="#252526"\/>\n/g;
// Since we want to replace the whole block of lines, we can do it by finding the <g opacity="0.4"> ... </g> that wraps them
// But simpler: just replace the first line with the whole linesStr, and remove the rest.
let firstLineReplaced = false;
svg = svg.replace(/<line x1="[^"]*" y1="108\.146" x2="[^"]*" y2="236\.146" stroke="#252526"\/>\n?/g, (match) => {
    if (!firstLineReplaced) {
        firstLineReplaced = true;
        return linesStr;
    }
    return '';
});

fs.writeFileSync(svgPath, svg, 'utf8');
console.log('SVG fixed');
