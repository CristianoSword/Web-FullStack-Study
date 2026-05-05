
//var x = 0
let x = 0

const CONST_ID = 0 //convention

//arrow function - no this, no proto, no construct ES6

//es5
function func (a, b, c) {} //func declaration 
var func = function (a, b, c) {} //func expression 
//es6
let func = (a) => {} // parenteses opcional como um parametro
let func = (a, b ,c) => {} //parenteses requerido com multiplos parametros

//template literais
var str = 'string date: ' + date //es5
let str = `string date: ${date}` //es6

//Implicit returns
//es5
function func(a, b, c){
    return a + b + c
}
//es6 - return pode ser omitido usando funcoes de seta sem um corpo de bloco
let func = (a, b, c) => a + b + c  //colchetes devem ser omitidos

//Default parameters
//es5
var func = function (a, b) {
    b = 1
    return a + b
}
//es6
let func = (a , b = 1) => {
    return a + b
}
//es6 - exemplo 2
let func = (a , b = 1) => a + b

//Spread syntax
//es5 - expands array
let a1 = [1,2, 3]
let a2 = ['a', 'b', 'c']
let a3 = [...a1, ...a2]
console.log(a3) // [1, 2, 3, "a", "b", "c"]

//es6 - expands function
let b1 = [1 ,2, 3]
let func2 = (a, b, c) => a + b + c
console.log(func2(...b1)) //6

//=================================================================
//      Promises - representa a conclusao de uma funcao async
//=================================================================

//es5 - callback
function doSecond() {
    console.log('Do second.')
}

function doFirst(callback) {
    setTimeout(function () {
        console.log('Do first.')

        callback()
    }, 500)
}

doFirst(doSecond)

//es6 - promises
let doSecond1 = () => {
    console.log('Do second.')
}

let doFirst1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Do first.')

        resolve()
    }, 500)
})

doFirst1.then(doSecond1)

//Exemplo usando XMLHttpRequest
//es5 - callback
function makeRequest(method, url, callback) {
    var request = new XMLHttpRequest()

    request.open(method, url)
    request.onload = function () {
        callback(null, request.response)
    }
    request.onerror = function () {
        callback(request.response)
    }
    request.send()
}

makeRequest('GET', 'https://url.json', function (err, data) {
    if (err) {
        throw new Error(err)
    }else {
        console.log(data)
    }     
})

//es6 - promises
function makeRequest(method, url) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()

        request.open(method, url)
        request.onload = resolve
        request.onerror = reject
        request.send()
    })
}

makeRequest('GET', 'https://url.json')
    .then((event) => {
        console.log(event.target.response)
    })
    .catch((err) => {
        throw new Error(err)
    })