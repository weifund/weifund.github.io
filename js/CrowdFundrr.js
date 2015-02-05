/*
var CrowdFunding = web3.eth.contractFromAbi([{"constant":true,"inputs":[],"name":"numCampaigns","outputs":[{"name":"numCampaigns","type":"uint256"}]},{"constant":false,"inputs":[],"name":"get_numCampaigns","outputs":[{"name":"r_numCampaigns","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"getCampaign","outputs":[{"name":"r_name","type":"string32"},{"name":"r_website","type":"string32"},{"name":"r_benificiary","type":"address"},{"name":"r_fundingGoal","type":"uint256"},{"name":"r_numFunders","type":"uint256"},{"name":"r_amount","type":"uint256"},{"name":"r_timelimit","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"checkGoalReached","outputs":[{"name":"reached","type":"bool"}]},{"constant":false,"inputs":[{"name":"name","type":"string32"},{"name":"website","type":"string32"},{"name":"beneficiary","type":"address"},{"name":"goal","type":"uint256"},{"name":"timelimit","type":"uint256"}],"name":"newCampaign","outputs":[{"name":"campaignID","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"contribute","outputs":[]},{"constant":true,"inputs":[],"name":"campaigns","outputs":[{"name":"campaigns","type":"mapping(uint256=>structCampaign)"}]}]);
contract CrowdFunding{function numCampaigns()constant returns(uint256 numCampaigns){}function get_numCampaigns()returns(uint256 r_numCampaigns){}function getCampaign(uint256 campaignID)returns(string32 r_name,string32 r_website,address r_benificiary,uint256 r_fundingGoal,uint256 r_numFunders,uint256 r_amount,uint256 r_timelimit){}function checkGoalReached(uint256 campaignID)returns(bool reached){}function newCampaign(string32 name,string32 website,address beneficiary,uint256 goal,uint256 timelimit)returns(uint256 campaignID){}function contribute(uint256 campaignID){}function campaigns()constant returns(mapping(uint256 => struct Campaign) campaigns){}}
2c0f7b6f… :numCampaigns
4fb2a9e1… :get_numCampaigns
5598f8cc… :getCampaign
5b2329d4… :checkGoalReached
99329342… :newCampaign
c1cbbca7… :contribute
cb5697f9… :campaigns

// New Campaign Transaction
// newCampaign(string32 name, string32 website, address beneficiary, uint goal, uint timelimit)
// contract.transact().newCampaign("My Great Campaign"
// , "mygreatcampaign.com", "0x6465940d1a1a7901f89476ff87a945e0fb1d07db", 50000, 4232408243);

// Contribute to Campaign
// contribute(uint campaignID)
// contract.transact({value: 34598}).newCampaign();

// Check Goal Reached
// checkGoalReached(uint campaignID) returns (bool reached) 
// contract.transact().checkGoalReached(campaignID);

// Get Number of Campaigns
// get_numCampaigns() returns (uint r_numCampaigns)
// var get_numCampaigns = contract.call().get_numCampaigns();

// Get Campaign Function (uint ID)
var getCampaign = contract.call().getCampaign(34827423);

var number = web3.eth.number;
var info = web3.eth.block(number);

// contract.transact({from: addr2, value: 100000}).join(addr1);


*/



var eth = web3.eth;
var contractAbi = [{"constant":true,"inputs":[],"name":"numCampaigns","outputs":[{"name":"numCampaigns","type":"uint256"}]},{"constant":false,"inputs":[],"name":"get_numCampaigns","outputs":[{"name":"r_numCampaigns","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"getCampaign","outputs":[{"name":"r_name","type":"string32"},{"name":"r_website","type":"string32"},{"name":"r_benificiary","type":"address"},{"name":"r_fundingGoal","type":"uint256"},{"name":"r_numFunders","type":"uint256"},{"name":"r_amount","type":"uint256"},{"name":"r_timelimit","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"checkGoalReached","outputs":[{"name":"reached","type":"bool"}]},{"constant":false,"inputs":[{"name":"name","type":"string32"},{"name":"website","type":"string32"},{"name":"beneficiary","type":"address"},{"name":"goal","type":"uint256"},{"name":"timelimit","type":"uint256"}],"name":"newCampaign","outputs":[{"name":"campaignID","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"contribute","outputs":[]},{"constant":true,"inputs":[],"name":"campaigns","outputs":[{"name":"campaigns","type":"mapping(uint256=>structCampaign)"}]}];
var contractAddr = "0x34339abcdb5b448bd1a99f40e32b83ea2e9068e6";
var contract = eth.contract(contractAddr, contractAbi);
// New Campaign Transaction
// newCampaign(string32 name, string32 website, address beneficiary, uint goal, uint timelimit)
// contract.transact().newCampaign("My Great Campaign"
// , "mygreatcampaign.com", "0x6465940d1a1a7901f89476ff87a945e0fb1d07db", 50000, 4232408243);

function new_campaign()
{
  var c_name = $('#name').val();
  var c_website = $('#website').val();
  var c_beneficiary = $('#beneficiary').val();
  var c_goal = $('#goal').val();
  var c_timelimit = $('#timelimit').val();
  var new_camp = contract.transact().newCampaign(c_name, c_website, "0x99704a2eb200abcc81b44e685f113bb83eaec43a", 50000, 5897359834);
  alert(new_camp);
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function get_campaign(id)
{
  var c_id = $('#campaign_id').val();
  if(id != undefined && parseInt(id) >= 0)
  {
  	c_id = id;
  }
  var get_camp = contract.call().getCampaign(c_id);
  
  // getCampaign(uint campaignID) returns (string32 r_name
  //  , string32 r_website, address r_benificiary, uint r_fundingGoal
  //  , uint r_numFunders, uint r_amount, uint r_timelimit)
  
  $("#c_name").html(get_camp[0]);
  $("#c_website").html(get_camp[1]);
  $("#c_goal").html('$' + String(get_camp[3]));
  $("#c_backers").html(String(get_camp[4]));
  $("#c_amount").html('$' + String(get_camp[5]));
  $("#c_days").html('5'); //get_camp[6]
}

function check_for_id()
{
	var get_url_id = getUrlParameter('id');
	
	if(parseInt(get_url_id) >= 0)
	{
		get_campaign(get_url_id);
	}
}
