// ANCHOR Global
let crystals = 0;
let totalCrystals = 0;

// ANCHOR Upgrades
let clickUpgrades = [
  {
    title: 'Pickaxe',
    price: 30,
    quantity: 0,
    bonus: 1,
  },
  {
    title: 'Cutter',
    price: 70,
    quantity: 0,
    bonus: 5,
  },
  {
    title: 'Slicer',
    price: 150,
    quantity: 0,
    bonus: 10,
  },
];

let automaticUpgrades = [
  {
    title: 'Jackhammer',
    price: 100,
    quantity: 0,
    bonus: 10,
  },
  {
    title: 'Drill',
    price: 150,
    quantity: 0,
    bonus: 30,
  },
  {
    title: 'Laser',
    price: 300,
    quantity: 0,
    bonus: 50,
  },
];

// NOTE Load Upgrades before using them
loadUpgrades();

// ANCHOR Acquire HTML Elements
const crystal = document.getElementById('Crystal');

// NOTE Click
const pickaxe = document.getElementById('Pickaxe');
const cutter = document.getElementById('Cutter');
const slicer = document.getElementById('Slicer');

// NOTE Automatic
const jackhammer = document.getElementById('Jackhammer');
const drill = document.getElementById('Drill');
const laser = document.getElementById('Laser');

// NOTE Events
crystal.addEventListener('click', () => mineCrystal());
pickaxe.addEventListener('click', () => purchaseTool('Pickaxe'));
cutter.addEventListener('click', () => purchaseTool('Cutter'));
slicer.addEventListener('click', () => purchaseTool('Slicer'));

jackhammer.addEventListener('click', () => purchaseTool('Jackhammer'));
drill.addEventListener('click', () => purchaseTool('Drill'));
laser.addEventListener('click', () => purchaseTool('Laser'));

// NOTE Load everything needed
updateCrystalInfo();

// ANCHOR Load Click & Automatic Upgrades
function loadUpgrades() {
  const clickUpgradesElem = document.getElementById('click-upgrades');
  clickUpgrades.forEach((tool) => {
    clickUpgradesElem.innerHTML += `<div class="col-md-6">
                                      <button id="${tool.title}" class="click-price btn btn-info" type="button">${tool.price}💎</button>
                                      <p>${tool.title} +${tool.bonus}</p>
                                    </div>`;
  });

  const automaticUpgradesElem = document.getElementById('automatic-upgrades');
  automaticUpgrades.forEach((tool) => {
    automaticUpgradesElem.innerHTML += `<div class="col-md-6">
                                          <button id="${tool.title}" class="automatic-price btn btn-info" type="button">${tool.price}💎</button>
                                          <p>${tool.title} +${tool.bonus}</p>
                                        </div>`;
  });
}

// ANCHOR Update DOM
function updateCrystalInfo() {
  let clickPower = 1;
  let automaticPower = 0;

  const crystalCounter = document.getElementById('crystal-counter');
  const totalCrystalCounter = document.getElementById('total-counter');
  const clickCounter = document.getElementById('click-counter');
  const automaticCounter = document.getElementById('automatic-counter');

  const clickStatsElem = document.getElementById('click-stats');
  const automaticStatsElem = document.getElementById('automatic-stats');
  clickStatsElem.innerHTML = '';
  automaticStatsElem.innerHTML = '';

  clickUpgrades.forEach((tool) => {
    clickStatsElem.innerHTML += `<p>${tool.quantity} ${tool.title} <i class="fa-solid fa-arrow-right fa-lg" style="color: #3ecfff;"></i> ${tool.quantity * tool.bonus}</p>`;
    clickPower += tool.quantity * tool.bonus;
  });

  automaticUpgrades.forEach((tool) => {
    automaticStatsElem.innerHTML += `<p>${tool.quantity} ${tool.title} <i class="fa-solid fa-arrow-right fa-lg" style="color: #3ecfff;"></i> ${tool.quantity * tool.bonus}</p>`;
    automaticPower += tool.quantity * tool.bonus;
  });

  crystalCounter.textContent = crystals;
  totalCrystalCounter.textContent = totalCrystals;
  clickCounter.textContent = clickPower;
  automaticCounter.textContent = automaticPower;
}

// ANCHOR Manually Collect Crystals
function mineCrystal() {
  ++crystals;
  ++totalCrystals;

  clickUpgrades.forEach((tool) => {
    let bonusCrystals = tool.quantity * tool.bonus;
    crystals += bonusCrystals;
    totalCrystals += bonusCrystals;
  });

  updateCrystalInfo();
}

// ANCHOR Purchase Tools
function purchaseTool(specificTool) {
  // NOTE Checks if tool can be purchased
  clickUpgrades.forEach((tool) => {
    if (tool.title === specificTool && crystals >= tool.price) {
      ++tool.quantity;
      crystals -= tool.price;
      tool.price *= 2;
      let actualTool = document.getElementById(specificTool);
      actualTool.textContent = `${tool.price}💎`;
      updateCrystalInfo();
    }
  });

  // NOTE Checks if special tool can be purchased
  automaticUpgrades.forEach((specialTool) => {
    if (specialTool.title === specificTool && crystals >= specialTool.price) {
      ++specialTool.quantity;
      crystals -= specialTool.price;
      specialTool.price *= 2;
      let actualTool = document.getElementById(specificTool);
      actualTool.textContent = `${specialTool.price}💎`;
      updateCrystalInfo();
    }
  });
}

// ANCHOR Automatically Collect Resources
function collectAutoUpgrades() {
  automaticUpgrades.forEach((specialTool) => {
    let bonusCrystals = specialTool.quantity * specialTool.bonus;
    crystals += bonusCrystals;
    totalCrystals += bonusCrystals;
  });

  updateCrystalInfo();
}

setInterval(collectAutoUpgrades, 3000);
