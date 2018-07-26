


var n = m = 3;

var playground = [] //Matriz de numeros 3x3 donde el 0 indica que la posicion esta vacia de lo contrario el nivel de la torre es el valor si tenemos -1 quiere decir que es una caja

var rates = { //Rates to obtain a box
    bronze : 80, //torre inicial
    silver : 15, // 2 - 5
    golden : 5  // 4 - 6
}
var isFull = false
var LEVEL = 1

const VACIA = 0
const BRONZE = -1
const SILVER = -2
const GOLDEN = -3

function initMatrix () {
    for(var i = 0; i < n ; i++) {
        playground[i] = []
    }

    playground.forEach((row) => {
        for (var i = 0; i < m; i++) {
            row[i] = 0
        }
    })
}

function show () {
    console.log("MOSTRANDO")
    playground.forEach((row) => {
        console.log(row.join(" "))
    })

}

function getFirstEmptySlot () {

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            if (playground[i][j] == VACIA) {
                return { i: i , j : j}
            }
        }
    }

    return {i : -1, j : -1}
}

function getFirstBox() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            if (playground[i][j] < VACIA) {
                return { i: i , j : j}
            }
        }
    }

    return {i : -1, j : -1}
}

function generate() { //Genera una caja
    if (isFull) return;

    var index = getFirstEmptySlot()
    if (index.i == -1 || index.j == -1) {
        isFull = true
        return
    }
    number = randomIntInc(1, 100)
    console.log(number)
    if (number <= 80) {
        playground[index.i][index.j] = BRONZE
    } else if (number > 80 && number <= 95) {
        playground[index.i][index.j] = SILVER
    } else {
        playground[index.i][index.j] = GOLDEN
    }

    console.log("GENERADA CAJA")
}

function openFirstCrate() { //Abre la primera caja y genera una torre basado en la clasificacion de la caja
    var index = getFirstBox()
    if (index.i == -1 || index.j == -1) {
        console.log("No hay cajas")
        return
    }
    openCrate(index)
    console.log("ABIERTA CAJA", index)
}

function  openCrate( index ) { //Abre una caja en la posicion index
    var crate = playground[index.i][index.j]

    switch (crate) {
        case BRONZE : //Genera una torre estandar
            playground[index.i][index.j] = 1
            break
        case SILVER: //Genera una torre aleatoria entre 2 y 5
            playground[index.i][index.j] = randomIntInc(2 , 5)
            break
        case GOLDEN : //Genera una torre aleatoria entre 3 y 6
            playground[index.i][index.j] = randomIntInc(3, 6)
            break
    }
}

function mergeFirstTurrets () {
    var points = getDupeIndexes()
    merge(points)
    console.log("COMBINADOS:", points)
}

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function getDupeIndexes() {
    item = -1

    for (var i = 0; i < n ; i++) {
        for (var j = 0; j < m ; j++) {
            if (playground[i][j] > 0) { //No es una caja ni esta vacio
                item = playground[i][j]
                duplicatedIndex = getDuplicatedItem(item, i, j)
                if (duplicatedIndex.i != -1 && duplicatedIndex.j != -1) {
                    return [{i : i, j: j}, duplicatedIndex]
                }
            }
        }
    }

    return []
}

function getDuplicatedItem(item , x , y) {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++){
            if (x != i || y != j) {
                if (playground[i][j] == item) {
                    return { i: i, j: j}
                }
            }
        }
    }

    return {i : -1 , j : -1 }
}

function merge(points) {
    if (!points.length) return;
    var firstPoint = points[0]
    var secondPoint = points[1]
    playground[firstPoint.i][firstPoint.j] += 1
    playground[secondPoint.i][secondPoint.j] = 0
    isFull = false
}

(function main() {
    initMatrix()
    setInterval(generate, 3000)
    setInterval(show, 1000)
    setInterval(openFirstCrate, 9000)
    setInterval(mergeFirstTurrets, 10000)
})()


