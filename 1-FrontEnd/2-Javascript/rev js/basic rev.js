//funcao construtora - objeto videogame

function Videogame(QTgame) {
    this.quantidade_de_games = QTgame;
    this.ligado = false;
}

const videogame1 = new Videogame(10);

print(videogame1.quantidade_de_games); //10

videogame1.ligaDesliga = function() {
    if(this.ligado)
        this.ligado = false
    else
        this.ligado = true
    }

//prototipo - heranca no js

    Videogame.prototype.ligar = ligaDesliga;

    console.log(videogame1.quantidade_de_games); //10

    videogame1.ligaDesliga()
    console.log(videogame1.ligado); //true

//template string
    console.log(`O console tem a quantidade de games igual = ${videogame1.quantidade_de_games}, sim eh pouco.. ¬¬* `);
