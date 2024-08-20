console.log('hi');

//create variables for html nodes
const container = document.querySelector('.container');
const submitBtn = document.querySelector('.submit');
const input = document.querySelector('#dimension');
const helper = document.querySelector('.helper');

console.dir(helper);

//random rgb function
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.round(Math.random() * 1000) / 1000;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//create canvas function
function createCanvas(dimension) {
  for (let i = 0; i < dimension; i++) {
    const row = document.createElement('div');
    row.classList.toggle('row');
    for (let j = 0; j < dimension; j++) {
      const div = document.createElement('div');
      row.appendChild(div);
    }
    container.appendChild(row);
  }
  // attach hover event to divs
  const divs = document.querySelectorAll('.row div');
  divs.forEach((div) => {
    div.addEventListener('mouseover', function () {
      div.style.backgroundColor = randomColor();
    });
    div.addEventListener('mouseout', function () {
      div.style.backgroundColor = 'white';
    });
  });
}

createCanvas(4);

input.addEventListener('input', function () {
  const value = input.value;
  if (value < 1 || value > 100) {
    helper.style.display = 'block';
    submitBtn.disabled = true;
  } else {
    helper.style.display = 'none';
    submitBtn.disabled = false;
  }
});

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  //store the value and clear input
  dimension = input.value;
  input.value = '';
  //check input is btw 1-100
  if (dimension < 1 || dimension > 100) {
    helper.style.display = 'block';
    return;
  } else {
    helper.style.display = 'none';
    //round the number
    const roundValue = Math.round(dimension);
    //clear canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    //create canvas
    createCanvas(roundValue);
  }
});
