const stepCarousel = document.querySelector('.step-carousel');
const stepItems = document.querySelectorAll('.step-item');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const stepContent = document.getElementById('step-content');

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
          saku.src = '';
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
            popup.style.left = `${rect.left + rect.width/2 - popup.offsetWidth/2}px`;
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
        '#243565': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-Navy.png',
        '#aa5c9e': 'Bagian Pola Kemeja/Alternatif warna kancing/kancing-Purple.png',
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

function addMotifToShirt(size, src) {
  const container = document.querySelector('.motif-container');
  const existingMotifs = container.querySelectorAll('.motif-preview');
  const sameSizeMotifs = Array.from(existingMotifs).filter(motif => motif.dataset.size === size).length;
  const maxMotifs = {
    large: 2,
    medium: 3,
    small: 5
  };

  if (sameSizeMotifs >= maxMotifs[size]) {
    showMotifFullInfo(`Maksimal ${maxMotifs[size]} motif ${size === 'large' ? 'besar' : size === 'medium' ? 'sedang' : 'kecil'}`);
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
  const containerRect = container.getBoundingClientRect();
  const maxX = containerRect.width - motifSize;
  const maxY = containerRect.height - motifSize;
  let posX, posY;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    posX = Math.floor(Math.random() * maxX);
    posY = Math.floor(Math.random() * maxY);
    motif.style.left = `${posX}px`;
    motif.style.top = `${posY}px`;
    attempts++;

    if (attempts >= maxAttempts) {
      showMotifFullInfo("Tidak bisa menemukan posisi yang kosong");
      return;
    }
  } while (isColliding(motif, existingMotifs));

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

    let left = e.clientX - containerRect.left - offsetX;
    let top = e.clientY - containerRect.top - offsetY;

    left = Math.max(0, Math.min(left, containerRect.width - motif.offsetWidth));
    top = Math.max(0, Math.min(top, containerRect.height - motif.offsetHeight));

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

      switch(action) {
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

window.addEventListener('load', setInitialShirtColor);

window.addEventListener('resize', updateCarousel);
updateCarousel();

initMotifControls();
