/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;


// ==helpers==


//random names & occupations//
function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

//Random number in a range- Freelancer rates between 20-200, alone decimals Vs Whole numbers

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//^Notes - Math.random() alone gives decimals — we want whole numbers






//creates one clean freelancer - object//
function createFreelancer() {
    return {
        name: randomFrom(NAMES),
        occupation: randomFrom(OCCUPATIONS),
        rate: randomInt(PRICE_RANGE.min, PRICE_RANGE.max),

    };
}
//Will Help create 100 of them later


//State--App Memory //hold 100 freelancer objects
const state = {
    freelancers: Array.from(
        { length: NUM_FREELANCERS },
        () => createFreelancer()
    ),
    averageRate: 0,
};

//Calculating Average Rate

function getAverageRate() {
    const total = state.freelancers.reduce(
        (sum, freelancer) => sum + freelancer.rate,
        0
    );
    return total / state.freelancers.length;
}

//Calculate once and reuse
state.averageRate = getAverageRate();

function FreelancerRow(freelancer) {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = freelancer.name;

    const occTd = document.createElement("td");
    occTd.textContent = freelancer.occupation;

    const rateTd = document.createElement("td");
    rateTd.textContent = `$${freelancer.rate}`;

    tr.append(nameTd, occTd, rateTd);
    return tr;

}

function FreelancerRows() {
    const tbody = document.createElement("tbody");

    state.freelancers.forEach((freelancer) => {
        tbody.appendChild(FreelancerRow(freelancer));
    });

    return tbody;
}

function AverageRate() {
    const p = document.createElement("p");
    p.textContent = `The average rate is $${state.averageRate.toFixed(2)}.`;
    return p;
}

const $app = document.querySelector("#app");

function render() {

$app.innerHTML = `
  <h1>Freelancer Forum</h1>
  <div id="AverageRate"></div>

  <table>
    <thead>
      <tr>
        <th>NAME</th>
        <th>OCCUPATION</th>
        <th>RATE</th>
      </tr>
    </thead>
    <tbody id="FreelancerRows"></tbody>
  </table>
`;

$app.querySelector("#AverageRate").replaceWith(AverageRate());
$app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
}
render();
