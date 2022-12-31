const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_DAMAGE = 15;
const HEAL__VALUE = 10;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enterdValue = prompt("Enter Maximum life for you and a monster", "100");
let chosenMaxLife = parseInt(enterdValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
	chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
	let logEntry = {
		event: ev,
		value: val,
		finalMonsterHealth: monsterHealth,
		finalPlayerHealth: playerHealth,
	};
	if (ev === LOG_EVENT_PLAYER_ATTACK) {
		logEntry.target = "MONSTER";
	} else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
		logEntry = {
			event: ev,
			value: val,
			target: "MONSTER",
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (ev === LOG_EVENT_MONSTER_ATTACK) {
		logEntry = {
			event: ev,
			value: val,
			target: "PLAYER",
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (ev === LOG_EVENT_PLAYER_HEAL) {
		logEntry = {
			event: ev,
			value: val,
			target: "PLAYER",
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (ev === LOG_EVENT_GAME_OVER) {
		logEntry = {
			event: ev,
			value: val,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	}
	battleLog.push(logEntry);
}

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}

function endRound() {
	const initialPlayerHealth = currentPlayerHealth;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_DAMAGE);
	currentPlayerHealth -= playerDamage;
	writeToLog(
		LOG_EVENT_MONSTER_ATTACK,
		playerDamage,
		currentMonsterHealth,
		currentPlayerHealth,
	);
	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		alert("you have been given a second chance ");
		setPlayerHealth(initialPlayerHealth);
	}
	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert("You WON!!!");
		writeToLog(
			LOG_EVENT_MONSTER_ATTACK,
			"PLAYER wON",
			currentMonsterHealth,
			currentPlayerHealth,
		);
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert("You LOST");
		writeToLog(
			LOG_EVENT_MONSTER_ATTACK,
			"MONSTER WON",
			currentMonsterHealth,
			currentPlayerHealth,
		);
	} else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
		alert("its A DRAW");
		writeToLog(
			LOG_EVENT_MONSTER_ATTACK,
			"A DRAW",
			currentMonsterHealth,
			currentPlayerHealth,
		);
	}
	if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
		reset();
	}
}

function attackMonster(mode) {
	let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
	let logevents =
		mode === MODE_ATTACK
			? LOG_EVENT_PLAYER_ATTACK
			: LOG_EVENT_PLAYER_STRONG_ATTACK;
	/*	if (mode === MODE_ATTACK) {
		maxDamage = ATTACK_VALUE;
		logevents = LOG_EVENT_PLAYER_ATTACK;
	} else if (mode === MODE_STRONG_ATTACK);
	{
		maxDamage = STRONG_ATTACK_VALUE;
		logevents = LOG_EVENT_PLAYER_STRONG_ATTACK;
	}*/
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	writeToLog(logevents, damage, currentMonsterHealth, currentPlayerHealth);
	endRound();
}

function attackHandler() {
	attackMonster(MODE_ATTACK);
}
function stronAttackHandler() {
	attackHandler(MODE_STRONG_ATTACK);
}

function healEventHandler() {
	let healValue;
	if (currentPlayerHealth >= chosenMaxLife - HEAL__VALUE) {
		alert("you can't heal more than max initial health");
		healValue = chosenMaxLife - currentPlayerHealth;
	} else {
		healValue = HEAL__VALUE;
	}
	increasePlayerHealth(healValue);
	currentPlayerHealth += healValue;
	writeToLog(
		LOG_EVENT_PLAYER_HEAL,
		`player healed by ${healValue}`,
		currentMonsterHealth,
		currentPlayerHealth,
	);
	endRound();
}
function printLogHandler() {
	//for (let i = 0; i <= battleLog.length; i++) {
	//console.log(battleLog[i]);
	//}
	let i = 0;
	for (const logEntry of battleLog) {
		console.log(`# ${i}`);
		for (const key in logEntry) {
			console.log(`${key} => ${logEntry[key]}`);
		}
		i++;
	}

	console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", stronAttackHandler);
healBtn.addEventListener("click", healEventHandler);
logBtn.addEventListener("click", printLogHandler);
