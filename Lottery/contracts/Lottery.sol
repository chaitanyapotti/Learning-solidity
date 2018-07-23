pragma solidity ^0.4.24;


contract Lottery {
    address public manager;
    address[] public players;

    modifier restricted() {
        require(msg.sender == manager, "Not enough rights");
        _;
    }

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
}