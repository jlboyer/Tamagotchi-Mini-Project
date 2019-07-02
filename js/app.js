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
  play(){
    //this will cycle through operations
    //1. create tomogotchi
    this.spawnTomogotchi()
  },
  spawnTomogotchi(){
    this.tomogotchi = new Tomogatchi
  }
}

game.play()
console.log(game.tomogotchi)