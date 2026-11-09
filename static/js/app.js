// ---------- THEME TOGGLE ----------
const html = document.documentElement;
const toggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

toggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon(next);
});

function updateToggleIcon(theme) {
  toggle.textContent = theme === 'dark' ? '☾' : '☀';
}

// ---------- SIDEBAR COLLAPSE (medium screens) ----------
const sidebar = document.getElementById('sidebar');
function handleResize() {
  if (window.innerWidth >= 800 && window.innerWidth <= 1200) {
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
  }
  if (window.innerWidth > 800) {
    sidebar.classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('show');
  }
}
window.addEventListener('resize', handleResize);
handleResize();

// ---------- HAMBURGER DRAWER (narrow screens) ----------
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('drawerOverlay');
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

// ---------- STAT CARD COUNT-UP ----------
document.querySelectorAll('.stat-value[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count || '0', 10);
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(target * eased).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});

// ---------- LIVE BLOCK NUMBER ----------
const blockEl = document.getElementById('blockNumber');
if (blockEl) {
  let block = 18204551;
  setInterval(() => {
    block += 1;
    blockEl.textContent = block.toLocaleString();
  }, 6000);
}

// ---------- CTRL+K SEARCH FOCUS ----------
const searchBox = document.querySelector('.search-box');
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (searchBox) searchBox.focus();
  }
});

// ---------- REGISTER FORM LOGIC ----------
let currentStep = 1;

function updateStepperUI() {
  // Update circles and lines
  for (let i = 1; i <= 4; i++) {
    const ind = document.getElementById(`step-indicator-${i}`);
    const line = document.getElementById(`line-${i}`);
    
    if (i < currentStep) {
      ind.classList.add('completed');
      ind.classList.remove('active');
      ind.querySelector('.step-circle').innerHTML = '✓';
      if (line) line.style.width = '100%';
    } else if (i === currentStep) {
      ind.classList.add('active');
      ind.classList.remove('completed');
    } else {
      ind.classList.remove('active', 'completed');
      ind.querySelector('.step-circle').innerHTML = i;
      if (line) line.style.width = '0%';
    }
  }

  // Update content panels
  document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
  document.getElementById(`step-content-${currentStep}`).classList.add('active');
}

function nextStep(step) {
  if (step === 3) {
    // Populate review data
    document.getElementById('reviewMakeModel').textContent = 
      document.getElementById('make').value + ' ' + document.getElementById('model').value;
    document.getElementById('reviewVin').textContent = document.getElementById('vin').value;
    document.getElementById('reviewOwner').textContent = document.getElementById('ownerName').value;
  }
  
  if (step === 4) {
    // Simulate loading on submit
    const btn = event.target;
    btn.innerHTML = 'Processing...';
    setTimeout(() => {
      currentStep = 4;
      updateStepperUI();
      // Fake confetti
      document.body.style.animation = 'none';
    }, 1200);
    return;
  }

  currentStep = step;
  updateStepperUI();
}

function prevStep(step) {
  currentStep = step;
  updateStepperUI();
}

function resetForm() {
  document.getElementById('registerForm').reset();
  currentStep = 1;
  updateStepperUI();
  document.getElementById('vinCounter').textContent = '0/17';
  document.getElementById('vin').parentElement.classList.remove('valid');
}

// VIN live counter & validation
const vinInput = document.getElementById('vin');
if (vinInput) {
  vinInput.addEventListener('input', (e) => {
    const val = e.target.value.toUpperCase();
    e.target.value = val;
    document.getElementById('vinCounter').textContent = `${val.length}/17`;
    
    const group = e.target.parentElement;
    if (val.length === 17) {
      group.classList.add('valid');
      group.classList.remove('invalid');
    } else {
      group.classList.remove('valid');
      if (val.length > 0) group.classList.add('invalid');
      else group.classList.remove('invalid');
    }
  });
}

// Ripple effect on primary buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    let x = e.clientX - e.target.getBoundingClientRect().left;
    let y = e.clientY - e.target.getBoundingClientRect().top;
    
    let ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ---------- REGISTRY LOGIC ----------
let currentView = 'grid';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('grid-view')) {
    setView('grid');
  }
});

function setView(view) {
  currentView = view;
  document.getElementById('btn-grid').classList.toggle('active', view === 'grid');
  document.getElementById('btn-list').classList.toggle('active', view === 'list');
  
  if (view === 'grid') {
    document.getElementById('grid-view').classList.remove('hidden');
    document.getElementById('list-view').classList.add('hidden');
  } else {
    document.getElementById('grid-view').classList.add('hidden');
    document.getElementById('list-view').classList.remove('hidden');
  }
  
  // Re-trigger animations
  animateItems();
}

function filterData(filter) {
  // Update chip UI
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');

  // Show skeleton
  document.getElementById('grid-view').classList.add('hidden');
  document.getElementById('list-view').classList.add('hidden');
  document.getElementById('empty-state').classList.add('hidden');
  document.getElementById('skeleton-container').classList.remove('hidden');

  // Simulate network delay
  setTimeout(() => {
    document.getElementById('skeleton-container').classList.add('hidden');
    
    let visibleCount = 0;
    const items = document.querySelectorAll('.stagger-item');
    
    items.forEach(item => {
      const status = item.getAttribute('data-status');
      if (filter === 'all' || status === filter) {
        item.style.display = ''; // Show
        visibleCount++;
      } else {
        item.style.display = 'none'; // Hide
      }
    });

    if (visibleCount === 0) {
      document.getElementById('empty-state').classList.remove('hidden');
    } else {
      if (currentView === 'grid') document.getElementById('grid-view').classList.remove('hidden');
      else document.getElementById('list-view').classList.remove('hidden');
      animateItems();
    }
  }, 800); // 800ms fake loading time
}

function animateItems() {
  const activeContainer = currentView === 'grid' ? document.getElementById('grid-view') : document.getElementById('list-view');
  if (!activeContainer) return;
  
  const items = activeContainer.querySelectorAll('.stagger-item');
  items.forEach((item, index) => {
    if (item.style.display !== 'none') {
      item.style.animation = 'none'; // Reset
      item.offsetHeight; // Trigger reflow
      item.style.animation = `slideUpFade 400ms ease forwards`;
      item.style.animationDelay = `${index * 40}ms`; // 40ms stagger
    }
  });
}

// ---------- VERIFY PAGE LOGIC ----------
function quickSearch(plate) {
  document.getElementById('verifyInput').value = plate;
  verifyVehicle();
}

function verifyVehicle() {
  const plateInput = document.getElementById('verifyInput').value.trim().toUpperCase();
  if (!plateInput) return;

  const container = document.getElementById('resultContainer');
  const card = document.getElementById('resultCard');
  
  // 1. Show the container. 
  // We REMOVE the 'flipped' class so it immediately shows the BACK (decorative side)
  container.classList.remove('hidden');
  container.classList.remove('flipped');
  
  // 2. Fake loading delay
  setTimeout(() => {
    let html = '';
    let statusClass = '';
    
    if (plateInput === 'A 123 BC') {
      statusClass = 'valid-state';
      html = `
        <div class="result-header">
          <h2 class="plate">${plateInput}</h2>
          <span class="badge-status active">Valid & Active</span>
        </div>
        <div class="result-body">
          <p><span class="label">Make & Model</span> <span class="value">Toyota Hilux</span></p>
          <p><span class="label">Owner</span> <span class="value">Thabo Mokoena</span></p>
          <p><span class="label">Blockchain Hash</span> <span class="value mono" style="color:var(--accent-2)">0x8f2a...4b1c</span></p>
        </div>
      `;
    } else if (plateInput === 'B 771 XY') {
      statusClass = 'invalid-state';
      html = `
        <div class="result-header">
          <h2 class="plate">${plateInput}</h2>
          <span class="badge-status stolen">Stolen / Invalid</span>
        </div>
        <div class="result-body">
          <p style="color: var(--danger); font-weight: 500; text-align: center; margin-top: 20px;">
            ⚠️ This vehicle has been flagged as STOLEN. Do not purchase.
          </p>
        </div>
      `;
    } else {
      statusClass = 'invalid-state';
      html = `
        <div class="result-header">
          <h2 class="plate">${plateInput}</h2>
          <span class="badge-status" style="background:var(--danger); color:white;">Not Found</span>
        </div>
        <div class="result-body">
          <p style="color: var(--muted); text-align: center; margin-top: 20px;">
            No record exists on the blockchain for this license plate.
          </p>
        </div>
      `;
    }

    // Inject the HTML
    card.className = `front card ${statusClass}`;
    card.innerHTML = html;
    
    // 3. Trigger the 3D flip to reveal the front
    container.classList.add('flipped');
  }, 600);
}

// ---------- TRANSFERS LOGIC ----------
function executeTransfer() {
  const btn = document.getElementById('transferBtn');
  const form = document.getElementById('transferForm');
  const pending = document.getElementById('pendingState');
  const success = document.getElementById('successState');
  
  const plate = document.getElementById('transferPlate').value;
  const owner = document.getElementById('newOwnerName').value;

  if (!plate || !owner) return;

  // 1. Hide form, show pending
  form.classList.add('hidden');
  pending.classList.remove('hidden');
  
  // Fake generating hash
  let hashStr = '0x';
  const chars = '0123456789abcdef';
  for(let i=0; i<40; i++) hashStr += chars[Math.floor(Math.random() * 16)];
  
  document.getElementById('pendingHash').textContent = `Tx: ${hashStr.slice(0, 10)}...${hashStr.slice(-4)}`;

  // 2. Wait 2.5 seconds, then show success
  setTimeout(() => {
    pending.classList.add('hidden');
    success.classList.remove('hidden');
    
    // Populate success data
    document.getElementById('successPlate').textContent = plate;
    document.getElementById('successOwner').textContent = owner;
    
    // Increment fake block number
    const blockEl = document.getElementById('successBlock');
    let currentBlock = parseInt(blockEl.textContent.replace(/,/g, ''));
    blockEl.textContent = (currentBlock + 1).toLocaleString();
    
  }, 2500);
}

function resetTransfer() {
  const form = document.getElementById('transferForm');
  const success = document.getElementById('successState');
  
  form.reset();
  success.classList.add('hidden');
  form.classList.remove('hidden');
}

// ---------- SETTINGS LOGIC ----------
function testConnection() {
  const btn = document.getElementById('testConnBtn');
  const originalText = btn.innerHTML;
  
  // Show spinner state
  btn.innerHTML = '<div class="spinner" style="width:16px; height:16px; display:inline-block; vertical-align:middle; margin-right:8px; border-width:2px; border-top-color:white;"></div> Testing...';
  btn.style.color = 'var(--muted)';
  btn.style.borderColor = 'var(--muted)';
  
  setTimeout(() => {
    // Show success state
    btn.innerHTML = '✓ Connected';
    btn.style.color = 'var(--accent-2)';
    btn.style.borderColor = 'var(--accent-2)';
    btn.style.background = 'rgba(46,230,168,0.1)';
    
    // Reset after 3 seconds
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.color = '';
      btn.style.borderColor = '';
      btn.style.background = '';
    }, 3000);
  }, 1500);
}

// ---------- AI DASHBOARD FETCH ----------
document.addEventListener('DOMContentLoaded', () => {
  const aiPrediction = document.getElementById('aiPrediction');
  if (!aiPrediction) return; // Only run if we are on the dashboard

  // Fetch data from our Flask API endpoint
  fetch('/api/ai_predictions')
    .then(response => response.json())
    .then(data => {
      // Animate the prediction number
      let count = 0;
      const target = data.prediction;
      const interval = setInterval(() => {
        count += 3;
        if (count >= target) {
          aiPrediction.textContent = target;
          clearInterval(interval);
        } else {
          aiPrediction.textContent = count;
        }
      }, 30);

      // Populate other metrics
      document.getElementById('aiAccuracyText').textContent = data.accuracy + '%';
      document.getElementById('aiAccuracy').textContent = data.accuracy + '% Accurate';
      document.getElementById('aiAnomalies').textContent = data.anomalies;
      document.getElementById('aiConfidence').textContent = data.confidence_interval;
    })
    .catch(err => console.error('AI Fetch error:', err));
});

// ---------- NOTIFICATIONS & USER DROPDOWNS ----------
const bellBtn = document.getElementById('bellBtn');
const notifDropdown = document.getElementById('notifDropdown');
const userProfile = document.getElementById('userProfile');
const userDropdown = document.getElementById('userDropdown');

if (bellBtn) {
  bellBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('hidden');
    userDropdown.classList.add('hidden');
  });
}

if (userProfile) {
  userProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('hidden');
    notifDropdown.classList.add('hidden');
  });
}

document.addEventListener('click', () => {
  if (notifDropdown) notifDropdown.classList.add('hidden');
  if (userDropdown) userDropdown.classList.add('hidden');
});

// ---------- TOAST NOTIFICATIONS ----------
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  
  container.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'slideInRight 300ms reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Show a welcome toast on load
if (!sessionStorage.getItem('toastShown')) {
  setTimeout(() => {
    showToast('Logged in as ' + document.querySelector('.user-role').textContent, 'success');
    sessionStorage.setItem('toastShown', 'true');
  }, 500);
}

// ---------- LIVE BLOCKCHAIN NODE COUNT ----------
const nodeCountEl = document.getElementById('liveNodeCount');
if (nodeCountEl) {
  let baseCount = parseInt(nodeCountEl.textContent);
  
  setInterval(() => {
    // Randomly fluctuate by -1, 0, or +1 to simulate network sync
    let fluctuation = Math.floor(Math.random() * 3) - 1; 
    let newCount = baseCount + fluctuation;
    
    // Don't let the nodes drop below 4 (the base network)
    if (newCount < 4) newCount = 4;
    
    nodeCountEl.textContent = newCount;
  }, 3000); // Updates every 3 seconds
}