pragma solidity ^0.4.25;


contract CampaignFactory {
    
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimumContribution) public {
        address newCampaign = new Campaign(minimumContribution, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}


contract Campaign {
    struct Request {
        bool complete;
        uint value;
        uint approvalCount;
        address recipient;
        string description;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager, "Not enough rights");
        _;
    }
    
    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "Sent less than minimum");
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(uint value, address recipient, string description) 
        public restricted {
            Request memory newRequest = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            });
            
            requests.push(newRequest);
        }
    
    function approveRequest(uint requestId) public {
        Request storage request = requests[requestId];
        require(approvers[msg.sender], "Not a contributor");
        require(!request.approvals[msg.sender], "Already voted");
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint requestId) public restricted {
        Request storage request = requests[requestId];
        require(!request.complete, "Already Completed");
        require(request.approvalCount > approversCount/2, "Min Quorum Not Reached");
        request.complete = true;
        request.recipient.transfer(request.value);
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}