const stepCarousel = document.querySelector('.step-carousel');
const stepItems = document.querySelectorAll('.step-item');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const stepContent = document.getElementById('step-content');
const maskPathLenganPanjang = "M54.0059 417H7.00589C5.17255 367.167 1.40589 257.1 1.00589 215.5C0.505889 163.5 32.0059 43 35.0059 39C37.4059 35.8 58.0059 25 68.0059 20L113.506 1H216.006C239.006 7.5 280.506 27.5 295.506 39C307.506 48.2 324.173 160.5 331.006 215.5L323.506 417H277.506L270.006 186L266.506 174V405H65.0059V174L62.0059 186L54.0059 417Z";
const maskPathLenganPendek = "M268.157 405H66.1574L66.1573 177.5L62.1573 191.5C44.1573 186.833 6.75735 177.1 1.15735 175.5C-1.34265 170.5 26.6574 42.5 34.6574 42.5C34.6574 38.1 57.6574 25.3333 69.1574 19.5L114.157 1H218.157C229.491 5.16667 254.757 14.7 265.157 19.5C278.157 25.5 284.157 28 298.657 42.5C313.057 61.7 327.991 139.167 333.657 175.5L271.157 191.5L268.157 177.5V405Z";

let currentIndex = 0;
let selectedLengan = false;
let selectedKerah = false;
let selectedKancing = false;
let selectedSaku = false;
let kancingType = null;
let selectedMotif = null;
let selectedShirtColor = null;
let selectedLenganType = null;

const motifData = [
  {
    name: 'Motif A',
    images: {
      large: 'Gambar Motif/motif A Besar.png',
      medium: 'Gambar Motif/motif A Sedang.png',
      small: 'Gambar Motif/motif A Kecil.png'
    }
  },
  {
    name: 'Motif B',
    images: {
      large: ' ',
      medium: ' ',
      small: ' '
    }
  }
];

const stepData = {
  0: [
    `<div class="step-option-content"><img src="Pilihan Lengan/Ikon Lengan panjang.png"><span>Panjang</span></div>`,
    `<div class="step-option-content"><img src="Pilihan Lengan/Ikon Lengan pendek.png"><span>Pendek</span></div>`
  ],
  1: [
    `<div class="step-option-content"><img src="Pilihan Kerah/Ikon Kerah Biasa.png"><span>Standar</span></div>`,
    `<div class="step-option-content"><img src="Pilihan Kerah/Ikon Kerah Mandarin.png"><span>Mandarin</span></div>`,
    `<div class="step-option-content"><img src="Pilihan Kerah/Ikon Kerah Camp.png"><span>Camp</span></div>`
  ],
  2: [
    `<div class="step-option-content"><img src="Pilihan Kancing/Ikon Kancing Luar.png"><span>Kancing Luar</span></div>`,
    `<div class="step-option-content"><img src="Pilihan Kancing/Ikon Kancing Dalam.png"><span>Kancing Dalam</span></div>`
  ],
  3: [
    `<div class="step-option-content"><img src="Pilihan Saku/Tanpa Saku.png"><span>Tanpa Saku</span></div>`,
    `<div class="step-option-content"><img src="Pilihan Saku/Ikon Saku.png"><span>Saku Kanan</span></div>`,
    `<div class="step-option-content"><img src="Pilihan Saku/Ikon Saku.png"><span>Saku Kiri</span></div>`
  ],
  4: [
    { title: "Warna Kemeja", colors: ['#243565', '#aa5c9e', '#ce433b', '#80cde9', '#eabcd4', '#1d1c1d', '#d86f3a', '#FFFFFF', '#bf996a', '#9bc654'] },
    { title: "Warna Kancing", colors: ['#243565', '#aa5c9e', '#ce433b', '#80cde9', '#eabcd4', '#1d1c1d', '#d86f3a', '#FFFFFF', '#bf996a', '#9bc654'] }
  ],
  5: ['<button id="add-motif-btn" class="motif-btn">Tambahkan Motif</button>']
};

function updateCarousel() {
  const itemWidth = stepItems[0].offsetWidth;
  const offset = -currentIndex * itemWidth;
  stepCarousel.style.transform = `translateX(${offset}px)`;

  stepItems.forEach((item, index) => item.classList.toggle('active', index === currentIndex));
  btnPrev.classList.toggle('disabled', currentIndex === 0);
  btnNext.classList.toggle('disabled', currentIndex === stepItems.length - 1);

  updateStepContent();
  updateInfoBox();
}

function updateStepContent() {
  const content = stepData[currentIndex];

  if (Array.isArray(content) && content[0]?.title) {
    stepContent.innerHTML = content.map(section =>
      `<div class="color-section">
        <div class="color-label">${section.title}</div>
        <div class="color-row">
          ${section.colors.map(color => `<div class="color-box" style="background:${color}" data-type="${section.title}"></div>`).join('')}
        </div>
      </div>`).join('');
  } else if (Array.isArray(content)) {
    stepContent.innerHTML = content.map(item => `<div class="step-option">${item}</div>`).join('');
  } else {
    stepContent.innerHTML = '';
  }

  document.querySelectorAll('.step-option-content').forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').getAttribute('src');
      const label = this.querySelector('span').innerText;

      if (currentIndex === 0) {
        const lenganPath = imgSrc.includes('Lengan panjang') ? 'Lengan Panjang' : 'Lengan Pendek';
        const baseSrc = `Alternatif Warna/${lenganPath}/${selectedShirtColor || 'white'}-01.svg`;
        document.getElementById('shirt-lengan').src = baseSrc;
        selectedLengan = true;
        selectedLenganType = lenganPath;

        // Update mask image
        const maskShape = document.getElementById('mask-shape');
        if (imgSrc.includes('Lengan panjang')) {
          maskShape.setAttribute('d', maskPathLenganPanjang);
        } else if (imgSrc.includes('Lengan pendek')) {
          maskShape.setAttribute('d', maskPathLenganPendek);
        }
      }


      if (currentIndex === 1) {
        const kerah = document.getElementById('shirt-kerah');
        let kerahPath;
        if (imgSrc.includes('Kerah Biasa')) kerahPath = 'Kerah Standar';
        if (imgSrc.includes('Kerah Mandarin')) kerahPath = 'Kerah Mandarin';
        if (imgSrc.includes('Kerah Camp')) kerahPath = 'Kerah Camp';

        const baseSrc = `Alternatif Warna/${kerahPath}/${selectedShirtColor || 'white'}-01.svg`;
        kerah.src = baseSrc;
        selectedKerah = true;
      }

      if (currentIndex === 2) {
        const kancing = document.getElementById('shirt-kancing');
        if (imgSrc.includes('Kancing Luar')) {
          kancingType = 'luar';
          kancing.src = 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-black.png';
        } else {
          kancingType = 'dalam';
          kancing.src = 'Bagian Pola Kemeja/Depan/Kancing dalam.png';
        }
        selectedKancing = true;
      }

      if (currentIndex === 3) {
        const saku = document.getElementById('shirt-saku');
        if (label.includes('Tanpa Saku')) {
          saku.src = ' ';
        } else {
          const sakuType = label.includes('Saku Kanan') ? 'Saku Kanan' : 'Saku Kiri';
          saku.src = `Alternatif Warna/${sakuType}/${selectedShirtColor || 'white'}-01.svg`;
        }
      }
      selectedSaku = true;
      updateInfoBox();
    });
  });

  if (currentIndex === 5) {
    const motifBtn = document.getElementById('add-motif-btn');
    motifBtn.addEventListener('click', () => {
      if (!(selectedLengan && selectedKerah && selectedKancing)) {
        document.getElementById('info-box').classList.remove('hidden');
        document.getElementById('info-box').classList.add('show');
        return;
      }

      document.getElementById('info-box').classList.remove('show');
      document.getElementById('info-box').classList.add('hidden');

      const motifGrid = document.getElementById('motif-grid');
      motifGrid.innerHTML = motifData.map((motif, index) => `
        <div class="motif-item" data-index="${index}">
          <img src="${motif.images.large}" alt="${motif.name}">
        </div>
      `).join('');

      document.getElementById('motif-popup').classList.remove('hidden');

      document.querySelectorAll('.motif-item').forEach(item => {
        item.addEventListener('click', e => {
          const index = item.dataset.index;
          selectedMotif = motifData[index];

          const popup = document.getElementById('motif-option-popup');
          popup.querySelector('.motif-option-size[data-size="large"] img').src = selectedMotif.images.large;
          popup.querySelector('.motif-option-size[data-size="medium"] img').src = selectedMotif.images.medium;
          popup.querySelector('.motif-option-size[data-size="small"] img').src = selectedMotif.images.small;

          popup.style.visibility = 'hidden';
          popup.classList.remove('hidden');

          requestAnimationFrame(() => {
            const rect = item.getBoundingClientRect();
            popup.style.left = `${rect.left + rect.width / 2 - popup.offsetWidth / 2}px`;
            popup.style.top = `${rect.top - popup.offsetHeight - 10 + window.scrollY}px`;
            popup.style.visibility = 'visible';
          });
        });
      });
    });
  }
}

document.addEventListener('click', function(e) {
  const popup = document.getElementById('motif-option-popup');
  if (!e.target.closest('.motif-item') && !e.target.closest('#motif-option-popup')) {
    popup.classList.add('hidden');
  }

  if (e.target.classList.contains('color-box')) {
    const type = e.target.dataset.type;
    const bgColor = e.target.style.backgroundColor;

    document.querySelectorAll(`.color-box[data-type="${type}"]`).forEach(box => box.classList.remove('selected'));
    e.target.classList.add('selected');

    if (type === 'Warna Kancing' && kancingType === 'luar') {
      const kancing = document.getElementById('shirt-kancing');
      const colorMap = {
        '#243565': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-navy.png',
        '#aa5c9e': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-purple.png',
        '#ce433b': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-red.png',
        '#80cde9': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-blue.png',
        '#eabcd4': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-pink.png',
        '#1d1c1d': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-black.png',
        '#d86f3a': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-orange.png',
        '#ffffff': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-white.png',
        '#bf996a': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-brown.png',
        '#9bc654': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-green.png'
      };

      const hex = rgbToHex(bgColor).toLowerCase();
      if (colorMap[hex]) {
        kancing.src = colorMap[hex];
      }
    } else if (type === 'Warna Kemeja') {
      if (!(selectedLengan && selectedKerah && selectedSaku)) {
        alert('Silakan pilih lengan, kerah, dan saku terlebih dahulu');
        return;
      }
      const colorMap = {
        '#243565': 'navy',
        '#aa5c9e': 'purple',
        '#ce433b': 'red',
        '#80cde9': 'blue',
        '#eabcd4': 'pink',
        '#1d1c1d': 'black',
        '#d86f3a': 'orange',
        '#ffffff': 'white',
        '#bf996a': 'brown',
        '#9bc654': 'green'
      };

      const hex = rgbToHex(bgColor).toLowerCase();
      const color = colorMap[hex] || 'black';
      selectedShirtColor = color;
      document.getElementById('shirt-base').src = `Alternatif Warna/Badan Depan/${color}-01.svg`;

      const lenganEl = document.getElementById('shirt-lengan');
      if (lenganEl && selectedLenganType) {
        lenganEl.src = `Alternatif Warna/${selectedLenganType}/${color}-01.svg`;
      }

      const kerahEl = document.getElementById('shirt-kerah');
      if (kerahEl && kerahEl.src) {
        if (kerahEl.src.toLowerCase().includes('standar')) {
          kerahEl.src = `Alternatif Warna/Kerah Standar/${color}-01.svg`;
        } else if (kerahEl.src.toLowerCase().includes('mandarin')) {
          kerahEl.src = `Alternatif Warna/Kerah Mandarin/${color}-01.svg`;
        } else if (kerahEl.src.toLowerCase().includes('camp')) {
          kerahEl.src = `Alternatif Warna/Kerah Camp/${color}-01.svg`;
        }
      }

      const sakuEl = document.getElementById('shirt-saku');
      if (sakuEl && sakuEl.src) {
        if (sakuEl.src.toLowerCase().includes('kanan')) {
          sakuEl.src = `Alternatif Warna/Saku Kanan/${color}-01.svg`;
        } else if (sakuEl.src.toLowerCase().includes('kiri')) {
          sakuEl.src = `Alternatif Warna/Saku Kiri/${color}-01.svg`;
        }
      }
    }
  }
});

function rgbToHex(rgbString) {
  const result = rgbString.match(/\d+/g);
  if (!result) return rgbString;
  const [r, g, b] = result.map(x => parseInt(x).toString(16).padStart(2, '0'));
  return `#${r}${g}${b}`;
}

btnNext.addEventListener('click', () => {
  if (currentIndex < stepItems.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

btnPrev.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

stepItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

function updateInfoBox() {
  const infoBox = document.getElementById('info-box');
  if (!(selectedLengan && selectedKerah && selectedKancing && selectedSaku)) {
    infoBox.classList.add('show');
    infoBox.classList.remove('hidden');
  } else {
    infoBox.classList.remove('show');
    infoBox.classList.add('hidden');
  }
}

document.getElementById('close-motif-popup').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('motif-popup').classList.add('hidden');
});

document.querySelectorAll('.motif-option-size').forEach(option => {
  option.addEventListener('click', () => {
    const size = option.dataset.size;
    const src = selectedMotif.images[size];
    addMotifToShirt(size, src);

    document.getElementById('motif-option-popup').classList.add('hidden');
    document.getElementById('motif-popup').classList.add('hidden');
  });
});

function calculateAreaCoverage() {
  const container = document.querySelector('.motif-container');
  const containerRect = container.getBoundingClientRect();
  const existingMotifs = container.querySelectorAll('.motif-preview');
  
  const bodyBounds = getBodyBounds();
  const scaleX = containerRect.width / 371.66;
  const scaleY = containerRect.height / 471.35;
  
  const bodyAreaWidth = (bodyBounds.maxX - bodyBounds.minX) * scaleX;
  const bodyAreaHeight = (bodyBounds.maxY - bodyBounds.minY) * scaleY;
  const totalBodyArea = bodyAreaWidth * bodyAreaHeight;
  
  let coveredArea = 0;
  existingMotifs.forEach(motif => {
    const motifWidth = parseFloat(motif.style.width);
    const motifHeight = motifWidth;
    coveredArea += motifWidth * motifHeight;
  });
  
  const coveragePercentage = (coveredArea / totalBodyArea) * 100;
  return {
    totalArea: totalBodyArea,
    coveredArea: coveredArea,
    availableArea: totalBodyArea - coveredArea,
    coveragePercentage: coveragePercentage
  };
}

function canPlaceMotif(size) {
  const motifSize = size === 'large' ? 100 : size === 'medium' ? 80 : 60;
  const motifArea = motifSize * motifSize;
  const padding = 20;
  const requiredArea = (motifSize + padding) * (motifSize + padding);
  
  const areaCoverage = calculateAreaCoverage();
  
  if (areaCoverage.availableArea < requiredArea) {
    return false;
  }
  
  if (areaCoverage.coveragePercentage > 80) {
    return false;
  }
  
  return true;
}

function findValidPosition(motifSize, container, existingMotifs) {
  const containerRect = container.getBoundingClientRect();
  const bodyBounds = getBodyBounds();
  const scaleX = containerRect.width / 371.66;
  const scaleY = containerRect.height / 471.35;
  
  const minX = Math.max(0, bodyBounds.minX * scaleX);
  const maxX = Math.min(containerRect.width - motifSize, bodyBounds.maxX * scaleX - motifSize);
  const minY = Math.max(0, bodyBounds.minY * scaleY);
  const maxY = Math.min(containerRect.height - motifSize, bodyBounds.maxY * scaleY - motifSize);
  
  const padding = 20;
  const gridSize = 10;
  
  for (let y = minY; y <= maxY - motifSize; y += gridSize) {
    for (let x = minX; x <= maxX - motifSize; x += gridSize) {
      const tempMotif = {
        style: {
          left: `${x}px`,
          top: `${y}px`,
          width: `${motifSize}px`
        },
        getBoundingClientRect: () => ({
          left: x,
          top: y,
          right: x + motifSize,
          bottom: y + motifSize
        })
      };
      
      let hasCollision = false;
      for (const motif of existingMotifs) {
        const existingRect = motif.getBoundingClientRect();
        const newRect = tempMotif.getBoundingClientRect();
        
        if (!(newRect.right < existingRect.left - padding ||
              newRect.left > existingRect.right + padding ||
              newRect.bottom < existingRect.top - padding ||
              newRect.top > existingRect.bottom + padding)) {
          hasCollision = true;
          break;
        }
      }
      
      if (!hasCollision) {
        const svgX = x * (371.66 / containerRect.width);
        const svgY = y * (471.35 / containerRect.height);
        const svgX2 = (x + motifSize) * (371.66 / containerRect.width);
        const svgY2 = (y + motifSize) * (471.35 / containerRect.height);
        
        const corners = [
          [svgX, svgY],
          [svgX2, svgY],
          [svgX, svgY2],
          [svgX2, svgY2]
        ];
        
        const allCornersInside = corners.every(([cx, cy]) => isPointInBodyArea(cx, cy));
        
        if (allCornersInside) {
          return { x, y };
        }
      }
    }
  }
  
  return null;
}

function addMotifToShirt(size, src) {
  const container = document.querySelector('.motif-container');
  const existingMotifs = container.querySelectorAll('.motif-preview');
  
  if (!canPlaceMotif(size)) {
    showMotifFullInfo("Area kemeja sudah penuh, tidak dapat menambahkan motif lagi");
    return;
  }

  const motif = document.createElement('img');
  motif.src = src;
  motif.className = 'motif-preview';
  motif.dataset.size = size;
  motif.dataset.id = Date.now();
  motif.dataset.scaleX = 1;
  motif.dataset.scaleY = 1;
  motif.style.position = 'absolute';
  motif.style.pointerEvents = 'auto';
  motif.style.cursor = 'grab';
  motif.style.zIndex = '20';

  const motifSize = size === 'large' ? 100 : size === 'medium' ? 80 : 60;
  motif.style.width = `${motifSize}px`;

  const position = findValidPosition(motifSize, container, existingMotifs);
  
  if (!position) {
    showMotifFullInfo("Tidak dapat menemukan posisi kosong yang sesuai");
    return;
  }

  motif.style.left = `${position.x}px`;
  motif.style.top = `${position.y}px`;

  container.appendChild(motif);
  enableMotifDrag(motif);
}

function showMotifFullInfo(message = "Slot motif sudah penuh") {
  const infoBox = document.getElementById('motif-full-info');
  infoBox.textContent = message;
  infoBox.classList.add('show');
  setTimeout(() => infoBox.classList.remove('show'), 2000);
}

function showControlPopup(motif, x, y) {
  const popup = document.getElementById('motif-control-popup');
  if (!popup) return;

  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  popup.dataset.motifId = motif.dataset.id;
  popup.classList.remove('hidden');

  const closePopup = (e) => {
    if (!e.target.closest('.motif-control-popup') && !e.target.closest('.motif-preview')) {
      popup.classList.add('hidden');
      document.removeEventListener('click', closePopup);
    }
  };
  setTimeout(() => document.addEventListener('click', closePopup), 0);
}

function closeControlPopup(e) {
  if (!e.target.closest('.motif-control-popup') && !e.target.closest('.motif-preview')) {
    document.getElementById('motif-control-popup').classList.add('hidden');
    document.removeEventListener('click', closeControlPopup);
  }
}

function isColliding(newMotif, existingMotifs) {
  const newRect = newMotif.getBoundingClientRect();
  const collisionMargin = 10;

  for (const motif of existingMotifs) {
    if (motif === newMotif) continue;

    const existingRect = motif.getBoundingClientRect();

    if (!(newRect.right < existingRect.left + collisionMargin ||
      newRect.left > existingRect.right - collisionMargin ||
      newRect.bottom < existingRect.top + collisionMargin ||
      newRect.top > existingRect.bottom - collisionMargin)) {
      return true;
    }
  }
  return false;
}

function getBodyBounds() {
  return {
    minX: 58,     // Left boundary
    maxX: 270,    // Right boundary
    minY: 10,     // Top boundary
    maxY: 500     // Bottom boundary
  };
}

function isPointInBodyArea(x, y) {
  const bounds = getBodyBounds();
  return x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY;
}

function enableMotifDrag(motif) {
  let isDragging = false;
  let clickStartTime = 0;
  const CLICK_MAX_DURATION = 200;

  motif.addEventListener('pointerdown', (e) => {
    clickStartTime = Date.now();
    document.getElementById('motif-control-popup').classList.add('hidden');

    isDragging = true;
    const rect = motif.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    originalX = parseFloat(motif.style.left);
    originalY = parseFloat(motif.style.top);

    motif.style.zIndex = '100';
    motif.style.cursor = 'grabbing';
    e.preventDefault();
  });

  const calculateConstraints = (motif, containerRect) => {
    const motifRect = motif.getBoundingClientRect();
    const bodyBounds = getBodyBounds();
    const containerBounds = document.querySelector('.motif-container').getBoundingClientRect();

    const scaleX = containerBounds.width / 371.66;
    const scaleY = containerBounds.height / 471.35;

    return {
      minX: Math.max(0, bodyBounds.minX * scaleX),
      maxX: Math.min(containerBounds.width - motifRect.width, bodyBounds.maxX * scaleX - motifRect.width),
      minY: Math.max(0, bodyBounds.minY * scaleY),
      maxY: Math.min(containerBounds.height - motifRect.height, bodyBounds.maxY * scaleY - motifRect.height)
    };
  };

  motif.addEventListener('click', (e) => {
    if (Date.now() - clickStartTime < CLICK_MAX_DURATION && !isDragging) {
      e.stopPropagation();
      showControlPopup(motif, e.clientX, e.clientY);
    }
  });

  document.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const container = motif.parentElement;
    const containerRect = container.getBoundingClientRect();
    const constraints = calculateConstraints(motif, containerRect);

    let left = e.clientX - containerRect.left - offsetX;
    let top = e.clientY - containerRect.top - offsetY;

    // Apply basic boundary constraints
    left = Math.max(constraints.minX, Math.min(left, constraints.maxX));
    top = Math.max(constraints.minY, Math.min(top, constraints.maxY));

    const motifWidth = parseFloat(motif.style.width);
    const motifHeight = motifWidth;

    const scaleX = 371.66 / containerRect.width;
    const scaleY = 471.35 / containerRect.height;

    const svgX = left * scaleX;
    const svgY = top * scaleY;
    const svgX2 = (left + motifWidth) * scaleX;
    const svgY2 = (top + motifHeight) * scaleY;

    const corners = [
      [svgX, svgY],
      [svgX2, svgY],
      [svgX, svgY2],
      [svgX2, svgY2]
    ];

    const allCornersInside = corners.every(([x, y]) => isPointInBodyArea(x, y));

    if (!allCornersInside) {
      return;
    }

    motif.style.left = `${left}px`;
    motif.style.top = `${top}px`;

    const allMotifs = document.querySelectorAll('.motif-preview');
    if (isColliding(motif, allMotifs)) {
      motif.style.left = `${originalX}px`;
      motif.style.top = `${originalY}px`;
    } else {
      originalX = left;
      originalY = top;
    }
  });

  document.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    motif.style.zIndex = '20';
    motif.style.cursor = 'grab';
  });
}

function closeControlPopup(e) {
  if (!e.target.closest('.motif-control-popup') && !e.target.closest('.motif-preview')) {
    document.getElementById('motif-control-popup').classList.add('hidden');
    document.removeEventListener('click', closeControlPopup);
  }
}

function initMotifControls() {
  if (!document.getElementById('motif-control-popup')) {
    const popup = document.createElement('div');
    popup.id = 'motif-control-popup';
    popup.className = 'motif-control-popup hidden';
    popup.innerHTML = `
      <div class="control-option" data-action="rotate">↻ Putar</div>
      <div class="control-option" data-action="flipH">↔ Balik Horizontal</div>
      <div class="control-option" data-action="flipV">↕ Balik Vertikal</div>
      <div class="control-option delete" data-action="delete">🗑 Hapus</div>
    `;
    document.body.appendChild(popup);
  }

  document.querySelectorAll('.control-option').forEach(option => {
    option.addEventListener('click', function() {
      const action = this.dataset.action;
      const motifId = document.getElementById('motif-control-popup').dataset.motifId;
      const motif = document.querySelector(`.motif-preview[data-id="${motifId}"]`);

      if (!motif) return;

      switch (action) {
        case 'rotate':
          const currentRot = parseInt(motif.style.transform?.match(/rotate\((\d+)deg\)/)?.[1] || 0);
          motif.style.transform = `rotate(${currentRot + 90}deg)`;
          break;
        case 'flipH':
          motif.style.transform = `scaleX(${motif.style.transform?.includes('scaleX(-1)') ? 1 : -1})`;
          break;
        case 'flipV':
          motif.style.transform = `scaleY(${motif.style.transform?.includes('scaleY(-1)') ? 1 : -1})`;
          break;
        case 'delete':
          motif.remove();
          break;
      }

      document.getElementById('motif-control-popup').classList.add('hidden');
    });
  });
}

function setInitialShirtColor() {
  selectedShirtColor = 'white';
  document.getElementById('shirt-base').src = 'Alternatif Warna/Badan Depan/white-01.svg';

  const components = {
    'shirt-lengan': 'Lengan',
    'shirt-kerah': 'Kerah',
    'shirt-saku': 'Saku'
  };

  for (const [id, type] of Object.entries(components)) {
    const element = document.getElementById(id);
    if (element && element.src) {
      let path = '';
      if (type === 'Lengan' && element.src.includes('panjang')) {
        path = 'Alternatif Warna/Lengan Panjang/white-01.svg';
      } else if (type === 'Lengan') {
        path = 'Alternatif Warna/Lengan Pendek/white-01.svg';
      } else if (type === 'Kerah') {
        if (element.src.toLowerCase().includes('standar')) {
          path = 'Alternatif Warna/Kerah Standar/white-01.svg';
        } else if (element.src.toLowerCase().includes('mandarin')) {
          path = 'Alternatif Warna/Kerah Mandarin/white-01.svg';
        } else if (element.src.toLowerCase().includes('camp')) {
          path = 'Alternatif Warna/Kerah Camp/white-01.svg';
        }
      } else if (type === 'Saku') {
        if (element.src.toLowerCase().includes('kanan')) {
          path = 'Alternatif Warna/Saku Kanan/white-01.svg';
        } else if (element.src.toLowerCase().includes('kiri')) {
          path = 'Alternatif Warna/Saku Kiri/white-01.svg';
        }
      }
      if (path) element.src = path;
    }
  }
}

function setInitialSelections() {
  // Set initial shirt color (white)
  setInitialShirtColor();

  // Set lengan panjang
  document.getElementById('shirt-lengan').src = 'Alternatif Warna/Lengan Panjang/white-01.svg';
  selectedLengan = true;
  selectedLenganType = 'Lengan Panjang';

  // Set kerah standar
  document.getElementById('shirt-kerah').src = 'Alternatif Warna/Kerah Standar/white-01.svg';
  selectedKerah = true;

  // Set kancing luar
  document.getElementById('shirt-kancing').src = 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-black.png';
  selectedKancing = true;
  kancingType = 'luar';

  // Set tanpa saku
  document.getElementById('shirt-saku').src = ' ';
  selectedSaku = true;

  // Update info box
  updateInfoBox();
}

window.addEventListener('load', setInitialSelections);

window.addEventListener('resize', updateCarousel);
updateCarousel();

initMotifControls();