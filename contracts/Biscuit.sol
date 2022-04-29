// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Biscuit {
    mapping(address => Game[]) public games;
    mapping(address => bool) public isActive;
    mapping(address => uint256) public withdrawAmount;
    uint256 public participationFee = 0.00001 ether; // 0.001 Ethers
    address public owner;

    event GameEnd(address player, uint256 code1, uint256 code2, bool winOrLose);

    struct Game {
        uint256 code1;
        uint256 code2;
        bool isWinner;
    }

    constructor() {
        owner = msg.sender;
    }

    function participate() public payable {
        //require(!isActive[msg.sender], "Already Participated.");
        require(
            msg.value == participationFee,
            "Insufficient fund to participate"
        );

        games[msg.sender].push(Game(this.random(), 0, false));
        isActive[msg.sender] = true;
    }

    function secondCode() public {
        uint256 gameCount = getLength() - 1;
        games[msg.sender][gameCount].code2 = this.random();
    }

    function choose() public returns (uint256) {
        //require(isActive[msg.sender], "Not Participated Yet.");
        uint256 gameCount = getLength() - 1;
        //games[msg.sender][gameCount].code2 = this.random();
        if (
            (games[msg.sender][gameCount].code2 % 52) ==
            (games[msg.sender][gameCount].code1 % 52)
        ) {
            withdrawAmount[msg.sender] += participationFee * 2;
            games[msg.sender][gameCount].isWinner = true;
            emit GameEnd(
                msg.sender,
                games[msg.sender][gameCount].code1,
                games[msg.sender][gameCount].code2,
                true
            );
        } else {
            withdrawAmount[owner] += participationFee;
            games[msg.sender][gameCount].isWinner = false;
            emit GameEnd(
                msg.sender,
                games[msg.sender][gameCount].code1,
                games[msg.sender][gameCount].code2,
                false
            );
        }
        isActive[msg.sender] = false;
        return games[msg.sender][gameCount].code2;
    }

    function withdraw() public returns (bool) {
        uint256 amount = withdrawAmount[msg.sender];
        if (amount > 0) {
            withdrawAmount[msg.sender] = 0;
            if (!payable(msg.sender).send(amount)) {
                withdrawAmount[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function getFirstCode() public view returns (uint256) {
        uint256 gameCount = getLength() - 1;
        return games[msg.sender][gameCount].code1;
    }

    function getSecondCode() public view returns (uint256) {
        uint256 gameCount = getLength() - 1;
        return games[msg.sender][gameCount].code2;
    }

    function getLength() public view returns (uint256) {
        return games[msg.sender].length;
    }

    function getPlayerHistory(address _user, uint256 _gameId)
        public
        view
        returns (Game memory)
    {
        return games[_user][_gameId];
    }

    function random() external view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.gaslimit,
                        block.difficulty
                    )
                )
            ) % 13261;
    }
}
