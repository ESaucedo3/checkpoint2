// NOTE Global
let crystals = 0;

let clickUpgrades = [
  {
    title: 'pickaxe',
    price: 30,
    quantity: 0,
    bonus: 1,
  },
  {
    title: 'cutter',
    price: 90,
    quantity: 0,
    bonus: 10,
  },
];

let automaticUpgrades = [
  {
    title: 'drill',
    price: 400,
    quantity: 0,
    bonus: 15,
  },
  {
    title: 'laser',
    price: 700,
    quantity: 0,
    bonus: 90,
  },
];

// ANCHOR Acquire HTML Elements
const crystal = document.getElementById('Crystal');
const pickaxe = document.getElementById('pickaxe');
const cutter = document.getElementById('cutter');
const drill = document.getElementById('drill');
const laser = document.getElementById('laser');

// NOTE Events
crystal.addEventListener('click', () => mineCrystal());
pickaxe.addEventListener('click', () => purchaseTool('pickaxe'));
cutter.addEventListener('click', () => purchaseTool('cutter'));
drill.addEventListener('click', () => purchaseSpecialTool('drill'));
laser.addEventListener('click', () => purchaseSpecialTool('laser'));

updateCrystalInfo();

// REVIEW Requires the most work
// NOTE Update DOM
function updateCrystalInfo() {
  let clickPower = 0;
  let automaticPower = 0;

  ++clickPower;

  const crystalCounter = document.getElementById('crystal-counter');
  const clickCounter = document.getElementById('click-counter');
  const automaticCounter = document.getElementById('automatic-counter');
  const clickStatsElem = document.getElementById('click-stats');
  const automaticStatsElem = document.getElementById('automatic-stats');

  clickStatsElem.innerHTML = '';
  automaticStatsElem.innerHTML = '';

  crystalCounter.textContent = crystals;
  clickUpgrades.forEach((tool) => {
    clickStatsElem.innerHTML += `<p>${tool.quantity} ${tool.title} -> ${tool.bonus}</p>`;
    clickPower += tool.quantity * tool.bonus;
  });
  clickCounter.textContent = clickPower;

  automaticUpgrades.forEach((tool) => {
    automaticStatsElem.innerHTML += `<p>${tool.quantity} ${tool.title} -> ${tool.bonus}</p>`;
    automaticPower += tool.quantity * tool.bonus;
  });
  automaticCounter.textContent = automaticPower;
}

// NOTE Click Crystal
function mineCrystal() {
  ++crystals;
  clickUpgrades.forEach((tool) => {
    crystals += tool.quantity * tool.bonus;
  });
  updateCrystalInfo();
}

// NOTE Purchase Tool
function purchaseTool(specificTool) {
  clickUpgrades.forEach((tool) => {
    if (tool.title === specificTool && crystals >= tool.price) {
      ++tool.quantity;
      crystals -= tool.price;
      updateCrystalInfo();
    }
  });
}

function purchaseSpecialTool(specificTool) {
  automaticUpgrades.forEach((specialTool) => {
    if (specialTool.title === specificTool && crystals >= specialTool.price) {
      ++specialTool.quantity;
      crystals -= specialTool.price;
      updateCrystalInfo();
    }
  });
}

function collectAutoUpgrades() {
  automaticUpgrades.forEach((specialTool) => {
    crystals += specialTool.quantity * specialTool.bonus;
  });
  updateCrystalInfo();
}

setInterval(collectAutoUpgrades, 3000);
