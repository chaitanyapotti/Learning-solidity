new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  watch: {
    playerHealth: {
      handler: function(newVal, oldVal) {
        this.turns.unshift({
          isPlayer: oldVal - newVal <= 0,
          text: oldVal - newVal > 0 ? "Monster hits player for " + (oldVal - newVal) : "Player heals for " + (newVal - oldVal)
        });
      }
    },
    monsterHealth: function(newVal, oldVal) {
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster for " + (oldVal - newVal)
      });
    }
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    calculateDamage(max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    attack() {
      this.monsterHealth -= this.calculateDamage(10, 3);

      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    monsterAttacks() {
      this.playerHealth -= this.calculateDamage(12, 5);
      this.checkWin();
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    specialAttack() {
      this.monsterHealth -= this.calculateDamage(20, 10);

      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal() {
      if (this.playerHealth <= 90) this.playerHealth += 10;
      else this.playerHealth = 100;
      this.monsterAttacks();
    },
    giveUp() {
      this.gameIsRunning = false;
    }
  }
});
