var pageNumber = 1

document.addEventListener("DOMContentLoaded", () => {
  main()
})


function main() {
  loadMonsters()
  handleScroll()
  handleForm()
}

function handleForm() {
  const formDiv = document.getElementById('create-monster')
  const form = document.createElement("form")
  form.id = "monster-form"
  console.log(form)
  formDiv.appendChild(form);
  const name = document.createElement('input')
  name.id = "name"
  name.placeholder = "name..."
  form.appendChild(name)
  const age = document.createElement('input')
  age.id = "age"
  age.placeholder = "age..."
  form.appendChild(age)
  const description = document.createElement('input')
  description.id = "description"
  description.placeholder = "description..."
  form.appendChild(description)
  const create = document.createElement('button')
  create.textContent = "Create"
  form.appendChild(create)
  create.addEventListener("click", (ev) => {
    addNewMonster(ev, name.value, age.value, description.value)
  })
}

function addNewMonster(ev, name, age, description) {
  ev.preventDefault();
  return fetch(`http://localhost:3000/monsters/`, {
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
        },
    body: JSON.stringify({name: name, age: age, description: description})
  })
  .then(res => res.json())
  .then(loadMonsters())
}

function loadMonsters(pageNumber){
  return fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
  .then(res => res.json())
  .then(json=>displayMonsters(json))
}

function displayMonsters(json) {
  json.forEach(function(monster){
      displayMonster(monster)
  })
}

function displayMonster(monster) {
  const monstersContainer= document.getElementById('monster-container');
  const monsterDiv= document.createElement('div')
  monstersContainer.appendChild(monsterDiv)
  const h2 = document.createElement('h2')
  h2.textContent = monster.name;
  monsterDiv.appendChild(h2);
  const h4 = document.createElement('h4')
  h4.textContent = "Age: " + monster.age;
  monsterDiv.appendChild(h4);
  const p = document.createElement('p')
  p.textContent = monster.description;
  monsterDiv.appendChild(p);
}

function handleScroll(){
  const backBtn = document.getElementById('back')
  const forwardBtn = document.getElementById('forward')
  backBtn.addEventListener("click", (ev) => {
    scrollBack(ev)
  })
  forwardBtn.addEventListener("click", (ev) => {
    scrollForward(ev)
  })
  document.body.appendChild(backBtn)
  document.body.appendChild(forwardBtn)

}

function scrollBack(ev) {
  if (pageNumber === 1) {
    loadMonsters(pageNumber)
  } else {
    pageNumber--
    clearMonsters()
    loadMonsters(pageNumber)
  }
}

function scrollForward(ev) {
    pageNumber++
    clearMonsters()
    loadMonsters(pageNumber)
}

function clearMonsters() {
  const monsterContainer = document.getElementById("monster-container");
  while (monsterContainer.firstChild) {
    monsterContainer.removeChild(monsterContainer.firstChild);
}
}
