document.addEventListener("DOMContentLoaded", () => {
  addForm();

  addListeners();
  getCall();
});

let pageNum = 1;

const url = `http://localhost:3000/monsters`;

const postURL = "http://localhost:3000/monsters";

function addForm() {
  let container = document.getElementById("create-monster");
  let monsterForm = document.createElement("form");
  monsterForm.setAttribute("id", "monster-form");

  let nameInput = document.createElement("input");
  nameInput.setAttribute("id", "monster-name-input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeHolder", "name...");

  let ageInput = document.createElement("input");
  ageInput.setAttribute("id", "monster-age-input");
  ageInput.setAttribute("type", "number");
  ageInput.setAttribute("placeHolder", "age...");

  let descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("id", "monster-description-input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("placeHolder", "description...");

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Create");
  submit.setAttribute("id", "submit-btn");

  monsterForm.appendChild(nameInput);
  monsterForm.appendChild(ageInput);
  monsterForm.appendChild(descriptionInput);
  monsterForm.appendChild(submit);

  container.appendChild(monsterForm);
}

function addListeners() {
  let forward = document.getElementById("forward");
  let back = document.getElementById("back");
  let form = document.getElementById("monster-form");
  forward.addEventListener("click", pageUp);
  back.addEventListener("click", pageDown);
  form.addEventListener("submit", e => {
    e.preventDefault();
    postCall(form);
  });
}

function getCall(pageNum = 1) {
  fetch(url + `?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then(monsters => display50Monsters(monsters))
    .catch(err => console.log(err));
}

function display50Monsters(monsters) {
  let container = document.getElementById("monster-container");
  container.innerHTML = "";
  let maxToDisplay = monsters.length === 50 ? 50 : monsters.length;
  for (let i = 0; i < maxToDisplay; i++) {
    displayMonster(monsters[i]);
  }
}

function displayMonster(monster) {
  let div = document.createElement("div");

  let h2 = document.createElement("h2");
  h2.innerText = "Name:" + monster.name;

  let pId = document.createElement("p");
  pId.innerText = "id:" + monster.id;

  let h4 = document.createElement("h4");
  h4.innerText = "Age: " + monster.age;

  let pDesc = document.createElement("p");
  pDesc.innerText = "Bio: " + monster.description;

  let container = document.getElementById("monster-container");

  div.appendChild(h2);
  div.appendChild(h4);
  div.appendChild(pId);
  div.appendChild(pDesc);

  container.appendChild(div);
}

function postCall(createMonster) {
  let name = createMonster[0].value;
  let age = createMonster[1].value;
  let desctiption = createMonster[2].value;
  fetch(postURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ name: name, age: age, desctiption: desctiption })
  })
    .then(res => res.json())
    .then(getCall())
    .catch(err => console.log(err));
}

function pageUp() {
  pageNum++;
  getCall(pageNum);
}

function pageDown() {
  pageNum > 1 ? pageNum-- : alert("Page too low");
  getCall(pageNum);
}
