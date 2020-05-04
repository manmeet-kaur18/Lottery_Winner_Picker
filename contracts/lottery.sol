pragma solidity >=0.4.21 <0.7.0;

contract Lottery{
    address public manager;
    address payable[] players;
    constructor() public{
        manager = msg.sender;
    }
    function enter() public payable{
        require(msg.value> .01 ether);
        players.push(msg.sender);
    }
    function random() private view returns(uint){
        return uint(keccak256(abi.encode(block.difficulty,now,players)));
    }
    function pickWinner() public restricted{
        // require(msg.sender == manager );
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }
    modifier restricted(){
        require(msg.sender == manager);//function modifier
        _;
    }
    function getPlayers() public view returns (address payable[] memory){
        return players;
    }
}