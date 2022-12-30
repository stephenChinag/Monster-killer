const ATTACK_VALUE = 10;
const MONSTER_ATTACK_DAMAGE = 14;
let chosenStephenLife = 100;
let currenMonsterHealth = chosenStephenLife;
let currentPlayerHealth = chosenStephenLife;

adjustHealthBars(chosenStephenLife);

function attackHandler() {
	const damage = dealMonsterDamage(ATTACK_VALUE);
	currenMonsterHealth -= damage;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_DAMAGE);
	currentPlayerHealth -= playerDamage;
	if (currenMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert("You WON!!!");
	} else if (currentPlayerHealth <= 0 && currenMonsterHealth > 0) {
		alert("You LOST");
	} else if (currenMonsterHealth <= 0 && currentPlayerHealth <= 0) {
		alert("its A DRAW");
	}
}

attackBtn.addEventListener("click", attackHandler);
