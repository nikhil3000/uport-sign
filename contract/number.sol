pragma solidity >=0.4.22 <0.6.0;

contract test {
    uint num;
    
    constructor() public
    {
        num = 0;
    }
    
    function getNum () public view returns(uint)
    {
        return num;
    }
    
    function setNum(uint _num) public {
        num = _num;
    }
}