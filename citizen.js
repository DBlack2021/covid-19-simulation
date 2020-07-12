class Citizen {
  constructor(x, y, dir, age, infected, recovered) {
    this.pos = createVector(x, y);
    this.age = age;
    this.dir = p5.Vector.random2D().mult(3);
    this.infected = infected; //boolean
    this.recovered = recovered; //boolean
    this.timeInfected = 0;
    this.d = 10;

    this.intersects = function(other) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d < this.d) {
        this.dir.mult(-1);
        other.dir.mult(-1);
        return true;
      }
      return false;
    }

  }

  show() {
    if (this.infected) {
      fill(255, 0, 0);
    } else if (this.recovered) {
      fill(0, 255, 0);
    } else {
      fill(0, 0, 255);
    }

    ellipse(this.pos.x, this.pos.y, this.d);
  }

  update() {
    this.pos.add(this.dir); //move the ppl

    //collision mechanics
    if (this.pos.x > width - (this.d / 2) || this.pos.x < (this.d / 2)) {
      this.dir.x *= -1;
    } else if (this.pos.y > height - (this.d / 2) || this.pos.y < (this.d / 2)) {
      this.dir.y *= -1;
    }
  }

  //algorithm [recover(), checkTimeInfected(), and checkIfRecovered()]
  recover() {
    this.recovered = true;
    this.infected = false;
  }

  checkTimeInfected() {
    if (this.infected) {
      this.timeInfected++;
    }
  }

  checkIfRecovered() {
    this.checkTimeInfected();
    if (this.timeInfected >= 150) {
      let prob = random(0, 1);
      if (prob <= (1 / (this.age * 2))) {
        this.recover();
      }
    }
  }

}