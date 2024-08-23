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
    price: 70,
    quantity: 0,
    bonus: 5,
  },
  {
    title: 'slicer',
    price: 150,
    quantity: 0,
    bonus: 10,
  },
  {
    title: 'sword',
    price: 250,
    quantity: 0,
    bonus: 15,
  },
];

let automaticUpgrades = [
  {
    title: 'jackhammer',
    price: 100,
    quantity: 0,
    bonus: 10,
  },
  {
    title: 'drill',
    price: 150,
    quantity: 0,
    bonus: 30,
  },
  {
    title: 'laser',
    price: 300,
    quantity: 0,
    bonus: 50,
  },
  {
    title: 'laser-upgrade',
    price: 700,
    quantity: 0,
    bonus: 130,
  },
];

updateCrystalInfo();

// ANCHOR Acquire HTML Elements
const crystal = document.getElementById('Crystal');
// NOTE Click
const pickaxe = document.getElementById('pickaxe');
const cutter = document.getElementById('cutter');
const slicer = document.getElementById('slicer');
const sword = document.getElementById('sword');
// NOTE Automatic
const jackhammer = document.getElementById('jackhammer');
const drill = document.getElementById('drill');
const laser = document.getElementById('laser');
const laserUpgrade = document.getElementById('laser-upgrade');

// NOTE Events
crystal.addEventListener('click', () => mineCrystal());
pickaxe.addEventListener('click', () => purchaseTool('pickaxe'));
cutter.addEventListener('click', () => purchaseTool('cutter'));
slicer.addEventListener('click', () => purchaseTool('slicer'));
sword.addEventListener('click', () => purchaseTool('sword'));

jackhammer.addEventListener('click', () => purchaseTool('jackhammer'));
drill.addEventListener('click', () => purchaseTool('drill'));
laser.addEventListener('click', () => purchaseTool('laser'));
laserUpgrade.addEventListener('click', () => purchaseTool('laser-upgrade'));

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
    clickStatsElem.innerHTML += `<p>${tool.quantity} ${tool.title} -> ${tool.quantity * tool.bonus}</p>`;
    clickPower += tool.quantity * tool.bonus;
  });
  clickCounter.textContent = clickPower;

  automaticUpgrades.forEach((tool) => {
    automaticStatsElem.innerHTML += `<p>${tool.quantity} ${tool.title} -> ${tool.quantity * tool.bonus}</p>`;
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

// ANCHOR Purchase Tools
function purchaseTool(specificTool) {
  // NOTE Checks if tool can be purchased
  clickUpgrades.forEach((tool) => {
    if (tool.title === specificTool && crystals >= tool.price) {
      ++tool.quantity;
      tool.price * 2;
      crystals -= tool.price;
      updateCrystalInfo();
    }
  });

  // NOTE Checks if special tool can be purchased
  automaticUpgrades.forEach((specialTool) => {
    if (specialTool.title === specificTool && crystals >= specialTool.price) {
      ++specialTool.quantity;
      specialTool.price * 2;
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
