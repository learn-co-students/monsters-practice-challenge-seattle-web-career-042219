const MONSTR_URL = "http://localhost:3000/monsters"

function main() {
  fetchMonstr()
  attachListeners()
}

// BEGIN INITIAL PAGE LOAD SECTION

function fetchMonstr(limit = "50", page = "1" ) {
  fetch(MONSTR_URL + `/?_limit=${limit}&_page=${page}`)
  .then(resp => resp.json())
  .then(json => {
    displayMonstrs(json)
  })
}

function displayMonstrs(json) {
  json.forEach((monstr) => {
    displayMonstr(monstr)
  })
}

function displayMonstr(monstr) {
  let div = document.getElementById('monster-container')
  let div2 = document.createElement('div')
  div.appendChild(div2)

  let h2 = document.createElement('h2')
  let h4 = document.createElement('h4')
  let p = document.createElement('p')

  div2.appendChild(h2)
  div2.appendChild(h4)
  div2.appendChild(p)

  h2.textContent = monstr.name
  h4.textContent = monstr.age
  p.textContent = monstr.description
}

// END INITIAL PAGE LOAD SECTION

// BEGIN EVENT LISTENERS SECTION

function attachListeners() {
  let form = document.getElementById('monster-form')
  let parentElem = document.getElementById('monster-container')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let name = ev.target.elements["name"].value
    let age = ev.target.elements["age"].value
    let description = ev.target.elements["description"].value
    fetchNew(name, age, description, parentElem)
  })


  let forward = document.getElementById('forward')
  forward.setAttribute("page-number", "1")
  let back = document.getElementById('back')
  back.setAttribute("page-number", "1")

  forward.addEventListener('click', () => {
    handleNext(forward, back, parentElem)
  })

  back.addEventListener('click', () => {
    handleBack(forward, back, parentElem)
  })
}

function fetchNew(name, age, description, parentElem) {
  let payload = {name: name, age: age, description: description}
  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  }

  fetch(MONSTR_URL, config)
  .then(resp => resp.json())
  .then(json => {
    parentElem.innerHTML = ""
    displayMonstr(json)
    fetchMonstr({limit: "49"})
  })
}

function handleNext(forward, back, parentElem) {
  forward.attributes[1].value = String((parseInt(forward.attributes[1].value, 10)+1))
  back.attributes[1].value =  String((parseInt(back.attributes[1].value, 10)+1))
  parentElem.innerHTML = ""
  fetchMonstr("50", forward.attributes[1].value)
}

function handleBack(forward, back, parentElem) {
  if (parseInt(forward.attributes[1].value, 10) >= 2) {
    forward.attributes[1].value = String((parseInt(forward.attributes[1].value, 10)-1))
  }

  if (parseInt(back.attributes[1].value, 10) >= 2) {
    back.attributes[1].value =  String((parseInt(back.attributes[1].value, 10)-1))
    parentElem.innerHTML= ""
    fetchMonstr("50", forward.attributes[1].value)

  } else {
    parentElem.innerHTML = ""
    fetchMonstr("50", forward.attributes[1].value)

  }

}

document.addEventListener('DOMContentLoaded', () => {
  main()
})
