const playerList = document.querySelector("ul");
//^^ This is where the player list will be displayed ^^
const detailDiv = document.querySelector("div");
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

const render = ()=> {
  const hash = window.location.hash.slice(1)*1;
  //^^ This is where I grab the hash from the link and then turn it to a number ^^
  const html = players.map(puppy => {
    return `
    <li>
    <a href='#${puppy.id}'>
      ${puppy.name}
      </a>
    </li>
    `;
  }).join('');
  //^^ This is where I mapped through players[] and made them into list items and then links ^^
  playerList.innerHTML = html
  //^^ This puts the puppy names onto the html page ^^

  const puppy = players.find(puppy=> {
    return puppy.id === hash;
  });
  //^^ If puppy id matches the hash then proceed with function ^^

  let detailDivHTML = 'The NPFL 2023-24 Season'
  if(puppy) {
  detailDivHTML = `
  <img src='${puppy.imageUrl}' style='height: 50vh'/>
  </br>
  ${puppy.name}
  </br>
  ${puppy.breed}
  </br>
  ${puppy.status}
  `;
  }
  detailDiv.innerHTML = detailDivHTML
  //^^ Grabbing the puppy stats and putting them on the HTML page ^^
}

window.addEventListener('hashchange', ()=> {
  render()
});

getList();
