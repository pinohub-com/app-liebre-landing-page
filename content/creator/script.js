const CTA_DEFAULT = 'Si deseas más contenido educativo sobre TATTOOs sigue esta cuenta.';
const SLIDE_TYPES = [
  'Portada', 'CTA', 'Título + afirmación', 'Pregunta + respuesta', 'Concepto clave',
  'Mito', 'Verdad', 'Normal', 'Alerta', 'Resumen', 'Causa', 'Proceso', 'Riesgo',
  'Alternativa', 'Error', 'Razón', 'Cuándo', 'Contexto', 'Prevención', 'Señales',
  'Mensaje', 'Checklist', 'Explicación', 'Qué hacer', 'Tranquilizar', 'Explicar líquido',
  'Proceso inmunológico', 'Idea clave', 'Semana 1', 'Semana 2-3', 'Mes 1-2', 'Zonas',
  'Consecuencia', 'Cuándo sí', 'Hábitos', 'Adaptar', 'Factor', 'Acción', 'Evitar',
  'Extra', 'Variable', 'General', 'Tip', 'Cómo', 'Regla', 'Consejo', 'Punto',
  'Efecto', 'Quién', 'Definición', 'Si pasa', 'Tiempo', 'Antes', 'Durante', 'Después',
  'Cierre', 'Realidad', 'Expectativa', 'Idea'
];

let parrilla = { days: [], cta: CTA_DEFAULT };
let currentDayId = 1;
let currentSlideIndex = 0;
let globalBgUrl = '';
let slideImages = {}; // { "dayId-slideIndex": "dataUrl" }
let slideOpacities = {}; // { "dayId-slideIndex": 0.3 }
let slideTitleFontSize = {}; // { "dayId-slideIndex": 1.35 }
let slideTextVerticalPos = {}; // { "dayId-slideIndex": 50 } 0-100%
let slideBodyFontSize = {}; // { "dayId-slideIndex": 0.9 }
let slideBodyVerticalPos = {}; // { "dayId-slideIndex": 50 } 0-100%
let slideTitleColor = {}; // { "dayId-slideIndex": "#232323" }
let slideBodyColor = {}; // { "dayId-slideIndex": "#685D54" }

const FORMATS = {
  '1:1': { exportW: 1080, exportH: 1080, label: '1080×1080' },
  '4:5': { exportW: 1080, exportH: 1350, label: '1080×1350' },
  '9:16': { exportW: 1080, exportH: 1920, label: '1080×1920' }
};

const CONVERT_API = 'https://i1hev19kea.execute-api.us-east-1.amazonaws.com';

function getFormat() {
  return document.getElementById('export-slide')?.dataset.format || '4:5';
}

function applyFormat(format) {
  const slide = document.getElementById('export-slide');
  if (!slide) return;
  slide.dataset.format = format;
  document.querySelectorAll('.format-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.format === format);
  });
  const dims = document.getElementById('preview-dimensions');
  if (dims && FORMATS[format]) dims.textContent = FORMATS[format].label;
  if (typeof updateVideoDurationHint === 'function') updateVideoDurationHint();
}

async function loadParrilla() {
  try {
    const res = await fetch('../parrilla.json');
    const data = await res.json();
    parrilla = data;
    if (!parrilla.cta) parrilla.cta = CTA_DEFAULT;
    init();
  } catch (e) {
    document.getElementById('day-list').innerHTML =
      '<p style="padding:1rem;color:var(--danger);">No se pudo cargar parrilla.json. Abre con un servidor local (ej. npx serve content).</p>';
  }
}

function init() {
  // Textura de fondo: ruta absoluta para que cargue siempre
  const textureEl = document.getElementById('slide-bg-texture');
  if (textureEl) {
    const textureUrl = new URL('width.jpeg', window.location.href).href;
    textureEl.style.backgroundImage = `url(${JSON.stringify(textureUrl)})`;
  }
  populateTypeSelect();
  renderDayList();
  selectDay(1);
  bindEvents();
  if (typeof updateVideoDurationHint === 'function') updateVideoDurationHint();
  document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', () => applyFormat(btn.dataset.format));
  });
  applyFormat('4:5');
}

function populateTypeSelect() {
  const sel = document.getElementById('edit-type');
  sel.innerHTML = SLIDE_TYPES.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');
}

function renderDayList() {
  const list = document.getElementById('day-list');
  list.innerHTML = parrilla.days.map(d => `
    <div class="day-item" data-id="${d.id}">
      <span class="day-num">Día ${d.id}</span>${escapeHtml(d.title)}
    </div>
  `).join('');
}

function selectDay(id) {
  currentDayId = id;
  currentSlideIndex = 0;
  document.querySelectorAll('.day-item').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.id) === id);
  });
  updateDayMeta();
  renderSlideNav();
  renderSlide();
  updateEditor();
}

function updateDayMeta() {
  const day = parrilla.days.find(d => d.id === currentDayId);
  if (!day) return;
  document.getElementById('day-title').textContent = day.title;
  document.getElementById('day-objetivo').textContent = day.objetivo || '';
}

function renderSlideNav() {
  const container = document.getElementById('nav-slides');
  container.innerHTML = Array.from({ length: 8 }, (_, i) =>
    `<button type="button" data-index="${i}" class="${i === currentSlideIndex ? 'active' : ''}">${i + 1}</button>`
  ).join('');
  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSlideIndex = parseInt(btn.dataset.index);
      renderSlide();
      updateEditor();
      renderSlideNav();
    });
  });
}

function getSlide() {
  const day = parrilla.days.find(d => d.id === currentDayId);
  return day?.slides[currentSlideIndex] || { type: '', title: '', body: '' };
}

function renderSlide() {
  const slide = getSlide();
  const isCta = slide.type === 'CTA';
  const ctaText = isCta ? (slide.body || parrilla.cta || CTA_DEFAULT) : '';

  const el = document.getElementById('export-slide');
  el.classList.toggle('cta-only', isCta && !slide.title);

  document.getElementById('slide-type-badge').textContent = slide.type || '—';
  const titleEl = document.getElementById('preview-title');
  const bodyEl = document.getElementById('preview-body');
  titleEl.textContent = slide.title || '';
  const key = `${currentDayId}-${currentSlideIndex}`;
  const titleSize = slideTitleFontSize[key] ?? 1.35;
  const verticalPos = slideTextVerticalPos[key] ?? 50;
  const bodySize = slideBodyFontSize[key] ?? 0.9;
  const bodyVertical = slideBodyVerticalPos[key] ?? 50;
  const titleColor = slideTitleColor[key] ?? '#232323';
  const bodyColor = slideBodyColor[key] ?? '#685D54';
  titleEl.style.fontSize = `${titleSize}rem`;
  titleEl.style.color = titleColor;
  bodyEl.style.fontSize = `${bodySize}rem`;
  bodyEl.style.color = bodyColor;
  bodyEl.textContent = isCta ? '' : (slide.body || '');
  document.getElementById('slide-spacer-title-top').style.flex = `${verticalPos} 1 0`;
  document.getElementById('slide-spacer-title-bottom').style.flex = `${100 - verticalPos} 1 0`;
  document.getElementById('slide-spacer-body-top').style.flex = `${bodyVertical} 1 0`;
  document.getElementById('slide-spacer-body-bottom').style.flex = `${100 - bodyVertical} 1 0`;
  document.getElementById('preview-cta').textContent = ctaText;
  const ctaBox = document.getElementById('slide-cta-box');
  ctaBox.classList.toggle('hidden', !isCta);

  const customEl = document.getElementById('slide-bg-custom');
  const photoEl = document.getElementById('slide-bg-photo');
  const slideImg = slideImages[key];
  const opacity = slideOpacities[key] ?? 0.3;
  customEl.style.backgroundImage = globalBgUrl ? `url(${globalBgUrl})` : '';
  photoEl.style.backgroundImage = slideImg ? `url(${slideImg})` : '';
  photoEl.style.opacity = String(opacity);

  document.getElementById('slide-num').textContent = currentSlideIndex + 1;
  document.querySelectorAll('#nav-slides button').forEach((btn, i) => {
    btn.classList.toggle('active', i === currentSlideIndex);
  });
}

function updateEditor() {
  const slide = getSlide();
  document.getElementById('edit-type').value = slide.type || 'Portada';
  document.getElementById('edit-title').value = slide.title || '';
  document.getElementById('edit-body').value = slide.body || '';
  const key = `${currentDayId}-${currentSlideIndex}`;
  document.getElementById('slide-img-label').textContent =
    slideImages[key] ? '✓ Foto cargada (clic para cambiar)' : '+ Foto del slide';
  const opacity = slideOpacities[key] ?? 0.3;
  document.getElementById('slide-img-opacity').value = Math.round(opacity * 100);
  document.getElementById('slide-opacity-value').textContent = Math.round(opacity * 100);
  const titleSize = slideTitleFontSize[key] ?? 1.35;
  const verticalPos = slideTextVerticalPos[key] ?? 50;
  const bodySize = slideBodyFontSize[key] ?? 0.9;
  const bodyVertical = slideBodyVerticalPos[key] ?? 50;
  document.getElementById('edit-title-size').value = titleSize;
  document.getElementById('edit-text-vertical').value = verticalPos;
  document.getElementById('edit-body-size').value = bodySize;
  document.getElementById('edit-body-vertical').value = bodyVertical;
  document.getElementById('title-size-value').textContent = titleSize;
  document.getElementById('text-vertical-value').textContent = verticalPos;
  document.getElementById('body-size-value').textContent = bodySize;
  document.getElementById('body-vertical-value').textContent = bodyVertical;
  document.getElementById('edit-title-color').value = slideTitleColor[key] ?? '#232323';
  document.getElementById('edit-body-color').value = slideBodyColor[key] ?? '#685D54';
}

function saveFromEditor() {
  const day = parrilla.days.find(d => d.id === currentDayId);
  if (!day) return;
  const slide = day.slides[currentSlideIndex];
  if (!slide) return;

  slide.type = document.getElementById('edit-type').value;
  slide.title = document.getElementById('edit-title').value;
  slide.body = document.getElementById('edit-body').value;

  renderSlide();
}

function bindEvents() {
  document.querySelectorAll('.day-item').forEach(el => {
    el.addEventListener('click', () => selectDay(parseInt(el.dataset.id)));
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      renderSlide();
      updateEditor();
      renderSlideNav();
    }
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    if (currentSlideIndex < 7) {
      currentSlideIndex++;
      renderSlide();
      updateEditor();
      renderSlideNav();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (e.key === 'ArrowLeft') {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
        updateEditor();
        renderSlideNav();
        e.preventDefault();
      }
    } else if (e.key === 'ArrowRight') {
      if (currentSlideIndex < 7) {
        currentSlideIndex++;
        renderSlide();
        updateEditor();
        renderSlideNav();
        e.preventDefault();
      }
    }
  });

  ['edit-type', 'edit-title', 'edit-body'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', saveFromEditor);
      el.addEventListener('change', saveFromEditor);
    }
  });

  // Background image
  document.getElementById('bg-input').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      globalBgUrl = r.result;
      renderSlide();
    };
    r.readAsDataURL(file);
    e.target.value = '';
  });

  document.getElementById('btn-clear-bg').addEventListener('click', () => {
    globalBgUrl = '';
    renderSlide();
  });

  // Per-slide image
  document.getElementById('slide-img-input').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      slideImages[`${currentDayId}-${currentSlideIndex}`] = r.result;
      renderSlide();
      updateEditor();
    };
    r.readAsDataURL(file);
    e.target.value = '';
  });

  // Opacidad imagen del slide
  document.getElementById('slide-img-opacity').addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10) / 100;
    slideOpacities[`${currentDayId}-${currentSlideIndex}`] = val;
    document.getElementById('slide-opacity-value').textContent = e.target.value;
    renderSlide();
  });

  // Tamaño título y posición vertical
  document.getElementById('edit-title-size').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    slideTitleFontSize[`${currentDayId}-${currentSlideIndex}`] = val;
    document.getElementById('title-size-value').textContent = val;
    renderSlide();
  });
  document.getElementById('edit-text-vertical').addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    slideTextVerticalPos[`${currentDayId}-${currentSlideIndex}`] = val;
    document.getElementById('text-vertical-value').textContent = val;
    renderSlide();
  });
  document.getElementById('edit-body-size').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    slideBodyFontSize[`${currentDayId}-${currentSlideIndex}`] = val;
    document.getElementById('body-size-value').textContent = val;
    renderSlide();
  });
  document.getElementById('edit-body-vertical').addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    slideBodyVerticalPos[`${currentDayId}-${currentSlideIndex}`] = val;
    document.getElementById('body-vertical-value').textContent = val;
    renderSlide();
  });
  document.getElementById('edit-title-color').addEventListener('input', (e) => {
    slideTitleColor[`${currentDayId}-${currentSlideIndex}`] = e.target.value;
    renderSlide();
  });
  document.getElementById('edit-body-color').addEventListener('input', (e) => {
    slideBodyColor[`${currentDayId}-${currentSlideIndex}`] = e.target.value;
    renderSlide();
  });

  document.getElementById('btn-copy-slide').addEventListener('click', () => {
    const slide = getSlide();
    const text = [slide.title, slide.body].filter(Boolean).join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('btn-copy-slide');
      btn.textContent = '¡Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copiar slide al portapapeles';
        btn.classList.remove('copied');
      }, 1500);
    });
  });

  document.getElementById('btn-export-day').addEventListener('click', () => {
    const day = parrilla.days.find(d => d.id === currentDayId);
    if (!day) return;
    const blob = new Blob([JSON.stringify(day, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `dia-${day.id}-${slugify(day.title)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('btn-export-one').addEventListener('click', exportCurrentSlide);
  document.getElementById('btn-export-all').addEventListener('click', exportAllSlides);

  // Video / Reel
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const total = parseInt(btn.dataset.preset, 10);
      const trans = 0.5;
      const slideDur = Math.max(1.5, (total - 7 * trans) / 8);
      document.getElementById('video-slide-duration').value = Math.round(slideDur * 10) / 10;
      document.getElementById('video-transition-duration').value = String(trans);
      updateVideoDurationHint();
    });
  });
  ['video-slide-duration', 'video-transition-duration'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateVideoDurationHint);
  });
  document.getElementById('btn-export-video').addEventListener('click', exportReel);

  document.getElementById('btn-convert-video').addEventListener('click', convertVideoToMp4);
  document.getElementById('btn-convert-local').addEventListener('click', exportReelMp4Local);
}

function exportCurrentSlide() {
  const slide = document.getElementById('export-slide');
  const format = getFormat();
  const cfg = FORMATS[format] || FORMATS['4:5'];
  const scale = cfg.exportW / slide.offsetWidth;

  html2canvas(slide, {
    scale: scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#FBF7F4'
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = `slide-dia${currentDayId}-${currentSlideIndex + 1}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.92);
    link.click();
  });
}

function exportAllSlides() {
  const day = parrilla.days.find(d => d.id === currentDayId);
  const origIdx = currentSlideIndex;

  function exportNext(i) {
    if (i >= 8) {
      currentSlideIndex = origIdx;
      renderSlide();
      updateEditor();
      renderSlideNav();
      return;
    }
    currentSlideIndex = i;
    renderSlide();
    setTimeout(() => {
      exportCurrentSlide();
      setTimeout(() => exportNext(i + 1), 500);
    }, 100);
  }

  exportNext(0);
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

function slugify(s) {
  return String(s).toLowerCase()
    .replace(/[^a-z0-9áéíóúñ]+/g, '-')
    .replace(/^-|-$/g, '');
}

/* ----- Video Reel Export ----- */
const FPS = 30;

function getVideoDimensions() {
  const format = getFormat();
  const cfg = FORMATS[format] || FORMATS['4:5'];
  return { w: cfg.exportW, h: cfg.exportH };
}

function updateVideoDurationHint() {
  const slideDur = parseFloat(document.getElementById('video-slide-duration').value) || 3;
  const transDur = parseFloat(document.getElementById('video-transition-duration').value) || 0.5;
  const total = 8 * slideDur + 7 * transDur;
  const { w, h } = getVideoDimensions();
  const hint = document.getElementById('video-duration-hint');
  if (hint) hint.textContent = `~${Math.round(total)} s total · WebM ${w}×${h}`;
}

function drawReelFrame(ctx, slides, t, slideDuration, transDuration, transition, videoW, videoH) {
  const segmentDuration = slideDuration + transDuration;
  const totalDuration = 8 * slideDuration + 7 * transDuration;
  if (t >= totalDuration || t < 0) return;
  const w = videoW;
  const h = videoH;

  const getSegment = (time) => {
    let acc = 0;
    for (let i = 0; i < 8; i++) {
      const slideEnd = acc + slideDuration;
      const transEnd = i < 7 ? slideEnd + transDuration : slideEnd;
      if (time < slideEnd) {
        return { slideIndex: i, nextIndex: i + 1, transProgress: 0, inTransition: false };
      }
      if (i < 7 && time < transEnd) {
        const transProgress = (time - slideEnd) / transDuration;
        return { slideIndex: i, nextIndex: i + 1, transProgress, inTransition: true };
      }
      acc = transEnd;
    }
    return { slideIndex: 7, nextIndex: 7, transProgress: 0, inTransition: false };
  };

  const { slideIndex, nextIndex, transProgress, inTransition } = getSegment(t);
  const slideA = slides[slideIndex];
  const slideB = inTransition && slides[nextIndex] ? slides[nextIndex] : null;

  if (!slideA) return;

  const drawSlide = (img, x = 0, y = 0, scale = 1, alpha = 1) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(w / 2, h / 2);
    ctx.scale(scale, scale);
    ctx.translate(-w / 2 + x, -h / 2 + y);
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();
  };

  if (!inTransition || transition === 'none' || transProgress <= 0) {
    drawSlide(slideA);
    return;
  }

  const p = Math.min(1, Math.max(0, transProgress));
  switch (transition) {
    case 'fade':
      drawSlide(slideA);
      drawSlide(slideB, 0, 0, 1, p);
      break;
    case 'slide-left':
      drawSlide(slideA, w * p, 0);
      drawSlide(slideB, -w * (1 - p), 0);
      break;
    case 'slide-right':
      drawSlide(slideA, -w * p, 0);
      drawSlide(slideB, w * (1 - p), 0);
      break;
    case 'slide-up':
      drawSlide(slideA, 0, h * p);
      drawSlide(slideB, 0, -h * (1 - p));
      break;
    case 'slide-down':
      drawSlide(slideA, 0, -h * p);
      drawSlide(slideB, 0, h * (1 - p));
      break;
    case 'zoom-in':
      drawSlide(slideA, 0, 0, 1);
      drawSlide(slideB, 0, 0, 0.7 + 0.3 * p, p);
      break;
    case 'zoom-out':
      drawSlide(slideA, 0, 0, 1 - 0.3 * p);
      drawSlide(slideB, 0, 0, 0.7 + 0.3 * p, p);
      break;
    case 'none':
      drawSlide(p < 0.5 ? slideA : slideB);
      break;
    default:
      drawSlide(slideA);
      if (slideB) drawSlide(slideB, 0, 0, 1, p);
  }
}

async function exportReel() {
  const btn = document.getElementById('btn-export-video');
  const progressWrap = document.getElementById('video-progress');
  const progressFill = document.getElementById('video-progress-fill');
  const progressText = document.getElementById('video-progress-text');

  if (btn.disabled) return;
  btn.disabled = true;
  progressWrap.classList.remove('hidden');
  progressFill.style.width = '0%';

  const slideDuration = parseFloat(document.getElementById('video-slide-duration').value) || 3;
  const transDuration = parseFloat(document.getElementById('video-transition-duration').value) || 0.5;
  const transition = document.getElementById('video-transition').value;
  const totalDuration = 8 * slideDuration + 7 * transDuration;
  const { w: videoW, h: videoH } = getVideoDimensions();
  const dayId = currentDayId;
  const origIdx = currentSlideIndex;
  const slideEl = document.getElementById('export-slide');
  const scale = videoW / slideEl.offsetWidth;

  progressText.textContent = 'Capturando slides...';

  const slideCanvases = [];
  for (let i = 0; i < 8; i++) {
    currentSlideIndex = i;
    renderSlide();
    await new Promise(r => setTimeout(r, 50));
    const rawCanvas = await html2canvas(slideEl, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FBF7F4'
    });
    const normalized = document.createElement('canvas');
    normalized.width = videoW;
    normalized.height = videoH;
    normalized.getContext('2d').drawImage(rawCanvas, 0, 0, videoW, videoH);
    slideCanvases.push(normalized);
  }
  currentSlideIndex = origIdx;
  renderSlide();
  updateEditor();
  renderSlideNav();

  progressText.textContent = `Generando video (~${Math.round(totalDuration)} s)...`;

  const videoCanvas = document.createElement('canvas');
  videoCanvas.width = videoW;
  videoCanvas.height = videoH;
  videoCanvas.setAttribute('width', String(videoW));
  videoCanvas.setAttribute('height', String(videoH));
  videoCanvas.style.cssText = `position:fixed;left:-99999px;width:${videoW}px;height:${videoH}px;`;
  document.body.appendChild(videoCanvas);
  const vctx = videoCanvas.getContext('2d');

  const stream = videoCanvas.captureStream(FPS);
  const chunks = [];
  const mimeType = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
    ? 'video/webm; codecs=vp9'
    : 'video/webm';
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 10000000
  });

  recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  recorder.onstop = () => {
    videoCanvas.remove();
    const blob = new Blob(chunks, { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reel-dia${dayId}-${slugify(parrilla.days.find(d => d.id === dayId)?.title || 'dia')}.webm`;
    a.click();
    URL.revokeObjectURL(url);
    progressWrap.classList.add('hidden');
    btn.disabled = false;
  };

  recorder.start(100);

  const totalFrames = Math.ceil(totalDuration * FPS);
  const frameInterval = 1000 / FPS;
  let frameIndex = 0;

  const tick = () => {
    if (frameIndex >= totalFrames) {
      recorder.stop();
      return;
    }
    const logicalTime = frameIndex / FPS;
    const pct = Math.round((frameIndex / totalFrames) * 100);
    progressFill.style.width = pct + '%';
    drawReelFrame(vctx, slideCanvases, logicalTime, slideDuration, transDuration, transition, videoW, videoH);
    frameIndex++;
    setTimeout(tick, frameInterval);
  };

  tick();
}

const XFADE_MAP = {
  'fade': 'fade',
  'slide-left': 'slideleft',
  'slide-right': 'slideright',
  'slide-up': 'slideup',
  'slide-down': 'slidedown',
  'zoom-in': 'fade',
  'zoom-out': 'fade',
  'none': 'fade'
};

async function exportReelMp4Local() {
  const btn = document.getElementById('btn-convert-local');
  const progressWrap = document.getElementById('convert-progress');
  const progressFill = document.getElementById('convert-progress-fill');
  const progressText = document.getElementById('convert-progress-text');
  const resultWrap = document.getElementById('convert-result');
  const downloadLink = document.getElementById('convert-download-link');
  const errEl = document.getElementById('convert-error');

  if (btn.disabled) return;
  btn.disabled = true;
  resultWrap.classList.add('hidden');
  errEl.classList.add('hidden');
  progressWrap.classList.remove('hidden');
  progressFill.style.width = '0%';

    const slideDuration = parseFloat(document.getElementById('video-slide-duration').value) || 3;
    const transDuration = parseFloat(document.getElementById('video-transition-duration').value) || 0.5;
    const transition = document.getElementById('video-transition').value;
    const { w: videoW, h: videoH } = getVideoDimensions();
    const dayId = currentDayId;
    const origIdx = currentSlideIndex;
    const slideEl = document.getElementById('export-slide');
    const scale = videoW / slideEl.offsetWidth;

    const ffmpegScale = 0.7;
    const ffW = Math.round(videoW * ffmpegScale);
    const ffH = Math.round(videoH * ffmpegScale);

    try {
    progressText.textContent = 'Capturando 8 slides...';
    progressFill.style.width = '10%';

    const slideCanvases = [];
    for (let i = 0; i < 8; i++) {
      currentSlideIndex = i;
      renderSlide();
      await new Promise(r => setTimeout(r, 50));
      const rawCanvas = await html2canvas(slideEl, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FBF7F4'
      });
      const normalized = document.createElement('canvas');
      normalized.width = ffW;
      normalized.height = ffH;
      normalized.getContext('2d').drawImage(rawCanvas, 0, 0, videoW, videoH, 0, 0, ffW, ffH);
      slideCanvases.push(normalized);
    }
    currentSlideIndex = origIdx;
    renderSlide();
    updateEditor();
    renderSlideNav();

    progressText.textContent = 'Cargando FFmpeg (~25 MB, primera vez)...';
    progressFill.style.width = '20%';

    const { createFFmpeg, fetchFile } = await new Promise((resolve, reject) => {
      if (window.FFmpeg && window.FFmpeg.createFFmpeg) {
        resolve(window.FFmpeg);
        return;
      }
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js';
      s.onload = () => {
        if (window.FFmpeg) resolve(window.FFmpeg);
        else reject(new Error('FFmpeg no disponible'));
      };
      s.onerror = () => reject(new Error('No se pudo cargar FFmpeg'));
      document.head.appendChild(s);
    });

    const ffmpeg = createFFmpeg({
      log: false,
      corePath: 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
      wasmPath: 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm'
    });
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    progressText.textContent = 'Escribiendo imágenes...';
    progressFill.style.width = '35%';

    for (let i = 0; i < 8; i++) {
      const blob = await new Promise(r => slideCanvases[i].toBlob(r, 'image/jpeg', 0.85));
      const data = await fetchFile(blob);
      ffmpeg.FS('writeFile', `img${i}.jpg`, data);
    }

    progressText.textContent = 'Generando MP4 (esto puede tardar 1-2 min)...';
    progressFill.style.width = '50%';

    const filterStr = [
      ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => `[${i}:v]scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p[v${i}]`),
      '[v0][v1][v2][v3][v4][v5][v6][v7]concat=n=8:v=1:a=0[out]'
    ].join(';');

    const args = ['-y'];
    for (let i = 0; i < 8; i++) {
      args.push('-loop', '1', '-t', String(slideDuration), '-i', `img${i}.jpg`);
    }
    args.push('-filter_complex', filterStr, '-map', '[out]', '-c:v', 'libx264', '-r', '30', '-movflags', '+faststart', 'output.mp4');

    await ffmpeg.run(...args);

    progressFill.style.width = '90%';
    progressText.textContent = 'Finalizando...';

    const data = ffmpeg.FS('readFile', 'output.mp4');
    const blob = new Blob([data], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const dayTitle = parrilla.days.find(d => d.id === dayId)?.title || 'dia';
    const filename = `reel-dia${dayId}-${slugify(dayTitle)}.mp4`;

    downloadLink.textContent = 'Descargar MP4 (abre en nueva pestaña)';
    downloadLink.onclick = () => {
      window.open(url, '_blank', 'noopener');
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.focus();
    };
    resultWrap.classList.remove('hidden');
    downloadLink.classList.remove('hidden');
    errEl.classList.add('hidden');

    progressFill.style.width = '100%';
    progressText.textContent = '¡Listo!';
  } catch (err) {
    const msg = (err.message || '').includes('OOM') || (err.message || '').includes('memory')
      ? 'Memoria insuficiente. Cierra otras pestañas e intenta de nuevo.'
      : (err.message || 'Error al generar MP4');
    errEl.textContent = msg;
    errEl.classList.remove('hidden');
    resultWrap.classList.remove('hidden');
    downloadLink.classList.add('hidden');
    console.error(err);
  } finally {
    progressWrap.classList.add('hidden');
    btn.disabled = false;
  }
}

async function convertVideoToMp4() {
  const btn = document.getElementById('btn-convert-video');
  const progressWrap = document.getElementById('convert-progress');
  const progressFill = document.getElementById('convert-progress-fill');
  const progressText = document.getElementById('convert-progress-text');
  const resultWrap = document.getElementById('convert-result');
  const downloadLink = document.getElementById('convert-download-link');
  const errEl = document.getElementById('convert-error');

  if (btn.disabled) return;
  btn.disabled = true;
  resultWrap.classList.add('hidden');
  errEl.classList.add('hidden');
  progressWrap.classList.remove('hidden');
  progressFill.style.width = '0%';

  const slideDuration = parseFloat(document.getElementById('video-slide-duration').value) || 3;
  const transDuration = parseFloat(document.getElementById('video-transition-duration').value) || 0.5;
  const { w: videoW, h: videoH } = getVideoDimensions();
  const dayId = currentDayId;
  const origIdx = currentSlideIndex;
  const slideEl = document.getElementById('export-slide');
  const scale = videoW / slideEl.offsetWidth;

  try {
    progressText.textContent = 'Capturando 8 slides en full res...';
    progressFill.style.width = '10%';

    const images = [];
    for (let i = 0; i < 8; i++) {
      currentSlideIndex = i;
      renderSlide();
      await new Promise(r => setTimeout(r, 50));
      const rawCanvas = await html2canvas(slideEl, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FBF7F4'
      });
      const normalized = document.createElement('canvas');
      normalized.width = videoW;
      normalized.height = videoH;
      normalized.getContext('2d').drawImage(rawCanvas, 0, 0, videoW, videoH, 0, 0, videoW, videoH);
      const base64 = normalized.toDataURL('image/jpeg', 0.9).split(',')[1];
      images.push(base64);
    }
    currentSlideIndex = origIdx;
    renderSlide();
    updateEditor();
    renderSlideNav();

    progressText.textContent = 'Enviando al servidor y generando MP4...';
    progressFill.style.width = '30%';

    const res = await fetch(`${CONVERT_API}/create-reel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        images,
        slideDuration,
        transDuration,
        width: videoW,
        height: videoH
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al crear el reel');

    progressFill.style.width = '100%';
    progressText.textContent = '¡Listo!';

    const dayTitle = parrilla.days.find(d => d.id === dayId)?.title || 'dia';
    const filename = `reel-dia${dayId}-${slugify(dayTitle)}.mp4`;
    progressText.textContent = 'Obteniendo video...';
    const vidRes = await fetch(data.downloadUrl);
    const blob = await vidRes.blob();
    const blobUrl = URL.createObjectURL(blob);
    downloadLink.textContent = 'Descargar MP4 (abre en nueva pestaña)';
    downloadLink.onclick = () => {
      window.open(blobUrl, '_blank', 'noopener');
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.focus();
    };
    resultWrap.classList.remove('hidden');
    downloadLink.classList.remove('hidden');
    errEl.classList.add('hidden');
  } catch (err) {
    errEl.textContent = err.message || 'Error desconocido';
    errEl.classList.remove('hidden');
    resultWrap.classList.remove('hidden');
    downloadLink.classList.add('hidden');
    console.error(err);
  } finally {
    progressWrap.classList.add('hidden');
    btn.disabled = false;
  }
}

loadParrilla();
