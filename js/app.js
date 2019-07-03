class Tamagatchi {
  constructor() {
    this.name = "";
    this.hunger = Math.floor(Math.random() * 5 + 1);
    this.sleepiness = Math.floor(Math.random() * 5 + 1);
    this.boredom = Math.floor(Math.random() * 5 + 1);
    this.ageTomoYears = 0;
    this.ageHumanMins = 0;
    this.minsToTomoYears = 1; //default 1 year is 1 minute
    this.birthTime = {
      year: null,
      month: null,
      day: null,
      hours: null,
      minutes: null
    };
    this.timerId = null
  }
  birthday() {
    const birthTime = new Date();
    this.birthTime.year = birthTime.getFullYear();
    this.birthTime.month = birthTime.getMonth();
    this.birthTime.day = birthTime.getDay();
  }
  
}

const game = {
  tamagotchi: {},
  play() {
    //this will cycle through operations
    //1. create tamagotchi
    this.spawnTamagotchi();
  },
  spawnTamagotchi() {
    this.tamagotchi = new Tamagatchi();
    this.tamagotchi.birthday();
    this.lifeTimer();
  },
  lifeTimer() {
    this.tamagotchi.timerId = setInterval(() => {
      this.tamagotchi.ageHumanMins++
      this.tamagotchi.ageTomoYears = this.tamagotchi.ageHumanMins / this.tamagotchi.minsToTomoYears;
      game.displayAge()
    }, 1000);  //make sure to add back * 60 for mins!!!!!
  },
  displayAge() {
    console.log("Mins elapsed:", this.tamagotchi.ageHumanMins)
    console.log("Tama age:", this.tamagotchi.ageTomoYears)
  }
};

game.play();

