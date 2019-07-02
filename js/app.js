class Tomogatchi {
  constructor() {
    this.name = "";
    this.hunger = Math.floor(Math.random() * 10 + 1);
    this.sleepiness = Math.floor(Math.random() * 10 + 1);
    this.boredom = Math.floor(Math.random() * 10 + 1);
    this.age = 0;
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
  }
  lifeTimer() {
    tomogotchi = setInterval(() => {
      console.log(new Date());
    }, 60 * 1000);
  }
}

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
