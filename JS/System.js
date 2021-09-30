const Random = (N = 2) => Math.round(Math.random() * N)
const wait = (sleep = 1) => new Promise(resolve => setTimeout(resolve, sleep * 1e3))
const COLOR_TEMPLATE = [`rgb(${Random(255)}, ${Random(255)}, ${Random(255)} )`, `rgb(${Random(255)},${Random(255)},${Random(255)})`] /* 0: PLAYER COLOR | 1: ALGO COLOR */
const Sum = (A, B) => A + B
/*const clamp = (num, max, min = 0) => Math.max(Math.min(num, max), min)*/
const CALC_COLUNM = (matrice) => {
    let sum = 1;
    matrice[0].forEach((VALUE, IDX) => {
        (!((matrice[0][IDX] + matrice[1][IDX] + matrice[2][IDX]) ^ 3) ? sum = 0 : 1)
    });
    return sum
}
const CALC_ROW = (matrice) => {
    let f = 1;
    matrice.forEach((VALUE) => VALUE.forEach((V, I) => {!(VALUE.reduce(Sum) ^ 3) ? f = 0 : false }));
    return f
}
const MATRICE = [
    [0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ], /*PLAYER MATRICE*/
    [0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ] /*ALGO MATRICE*/

]
var Template_Grid
var Turn = Random(); /* 0 = Player | 1 = ALGO */
var Template = []
var CHECKED = 0
function Color_Template(T) {
    T.setAttribute('bin', 1)
    if (!Turn) {
        MATRICE[0][T.getAttribute('Index')] = 1
        T.style.backgroundColor = COLOR_TEMPLATE[0]
        T.style.filter = `brightness(0.94) drop-shadow(16px 16px 20px ${COLOR_TEMPLATE[0]})`
        T.title = "PLAYER"
    } else {
        MATRICE[1][T.getAttribute('Index')] = 1
        T.style.backgroundColor = COLOR_TEMPLATE[1]
        T.style.filter = `brightness(0.94) drop-shadow(16px 16px 20px ${COLOR_TEMPLATE[1]})`
        T.title = "ALGO"
    }
    T.style.opacity = 1
    this.Template.splice(this.Template.indexOf(T.className), 1)
    CHECKED++
    Turn = !Turn
}
function MATRICE1D_TO_3D(M) {
    return M.map((Value, Index) => {
        if (!((Index + 1) % Math.sqrt(M.length))) return [M[Index - 2], M[Index - 1], Value]

    }).filter(VALUE => VALUE != undefined ? VALUE : false)

}

function CHECK_MATRICE(M) {
    if (!(CALC_ROW(M) * CALC_COLUNM(M) * ((M[0][0] + M[1][1] + M[2][2]) ^ 3) * ((M[0][2] + M[1][1] + M[2][0]) ^ 3))) {
        return true
    }
    return false
}

function CHECK_WINNER() {
    var PLAYER_MATRICE_3D = CHECK_MATRICE(MATRICE1D_TO_3D(MATRICE[0]))
    var ALGO_MATRICE_3D = CHECK_MATRICE(MATRICE1D_TO_3D(MATRICE[1]))
    return PLAYER_MATRICE_3D ? "PLAYER WON !" : ALGO_MATRICE_3D ? "ALGO WON !" : CHECKED >= 9 ? "EGALITY" : false

}

function Random_Template() {
    let Randomed = document.getElementsByClassName(this.Template[Random(this.Template.length - 1)])[0]
    Color_Template(Randomed)
}
async function Check_Turn(Template_Clicked) {
    if ((Template_Clicked.getAttribute('bin') == '1' || Turn) || CHECKED > 9) return
    Color_Template(Template_Clicked)
    await wait(0.618)
    if (CHECKED < 9)
        Random_Template()
    let WONNER = CHECK_WINNER()
    if (WONNER || WONNER == "EGALITY") {
        CHECKED = 10
        document.getElementsByClassName('WON')[0].innerHTML = WONNER
    }
    await wait(1.67 - Random(2))
}
window.addEventListener('load', () => {
    Template_Grid = document.getElementsByClassName('BackGround')[0].getElementsByTagName('div');
    Array.from(Template_Grid).forEach((OBJ, IDX) => {
        OBJ.setAttribute('bin', 0);
        OBJ.style.backgroundColor = 'rgb(0, 66, 75, 1)'
        OBJ.setAttribute('Index', IDX);
        Template.push(OBJ.className);
        OBJ.addEventListener('click', () => Check_Turn(OBJ))
        OBJ.addEventListener('mouseover', () => (!parseInt(OBJ.getAttribute('bin'))) ? OBJ.style.opacity = 0.65 : false)
        OBJ.addEventListener('mouseleave', () => OBJ.style.opacity = 1)
    })
    if (Turn) Random_Template()
})
