
class Tamagatchi {
  constructor() {
    this.name = "";
    this.hunger = Math.floor(Math.random() * 2 + 1);
    this.hungerRate = Math.random() * 0.4 + 0.2;
    this.sleepiness = Math.floor(Math.random() * 2 + 1);
    this.sleepinessRate = Math.random() * 0.4 + 0.2;
    this.boredom = Math.floor(Math.random() * 2 + 1);
    this.boreRate = Math.random() * 0.4 + 0.2;
    this.ageTomoYears = 0;
    this.ageHumanMins = 0;
    this.minsToTomoYears = 0.25;
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
    this.name = $('input').val();
  }
}

const game = {
  tamagotchi: {},
  pauseDisplay: false,
  timerSeconds: 0,
  play() {
    //initialize button event listeners 
    $("#play_button").on("click", this.playTama.bind(this))
    $("#feed_button").on("click", this.feedTama.bind(this))
    $("#sleep_button").on("click", this.sleepTama.bind(this))
    this.spawnTamagotchi();
  },
  spawnTamagotchi() {
    console.log('Spawning tamagotchi...')
    this.tamagotchi = new Tamagatchi();
    this.tamagotchi.birthday();
    this.lifeTimer();
  },
  updateAge() {
    this.tamagotchi.ageHumanMins = this.timerSeconds/60;
    this.tamagotchi.ageTomoYears =
    Math.floor(this.tamagotchi.ageHumanMins / this.tamagotchi.minsToTomoYears);
  },
  dayInTheLife() {
    this.displayTimer();
    this.updateAge();
    this.displayAge();
    this.updateMetrics();
    this.displayMetrics();
    console.log("is alive:", this.tamagotchi.isAlive());
    
  },
  lifeTimer() {
    console.log('Into the brave unknown..')
    this.setImage()
    this.tamagotchi.timerId = setInterval(() => {
      this.dayInTheLife();
      this.timerSeconds++
    }, 1000); 
  },
  setImage(){
    let imgNum = Math.floor(Math.random()*3 +1)
    let avatar = `resources/Avatar_${imgNum}.png`
    $("#mugshot").attr("src", avatar);
  },
  displayTimer() {
    let minsElapsed = Math.floor(this.timerSeconds / 60)
    let seconds = this.timerSeconds - minsElapsed*60
    minsElapsed = minsElapsed.toString(10)
    seconds = seconds.toString(10)
    $("#timer").text(`${minsElapsed.padStart(2,"0")}:${seconds.padStart(2,"0")}`);
  },
  displayAge() {
    console.log("Mins elapsed:", this.tamagotchi.ageHumanMins);
    console.log("Tama age:", this.tamagotchi.ageTomoYears);
    $("#age_field").text(this.tamagotchi.ageTomoYears)
  },
  displayMetrics() {
    let boredom = Math.ceil(this.tamagotchi.boredom)
    let hunger = Math.ceil(this.tamagotchi.hunger)
    let sleepiness = Math.ceil(this.tamagotchi.sleepiness)
    let metrics = [sleepiness, hunger, boredom]
    console.log("Boredom:", boredom);
    console.log("Hunger:", hunger);
    console.log("Sleepiness:", sleepiness);

    let statVal = ""
    metrics.forEach( element => {
      for (let i = 0; i < element; i++){
        statVal += "||"
      }
      statVal += "<br>"
    })
    statVal += "&#9733;"
    $("#val").html(statVal)
  },
  updateMetrics() {
    //add one so the value increase from start
    //the older the faster the values increase
    this.tamagotchi.hunger +=
      (this.tamagotchi.ageTomoYears + 1) * this.tamagotchi.hungerRate;
    this.tamagotchi.sleepiness +=
      (this.tamagotchi.ageTomoYears + 1) * this.tamagotchi.sleepinessRate;
    this.tamagotchi.boredom +=
      (this.tamagotchi.ageTomoYears + 1) * this.tamagotchi.boreRate;
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
        //reset pacman for animation
    $(".pacman_animate").attr("class", "pacman");
    if (this.tamagotchi.hunger > 0)  {
      this.tamagotchi.hunger -= 1
      $("#action_gif").attr("src","resources/eat.gif")
      this.displayMetrics()
    }
  },
  playTama() {
    console.log(`Playing with tamagotchi ${this.tamagotchi.name}...`);
    if (this.tamagotchi.boredom > 0)  {
      this.tamagotchi.boredom -= 1
      $("#action_gif").attr("src","resources/catari.gif")
      $(".pacman").attr("class", "pacman_animate");
      this.displayMetrics()
    }
  },
  sleepTama() {
    console.log(`Shh..${this.tamagotchi.name} is sleeping`);
    //reset pacman for animation
    $(".pacman_animate").attr("class", "pacman");
    if (this.tamagotchi.sleepiness > 0) {
      this.tamagotchi.sleepiness -= 1
      $("#action_gif").attr("src","resources/sleep.gif")
      this.displayMetrics()
    }
  },
};

$("form").submit((e) => {
  e.preventDefault();
  game.play()
})
