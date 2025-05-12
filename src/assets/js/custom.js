// src/assets/js/custom.js

// Direction-sensitive props and their flips
const FLIP_MAP = {
  'margin-left': 'margin-right',
  'margin-right': 'margin-left',
  'padding-left': 'padding-right',
  'padding-right': 'padding-left',
  'left': 'right',
  'right': 'left',
  'border-left': 'border-right',
  'border-right': 'border-left',
  'border-top-left-radius': 'border-top-right-radius',
  'border-top-right-radius': 'border-top-left-radius',
  'border-bottom-left-radius': 'border-bottom-right-radius',
  'border-bottom-right-radius': 'border-bottom-left-radius',
  'float': 'float',
  'clear': 'clear',
  'text-align': 'text-align',
  'flex-direction': 'flex-direction',
  'inset-inline-start': 'inset-inline-end',
  'inset-inline-end': 'inset-inline-start',
  'background-position': 'background-position'
};

const DIR_PROPS = new Set([...Object.keys(FLIP_MAP), 'transform', 'box-shadow']);

function flipValue(prop, value) {
  if (prop === 'transform') {
    return value
      .replace(/translateX\(([-\d.]+)(px|%)?\)/g, (_, num, unit = '') => `translateX(${-parseFloat(num)}${unit})`)
      .replace(/skewX\(([-\d.]+)deg\)/g, (_, num) => `skewX(${-parseFloat(num)}deg)`)
      .replace(/rotateY\(([-\d.]+)deg\)/g, (_, num) => `rotateY(${-parseFloat(num)}deg)`);
  }
  if (prop === 'background-position') {
    return value
      .replace(/left/g, 'RIGHTTMP')
      .replace(/right/g, 'left')
      .replace(/RIGHTTMP/g, 'right')
      .replace(/(\d+)%\s+(\d+)%/, (_, x, y) => `${100 - parseInt(x)}% ${y}%`);
  }
  if (prop === 'text-align' || prop === 'float' || prop === 'clear') {
    if (value === 'left') return 'right';
    if (value === 'right') return 'left';
  }
  if (prop === 'flex-direction') {
    if (value === 'row') return 'row-reverse';
    if (value === 'row-reverse') return 'row';
  }
  if (prop === 'box-shadow') {
    return value.replace(/(-?\d+)(px)?/, (match, num, unit = '') => `${-parseFloat(num)}${unit}`);
  }
  return value;
}

export function filterCSS(inputCSS, includeNonRTL = false) {
  const blocks = {};
  const topComments = [];
  let sel = null;
  let inKeyframes = false;
  let keyframes = '';
  let keySel = '';

  inputCSS.split('\n').forEach(line => {
    const t = line.trim();
    if (!t) return;

    // Preserve comments
    if (t.startsWith('//') || t.startsWith('/*')) {
      if (sel) {
        blocks[sel].push({ comment: line });
      } else {
        topComments.push(line);
      }
      return;
    }

    if (t.startsWith('@keyframes')) {
      inKeyframes = true;
      keySel = t.replace(/\s*\{\s*$/, '');
      keyframes = '';
      return;
    }

    if (inKeyframes) {
      keyframes += line + '\n';
      if (t === '}') {
        inKeyframes = false;
        const trimmed = keyframes.replace(/^\s*\{?|}?\s*$/g, '').trim();
        blocks[keySel] = [ { comment: trimmed } ];
      }
      return;
    }

    if (t.endsWith('{')) {
      sel = t.slice(0, -1).trim();
      blocks[sel] = blocks[sel] || [];
    } else if (t === '}') {
      sel = null;
    } else if (sel) {
      const [pRaw, ...vParts] = t.split(':');
      if (!vParts.length) return;
      const prop = pRaw.trim();
      const val = vParts.join(':').replace(/;$/, '').trim();
      blocks[sel].push({ prop, val });
    }
  });

  const out = [];
  // Emit top-level comments
  topComments.forEach(c => out.push(c));

  for (const selector in blocks) {
    const rules = blocks[selector];
    const lines = [];
    rules.forEach(item => {
      if (item.comment) {
        lines.push(`  ${item.comment}`);
      } else {
        const { prop, val } = item;
        if (DIR_PROPS.has(prop)) {
          if (!includeNonRTL) {
            const autoProps = ['left', 'right', 'inset-inline-start', 'inset-inline-end'];
            const zeroProps = [
              'margin-left','padding-left','border-left','border-top-left-radius','border-bottom-left-radius',
              'margin-right','padding-right','border-right','border-top-right-radius','border-bottom-right-radius'
            ];
            if (autoProps.includes(prop)) lines.push(`  ${prop}: auto;`);
            else if (zeroProps.includes(prop)) lines.push(`  ${prop}: 0;`);
          }
          const flippedProp = FLIP_MAP[prop] || prop;
          const flippedVal = flipValue(prop, val);
          lines.push(`  ${flippedProp}: ${flippedVal};`);
        } else {
          lines.push(`  ${prop}: ${val};`);
        }
      }
    });
    out.push(`${selector} {
${lines.join('\n')}
}`);
  }

  return out.length ? out.join('\n\n') : '/* No direction-related styles found. */';
}

export function clearInput() {
  const ta = document.getElementById('inputCSS');
  if (ta) ta.value = '';
}

export function copyCSS(css) {
  return navigator.clipboard.writeText(css);
}

export function downloadCSS(css) {
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'rtl-output.css';
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
