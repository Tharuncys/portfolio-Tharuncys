const assert = require('assert');

// Mock localStorage
let storage = null;
const localStorage = {
    getItem: (k) => storage,
    setItem: (k, v) => { storage = v; },
    removeItem: () => { storage = null; }
};

function getDefaults() {
    return {
        personal: {
            name: "John",
            chips: ["A", "B"],
            heroBadges: ["H1", "H2", "H3"]
        }
    };
}

function getData() {
    const stored = localStorage.getItem('portfolio_data');
    return stored ? JSON.parse(stored) : null;
}

function saveData(data) {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
    applyData(data);
}

let renderedBadges = [];
function renderBadgesList(b) {
    renderedBadges = [...b];
}

function applyData(d) {}

function showToast(m) {}

function addBadge(val) {
    if (!val) return;
    const d = getData() || getDefaults();
    if (!d.personal.heroBadges) {
        d.personal.heroBadges = [...getDefaults().personal.heroBadges];
    }
    d.personal.heroBadges.push(val);
    saveData(d);
    renderBadgesList(d.personal.heroBadges);
    showToast('Badge added!');
}

function removeBadge(i) {
    const d = getData() || getDefaults();
    if (!d.personal.heroBadges) {
        d.personal.heroBadges = [...getDefaults().personal.heroBadges];
    }
    if (i >= 0 && i < d.personal.heroBadges.length) {
        d.personal.heroBadges.splice(i, 1);
        saveData(d);
        renderBadgesList(d.personal.heroBadges);
        showToast('Badge removed!');
    }
}

// SETUP: User has OLD data without heroBadges
localStorage.setItem('portfolio_data', JSON.stringify({
    personal: { name: "John", chips: ["A"] }
}));


// SIMULATE USER FLOW
// 1. Add "Val1"
addBadge("Val1");
console.log("After add 1:", renderedBadges);

// 2. Remove index 0
removeBadge(0);
console.log("After remove:", renderedBadges);

// 3. Add "Val2"
addBadge("Val2");
console.log("After add 2:", renderedBadges);
