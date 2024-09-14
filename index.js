#! /usr/bin/env node
// ADVENTURE GAME
import inquirer from "inquirer";
class Player {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    lossHealth(amount) {
        this.health = Math.max(this.health - amount, 0);
    }
    getHealth() {
        return this.health;
    }
}
// Enemy player class
class Enemy {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    lossHealth(amount) {
        this.health = Math.max(this.health - amount, 0);
    }
    getHealth() {
        return this.health;
    }
}
async function main() {
    const { playerName } = await inquirer.prompt([
        {
            name: "playerName",
            message: "Please enter your player name",
            type: "input",
        },
    ]);
    const { enemyType } = await inquirer.prompt([
        {
            name: "enemyType",
            message: "Please select the enemy for fighting",
            type: "list",
            choices: ["Alien", "Robots", "Zombies", "Witches"],
        },
    ]);
    const player = new Player(playerName);
    const enemy = new Enemy(enemyType);
    console.log(`${player.name} V/S ${enemy.name}`);
    while (true) {
        const { action } = await inquirer.prompt([
            {
                name: "action",
                message: "Select the move that you want to attack with",
                type: "list",
                choices: ["punch", "kick", "target range", "run"],
            },
        ]);
        switch (action) {
            case "punch":
            case "kick":
            case "target range":
                const playerAttack = Math.random();
                const enemyAttack = Math.random();
                if (playerAttack > 0.5) {
                    enemy.lossHealth(20);
                    console.log(`${player.name} attacks ${enemy.name}!`);
                }
                else {
                    console.log(`${player.name} misses the attack!`);
                }
                if (enemyAttack > 0.5) {
                    player.lossHealth(20);
                    console.log(`${enemy.name} attacks ${player.name}!`);
                }
                else {
                    console.log(`${enemy.name} misses the attack!`);
                }
                console.log(`${player.name} health: ${player.getHealth()}`);
                console.log(`${enemy.name} health: ${enemy.getHealth()}`);
                if (player.getHealth() <= 0) {
                    console.log("You lost! Try again.");
                    return;
                }
                if (enemy.getHealth() <= 0) {
                    console.log("You won!");
                    return;
                }
                break;
            case "run":
                console.log(`${player.name} runs away from the battle.`);
                return;
            default:
                console.log("Invalid action. Try again.");
                break;
        }
    }
}
main();
