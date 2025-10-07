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
        text: "Du skal plante nogle afgrøder, hvad kunne du tænke dig?",
        options: [
            { name: "Raps", cost: 12_000, profit: 18_000, co2: 700, img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Brassica_napus_LC0027.jpg" },
            { name: "Hvede", cost: 10_000, profit: 15_000, co2: 500, img: "https://s3-eu-west-1.amazonaws.com/yara-links/srgt.jpg" },
            { name: "Bælgplanter", cost: 9_000, profit: 12_000, co2: 200, img: "https://frdk.dk/wp-content/uploads/2023/03/Hesteboenner_san.jpg" }
        ]
    },
    {
        text: "Dine afgrøder har brug for en hånd, hvilken gødning bruger du?",
        options: [
            { name: "Kunstgødning", cost: 5_000, profit: 5_000, co2: 400, img: "https://gratisgødning.dk/wp-content/uploads/2015/09/kunst.jpg" },
            { name: "Økologisk organisk gødning", cost: 6_000, profit: 4_000, co2: 100, img: "https://haveselskabet.dk/media/pmqg2abi/intro-istock-545582750_0.jpg" },
            { name: "Ingen gødning", cost: 0, profit: 2_000, co2: 0, img: "https://static.thenounproject.com/png/4476033-200.png" }
        ]
    },
    {
        text: "Pesticider reducerer din profit, hvad vil du sprøjte med?",
        options: [
            { name: "Konventionel sprøjtning", cost: 4_000, profit: 5_000, co2: 400, img: "https://okonu.dk/img/asset/YXJ0aWNsZXMvMjAxOS9Qb2xpdGlrX1VkdmlrbGluZy9wZXN0aWNpZGVyLXNwcm9qdGVzLS0tY29sb3VyYm94LmpwZw==/pesticider-sprojtes---colourbox.jpg?fit=crop-49-68-1&w=2351&h=1322&s=87f3df8fa17803db1614ee934b7553e4" },
            { name: "Biologisk sprøjtning", cost: 5_000, profit: 3_000, co2: 100, img: "https://mim.dk/media/ceql4wl0/hjemmeside_kemi-og-drikkevand_kemikalier.jpg?width=960" },
            { name: "Så slemt kan de da ikke være, ingen pesticider", cost: 0, profit: 1_000, co2: 0, img: "https://st5.depositphotos.com/36736796/65408/v/450/depositphotos_654082470-stock-illustration-pesticides-prohibit-sign-crossed-out.jpg" }
        ]
    },
    {
        text: "Det bliver noget juks at bare gå rundt på marken, så hvad vil du køre i?",
        options: [
            { name: "Ny effektiv traktor", cost: 50_000, profit: 15_000, co2: 1000, img: "https://www.profi.co.uk/wp-content/uploads/sites/8/2022/12/New-Holland-T7-Methane-Power-LNG-Tractor-lead.jpg" },
            { name: "Brugt traktor", cost: 20_000, profit: 8_000, co2: 700, img: "https://m.atcdn.co.uk/a/media/w600/6c66b3871f6643c9b548d0abcab69e12.jpg" },
            { name: "Jeg lejer en traktor når jeg skal bruge den", cost: 10_000, profit: 5_000, co2: 500, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1vzG0CSMn_LKmI7IJl4kt8VYXlBV5rB5rTF-x9O3nMeBdb_DWCvU9qsJ5m2fZzzLaJPA&usqp=CAU" }
        ]
    },
    {
        text: "Nogle dyr ville være på sin plads, men hvilke?",
        options: [
            { name: "Malkekøer", cost: 30_000, profit: 20_000, co2: 2_000, img: "https://www.maskinbladet.dk/assets/imagecache/930x580/article/ent101951_1-CDFF8FA22BAEA7D910A7761D175C0AE8.jpg" },
            { name: "Får", cost: 15_000, profit: 10_000, co2: 500, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOn7PlCdG8y2DoNPBmsMPqUJlVzd8wksKioA&s"},
            { name: "Dyr må blive en anden god gang", cost: 0, profit: 0, co2: 0, img: "https://markmuseum.dk/assets/uploads/_x2000/En-mark.jpg" }
        ]
    },
    {
        text: "En ekstra energikilde ville være rart, hvilken slags vil du investere i?",
        options: [
            { name: "Min egen vindmølle", cost: 40_000, profit: 5_000, co2: -500, img: "https://cdn.prod.website-files.com/649596b20e583843b3d32617%2F678d1d16378686294893be5f_Bannervideo%20test-poster-00001.jpg" },
            { name: "Solpaneler", cost: 25_000, profit: 3_000, co2: -300, img: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg" },
            { name: "Jeg tager bare strømmen fra væggen", cost: 0, profit: 0, co2: 0, img: "https://bolius-prod.s3.amazonaws.com/_processed_/e/6/csm_20120907-020938-3-2000x1264web-Lundtoftevej_2bf86a061c.jpg" }
        ]
    },    {
        text: "Markerne skal jo nok vandes, hvordan burde man gøre det?",
        options: [
            { name: "Automatisk vandingssystem", cost: 20_000, profit: 10_000, co2: 200, img: "https://cdn.prod.website-files.com/649596b20e583843b3d32617%2F678d1d16378686294893be5f_Bannervideo%20test-poster-00001.jpg" },
            { name: "Manuel vanding", cost: 5_000, profit: 4_000, co2: 50, img: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg" },
            { name: "Det regner sgu så meget i Danmark, ingen vanding", cost: 0, profit: 1_000, co2: 0, img: "https://bolius-prod.s3.amazonaws.com/_processed_/e/6/csm_20120907-020938-3-2000x1264web-Lundtoftevej_2bf86a061c.jpg" }
        ]
    },    {
        text: "Så skal vi til at få jord under neglene, hvordan vil du passe på marken?",
        options: [
            { name: "Dyb pløjning", cost: 10_000, profit: 4_000, co2: 300, img: "https://cdn.prod.website-files.com/649596b20e583843b3d32617%2F678d1d16378686294893be5f_Bannervideo%20test-poster-00001.jpg" },
            { name: "Overfladepløjning", cost: 5_000, profit: 3_000, co2: 150, img: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg" },
            { name: "Ingen pløjning, jeg efterlader efterafgrøder", cost: 0, profit: 2_000, co2: 0, img: "https://bolius-prod.s3.amazonaws.com/_processed_/e/6/csm_20120907-020938-3-2000x1264web-Lundtoftevej_2bf86a061c.jpg" }
        ]
    },    {
        text: "Så er det tid til at få penge i kassen, hvordan vil du sælge din høst?",
        options: [
            { name: "Jeg sælger det hele til engrosmarkedet", cost: 0, profit: 20_000, co2: 0, img: "https://cdn.prod.website-files.com/649596b20e583843b3d32617%2F678d1d16378686294893be5f_Bannervideo%20test-poster-00001.jpg" },
            { name: "Jeg sælger primært til lokale kunder (koster lidt i markedsføring)", cost: 1_000, profit: 15_000, co2: -50, img: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg" },
            { name: "Direktesalg via gårdbutik", cost: 5_000, profit: 18_000, co2: -100, img: "https://bolius-prod.s3.amazonaws.com/_processed_/e/6/csm_20120907-020938-3-2000x1264web-Lundtoftevej_2bf86a061c.jpg" }
        ]
    },
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
        Pris: ${option.cost},-<br>
        Profit: ${option.profit},-<br>
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


//possibility for randomness (crops don't sell or smth)
function nextQuestion(probability){
    const rand_Num = Math.random();
    if (rand_Num < probability) {
        currentQuestion++;
    }
    else {
        //Bad thing happens
        currentQuestion++;
    }
}

// Initialize
updateStatus();
renderQuestion();
