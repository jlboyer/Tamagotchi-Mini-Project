class Tomogatchi {
  constructor(){
    this.name = ''
    this.hunger = Math.floor(Math.random()*10 + 1)
    this.sleepiness = Math.floor(Math.random()*10 + 1)
    this.boredom = Math.floor(Math.random()*10 + 1)
    this.age = 0
  }

}

const game = {
  tomogotchi: {},
  birthTime: {
    year: null,
    month: null,
    day: null,
    hours: null,
    minutes: null
  },
  play(){
    //this will cycle through operations
    //1. create tomogotchi
    this.spawnTomogotchi()
    this.startTimer()
  },
  spawnTomogotchi(){
    this.tomogotchi = new Tomogatchi
    this.tomogotchi.birthday()
  },
  birthday(){
    const birthTime = new Date()
    this.birthTime.year = birthTime.getFullYear()
    this.birthTime.month = birthTime.getMonth()
    this.birthTime.day = birthTime.getDay()
    
    setInterval(() => {
      console.log(new Date())
    }, 60*1000);
  },

}

game.play()
console.log(game.tomogotchi)