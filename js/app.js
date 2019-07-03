class Tamagatchi {
  constructor() {
    this.name = "";
    this.hunger = Math.floor(Math.random() * 5 + 1);
    this.hungerRate = Math.random()*0.4 + 0.5;
    this.sleepiness = Math.floor(Math.random() * 5 + 1);
    this.sleepinessRate = Math.random()*0.4 + 0.5
    this.boredom = Math.floor(Math.random() * 5 + 1);
    this.boreRate = Math.random()*0.4 + 0.5
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
    this.birthTime.hours = birthTime.getHours();
    this.birthTime.minutes = birthTime.getMinutes();
  }
  isAlive(){
    return this.hunger < 10 && this.sleepiness < 10 && this.boreRate < 10
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
  updateAge(){
    this.tamagotchi.ageHumanMins++
    this.tamagotchi.ageTomoYears = this.tamagotchi.ageHumanMins / this.tamagotchi.minsToTomoYears; 
  },
  dayInTheLife(){
    this.updateAge()
    this.displayAge()
    this.updateMetrics()
    this.displayMetrics()
    console.log("is alive:", this.tamagotchi.isAlive())
  },
  lifeTimer() {
    this.tamagotchi.timerId = setInterval(() => {
      this.dayInTheLife()
    }, 1000);  //make sure to add back * 60 for mins!!!!!
  },
  displayAge() {
    console.log("Mins elapsed:", this.tamagotchi.ageHumanMins)
    console.log("Tama age:", this.tamagotchi.ageTomoYears)
  },
  displayMetrics(){
    console.log("Hunger:",Math.ceil(this.tamagotchi.hunger))
    console.log("Sleepiness:",Math.ceil(this.tamagotchi.sleepiness))
    console.log("Boredom:",Math.ceil(this.tamagotchi.boredom))
  },
  updateMetrics(){
    this.tamagotchi.hunger += this.tamagotchi.ageTomoYears * this.tamagotchi.hungerRate
    this.tamagotchi.sleepiness += this.tamagotchi.ageTomoYears * this.tamagotchi.sleepinessRate
    this.tamagotchi.boredom += this.tamagotchi.ageTomoYears * this.tamagotchi.boreRate
  }
};

game.play();

