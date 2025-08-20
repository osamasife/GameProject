let xp = 0;
let health = 1000;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [' stick '];



const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');
const divButtons = document.querySelector('#buttons')
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterNameText');
const monsterHealthText = document.querySelector('#monsterHealthText');

const weapons = [{

  name: ' stick ',
  power: 100
  ,cost : 10
}, {
  name: ' dagger ', power: 30 , cost: 40
}, {
  name: ' claw hammer ', power: 50  ,cost : 100
}, { name: ' sword ', power: 100  , cost: 150}
]

const monsters = [{
  name: 'slime', level :2 , health : 15
}, {name: 'fanged beast', level :8 , health : 60},{
  name: 'dragon', level :20 , health : 300
} ]

const locations = [{
  name: 'Store',
  buttonText: ['Buy 10 health (10 gold)', 'Buy weapon (30 gold)', 'Go to town square'],
  buttonClick: [buyHealth, buyWeapon, goTown],
  text: 'You enter the store.'
}
  , {
  name: 'Town square',
  buttonText: ['Go to store', 'Go to cave', 'Fight dragon' , 'Inventory check'],
  buttonClick: [goStore, goCave, fightDragon , checkInventory],
  text: 'You are in the town square. You see a sign that says \'Store.\''

}, {
  name: 'cave',
  buttonText: ['Fight slime', 'Fight fanged beast', 'Go to town square'],
  buttonClick: [fightSlime, fightBeast, goTown],
  text: 'You enter the cave. You see some monsters.'

},{
  name: 'fight',
  buttonText: ['Attack', 'Dodge', 'Run'],
  buttonClick: [attack, dodge, goTown],
  text: 'You are fighting a monster!.'
},{
  name: 'kill monster',
  buttonText: ['Go to town square', 'Go to town square!', 'Go to town square!!'],
  buttonClick: [goTown, goTown, esteregg],
  text: 'Omg you slayed that thing good job. now you gain some coins and experience ! '
},
{
  name: 'lose',
  buttonText: ['Try again?', 'Replay?', 'Please play with me i am lonely'],
  buttonClick: [restart, restart, restart],
  text: 'oh no you died like a bi*ch!'
  
},
{
  name: 'win',
  buttonText: ['Try again?', 'Replay?', 'Wanna scissor? :P'],
  buttonClick: [restart, restart, goToLink],
  text: 'I did not think you can make it i guess i was wrong... congrats you won the game!'
},{
  name: 'esteregg',
  buttonText: ['6', '9', 'Do not feel like go back to town square'],
  buttonClick: [pickSix, pickNine, goTown],
  text: 'You found a secret game!. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!'
}]

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = checkInventory;
function update(location) {
  button4.style.display = 'none';
  monsterStats.style.display = 'none';
  button1.innerText = location.buttonText[0];
  button2.innerText = location.buttonText[1];
  button3.innerText = location.buttonText[2];
  button4.innerText = location.buttonText[3]
  text.innerText = location.text;
  button1.onclick = location.buttonClick[0];
  button2.onclick = location.buttonClick[1];
  button3.onclick = location.buttonClick[2];
  button4.onclick = location.buttonClick[3];

}

function checkInventory(){

  inventory.length===1 ? 
  text.innerText = 'You have a'+inventory+'.' :
  text.innerText = 'You have '+inventory+'.';
}

function goStore() {
 

  update(locations[0]);

}
function goTown() {

  update(locations[1]);
  button4.style.display= 'inline';
}

function goCave() {
  update(locations[2])
}


function buyHealth() {
  if (health < 150) {
    if (gold >= 10) {
      gold -= 10;
      health += 10;
      if(health > 150){
        health = 150;
        healthText.innerText = 150;
      }
      healthText.innerText = health;
      goldText.innerText = gold;
    } else {
      text.innerText = 'Get your self some gold cuz you are broke!.'
    }
  } else  {
    
    text.innerText = 'bruh... you have full health go fight something might damage you !!'
  }

}

function buyWeapon() {
  if(currentWeapon < weapons.length -1){
  if(gold >= 30){
    gold -=30;
    currentWeapon++;
    goldText.innerText = gold;
    let newWeapon = weapons[currentWeapon].name;
    
    text.innerText = 'You now have a ' + newWeapon+ ".";
    inventory.push(newWeapon);
    text.innerText += 'In your inventory you have: ' + inventory;
  }else{
    text.innerText='You are broke!'
  }
}else{
  text.innerText= 'You bought every weapon and still can not win ? ahhh well congrats now on you can sell the weapons'
  button2.innerText = 'Sell weapons';
  button2.onclick = sellweapon;
}
}

function sellweapon(){
  if(inventory.length > 1){

    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = 'You sold '+ currentWeapon + '.';
    text.innerText += 'Now in your inventory you have' + inventory;

  }else{
    text.innerText ='Do not sell your only weapon how will you fight ?????tf'
  }
}

function fightSlime() {
    fighting = 0;
    goFight();
    
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterHealthText.innerText = monsterHealth;
    monsterStats.style.display = 'block';
    monsterNameText.innerText = monsters[fighting].name;
    
    
}

function attack(){
    
    if(isHitMonster()){
    text.innerText = 'The '+monsters[fighting].name+' attacks.';
    text.innerText += 'You attack it with '+weapons[currentWeapon].name+ '.';
    health -= monsterAttackValue(monsters[fighting].level);
    monsterHealth -= weapons[currentWeapon].power+ Math.floor(Math.random()* xp) +1 ;
    monsterHealthText.innerText = monsterHealth;
    healthText.innerText = health;
    }else{
      text.innerText = 'You missed you fool! ';
      text.innerText += ' but The '+monsters[fighting].name+' attacks.';
      health -= monsterAttackValue(monsters[fighting].level);
      monsterHealth -= weapons[currentWeapon].power+ Math.floor(Math.random()* xp) +1 ;
      monsterHealthText.innerText = monsterHealth;
      healthText.innerText = health;
    }
    if(health <= 0){
      
      healthText.innerText = 0;
      lose();
    }else if(monsterHealth  <= 0){
      monsters[fighting].name ==='dragon'? win() : defeatMonster();
              
    }
    
    if(inventory.length != 1 && Math.random() <= 0.1){
      text.innerText += ' oh no Your '+inventory.pop()+ 'is broke';
      currentWeapon--;

    }
}

function monsterAttackValue(level){
  let hit = Math.abs(( 5*level) - (Math.floor(Math.random() *xp)));
  return hit; 
}
function isHitMonster(){

  if(xp < 50){
    return  Math.random() > 0.4 || health < 20;
  }else{
    return Math.random() > 0.2 || health < 20;
  }
   
}

function win(){

  /*
  divButtons.insertAdjacentHTML("beforeend",`<button id="button5" onclick="goToLink(this)" value="/javascript-course/12-rock-paper-scissors .html" style="display: inline;">New Game!</button>`); 
  */
 

  update(locations[6]);
}

function dodge(){
  text.innerText = 'You dodge the attack from the '+ monsters[fighting].name+'.';
}

function lose(){
  update(locations[5]);
}

function defeatMonster(){
    
  gold += Math.floor(monsters[fighting].level*6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    fighting;
    monsterHealth;
    inventory = [' stick '];
    healthText.innerText = health;
    goldText.innerText = gold ;
    xpText.innerText = xp;
    goTown();
}

function esteregg(){
  update(locations[7]);

}

function pickSix(){
      secretGame(6);
}
function pickNine(){
      secretGame(9);
}

function secretGame(guess){

   let numbers = [];
   text.innerText = 'You pick '+guess+'.Here are the random numbers"\n'
   
   for(let i =0 ; i < 10 ; i++){
    numbers[i] = Math.floor(Math.random()*10 +1);
    text.innerText += numbers[i] + '\n';
   }

   if(numbers.indexOf(guess) != -1){
    text.innerText += 'You won 20 golds!!';
    gold += 20;
    goldText.innerText = gold; 
   }else{
    text.innerText += 'You lost and will lose 25 Health :(';
    health -=25;
    healthText.innerText = health;
    if(health <= 0 ){
      healthText.innerText = 0;
      lose();
    }
    
   }
}





function goToLink(){
  
 
  
     window.open("/javascript-course/12-rock-paper-scissors .html");
}
