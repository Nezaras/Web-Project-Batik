const stepCarousel = document.querySelector('.step-carousel');
const stepItems = document.querySelectorAll('.step-item');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const stepContent = document.getElementById('step-content');

let currentIndex = 0;
let currentView = 'Depan'; // Tampilan hanya akan 'Depan'
let selectedMotif = null;
let selectedShirtColor = null;
let selectedMotifColorA = 'Navy';
let selectedMotifColorB = 'Navy';
let selectedMotifName = '';

const activeSelections = {
  // Kosongkan karena langkah-langkah lama dihapus
};

const motifSizes = {
  large: 10,   
  medium: 10,   
  small: 10     
};

const motifData = [
  {
    name: 'SABELE',
    images: {
      large: 'Gambar Motif/Motif Senjata Sabele/motif besar.svg',
      medium: 'Gambar Motif/Motif Senjata Sabele/motif sedang.svg',
      small: 'Gambar Motif/Motif Senjata Sabele/motif kecil.svg'
    }
  },
  {
    name: 'BUAYA',
    images: {
      large: 'Gambar Motif/Motif Buaya/motif besar.svg',
      medium: 'Gambar Motif/Motif Buaya/motif sedang.svg',
      small: 'Gambar Motif/Motif Buaya/motif kecil.svg'
    }
  },
  {
    name: 'GAPURA',
    images: {
      large: 'Gambar Motif/Motif Gapura (Alikusu)/motif besar.svg',
      medium: 'Gambar Motif/Motif Gapura (Alikusu)/motif sedang.svg',
      small: 'Gambar Motif/Motif Gapura (Alikusu)/motif kecil.svg'
    }
  },
  {
    name: 'AREN',
    images: {
      large: 'Gambar Motif/Motif Gula Aren (Pahangga)/motif besar.svg',
      medium: 'Gambar Motif/Motif Gula Aren (Pahangga)/motif sedang.svg',
      small: 'Gambar Motif/Motif Gula Aren (Pahangga)/motif kecil.svg'
    }
  },
  {
    name: 'LALE',
    images: {
      large: 'Gambar Motif/Motif Janur (Lale)/motif besar.svg',
      medium: 'Gambar Motif/Motif Janur (Lale)/motif sedang.svg',
      small: 'Gambar Motif/Motif Janur (Lale)/motif kecil.svg'
    }
  },
  {
    name: 'KELAPA',
    images: {
      large: 'Gambar Motif/Motif Kelapa/motif besar.svg',
      medium: 'Gambar Motif/Motif Kelapa/motif sedang.svg',
      small: 'Gambar Motif/Motif Kelapa/motif kecil.svg'
    }
  },
  {
    name: 'MAKUTA',
    images: {
      large: 'Gambar Motif/Motif Mahkota (Makuta)/motif besar.svg',
      medium: 'Gambar Motif/Motif Mahkota (Makuta)/motif sedang.svg',
      small: 'Gambar Motif/Motif Mahkota (Makuta)/motif kecil.svg'
    }
  },
  {
    name: 'PALA',
    images: {
      large: 'Gambar Motif/Motif Pala Cengkih/motif besar.svg',
      medium: 'Gambar Motif/Motif Pala Cengkih/motif sedang.svg',
      small: 'Gambar Motif/Motif Pala Cengkih/motif kecil.svg'
    }
  },
  {
    name: 'PINANG',
    images: {
      large: 'Gambar Motif/Motif Pohon Pinang/motif besar.svg',
      medium: 'Gambar Motif/Motif Pohon Pinang/motif sedang.svg',
      small: 'Gambar Motif/Motif Pohon Pinang/motif kecil.svg'
    }
  },
  {
    name: 'BALADU',
    images: {
      large: 'Gambar Motif/Motif Senjata Baladu/motif besar.svg',
      medium: 'Gambar Motif/Motif Senjata Baladu/motif sedang.svg',
      small: 'Gambar Motif/Motif Senjata Baladu/motif kecil.svg'
    }
  },
  {
    name: 'SIMPUL',
    images: {
      large: 'Gambar Motif/Motif Tali Simpul/motif besar.svg',
      medium: 'Gambar Motif/Motif Tali Simpul/motif sedang.svg',
      small: 'Gambar Motif/Motif Tali Simpul/motif kecil.svg'
    }
  },
  {
    name: 'TEBU',
    images: {
      large: 'Gambar Motif/Motif Tebu/motif besar.svg',
      medium: 'Gambar Motif/Motif Tebu/motif sedang.svg',
      small: 'Gambar Motif/Motif Tebu/motif kecil.svg'
    }
  }
];

const stepData = {
  0: [
    { title: "Warna Jilbab", colors: ['#FFFFFF', '#666766', '#D2D2D1', '#813738', '#552E36', '#673A34', '#765B91', '#83516A', '#B580AD',
        '#FBD2DB', '#70314A', '#E4A0C1', '#DEAD5F', '#9D522F', '#F79B77', '#21407A', '#2F313D', '#3F689F',
        '#667B4D', '#284A3C', '#75BC7E', '#BE986A', '#473933', '#DBCABC', '#7998B4', '#4F5A79', '#9BC9D8',
        '#303131', '#1C1C1D', '#4A5053'] }
  ],
  1: ['<button id="add-motif-btn" class="motif-btn">Tambahkan Motif</button>']
};

const motifColors = [
  { name: 'navy', hex: '#243565' },
  { name: 'purple', hex: '#aa5c9e' },
  { name: 'red', hex: '#ce433b' },
  { name: 'blue', hex: '#80cde9' },
  { name: 'pink', hex: '#eabcd4' },
  { name: 'black', hex: '#1d1c1d' },
  { name: 'orange', hex: '#d86f3a' },
  { name: 'white', hex: '#ffffff' },
  { name: 'brown', hex: '#bf996a' },
  { name: 'green', hex: '#9bc654' },
];

function getHexFromName(name) {
  const found = motifColors.find(c => c.name.toLowerCase() === name.toLowerCase());
  return found ? found.hex : '#000000';
}

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-custom-button');
  const stepSection = document.querySelector('.step-section');
  const startContainer = document.getElementById('start-custom-button-container');
  const sizeList = document.getElementById('size-list');
  const addSizeBtn = document.querySelector('.btn-add-size');

  let sizes = [];

  addSizeBtn.addEventListener('click', () => {
    if (sizes.length >= 1) return;

    sizes.push({ label: 'M', qty: 1 });
    renderSizes();
    const prosesBtn = document.querySelector('.btn-proses');
    if (prosesBtn) {
      prosesBtn.style.backgroundColor = '#6327a6'; // warna ungu
      prosesBtn.style.cursor = 'pointer';
      prosesBtn.disabled = false;
    }
    addSizeBtn.disabled = true;
  });

  function renderSizes() {
    sizeList.innerHTML = '';

    sizes.forEach((item, index) => {
      const sizeEl = document.createElement('div');
      sizeEl.className = 'size-item';

      sizeEl.innerHTML = `
        <div class="size-label">${item.label} <span style="color:#888;font-size:12px;" alt="hapus">Ubah</span></div>
        <div class="size-controls">
          <button class="hapus" onclick="changeQty(${index}, -1)">
            <img src="Ikon Lainnya/Ikon Kurangi Jumlah.png" alt="hapus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;">
          </button>
          <span class="qty">${item.qty}</span>
          <button class="hapus" onclick="changeQty(${index}, +1)">
            <img src="Ikon Lainnya/Ikon Tambah Jumlah.png" alt="hapus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;">
          </button>
          <button class="hapus" onclick="removeSize(${index})">
            <img src="Ikon Lainnya/Ikon Delete.png" alt="hapus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;">
            Hapus
          </button>
        </div>
      `;

      sizeList.appendChild(sizeEl);
    });
  }

  window.changeQty = function(index, delta) {
    sizes[index].qty = Math.max(1, sizes[index].qty + delta);
    renderSizes();
  };

  window.removeSize = function(index) {
    sizes.splice(index, 1);
    renderSizes();
    addSizeBtn.disabled = false;

    const prosesBtn = document.querySelector('.btn-proses');
    if (sizes.length === 0 && prosesBtn) {
      prosesBtn.style.backgroundColor = '#999'; // abu
      prosesBtn.style.cursor = 'not-allowed';
      prosesBtn.disabled = true;
    }
  };

  if (startBtn && stepSection) {
    stepSection.classList.add('hidden');

    startBtn.addEventListener('click', () => {
      stepSection.style.display = 'flex';
      startContainer.style.display = 'none';

      updateCarousel();

      const infoText = document.getElementById('info-text');
      if (infoText) {
        infoText.innerHTML = '';

        const newBox = document.createElement('div');
        newBox.className = 'info-static-box';
        newBox.id = 'initial-info';

        newBox.innerHTML = `
          <img src="Ikon Lainnya/Ikon Informasi.png" alt="Info" class="info-icon">
          <div class="info-text">
            Silahkan <strong>memilih variasi produk</strong> sesuai dengan preferensi yang ada.
          </div>
        `;

        infoText.appendChild(newBox);
      }
    });
  }
});

function updateCarousel() {
  const itemWidth = stepItems[0].offsetWidth;
  const offset = -currentIndex * itemWidth;
  stepCarousel.style.transform = `translateX(${offset}px)`;

  stepItems.forEach((item, index) => item.classList.toggle('active', index === currentIndex));
  btnPrev.classList.toggle('disabled', currentIndex === 0);
  btnNext.classList.toggle('disabled', currentIndex === stepItems.length - 1);

  updateStepContent();
}

function applyHighlights() {
  const selectedLabel = activeSelections[currentIndex];
  if (selectedLabel) {
    document.querySelectorAll('.step-option').forEach(option => {
      const labelElement = option.querySelector('span');
      if (labelElement && labelElement.innerText === selectedLabel) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  }
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

  if (currentIndex === 1) { // Indeks baru untuk motif adalah 1
    const motifBtn = document.getElementById('add-motif-btn');
    motifBtn.addEventListener('click', () => {
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
          selectedMotifName = motifData[index].name;

          const popup = document.getElementById('motif-option-popup');
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

    if (type === 'Warna Jilbab') {
      const colorMap = {
        '#ffffff': 'putih',
        '#666766': 'abu1',
        '#d2d2d1': 'abu2',
        '#813738': 'merah',
        '#552e36': 'merah1',
        '#673a34': 'merah2',
        '#765b91': 'ungu',
        '#83516a': 'ungu1',
        '#b580ad': 'ungu2',
        '#fbd2db': 'pink',
        '#70314a': 'pink1',
        '#e4a0c1': 'pink2',
        '#dead5f': 'orange',
        '#9d522f': 'orange1',
        '#f79b77': 'orange2',
        '#21407a': 'navy',
        '#2f313d': 'navy1',
        '#3f689f': 'navy2',
        '#667b4d': 'hijau',
        '#284a3c': 'hijau1',
        '#75bc7e': 'hijau2',
        '#be986a': 'coklat',
        '#473933': 'coklat1',
        '#dbcabc': 'coklat2',
        '#7998b4': 'biru',
        '#4f5a79': 'biru1',
        '#9bc9d8': 'biru2',
        '#303131': 'hitam',
        '#1c1c1d': 'hitam1',
        '#4a5053': 'hitam2'
      };

      const hex = rgbToHex(bgColor).toLowerCase();
      const color = colorMap[hex] || 'black';
      selectedShirtColor = color;
      
      // Hanya perbarui 'shirt-base'
      document.getElementById('shirt-base').src = `Jilbab/${color}-01.svg`;
    }
    updateSingleComponent();
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
  const container = document.querySelector(`.motif-container-${currentView.toLowerCase()}`);
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

function findValidPosition(motifSize, container, existingMotifs) {
  const containerRect = container.getBoundingClientRect();
  const bodyBounds = getBodyBounds();

  const scaleX = containerRect.width / 371.66;
  const scaleY = containerRect.height / 471.35;

  const gridSize = 10;

  const minX = bodyBounds.minX * scaleX;
  const maxX = (bodyBounds.maxX * scaleX) - motifSize;
  const minY = bodyBounds.minY * scaleY;
  const maxY = (bodyBounds.maxY * scaleY) - motifSize;

  for (let y = minY; y <= maxY; y += gridSize) {
    for (let x = minX; x <= maxX; x += gridSize) {
      // Buat div sementara
      const temp = document.createElement('div');
      temp.style.position = 'absolute';
      temp.style.left = `${x}px`;
      temp.style.top = `${y}px`;
      temp.style.width = `${motifSize}px`;
      temp.style.height = `${motifSize}px`;
      temp.classList.add('motif-preview');
      container.appendChild(temp);

      const svgX = x * (371.66 / containerRect.width);
      const svgY = y * (471.35 / containerRect.height);
      const svgX2 = (x + motifSize) * (371.66 / containerRect.width);
      const svgY2 = (y + motifSize) * (471.35 / containerRect.height);

      const allInside = [ [svgX, svgY], [svgX2, svgY], [svgX, svgY2], [svgX2, svgY2] ]
        .every(([px, py]) => isPointInBodyArea(px, py));

      const overlap = isColliding(temp, existingMotifs);
      container.removeChild(temp);

      if (!overlap && allInside) {
        return { x, y };
      }
    }
  }

  return null;
}

function addMotifToShirt(size, src) {
  if (currentView !== 'Depan' && currentView !== 'Belakang') {
    return;
  }

  const container = document.querySelector(`.motif-container-${currentView.toLowerCase()}`);
  const existingMotifs = container.querySelectorAll('.motif-preview');

  const motifWrapper = document.createElement('div');
  motifWrapper.className = 'motif-preview';
  motifWrapper.dataset.size = size;
  motifWrapper.dataset.id = Date.now();
  motifWrapper.style.position = 'absolute';
  motifWrapper.style.pointerEvents = 'auto';
  motifWrapper.style.cursor = 'grab';
  motifWrapper.style.zIndex = '20';
  motifWrapper.style.display = 'inline-block';

  // Tentukan folder ukuran
  let sizeFolder = '';
  if (size === 'large') sizeFolder = 'BESAR';
  else if (size === 'medium') sizeFolder = 'SEDANG';
  else if (size === 'small') sizeFolder = 'KECIL';

  // Buat gambar Part A & B
  const partA = document.createElement('img');
  partA.src = `Jilbab/Motif-Jilbab/${selectedMotifName}/${sizeFolder}/A/${selectedMotifColorA}_${selectedMotifName}_${sizeFolder}_A.svg`;
  partA.style.position = 'absolute';
  partA.style.top = '0';
  partA.style.left = '0';

  const partB = document.createElement('img');
  partB.src = `Jilbab/Motif-Jilbab/${selectedMotifName}/${sizeFolder}/B/${selectedMotifColorB}_${selectedMotifName}_${sizeFolder}_B.svg`;
  partB.style.position = 'absolute';
  partB.style.top = '0';
  partB.style.left = '0';

  partA.onload = () => {
    const motifWidth = partA.naturalWidth;
    const motifHeight = partA.naturalHeight;

    motifWrapper.style.width = `${motifWidth}px`;
    motifWrapper.style.height = `${motifHeight}px`;
    partA.style.width = ' ';
    partA.style.height = ' ';
    partB.style.width = ' ';
    partB.style.height = ' ';

    updateShirtView(currentView);

    const position = findValidPosition(motifWidth, container, existingMotifs);
    if (!position) {
      const addInfo = document.getElementById('motif-add-more-info');
      if (addInfo) {
        addInfo.querySelector('.info-text').innerHTML = `
          <strong>Pilih</strong> tombol <strong>"+ Tambahkan Ukuran"</strong> untuk <strong>menambahkan informasi ukuran</strong>.
        `;
      }

      const oldWarning = document.getElementById('motif-warning-info');
      if (oldWarning) oldWarning.remove();

      const warningBox = document.createElement('div');
      warningBox.className = 'info-static-box warning';
      warningBox.id = 'motif-warning-info';
      warningBox.innerHTML = `
        <img src="Ikon Lainnya/Ikon Failure.png" alt="Warning" class="info-icon">
        <div class="info-text">
          <strong>Tidak cukup ruang untuk menambahkan gambar.</strong><br>
          Pindahkan atau hapus gambar motif yang ada untuk menciptakan ruang bagi gambar baru.
        </div>
      `;

      const infoContainer = document.getElementById('info-text');
      if (infoContainer) {
        infoContainer.appendChild(warningBox);
        
        setTimeout(() => {
          if (warningBox) {
            warningBox.remove();
          }
        }, 5000);
      }
      return;
    }

    motifWrapper.style.left = `${position.x}px`;
    motifWrapper.style.top = `${position.y}px`;

    motifWrapper.appendChild(partA);
    motifWrapper.appendChild(partB);
    container.appendChild(motifWrapper);

    const estimasiEl = document.getElementById('estimasi-waktu');
    const hargaEl = document.getElementById('total-harga');

    if (estimasiEl && estimasiEl.textContent === '--') {
      estimasiEl.textContent = '7-12 Hari';
    }

    if (hargaEl && hargaEl.textContent === '--') {
      hargaEl.textContent = 'Rp. 750.000';
    }

    const infoContainer = document.getElementById('info-text');

    if (infoContainer && !document.getElementById('motif-added-info')) {
      const initialInfo = document.getElementById('initial-info');
      if (initialInfo) {
        initialInfo.style.display = 'none';
      }

      const box1 = document.createElement('div');
      box1.className = 'info-static-box';
      box1.id = 'motif-added-info';

      box1.innerHTML = `
        <img src="Ikon Lainnya/Ikon Informasi.png" alt="Info" class="info-icon">
        <div class="info-text"><strong>Klik</strong> gambar <strong>motif</strong> untuk <strong>mengedit</strong>.</div>
      `;

      const box2 = document.createElement('div');
      box2.className = 'info-static-box';
      box2.id = 'motif-add-more-info';

      box2.innerHTML = `
        <img src="Ikon Lainnya/Ikon Informasi.png" alt="Info" class="info-icon">
        <div class="info-text">Anda juga dapat <strong>menambahkan motif lainnya</strong>.</div>
      `;

      infoContainer.appendChild(box1);
      infoContainer.appendChild(box2);
    }

    const addSizeBtn = document.getElementById('add-size-btn');
    if (addSizeBtn) {
      addSizeBtn.classList.remove('disabled');
    }

    requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      enableMotifDrag(motifWrapper, container);
      motifWrapper.style.pointerEvents = 'auto';
    });
    });
  };
}

document.querySelectorAll('#color-palette-a .color-option').forEach(colorBox => {
  colorBox.addEventListener('click', () => {
    const bgColor = window.getComputedStyle(colorBox).backgroundColor;
    const hex = rgbToHex(bgColor).toLowerCase();

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

    selectedMotifColorA = colorMap[hex] || 'navy';
    updateSelectedMotifParts();
  });
});

document.querySelectorAll('#color-palette-b .color-option').forEach(colorBox => {
  colorBox.addEventListener('click', () => {
    const bgColor = window.getComputedStyle(colorBox).backgroundColor;
    const hex = rgbToHex(bgColor).toLowerCase();

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

    selectedMotifColorB = colorMap[hex] || 'navy';
    updateSelectedMotifParts();
  });
});

function updateSelectedMotifParts() {
  const popup = document.getElementById('motif-control-popup');
  const motifId = popup.dataset.motifId;
  const motif = document.querySelector(`.motif-preview[data-id="${motifId}"]`);

  if (!motif) return;

  const motifName = selectedMotifName;
  const motifSize = motif.dataset.size;

  let sizeFolder = '';
  if (motifSize === 'large') sizeFolder = 'BESAR';
  else if (motifSize === 'medium') sizeFolder = 'SEDANG';
  else if (motifSize === 'small') sizeFolder = 'KECIL';

  const partA = motif.querySelector('img:nth-child(1)');
  const partB = motif.querySelector('img:nth-child(2)');

  const prevLeft = motif.style.left;
  const prevTop = motif.style.top;

  if (partA && partB) {
    partA.onload = () => {
      motif.style.left = prevLeft;
      motif.style.top = prevTop;
    };

    partA.src = `Gambar Motif/Warna Motif/${motifName}/${sizeFolder}/A/${selectedMotifColorA}_${motifName}_${sizeFolder}_A.svg`;
    partB.src = `Gambar Motif/Warna Motif/${motifName}/${sizeFolder}/B/${selectedMotifColorB}_${motifName}_${sizeFolder}_B.svg`;
  }
}

function showMotifFullInfo(message = "Slot motif sudah penuh") {
  const infoBox = document.getElementById('motif-full-info');
  infoBox.textContent = message;
  infoBox.classList.add('show');
  setTimeout(() => infoBox.classList.remove('show'), 2000);
}

function showControlPopup(motif, x, y) {
  const editInfo = document.getElementById('motif-added-info');
  if (editInfo) {
    editInfo.querySelector('.info-text').innerHTML = `
      <strong>Geser gambar motif</strong> untuk mengubah posisi.
    `;
  }

  const popup = document.getElementById('motif-control-popup');
  if (!popup) return;

  popup.style.left = `${x}px`;
  popup.style.top = `${y + 10}px`;
  popup.dataset.motifId = motif.dataset.id;
  popup.classList.remove('hidden');

  const closePopup = (e) => {
    if (!e.target.closest('.motif-control-popup') && !e.target.closest('.motif-preview')) {
      popup.classList.add('hidden');
      document.removeEventListener('click', closePopup);
    }
  };
  setTimeout(() => document.addEventListener('click', closePopup), 0);

  const oldSelectedColors = popup.querySelector('.selected-colors-container');
  if (oldSelectedColors) oldSelectedColors.remove();

  const colorPairContainer = document.getElementById('color-pair-palette');
  colorPairContainer.innerHTML = '';

  const selectedColorBox = document.createElement('div');
  selectedColorBox.classList.add('selected-colors-container');
  selectedColorBox.innerHTML = `
    <div>
      <div id="motif-color-a" class="selected-color-box" style="background-color: ${getHexFromName(selectedMotifColorA)}"></div>
    </div>
    <div>
      <div id="motif-color-b" class="selected-color-box" style="background-color: ${getHexFromName(selectedMotifColorB)}"></div>
    </div>
  `;
  popup.querySelector('.color-options').prepend(selectedColorBox);

  document.getElementById('motif-color-a').onclick = () => showMotifColorPicker('A');
  document.getElementById('motif-color-b').onclick = () => showMotifColorPicker('B');

}

function showMotifColorPicker(part) {
  const colorPopup = document.createElement('div');
  colorPopup.classList.add('motif-size-popup');
  colorPopup.innerHTML = `
    <div class="motif-size-options">
      ${motifColors.map(c => `
        <button style="background:${c.hex}; border:1px solid #ccc; width:24px; height:24px; border-radius:50%;" data-name="${c.name}"></button>
      `).join('')}
    </div>
  `;
  document.body.appendChild(colorPopup);

  const target = document.getElementById(part === 'A' ? 'motif-color-a' : 'motif-color-b');
  const rect = target.getBoundingClientRect();

  const popupWidth = 200; 
  const popupHeight = 80;

  colorPopup.style.position = 'absolute';
  colorPopup.style.left = `${rect.left + rect.width / 2 - popupWidth / 2}px`;
  colorPopup.style.top = `${rect.top + window.scrollY - popupHeight - 8}px`;
  colorPopup.style.width = `${popupWidth}px`;
  colorPopup.style.zIndex = 2001;

  colorPopup.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const colorName = btn.dataset.name;
      if (part === 'A') selectedMotifColorA = colorName;
      if (part === 'B') selectedMotifColorB = colorName;

      updateSelectedMotifParts();
      colorPopup.remove();
      document.removeEventListener('click', outsideClickHandler);
    });
  });

  const outsideClickHandler = (e) => {
    if (!colorPopup.contains(e.target)) {
      colorPopup.remove();
      document.removeEventListener('click', outsideClickHandler);
    }
  };
  setTimeout(() => {
    document.addEventListener('click', outsideClickHandler);
  }, 0);
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
        minX: 70,
        maxX: 250,
        minY: 70,
        maxY: 370
    };
}

function isPointInBodyArea(x, y) {
  const bounds = getBodyBounds();
  return x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY;
}

function enableMotifDrag(motif, container) {
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
    const containerBounds = container.getBoundingClientRect();

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

function initMotifControls() {
  if (!document.getElementById('motif-control-popup')) {
    const popup = document.createElement('div');
    popup.id = 'motif-control-popup';
    popup.className = 'motif-control-popup hidden';
    popup.innerHTML = `
      <div class="color-pair-palette" id="color-pair-palette"></div>
      <div class="control-option" data-action="rotate">↻ Putar</div>
      <div class="control-option" data-action="flipH">↔ Balik Horizontal</div>
      <div class="control-option" data-action="flipV">↕ Balik Vertikal</div>
      <div class="control-option delete" data-action="delete">🗑 Hapus</div>
    `;

    const colorPairContainer = document.getElementById('color-pair-palette');
    colorPairContainer.innerHTML = '';

    motifColors.forEach(c => {
      const pair = document.createElement('div');
      pair.classList.add('color-pair');

      const dotA = document.createElement('div');
      dotA.classList.add('color-dot');
      dotA.style.backgroundColor = c.hex;
      dotA.title = `Part A: ${c.name}`;
      dotA.addEventListener('click', () => {
        selectedMotifColorA = c.name;
        updateSelectedMotifParts();
      });

      const dotB = document.createElement('div');
      dotB.classList.add('color-dot');
      dotB.style.backgroundColor = c.hex;
      dotB.title = `Part B: ${c.name}`;
      dotB.addEventListener('click', () => {
        selectedMotifColorB = c.name;
        updateSelectedMotifParts();
      });

      pair.appendChild(dotA);
      pair.appendChild(dotB);
      colorPairContainer.appendChild(pair);
    });

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
          const motifWarning = document.getElementById('motif-warning-info');
          if (motifWarning) {
            motifWarning.remove();
          }
          break;
      }

      document.getElementById('motif-control-popup').classList.add('hidden');
    });
  });
}

function highlightSelectedColor(paletteId, selectedColor) {
  const palette = document.getElementById(paletteId);
  if (!palette) return;
  
  palette.querySelectorAll('.color-option').forEach(option => {
    if (option.dataset.color === selectedColor) {
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }
  });
}

function renderMotifColorPalettes() {
  const colorHTML = motifColors.map(c => `<div class="color-option" style="background:${c.hex}"></div>`).join('');
  document.getElementById('color-palette-a').innerHTML = colorHTML;
  document.getElementById('color-palette-b').innerHTML = colorHTML;
}

// Fungsi update gambar sesuai view (disederhanakan)
function updateShirtView(view) {
  const base = document.getElementById('shirt-base');
  const color = selectedShirtColor || 'putih';
  base.src = `Jilbab/${color}-01.svg`;

  document.querySelector('.motif-container-depan').style.display = (view === 'Depan') ? 'block' : 'none';
  document.querySelector('.motif-container-belakang').style.display = (view === 'Belakang') ? 'block' : 'none';
}

// Event tombol view (tidak akan berjalan karena tombol dihapus, tapi tidak apa-apa dibiarkan)
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentView = btn.dataset.view;
    updateShirtView(currentView);
  });
});

function updateSingleComponent() {
  const base = document.getElementById('shirt-base');
  const color = selectedShirtColor || 'putih';
  base.src = `Jilbab/${color}-01.svg`;
}

function setInitialShirtColor() {
  selectedShirtColor = 'putih';
  document.getElementById('shirt-base').src = 'Jilbab/putih-01.svg';
}

function setInitialSelections() {
  setInitialShirtColor();
  updateSingleComponent();
  updateMotifZIndex();
}

window.addEventListener('load', () => {
  setInitialSelections();
});

window.addEventListener('resize', updateCarousel);
updateCarousel();

initMotifControls();

document.addEventListener('click', function (e) {
  const popup = document.getElementById('popup-ubah-ukuran');
  const isUbahBtn = e.target.innerText === 'Ubah';
  const isInsidePopup = popup.contains(e.target);

  if (isUbahBtn) {
    const labelEl = e.target.closest('.size-item').querySelector('.size-label');
    window._targetSizeLabel = labelEl;

    const rect = e.target.getBoundingClientRect();
    popup.style.left = `${rect.left - 160}px`; 
    popup.style.top = `${rect.top + window.scrollY}px`;
    popup.classList.remove('hidden');
  } else if (!isInsidePopup) {
    popup.classList.add('hidden');
    window._targetSizeLabel = null;
    
    document.getElementById('ukuran-pilihan-list').classList.remove('hidden');
    document.getElementById('ukuran-kustom-form').classList.add('hidden');
  }
});

document.querySelectorAll('#popup-ubah-ukuran .ukuran-item').forEach(item => {
  item.addEventListener('click', () => {
    const value = item.dataset.value;

    if (value.toLowerCase() === 'kustom') {
      document.getElementById('ukuran-pilihan-list').classList.add('hidden');
      document.getElementById('ukuran-kustom-form').classList.remove('hidden');
      return;
    }

    if (window._targetSizeLabel) {
      window._targetSizeLabel.innerHTML = `${value} <span style="color:#888;font-size:12px;">Ubah</span>`;
    }

    document.getElementById('popup-ubah-ukuran').classList.add('hidden');
    window._targetSizeLabel = null;
  });
});

// Disederhanakan
function updateMotifZIndex() {
  const motifContainers = document.querySelectorAll('.motif-container');
  const zIndexMotif = 15;
  motifContainers.forEach(container => {
    container.style.zIndex = zIndexMotif;
  });
}


const previewImg = document.getElementById('ukuran-preview-img');
const defaultPreviewSrc = 'Ikon-Ukuran/default.png'; 

document.querySelectorAll('#popup-ubah-ukuran .ukuran-item').forEach(item => {
  const value = item.dataset.value.toLowerCase();

  item.addEventListener('mouseenter', () => {
    previewImg.src = `Ikon-Ukuran/ukuran-${value}.png`;
  });

  item.addEventListener('mouseleave', () => {
    previewImg.src = defaultPreviewSrc;
  });
});

document.getElementById('btn-simpan-kustom').addEventListener('click', () => {
  if (window._targetSizeLabel) {
    window._targetSizeLabel.innerHTML = `Kustom <span style="color:#888;font-size:12px;">Ubah</span>`;
  }
  
  document.getElementById('popup-ubah-ukuran').classList.add('hidden');
  
  document.getElementById('ukuran-pilihan-list').classList.remove('hidden');
  document.getElementById('ukuran-kustom-form').classList.add('hidden');

  window._targetSizeLabel = null;

  const kustomUkuran = {
    lebarBahu: document.getElementById('input-lebar-bahu').value,
    lebarDada: document.getElementById('input-lebar-dada').value,
    panjangBadan: document.getElementById('input-panjang-badan').value,
    panjangTangan: document.getElementById('input-panjang-tangan').value,
    pergelanganTangan: document.getElementById('input-pergelangan-tangan').value,
  };

  console.log('Ukuran Kustom Disimpan:', kustomUkuran);
});

const sliderInfos = [
  {
    text: "Geser Gambar motif untuk mengubah posisi",
    icon: "Ikon Lainnya/Ikon informasi/Vector.png"
  },
  {
    text: "Motif dapat ditambahkan lebih dari satu",
    icon: "Ikon Lainnya/Ikon informasi/Mask group.png"
  },
  {
    text: "Klik gambar motif untuk ubah warna atau menghapus",
    icon: "Ikon Lainnya/Ikon informasi/Group.png"
  },
  {
    text: "Motif tidak akan bisa ditambahkan jika tidak ada ruang pada gambar produk",
    icon: "Ikon Lainnya/Ikon informasi/Vector-2.png"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const infoText = document.getElementById('info-slider-text');
  const infoIcon = document.getElementById('info-slider-icon');
  let currentIndex = 0;

  setInterval(() => {
    const current = sliderInfos[currentIndex];
    infoText.textContent = current.text;
    infoIcon.src = current.icon;
    currentIndex = (currentIndex + 1) % sliderInfos.length;
  }, 2000);
});


document.addEventListener('DOMContentLoaded', () => {

  const saveAndExitBtn = document.querySelector('.btn-simpan-desain'); 
  const discussBtn = document.querySelector('.btn-diskusi');
  const savePopup = document.getElementById('save-design-popup');
  const cancelBtn = document.getElementById('cancel-save-btn');
  const confirmBtn = document.getElementById('confirm-save-btn');

  const showPopup = () => {
    savePopup.classList.remove('hidden');
  };

  if (savePopup && cancelBtn && confirmBtn) {

    if (saveAndExitBtn) {
      saveAndExitBtn.addEventListener('click', showPopup);
    }
    
    if (discussBtn) {
      discussBtn.addEventListener('click', showPopup);
    }

    cancelBtn.addEventListener('click', () => {
      savePopup.classList.add('hidden');
    });

    confirmBtn.addEventListener('click', () => {
      window.location.href = 'Kemeja.html'; 
    });

    savePopup.addEventListener('click', (e) => {
      if (e.target.id === 'save-design-popup') {
        savePopup.classList.add('hidden');
      }
    });
  }
});