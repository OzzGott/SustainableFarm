const startingBudget = 1000000;

let budget = startingBudget;
let totalProfit = 0;
let totalCO2 = 0;
let currentQuestion = 0;

const budgetEl = document.getElementById('budget');
const profitEl = document.getElementById('profit');
const co2El = document.getElementById('co2');
const questionArea = document.getElementById('question-area');
const endScreen = document.getElementById('end-screen');
const finalProfitEl = document.getElementById('final-profit');
const finalCO2El = document.getElementById('final-co2');
const restartBtn = document.getElementById('restart-btn');

const questions = [
    {
        text: "What type of tractor do you want to buy?",
        options: [
            { name: "Diesel Tractor", cost: 400, profit: 300, co2: 200, img: "https://via.placeholder.com/80" },
            { name: "Electric Tractor", cost: 600, profit: 250, co2: 50, img: "https://via.placeholder.com/80" },
            { name: "Second-Hand Tractor", cost: 250, profit: 150, co2: 100, img: "https://via.placeholder.com/80" }
        ]
    },
    {
        text: "What type of fertilizer will you use?",
        options: [
            { name: "Chemical Fertilizer", cost: 300, profit: 500, co2: 400, img: "https://via.placeholder.com/80" },
            { name: "Organic Fertilizer", cost: 350, profit: 400, co2: 150, img: "https://via.placeholder.com/80" },
            { name: "No Fertilizer", cost: 0, profit: 100, co2: 0, img: "https://via.placeholder.com/80" }
        ]
    },
    {
        text: "What energy source will you invest in?",
        options: [
            { name: "Solar Panels", cost: 500, profit: 300, co2: -50, img: "https://via.placeholder.com/80" },
            { name: "Diesel Generator", cost: 200, profit: 200, co2: 300, img: "https://via.placeholder.com/80" },
            { name: "Do Nothing", cost: 0, profit: 0, co2: 0, img: "https://via.placeholder.com/80" }
        ]
    },
    {
        text: "What irrigation system do you choose?",
        options: [
            { name: "Drip Irrigation", cost: 300, profit: 250, co2: 50, img: "https://via.placeholder.com/80" },
            { name: "Flood Irrigation", cost: 100, profit: 150, co2: 200, img: "https://via.placeholder.com/80" },
            { name: "Manual Watering", cost: 50, profit: 50, co2: 0, img: "https://via.placeholder.com/80" }
        ]
    },
    {
        text: "What crop do you plant?",
        options: [
            { name: "Corn (high yield, high emissions)", cost: 400, profit: 600, co2: 400, img: "https://via.placeholder.com/80" },
            { name: "Wheat (moderate)", cost: 300, profit: 400, co2: 200, img: "https://via.placeholder.com/80" },
            { name: "Legumes (eco-friendly)", cost: 250, profit: 350, co2: 50, img: "https://via.placeholder.com/80" }
        ]
    }
];

function updateStatus() {
    budgetEl.textContent = budget;
    profitEl.textContent = totalProfit;
    co2El.textContent = totalCO2;
}

function renderQuestion() {
    questionArea.innerHTML = "";
    endScreen.classList.add("hidden");

    if (currentQuestion >= questions.length) {
        showEndScreen();
        return;
    }

    const q = questions[currentQuestion];
    const title = document.createElement('h2');
    title.textContent = q.text;
    questionArea.appendChild(title);

    q.options.forEach(option => {
        const div = document.createElement('div');
        div.className = "option";
        if (option.cost > budget) {
            div.classList.add('disabled');
        }

        div.innerHTML = `
      <img src="${option.img}" alt="${option.name}">
      <div>
        <strong>${option.name}</strong><br>
        Cost: $${option.cost}<br>
        Profit: $${option.profit}<br>
        CO₂e: ${option.co2} kg
      </div>
    `;

        div.addEventListener('click', () => selectOption(option));
        questionArea.appendChild(div);
    });
}

function selectOption(option) {
    if (option.cost > budget) return;

    budget -= option.cost;
    totalProfit += option.profit;
    totalCO2 += option.co2;
    currentQuestion++;
    updateStatus();
    renderQuestion();
}

function showEndScreen() {
    questionArea.innerHTML = "";
    endScreen.classList.remove("hidden");
    finalProfitEl.textContent = totalProfit;
    finalCO2El.textContent = totalCO2;
}

restartBtn.addEventListener('click', () => {
    budget = startingBudget;
    totalProfit = 0;
    totalCO2 = 0;
    currentQuestion = 0;
    updateStatus();
    renderQuestion();
});

// Initialize
updateStatus();
renderQuestion();
