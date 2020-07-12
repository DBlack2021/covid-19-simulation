let city = [];
let numInfectedData = [];
let numInfected = 0;

function setup() {
  frameRate(60);
  background(220);
  createCanvas(400, 400);
  for (let i = 0; i < 250; i++) {
    let x = random(0, width - 5);
    let y = random(0, height - 5);
    let person = new Citizen(x, y, random(5, 90), false, false, 0);
    city.push(person);
  }

  city[Math.floor(Math.random() * city.length)].infected = true;


  for (let j = 0; j < city.length; j++) {
    city[j].show();
  }

}

function infect(person1, person2) {
  let prob = random(0, 1);
  if (prob < (1/2)) {
    if (person1.infected && !person2.infected && !person2.recovered) {
      person2.infected = true;
    } else if (!person1.infected && person2.infected && !person1.recovered) {
      person1.infected = true;
    }
  }
}

function draw() {
  numInfected = 0;
  background(255);
  for (let i = 0; i < city.length; i++) {
    city[i].update();
    city[i].checkIfRecovered();
    city[i].show();
    
    if(city[i].infected && !city[i].recovered) {
     numInfected++; 
    }
    
    for (let j = 0; j < city.length; j++) {
      if (i != j && city[i].intersects(city[j])) {
        infect(city[i], city[j]);
      }
    }
  }
  
  if(numInfected != 0) {
    numInfectedData.push(numInfected);
  } else {
    noLoop();
  }
}