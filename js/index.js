const URL = 'http://localhost:3000/monsters'

let page = 1

document.addEventListener('DOMContentLoaded', () => {
loadMonsters(page)
addMonster()
handlePageNav(page)
})

function loadMonsters() {
  fetch(`${URL}/?_limit=50&_page=${page}`)
  .then(res => res.json())
  .then(monsters => {
    displayMonsters(monsters)
  })
}

function displayMonsters(monsters) {
  let div1 = document.getElementById('monster-container')
  while (div1.firstChild) {
    div1.firstChild.remove()
  }
  monsters.forEach(monster => {
    displayMonster(monster)
  })
}

function displayMonster(monster) {

  let div1 = document.getElementById('monster-container')
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let h4 = document.createElement('h4')
  let p = document.createElement('p')
  let deleteBtn = document.createElement('button')

  div1.appendChild(div)
  div.appendChild(h2)
  div.appendChild(h4)
  div.appendChild(p)
  div.appendChild(deleteBtn)

  h2.textContent = monster.name
  h4.textContent = monster.age
  p.textContent = monster.description
  deleteBtn.textContent = "Remove"

}

function addMonster() {

  let div = document.getElementById('create-monster')
  let newMonsterForm = document.createElement('form')
  let newName = document.createElement('input')
  let newAge = document.createElement('input')
  let newDesc = document.createElement('input')
  let submitBtn = document.createElement('button')

  div.appendChild(newMonsterForm)
  newMonsterForm.appendChild(newName)
  newMonsterForm.appendChild(newAge)
  newMonsterForm.appendChild(newDesc)
  newMonsterForm.appendChild(submitBtn)

  newName.placeholder = "name..."
  newAge.placeholder = "age..."
  newDesc.placeholder = "description..."

  newName.id = "new-name"
  newAge.id = "new-age"
  newDesc.id = "new-desc"
  submitBtn.textContent = "submit"

  submitBtn.addEventListener('click', (ev) => {
    ev.preventDefault()
    handleSubmit()
  })

}

function handleSubmit() {

  let newMonster = {
    name: document.getElementById('new-name').value,
    age: document.getElementById('new-age').value,
    desc: document.getElementById('new-desc').value
  }

  let config = {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({newMonster})
  }

  fetch(URL, config)
  .then(res => res.json())
  .then(res => {
  })
}

function handlePageNav() {
  let forward = document.getElementById('forward')
  let back = document.getElementById('back')

  forward.addEventListener('click', () => {
    page += 1
    loadMonsters(page)
  })
  back.addEventListener('click', () => {
    if (page > 1) {page -= 1}
    loadMonsters(page)
  })
}
