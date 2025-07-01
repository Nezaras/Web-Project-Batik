const stepCarousel = document.querySelector('.step-carousel');
const stepItems = document.querySelectorAll('.step-item');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const stepContent = document.getElementById('step-content');

let currentIndex = 0;
const currentView = 'depan';
let selectedMotif = null;
let selectedJilbabColor = 'white';
let selectedMotifColorA = 'Navy';
let selectedMotifColorB = 'Navy';
let selectedMotifName = '';

const motifSizes = {
  medium: 10,
  small: 10
};

const motifData = [
    {
        name: 'SABELE',
        images: {
            medium: 'Gambar Motif/Motif Senjata Sabele/motif sedang.svg',
            small: 'Gambar Motif/Motif Senjata Sabele/motif kecil.svg'
        }
    },
    {
        name: 'BUAYA',
        images: {
            medium: 'Gambar Motif/Motif Buaya/motif sedang.svg',
            small: 'Gambar Motif/Motif Buaya/motif kecil.svg'
        }
    },
    {
        name: 'GAPURA',
        images: {
            medium: 'Gambar Motif/Motif Gapura (Alikusu)/motif sedang.svg',
            small: 'Gambar Motif/Motif Gapura (Alikusu)/motif kecil.svg'
        }
    },
    {
        name: 'AREN',
        images: {
            medium: 'Gambar Motif/Motif Gula Aren (Pahangga)/motif sedang.svg',
            small: 'Gambar Motif/Motif Gula Aren (Pahangga)/motif kecil.svg'
        }
    },
    {
        name: 'LALE',
        images: {
            medium: 'Gambar Motif/Motif Janur (Lale)/motif sedang.svg',
            small: 'Gambar Motif/Motif Janur (Lale)/motif kecil.svg'
        }
    },
    {
        name: 'KELAPA',
        images: {
            medium: 'Gambar Motif/Motif Kelapa/motif sedang.svg',
            small: 'Gambar Motif/Motif Kelapa/motif kecil.svg'
        }
    },
    {
        name: 'MAKUTA',
        images: {
            medium: 'Gambar Motif/Motif Mahkota (Makuta)/motif sedang.svg',
            small: 'Gambar Motif/Motif Mahkota (Makuta)/motif kecil.svg'
        }
    },
    {
        name: 'PALA',
        images: {
            medium: 'Gambar Motif/Motif Pala Cengkih/motif sedang.svg',
            small: 'Gambar Motif/Motif Pala Cengkih/motif kecil.svg'
        }
    },
    {
        name: 'PINANG',
        images: {
            medium: 'Gambar Motif/Motif Pohon Pinang/motif sedang.svg',
            small: 'Gambar Motif/Motif Pohon Pinang/motif kecil.svg'
        }
    },
    {
        name: 'BALADU',
        images: {
            medium: 'Gambar Motif/Motif Senjata Baladu/motif sedang.svg',
            small: 'Gambar Motif/Motif Senjata Baladu/motif kecil.svg'
        }
    },
    {
        name: 'SIMPUL',
        images: {
            medium: 'Gambar Motif/Motif Tali Simpul/motif sedang.svg',
            small: 'Gambar Motif/Motif Tali Simpul/motif kecil.svg'
        }
    },
    {
        name: 'TEBU',
        images: {
            medium: 'Gambar Motif/Motif Tebu/motif sedang.svg',
            small: 'Gambar Motif/Motif Tebu/motif kecil.svg'
        }
    }
];

const stepData = {
    0: [{
        title: "Warna Jilbab",
        colors: ['#243565', '#aa5c9e', '#ce433b', '#80cde9', '#eabcd4', '#1d1c1d', '#d86f3a', '#FFFFFF', '#bf996a', '#9bc654']
    }],
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
    const itemList = document.getElementById('item-list');
    const addItemBtn = document.getElementById('add-item-btn');

    let orders = [];

    addItemBtn.addEventListener('click', () => {
        if (orders.length >= 1) {
            addItemBtn.classList.add('disabled');
            return;
        }

        orders.push({
            qty: 1
        });
        renderOrderList();

        const prosesBtn = document.querySelector('.btn-proses');
        if (prosesBtn) {
            prosesBtn.style.backgroundColor = '#6327a6';
            prosesBtn.style.cursor = 'pointer';
            prosesBtn.disabled = false;
        }
        addItemBtn.classList.add('disabled');
    });

    function renderOrderList() {
        itemList.innerHTML = '';

        orders.forEach((item, index) => {
            const orderEl = document.createElement('div');
            orderEl.className = 'order-item';

            orderEl.innerHTML = `
        <span class="item-label">Jumlah</span>
        <div class="quantity-controls">
          <button class="hapus" onclick="changeQty(${index}, -1)">
            <img src="Ikon Lainnya/Ikon Kurangi Jumlah.png" alt="kurang" style="width:14px; height:14px; vertical-align:middle;">
          </button>
          <span class="qty">${item.qty}</span>
          <button class="hapus" onclick="changeQty(${index}, 1)">
            <img src="Ikon Lainnya/Ikon Tambah Jumlah.png" alt="tambah" style="width:14px; height:14px; vertical-align:middle;">
          </button>
          <button class="hapus" onclick="removeItem(${index})">
            <img src="Ikon Lainnya/Ikon Delete.png" alt="hapus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;">
            Hapus
          </button>
        </div>
      `;

            itemList.appendChild(orderEl);
        });
    }

    window.changeQty = function(index, delta) {
        orders[index].qty = Math.max(1, orders[index].qty + delta);
        renderOrderList();
    };

    window.removeItem = function(index) {
        orders.splice(index, 1);
        renderOrderList();
        addItemBtn.classList.remove('disabled');

        const prosesBtn = document.querySelector('.btn-proses');
        if (orders.length === 0 && prosesBtn) {
            prosesBtn.style.backgroundColor = '#999';
            prosesBtn.style.cursor = 'not-allowed';
            prosesBtn.disabled = true;
        }
    };

    if (startBtn && stepSection) {
        stepSection.classList.add('hidden');

        startBtn.addEventListener('click', () => {
            stepSection.style.display = 'flex';
            startContainer.style.display = 'none';

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

    if (currentIndex === 1) { // Motif step
        const motifBtn = document.getElementById('add-motif-btn');
        motifBtn.addEventListener('click', () => {
            const motifGrid = document.getElementById('motif-grid');
            motifGrid.innerHTML = motifData.map((motif, index) => `
        <div class="motif-item" data-index="${index}">
          <img src="${motif.images.medium}" alt="${motif.name}">
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
                'rgb(36, 53, 101)': 'navy',
                'rgb(170, 92, 158)': 'purple',
                'rgb(206, 67, 59)': 'red',
                'rgb(128, 205, 233)': 'blue',
                'rgb(234, 188, 212)': 'pink',
                'rgb(29, 28, 29)': 'black',
                'rgb(216, 111, 58)': 'orange',
                'rgb(255, 255, 255)': 'white',
                'rgb(191, 153, 106)': 'brown',
                'rgb(155, 198, 84)': 'green'
            };

            const color = colorMap[bgColor] || 'black';
            selectedJilbabColor = color;
            updateJilbabView();
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

document.getElementById('close-motif-popup').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('motif-popup').classList.add('hidden');
});

document.querySelectorAll('.motif-option-size').forEach(option => {
    option.addEventListener('click', () => {
        const size = option.dataset.size;
        const src = selectedMotif.images[size];
        addMotifToJilbab(size, src);

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

            const allInside = [
                [svgX, svgY],
                [svgX2, svgY],
                [svgX, svgY2],
                [svgX2, svgY2]
            ]
            .every(([px, py]) => isPointInBodyArea(px, py));

            const overlap = isColliding(temp, existingMotifs);
            container.removeChild(temp);

            if (!overlap && allInside) {
                return {
                    x,
                    y
                };
            }
        }
    }

    return null;
}

function addMotifToJilbab(size, src) {
    const container = document.querySelector('.motif-container');
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

    let sizeFolder = '';
    if (size === 'medium') sizeFolder = 'SEDANG';
    else if (size === 'small') sizeFolder = 'KECIL';

    const partA = document.createElement('img');
    partA.src = `Gambar Motif/Warna Motif/${selectedMotifName}/${sizeFolder}/A/${selectedMotifColorA}_${selectedMotifName}_${sizeFolder}_A.svg`;
    partA.style.position = 'absolute';
    partA.style.top = '0';
    partA.style.left = '0';

    const partB = document.createElement('img');
    partB.src = `Gambar Motif/Warna Motif/${selectedMotifName}/${sizeFolder}/B/${selectedMotifColorB}_${selectedMotifName}_${sizeFolder}_B.svg`;
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

        updateJilbabView();

        const position = findValidPosition(motifWidth, container, existingMotifs);
        if (!position) {
            const addInfo = document.getElementById('motif-add-more-info');
            if (addInfo) {
                addInfo.querySelector('.info-text').innerHTML = `
          <strong>Pilih</strong> tombol <strong>"+ Tambahkan Pesanan"</strong> untuk <strong>menambahkan informasi pesanan</strong>.
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

        const addItemBtn = document.getElementById('add-item-btn');
        if (addItemBtn) {
            addItemBtn.classList.remove('disabled');
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
    if (motifSize === 'medium') sizeFolder = 'SEDANG';
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

        partA.src = `Gambar Motif/Warna Motif/${motifName}/${sizeFolder}/A/${selectedMotifColorA}_${selectedMotifName}_${sizeFolder}_A.svg`;
        partB.src = `Gambar Motif/Warna Motif/${motifName}/${sizeFolder}/B/${selectedMotifColorB}_${selectedMotifName}_${sizeFolder}_B.svg`;
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
        minX: 90,
        maxX: 230,
        minY: 35,
        maxY: 155
    };
}

function isPointInBodyArea(x, y) {
    const bounds = getBodyBounds();
    return x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY;
}

function enableMotifDrag(motif, container) {
    let isDragging = false;
    let clickStartTime = 0;
    let offsetX, offsetY, originalX, originalY;
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

        if (!allCornersInside) return;

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
      <div class="control-option">Ubah Warna</div>
      <div class="ukuran-separator"></div>
      <div class="color-options">
        <div class="color-pair-palette" id="color-pair-palette"></div>
      </div>
      <div class="ukuran-separator"></div>
      <div class="control-option" data-action="rotate">↻ Putar</div>
      <div class="ukuran-separator"></div>
      <div class="control-option" data-action="flipH">↔ Balik Horizontal</div>
      <div class="ukuran-separator"></div>
      <div class="control-option" data-action="flipV">↕ Balik Vertikal</div>
      <div class="ukuran-separator"></div>
      <div class="control-option delete" data-action="delete">🗑 Hapus</div>
    `;

        const colorPairContainer = document.getElementById('color-pair-palette');
        if (colorPairContainer) {
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
        }

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

function renderMotifColorPalettes() {
    const colorHTML = motifColors.map(c => `<div class="color-option" style="background:${c.hex}"></div>`).join('');
    const paletteA = document.getElementById('color-palette-a');
    const paletteB = document.getElementById('color-palette-b');
    if (paletteA) paletteA.innerHTML = colorHTML;
    if (paletteB) paletteB.innerHTML = colorHTML;
}


function updateJilbabView() {
    const base = document.getElementById('jilbab-base');
    const color = selectedJilbabColor || 'white';
    base.src = `Jilbab/jilbab-${color}.svg`;
}

function setInitialJilbabColor() {
    selectedJilbabColor = 'white';
    const baseEl = document.getElementById('jilbab-base');
    if (baseEl) {
        baseEl.src = `Jilbab/jilbab-white.svg`;
    }
}

window.addEventListener('load', () => {
    setInitialJilbabColor();
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);
updateCarousel();
initMotifControls();