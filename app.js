const playerList = document.querySelector("nav");
//^^ This is where the player list will be displayed ^^
const detailDiv = document.querySelector(".card");
//^^ This is where I want to display the puppy's stats ^^

let players;

const getList = async () => {
  const list = await fetch(
    "https://fsa-puppy-bowl.herokuapp.com/api/2307/players"
  );
  const json = await list.json();
  players = json.data.players;
  //^^ I have got my players and their data ^^
  render();
};

const render = () => {
  const hash = window.location.hash.slice(1) * 1;
  //^^ This is where I grab the hash from the link and then turn it to a number ^^
  const html = players
    .map((puppy) => {
      return `
    <li>
    <a href='#${puppy.id}'> <button class='btn'>
      ${puppy.name}
      </button> </a>
    </li>
    `;
    })
    .join("");
  //^^ This is where I mapped through players[] and made them into list items and then links ^^
  playerList.innerHTML = html;
  //^^ This puts the puppy names onto the html page ^^

  const puppy = players.find((puppy) => {
    return puppy.id === hash;
  });
  //^^ If puppy id matches the hash then proceed with function ^^

  let detailDivHTML = "Select A Player To See Their Info";
  if (puppy) {
    detailDivHTML = `
  <img class='playerPic' src='${puppy.imageUrl}'/>
  <h2>${puppy.name}</h2>
  <p>${puppy.breed}</p>
  <p>${puppy.status}</p>
  `;
  }
  detailDiv.innerHTML = detailDivHTML;
  //^^ Grabbing the puppy stats and putting them on the HTML page ^^
};

window.addEventListener("hashchange", () => {
  render();
});

getList();
