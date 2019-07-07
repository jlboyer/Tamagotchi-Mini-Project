
class Tamagatchi {
  constructor() {
    this.name = "";
    this.hunger = 0;
    this.hungerRate = Math.random() * 0.4 + 0.2;
    this.sleepiness = 0;
    this.sleepinessRate = Math.random() * 0.4 + 0.2;
    this.boredom = 0;
    this.boreRate = Math.random() * 0.4 + 0.2;
    this.ageTomoYears = 0;
    this.ageHumanMins = 0;
    this.minsToTomoYears = 0.5;
    this.birthTime = {
      year: null,
      month: null,
      day: null,
      hours: null,
      minutes: null
    };
    this.timerId = null;
    this.possibleCrimes = [
      ['was caught riding the JR line without a ticket',
      'was caught shoplifting manga from Lawsons',
      'received a cease and desist letter for downloading the movie \'Scarface\''],
      ['was caught stealing change from the tip jar at Starbucks',
      'failed to yield for a little old lady in the crosswalk',
      'was caught using counterfeit money to buy Boss coffee'],
      ['got busted for indecent exposure at the public pool',
      'outran the police in a Toyota Sprinter Trueno AE86',
      'received a ticket for public intoxication smuggling sake into the local library'],
      ['was caught with narcotics and Pocky sticks',
      'was picked out of a lineup for a carjacking a Toyota Supra',
      'was caught for tax evasion sheltering money in Macau'],
      ['was involved in a money laundering scheme through a Pachinko parlor',
      'has been involved in aprotection racket at a local night club',
      'fingerprint\'s have been found at the scene of a murder'],
      ['has been operating a multi-million dollar drug smuggling operation',
      'has been indicted on a massive case of securities fraud',
      'has assembled a rogue group of mercenaries and acquired a weapon of mass destruction']
    ];
    this.crimeRate = 0;
    this.wantedLevel = 0;
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
    return this.hunger < 10 && this.sleepiness < 10 && this.boreRate < 10 && this.wantedLevel < 5;
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
    $('#overlay').css("display", "none");
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
    console.log(this.tamagotchi.isAlive())
    if (!this.tamagotchi.isAlive()) this.gameOver();
  },
  gameOver(){
    clearInterval(this.tamagotchi.timerId)
    $('#overlay').css("display", "block");
    $('#overlay').on("click", () => {
      if ($('#overlay').css("display") === "block"){
        $('input').val('')
        this.displayTimer = 0;
        
        this.play()
      }
    })
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
    for (let i = 0; i < this.tamagotchi.wantedLevel; i++){
      statVal += "&#9733;"
    }
    for (let i = 0; i <5 -this.tamagotchi.wantedLevel; i++){
      statVal += "&star;"
    }
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
    this.tamagotchi.crimeRate = Math.max(this.tamagotchi.hunger, this.tamagotchi.boredom, this.tamagotchi.sleepiness)/30;
    if (Math.random()<this.tamagotchi.crimeRate){
      this.displayCrime()
    }
  },
  displayCrime(){
    let rndCrimeNum = Math.floor(Math.random()*3)
    let crimeString = `${this.tamagotchi.name} ${this.tamagotchi.possibleCrimes[this.tamagotchi.wantedLevel][rndCrimeNum]}...`
    $("#crimeString").text(crimeString)
    this.tamagotchi.wantedLevel++
  },
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
