// Global Variables
const url = 'http://localhost:3000/games'
let selectedGameObj

// DOM Selectors
const gameList = document.querySelector('.game-list')
const detailImg = document.querySelector('#detail-image')
const detailTitle = document.querySelector('#detail-title')
const detailHighScore = document.querySelector('#detail-high-score')
const form = document.querySelector('#high-score-form')
const scoreInput = document.querySelector('#score-input')

// Listeners
form.addEventListener('submit', handleNewHighScore)

// Fetchers
function fetchAllGames(gameArr) {
    return fetch(url)
    .then (res=> res.json())
    // .then (console.log)
}

// Render Functions
function renderAllGames(gameArr) {
    gameArr.forEach(renderOneGame)
    // renderFirstGame()
    detailImg.src = gameArr[0].image
    detailTitle.innerText = gameArr[0].name
    detailHighScore.innerText = gameArr[0]['high_score']
}

function renderOneGame(gameObj) {
    selectedGameObj = gameObj
    
    let h5 = document.createElement('h5')

    let gameName = gameObj.name
    let gameMfg = gameObj['manufacturer_name']

    h5.textContent = `${gameName} (${gameMfg})`
    gameList.appendChild(h5)

    h5.addEventListener('click', handleDetail)
    
    function handleDetail() {
        detailImg.src = gameObj.image
        detailTitle.innerText = gameObj.name
        detailHighScore.innerText = gameObj['high_score']
    }
}

// Event Handlers
function handleNewHighScore(e) {
    e.preventDefault()
    let newHighScore = scoreInput.value

    if (newHighScore === '') {
        detailHighScore.innerText = detailHighScore.innerText 
    } else {
        detailHighScore.innerText = newHighScore
    } 

    selectedGameObj.high_score = newHighScore // this is not persisting
    // console.log(selectedGameObj['high_score'])

    e.target.reset()
}

// Initializer
fetchAllGames().then(renderAllGames)