const startingBudget = 100000;

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
        text: "Du kan ikke gå alle vegne, hvad vil du køre i?",
        options: [
            { name: "Ny traktor (Diesel)", cost: 400, profit: 300, co2: 200, img: "https://www.profi.co.uk/wp-content/uploads/sites/8/2022/12/New-Holland-T7-Methane-Power-LNG-Tractor-lead.jpg" },
            { name: "Ny traktor (Elektrisk)", cost: 600, profit: 250, co2: 50, img: "https://grouchyfarmer.com/wp-content/uploads/2023/09/screenshot-2023-09-25-at-5.31.41-am.png" },
            { name: "Brugt traktor (Diesel)", cost: 250, profit: 150, co2: 100, img: "https://m.atcdn.co.uk/a/media/w600/6c66b3871f6643c9b548d0abcab69e12.jpg" }
        ]
    },
    {
        text: "Dine afgrøder har brug for en hånd, hvilken gødning bruger du?",
        options: [
            { name: "Kemisk gødning", cost: 300, profit: 500, co2: 400, img: "https://gratisgødning.dk/wp-content/uploads/2015/09/kunst.jpg" },
            { name: "Organisk gødning", cost: 350, profit: 400, co2: 150, img: "https://haveselskabet.dk/media/pmqg2abi/intro-istock-545582750_0.jpg" },
            { name: "Ingen gødning", cost: 0, profit: 100, co2: 0, img: "https://static.thenounproject.com/png/4476033-200.png" }
        ]
    },
    {
        text: "Lidt ekstra strøm ville være rart, hvilken slags vil du invistere i?",
        options: [
            { name: "Solpaneler", cost: 500, profit: 300, co2: -50, img: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg" },
            { name: "Dieselgenerator", cost: 200, profit: 200, co2: 300, img: "https://shop74079.sfstatic.io/upload_dir/pics/produkt-billeder/vaerktoej/Walter-stahl/generator/Walter-Stahl-PR10000D/_thumbs/1.w1200.jpg" },
            { name: "Jeg tager bare strømmen fra væggen", cost: 0, profit: 0, co2: 0, img: "https://bolius-prod.s3.amazonaws.com/_processed_/e/6/csm_20120907-020938-3-2000x1264web-Lundtoftevej_2bf86a061c.jpg" }
        ]
    },
    {
        text: "Dine marker skal vandes, hvordan har du lyst til at gøre det?",
        options: [
            { name: "Drypvanding", cost: 300, profit: 250, co2: 50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVFhMhZ-7msvuCJc16eOrqW5kg_gu76pjT-g&s" },
            { name: "Jeg vander dem da bare selv", cost: 50, profit: 50, co2: 0, img: "https://shop65489.sfstatic.io/upload_dir/shop/_thumbs/Vandkande_9-liter.w610.h610.backdrop.jpg" }
        ]
    },
    {
        text: "Du skal plante nogle afgrøder, hvad kunne du tænke dig??",
        options: [
            { name: "Raps", cost: 400, profit: 600, co2: 400, img: "https://via.placeholder.com/80" },
            { name: "Hvede", cost: 300, profit: 400, co2: 200, img: "https://via.placeholder.com/80" },
            { name: "Bælgplanter", cost: 250, profit: 350, co2: 50, img: "https://via.placeholder.com/80" }
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
