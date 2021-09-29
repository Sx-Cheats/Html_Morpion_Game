const Random = (N = 2) => Math.round(Math.random() * N)
const Sum = (A, B) => A + B
const wait = async(sleep = 1) => new Promise(resolve => setTimeout(resolve, sleep * 1e3))
var Template_Grid
var Template = []
var CHECKED = 0
const COLOR_TEMPLATE = ['rgb(249, 249, 65 )', 'rgb(255,0,0)'] /* 1: PLAYER COLOR | 2: ALGO COLOR */
const MATRICE = [
    [0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ], /*PLAYER MATRICE*/
    [0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ] /*ALGO MATRICE*/
]
var Turn = Random(); /* 0 = Player | 1 = ALGO */
function Color_Template(T, Color) {
    if (!Turn)
        MATRICE[0][T.getAttribute('Index')] = 1
    else
        MATRICE[1][T.getAttribute('Index')] = 1

    T.style.backgroundColor = Color
        /*T.removeEventListener("click", Check_Turn)*/
    T.setAttribute('bin', 1)
    this.Template.splice(this.Template.indexOf(T.className), 1)
    CHECKED++
    Turn = !Turn
}

function MATRICE1D_TO_3D(M) {
    return M.map((Value, Index) => {
        if (!((Index ^ 2) * (Index ^ 5) * (Index ^ 8))) return [M[Index - 2], M[Index - 1], M[Index]]

    }).filter(VALUE => VALUE != undefined ? VALUE : false)

}

function CHECK_MATRICE(M) {
    console.log(M)
    if (!(((M[0].reduce(Sum) ^ 3) * (M[1].reduce(Sum) ^ 3) * (M[2].reduce(Sum) ^ 3)) * (((M[0][0] + M[1][0] + M[2][0]) ^ 3) * ((M[0][1] + M[1][1] + M[2][1]) ^ 3) * ((M[0][2] + M[1][2] + M[2][2]) ^ 3)) * ((M[0][0] + M[1][1] + M[2][2]) ^ 3) * ((M[0][2] + M[1][1] + M[2][0]) ^ 3))) {
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
    Color_Template(Randomed, COLOR_TEMPLATE[1])
}
async function Check_Turn(Template_Clicked) {
    if ((Template_Clicked.getAttribute('bin') == '1' || Turn) && CHECKED < 9) return
    Color_Template(Template_Clicked, COLOR_TEMPLATE[0])
    await wait(0.618)
    if (CHECKED < 9)
        Random_Template()
    let WONNER = CHECK_WINNER()
    if (WONNER || WONNER == "EGALITY") {
        CHECKED = 10
        document.getElementsByClassName('WON')[0].innerHTML = WONNER
    }
    await wait(0.25)
}
window.addEventListener('load', () => {
    Template_Grid = document.getElementsByClassName('BackGround')[0].getElementsByTagName('div');
    Array.from(Template_Grid).forEach((OBJ, IDX) => {
        OBJ.setAttribute('bin', 0);
        OBJ.setAttribute('Index', IDX);
        Template.push(OBJ.className);
        OBJ.addEventListener('click', () => Check_Turn(OBJ))
    })
    if (Turn) Random_Template()
})
