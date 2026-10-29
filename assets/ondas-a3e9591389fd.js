
(() => {
  const root = document.getElementById('ondas-dados-preview');
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const buffer = document.createElement('canvas');
  const bctx = buffer.getContext('2d', { willReadFrequently: true });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const words = ['Marketing', 'Branding', 'Dados', 'Integrações', 'Design', 'IA'];
  const backgroundCanvas = document.createElement('canvas');
  backgroundCanvas.className = 'ambient-color-field';
  backgroundCanvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(backgroundCanvas);
  const backgroundContext = backgroundCanvas.getContext('2d', { alpha: true });
  let ambientLast = -Infinity, ambientWidth = 0, ambientHeight = 0;
  let width = 0, height = 310, wordColumns = [], pixelRatio = 1, startedAt = null;
  const smooth = x => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
  // Os fios usam tons mais densos; o campo desfocado permanece mais claro.
  const palette = [[0, 126, 62], [204, 67, 0], [0, 61, 174]];
  const ambientPalette = [[126, 183, 149], [211, 153, 123], [130, 158, 207]];
  function colorAt(position, vertical, time, colors = palette) {
    const t = reducedMotion.matches ? 0 : time * 0.001;
    const x = position, y = vertical;
    const weights = colors.map((_, i) => {
      let weight = 0.01;
      for (let spot = 0; spot < 3; spot++) {
        const phase = i * 2.3 + spot * 2.1;
        const cx = 0.5 + 0.48 * Math.sin(t * (0.13 + spot * 0.025) + phase);
        const cy = 0.5 + 0.34 * Math.sin(t * (0.19 + i * 0.025) + phase * 1.37);
        const dx = (x - cx) / 0.19, dy = (y - cy) / 0.34;
        weight += Math.exp(-(dx * dx + dy * dy) * 1.4);
      }
      return Math.pow(weight, 3.2);
    });
    const total = weights.reduce((sum, value) => sum + value, 0);
    const rgb = [0, 1, 2].map(channel => Math.round(colors.reduce((sum, color, i) => sum + color[channel] * weights[i], 0) / total));
    return rgb;
  }
  function lineColor(position, vertical, time) {
    return `rgb(${colorAt(position, vertical, time).join(',')})`;
  }
  function drawAmbient(time) {
    const gridWidth = Math.min(100, Math.max(28, Math.ceil(innerWidth / 16)));
    const gridHeight = Math.min(72, Math.max(24, Math.ceil(innerHeight / 16)));
    const resized = gridWidth !== ambientWidth || gridHeight !== ambientHeight;
    if (!resized && time - ambientLast < 42) return;
    ambientLast = time;
    ambientWidth = gridWidth;
    ambientHeight = gridHeight;
    backgroundCanvas.width = gridWidth;
    backgroundCanvas.height = gridHeight;
    const image = backgroundContext.createImageData(gridWidth, gridHeight);
    for (let y = 0; y < gridHeight; y++) {
      const vertical = y / (gridHeight - 1);
      for (let x = 0; x < gridWidth; x++) {
        const position = x / (gridWidth - 1);
        const color = colorAt(position, vertical, -time, ambientPalette);
        const dx = (position - 0.5) / 0.66;
        const dy = (vertical - 0.32) / 0.55;
        const emphasis = Math.exp(-(dx * dx + dy * dy) * 0.75);
        const offset = (y * gridWidth + x) * 4;
        image.data[offset] = color[0];
        image.data[offset + 1] = color[1];
        image.data[offset + 2] = color[2];
        image.data[offset + 3] = Math.round(26 + 62 * emphasis);
      }
    }
    backgroundContext.putImageData(image, 0, 0);
  }
  function resize() {
    width = Math.max(1, Math.round(root.getBoundingClientRect().width));
    height = Math.max(1, Math.round(root.getBoundingClientRect().height));
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    buffer.width = width;
    buffer.height = height;
    wordColumns = words.map(word => {
    let fontSize = Math.min(156, width * 0.24);
    bctx.font = `700 ${fontSize}px Arial, sans-serif`;
    while (bctx.measureText(word).width > width * (width < 600 ? 0.89 : 0.83) && fontSize > 10) {
      fontSize -= 1;
      bctx.font = `700 ${fontSize}px Arial, sans-serif`;
    }
    bctx.clearRect(0, 0, width, height);
    bctx.fillStyle = '#fff';
    bctx.textAlign = 'center';
    bctx.textBaseline = 'middle';
    bctx.fillText(word, width / 2, height / 2);
    const data = bctx.getImageData(0, 0, width, height).data;
    const columns = [];
    const edge = width < 600 ? 0.04 : 0.08;
    let cursor = width * edge;
    let index = 0;
    while (cursor < width * (1 - edge)) {
      const x = Math.round(cursor);
      const irregularity = 0.5 + 0.5 * Math.sin(index * 2.399);
      const segments = [];
      let start = -1;
      for (let y = 0; y < height; y++) {
        const on = data[(y * width + x) * 4 + 3] > 100;
        if (on && start < 0) start = y;
        if ((!on || y === height - 1) && start >= 0) {
          segments.push([start, y]);
          start = -1;
        }
      }
      columns.push({ x, segments, original: segments.length > 0, thickness: 0.95 + irregularity * 0.25 });
      cursor += 2.15 + irregularity * 0.55;
      index++;
    }
    const firstGlyph = columns.find(col => col.original)?.x ?? 0;
    const lastGlyph = [...columns].reverse().find(col => col.original)?.x ?? 0;
    for (const col of columns) col.inWord = col.x > firstGlyph && col.x < lastGlyph;
    // Cada espaço entre glifos recebe um contato local entre as bordas mais próximas.
    for (let i = 0; i < columns.length;) {
      if (columns[i].original) { i++; continue; }
      const start = i;
      while (i < columns.length && !columns[i].original) i++;
      const left = columns[start - 1], right = columns[i];
      if (!left || !right || right.x - left.x > Math.min(40, Math.max(10, width * .04))) continue;
      let best = null;
      for (const [a, b] of left.segments) for (const [c, d] of right.segments) {
        const overlapStart = Math.max(a, c), overlapEnd = Math.min(b, d);
        let from, to;
        if (overlapStart <= overlapEnd) from = to = Math.max(overlapStart, Math.min(overlapEnd, height / 2));
        else if (b < c) { from = b; to = c; }
        else { from = a; to = d; }
        const score = Math.abs(from - to) * 2 + Math.abs((from + to) / 2 - height / 2) * .12;
        if (!best || score < best.score) best = { from, to, score };
      }
      if (!best) continue;
      for (let j = start; j < i; j++) {
        const t = (columns[j].x - left.x) / (right.x - left.x);
        columns[j].contact = { from: best.from, to: best.to, leftX: left.x, rightX: right.x, t };
      }
    }
    const bridge = width < 600 ? Math.max(2.5, width * 0.01) : Math.min(11, Math.max(7, width * 0.016));
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      col.affinity = col.segments.length ? 1 : 0;
      if (col.segments.length) continue;
      let nearest = null;
      let distance = bridge;
      for (let j = Math.max(0, i - 7); j <= Math.min(columns.length - 1, i + 7); j++) {
        const candidate = columns[j];
        const d = Math.abs(candidate.x - col.x);
        if (candidate.original && d < distance) {
          nearest = candidate;
          distance = d;
        }
      }
      if (nearest) {
        col.segments = nearest.segments;
        col.affinity = (col.inWord ? 0.7 : 0.5) * (1 - smooth(distance / bridge));
      }
    }
    if (word === 'IA') {
      const lastLetter = [...columns].reverse().find(col => col.original);
      const transitionWidth = Math.min(38, Math.max(18, width * 0.045));
      if (lastLetter) {
        for (const col of columns) {
          const distance = col.x - lastLetter.x;
          if (distance > 0 && distance < transitionWidth) {
            col.segments = lastLetter.segments;
            col.affinity = 1 - smooth(distance / transitionWidth);
          }
        }
      }
    }
    return columns;
    });
  }
  function draw(now) {
    if (startedAt === null) startedAt = now;
    now = Math.max(0, now - startedAt) * 1.08;
    if (reducedMotion.matches) now = 0;
    drawAmbient(now);
    const starting = now < 1800 && !reducedMotion.matches;
    const elapsed = Math.max(0, now - 1800);
    const cycle = Math.floor(elapsed / 3000);
    const phase = (elapsed % 3000) / 1000;
    const current = wordColumns[cycle % words.length] || [];
    const next = wordColumns[(cycle + 1) % words.length] || [];
    ctx.clearRect(0, 0, width, height);
    const center = height / 2;
    for (let columnIndex = 0; columnIndex < current.length; columnIndex++) {
      const col = current[columnIndex];
      const nextCol = next[columnIndex];
      const position = col.x / width;
      const u = (position - 0.5) * 2;
      const envelope = Math.pow(Math.max(0, 1 - Math.abs(u)), 0.75);
      const motionScale = Math.min(1, width / 600);
      const wave = 8 + 72 * motionScale * envelope * Math.abs(Math.sin(col.x * 0.048 + now * 0.0018) * Math.cos(col.x * 0.013 - now * 0.0011));
      const flowAt = x => reducedMotion.matches ? 0 : motionScale * (width < 600 ? 0.45 : 1) * (6 * Math.sin(x * 0.012 - now * 0.0018) + 2 * Math.sin(x * 0.027 + now * 0.0011));
      const flow = flowAt(col.x);
      const extension = reducedMotion.matches ? 0 : 9 * motionScale * (width < 600 ? 0.45 : 1) * Math.pow(Math.max(0, Math.sin(col.x * 0.055 - now * 0.0025)), 10);
      const waveTop = center + flow - wave / 2;
      const ripple = reducedMotion.matches ? 0 : (wave - 24) * 0.06;
      function shape(source) {
        const gapWave = Math.min(wave, width < 600 ? 8 : 15);
        if (source?.contact) {
          const half = width < 600 ? 1.8 : 2.6;
          const start = source.contact.from + flowAt(source.contact.leftX);
          const end = source.contact.to + flowAt(source.contact.rightX);
          const point = start + (end - start) * source.contact.t;
          return [[point - half, point + half]];
        }
        if (!source || !source.segments.length) {
          if (source?.inWord) return [[center + flow - gapWave / 2, center + flow + gapWave / 2]];
          return [[waveTop - extension, waveTop + wave + extension]];
        }
        const blend = source.affinity;
        const count = source.segments.length;
        return source.segments.map(([top, bottom], i) => {
          const baseWave = source.inWord && !source.original ? gapWave : wave;
          const baseTop = center + flow - baseWave / 2;
          const startTop = baseTop + baseWave * i / count;
          const startBottom = baseTop + baseWave * (i + 1) / count;
          const a = startTop + (top + flow - ripple - startTop) * blend - (i === 0 ? extension : 0);
          const b = startBottom + (bottom + flow + ripple - startBottom) * blend + (i === count - 1 ? extension : 0);
          return [a, Math.max(a + 0.5, b)];
        });
      }
      let from = shape(starting ? null : col);
      let to = shape(starting ? col : nextCol);
      const progress = reducedMotion.matches ? 0 : starting
        ? smooth((now / 1000 - position * 0.25) / 1.45)
        : smooth((phase - 1.05 - position * 0.3) / 1.55);
      function splitToCount(intervals, count) {
        intervals = intervals.map(interval => interval.slice());
        while (intervals.length < count) {
          let longest = 0;
          for (let i = 1; i < intervals.length; i++) {
            if (intervals[i][1] - intervals[i][0] > intervals[longest][1] - intervals[longest][0]) longest = i;
          }
          const [a, b] = intervals[longest];
          const mid = (a + b) / 2;
          intervals.splice(longest, 1, [a, mid], [mid, b]);
        }
        return intervals;
      }
      const count = Math.max(from.length, to.length);
      from = splitToCount(from, count);
      to = splitToCount(to, count);
      for (let i = 0; i < count; i++) {
        const a = from[i][0] + (to[i][0] - from[i][0]) * progress;
        const b = from[i][1] + (to[i][1] - from[i][1]) * progress;
        const end = Math.max(a + 0.5, b);
        for (let y = a; y < end; y += 4) {
          const segmentHeight = Math.min(4, end - y);
          ctx.fillStyle = lineColor(position, (y + segmentHeight / 2) / height, now);
          ctx.fillRect(col.x, y, col.thickness, segmentHeight);
        }
      }
    }
    requestAnimationFrame(draw);
  }
  new ResizeObserver(resize).observe(root);
  resize();
  requestAnimationFrame(draw);
})();
