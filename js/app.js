class Tomogatchi {
  constructor() {
    this.name = "";
    this.hunger = Math.floor(Math.random() * 10 + 1);
    this.sleepiness = Math.floor(Math.random() * 10 + 1);
    this.boredom = Math.floor(Math.random() * 10 + 1);
    this.ageTomoYears = 0;
    this.ageHumanYears = 0;
    this.metabolism = 1; //default 1 year is 1 minute
    this.birthTime = {
      year: null,
      month: null,
      day: null,
      hours: null,
      minutes: null
    };
    this.timerId 
  }
  birthday() {
    const birthTime = new Date();
    this.birthTime.year = birthTime.getFullYear();
    this.birthTime.month = birthTime.getMonth();
    this.birthTime.day = birthTime.getDay();
    this.lifeTimer()
  }
  lifeTimer() {
    this.timerId = setInterval(() => {

      Math.floor()
      this.ageTomoYears++
    }, 60 * 1000);
  }
}

const intId = setInterval(() => console.log(intId), 1000);

const game = {
  tomogotchi: {},
  play() {
    //this will cycle through operations
    //1. create tomogotchi
    this.spawnTomogotchi();
  },
  spawnTomogotchi() {
    this.tomogotchi = new Tomogatchi();
    this.tomogotchi.birthday();
  },
};

game.play();
console.log(game.tomogotchi);
