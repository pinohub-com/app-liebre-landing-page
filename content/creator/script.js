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
}

function exportCurrentSlide() {
  const slide = document.getElementById('export-slide');
  const scale = 1080 / slide.offsetWidth; /* 1080×1350 (4:5) */

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

loadParrilla();
