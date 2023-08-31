let players;

const listDiv = document.querySelector('div');

async function getPuppyList(){
    const list = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307/players');
    const json = await list.json();
    const players = json.data;
    console.log(players)
};

function renderPuppyList(){
    console.log(window.location.hash)
    const allPuppies = state.puppyList.map((puppy) =>{
        return `<div> <a href=#${puppy.name}> ${puppy.name} <a> </div>`
    })
    listDiv.innerHTML = allPuppies.join('')
};


console.log(state);

async function render(){
    await getPuppyList();
    renderPuppyList();
}

render();
