const BASE_URL = 'http://localhost:3000/monsters'

let page = 1

document.addEventListener('DOMContentLoaded', () => {
	main()
})

function main() {
	displayForm()
	loadMonsters(page)
	appendNavListeners(page)
}

function loadMonsters(page) {
	fetch(`${BASE_URL}/?_limit=50&_page=${page}`)
	.then( resp => resp.json())
	.then( json => displayMonsters(json))
}

function displayForm() {
	let formContain = document.getElementById('create-monster')
	let form = document.createElement('form')
	let inputName = document.createElement('input')
	let inputAge = document.createElement('input')
	let inputDescription = document.createElement('input')
	let button = document.createElement('button')

	form.id = 'monster-form'
	inputName.id = 'name'
	inputName.placeholder = 'name...'
	inputAge.id = 'age'
	inputAge.placeholder = 'age...'
	inputDescription.id = 'description'
	inputDescription.placeholder = 'description...'
	button.textContent = 'Create'

	form.appendChild(inputName)
	form.appendChild(inputAge)
	form.appendChild(inputDescription)
	form.appendChild(button)
	formContain.appendChild(form)
	appendFormListener()	
}

function displayMonsters(monsters) {
	let monsterContain = document.getElementById('monster-container')
	while(monsterContain.firstChild) {
		monsterContain.removeChild(monsterContain.firstChild)
	}
	for(let i = 0; i < monsters.length; i++) {
		displayMonster(monsters[i])
	}
}

function displayMonster(monster) {
	let monsterContain = document.getElementById('monster-container')
	let div = document.createElement('div')
	let h2 = document.createElement('h2')
	let h4 = document.createElement('h4')
	let p = document.createElement('p')

	h2.textContent = monster.name
	h4.textContent = `Age: ${monster.age}`
	p.textContent = monster.description
	
	div.appendChild(h2)
	div.appendChild(h4)
	div.appendChild(p)
	monsterContain.appendChild(div)
}

function appendFormListener() {
	let form = document.getElementById('monster-form')
	form.addEventListener('submit', (ev) => {
		ev.preventDefault()

		let data = {
			name: document.getElementById('name').value,
			age: document.getElementById('age').value,
			description: document.getElementById('description').value
		}
		
		fetch(BASE_URL, {
			method: 'POST',
			headers: {
 				"Content-Type": "application/json",
  				Accept: "application/json"
			},
			body: JSON.stringify(data)
		})
		.then( resp => resp.json() )
		.then( json => displayMonster(json))
	})
}

function appendNavListeners(page) {
	let back = document.getElementById('back')
	let forward = document.getElementById('forward')

	back.addEventListener('click', () => {
		if(page > 1) { page-=1 }
		loadMonsters(page)
	})
	forward.addEventListener('click', () => {
		page+=1
		loadMonsters(page)
	})
}





