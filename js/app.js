class Tomogatchi {
  constructor(){
    this.name = ''

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