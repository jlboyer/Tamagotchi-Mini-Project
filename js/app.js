
class Tamagatchi {
  constructor() {
    this.name = "";
    this.hunger = Math.floor(Math.random() * 5 + 1);
    this.hungerRate = Math.random() * 0.4 + 0.5;
    this.sleepiness = Math.floor(Math.random() * 5 + 1);
    this.sleepinessRate = Math.random() * 0.4 + 0.5;
    this.boredom = Math.floor(Math.random() * 5 + 1);
    this.boreRate = Math.random() * 0.4 + 0.5;
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
    this.timerId = null;
  }
  birthday() {
    const birthTime = new Date();
    this.birthTime.year = birthTime.getFullYear();
    this.birthTime.month = birthTime.getMonth();
    this.birthTime.day = birthTime.getDay();
    this.birthTime.hours = birthTime.getHours();
    this.birthTime.minutes = birthTime.getMinutes();
    console.log(`Your tamagotchi was born ${birthTime}`)
    this.giveName()
  }
  isAlive() {
    return this.hunger < 10 && this.sleepiness < 10 && this.boreRate < 10;
  }
  giveName() {
    // rl.question("What would you like to name your tamagotchi? ",
    //   answer => { this.name = answer})
    this.name = $('input').val();
  }
}

const game = {
  tamagotchi: {},
  pauseDisplay: false,
  play() {
    this.spawnTamagotchi();
  },
  spawnTamagotchi() {
    console.log('Spawning tamagotchi...')
    this.tamagotchi = new Tamagatchi();
    this.tamagotchi.birthday();
    this.lifeTimer();
  },
  updateAge() {
    this.tamagotchi.ageHumanMins++;
    this.tamagotchi.ageTomoYears =
      this.tamagotchi.ageHumanMins / this.tamagotchi.minsToTomoYears;
  },
  dayInTheLife() {
    this.updateAge();
    this.updateMetrics();

    // if (!this.pauseDisplay) {
      this.displayAge();
      this.displayMetrics();
      console.log("is alive:", this.tamagotchi.isAlive());
     // this.promptInteraction();
    // }
  },
  lifeTimer() {
    console.log('Into the brave unknown..')
    this.tamagotchi.timerId = setInterval(() => {
      console.log('hi')
      this.dayInTheLife();
    }, 5000); //make sure to add back * 60 for mins!!!!!
  },
  displayAge() {
    console.log("Mins elapsed:", this.tamagotchi.ageHumanMins);
    console.log("Tama age:", this.tamagotchi.ageTomoYears);
  },
  displayMetrics() {
    console.log("Hunger:", Math.ceil(this.tamagotchi.hunger));
    console.log("Sleepiness:", Math.ceil(this.tamagotchi.sleepiness));
    console.log("Boredom:", Math.ceil(this.tamagotchi.boredom));
  },
  updateMetrics() {
    this.tamagotchi.hunger +=
      this.tamagotchi.ageTomoYears * this.tamagotchi.hungerRate;
    this.tamagotchi.sleepiness +=
      this.tamagotchi.ageTomoYears * this.tamagotchi.sleepinessRate;
    this.tamagotchi.boredom +=
      this.tamagotchi.ageTomoYears * this.tamagotchi.boreRate;
  },

/*   promptInteraction() {
    this.pauseDisplay = true;
    rl.question(
      "Would you like to (F)eed (P)lay or (S)end to bed? ",
      answer => {
        answer = answer.toLowerCase().trim();
        switch (answer) {
          case "f":
            this.feedTama();
            rl.close();
            break;
          case "p":
            this.playTama();
            rl.close();
            break;
          case "s":
            this.sleepTama();
            rl.close();
            break;
          default:
            this.promptInteraction();
            break;
        }
      }
    );
  }, */

  feedTama() {
    console.log(`Feeding tamagotchi ${this.tamagotchi.name}...`);
  },
  playTama() {
    console.log(`Playing with tamagotchi ${this.tamagotchi.name}...`);
  },
  sleepTama() {
    console.log(`Shh..${this.tamagotchi.name} is sleeping`);
  },
};

$("form").submit((e) => {
  e.preventDefault();
  game.play()
})
