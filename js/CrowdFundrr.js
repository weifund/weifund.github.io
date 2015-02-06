/*
var CrowdFunding = web3.eth.contractFromAbi([{"constant":true,"inputs":[],"name":"numCampaigns","outputs":[{"name":"numCampaigns","type":"uint256"}]},{"constant":false,"inputs":[{"name":"uAddr","type":"address"},{"name":"uCID","type":"uint256"}],"name":"getUserCampaign","outputs":[{"name":"uCampaignID","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"getCampaign","outputs":[{"name":"r_name","type":"string32"},{"name":"r_website","type":"string32"},{"name":"r_benificiary","type":"address"},{"name":"r_fundingGoal","type":"uint256"},{"name":"r_numFunders","type":"uint256"},{"name":"r_amount","type":"uint256"},{"name":"r_timelimit","type":"uint256"},{"name":"r_owner","type":"address"},{"name":"r_ownerNumCampaigns","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"checkGoalReached","outputs":[{"name":"reached","type":"bool"}]},{"constant":false,"inputs":[{"name":"uAddr","type":"address"}],"name":"getUser","outputs":[{"name":"uNumCampaigns","type":"uint256"}]},{"constant":false,"inputs":[{"name":"name","type":"string32"},{"name":"website","type":"string32"},{"name":"beneficiary","type":"address"},{"name":"goal","type":"uint256"},{"name":"timelimit","type":"uint256"}],"name":"newCampaign","outputs":[{"name":"campaignID","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"contribute","outputs":[]},{"constant":true,"inputs":[],"name":"campaigns","outputs":[{"name":"campaigns","type":"mapping(uint256=>structCampaign)"}]},{"constant":false,"inputs":[{"name":"uAddr","type":"address"}],"name":"getUserLatest","outputs":[{"name":"uCampaignID","type":"uint256"}]},{"constant":false,"inputs":[],"name":"getNumCampaigns","outputs":[{"name":"r_numCampaigns","type":"uint256"}]},{"constant":true,"inputs":[],"name":"users","outputs":[{"name":"users","type":"mapping(address=>structUser)"}]}]);
contract CrowdFunding{function numCampaigns()constant returns(uint256 numCampaigns){}function getUserCampaign(address uAddr,uint256 uCID)returns(uint256 uCampaignID){}function getCampaign(uint256 campaignID)returns(string32 r_name,string32 r_website,address r_benificiary,uint256 r_fundingGoal,uint256 r_numFunders,uint256 r_amount,uint256 r_timelimit,address r_owner,uint256 r_ownerNumCampaigns){}function checkGoalReached(uint256 campaignID)returns(bool reached){}function getUser(address uAddr)returns(uint256 uNumCampaigns){}function newCampaign(string32 name,string32 website,address beneficiary,uint256 goal,uint256 timelimit)returns(uint256 campaignID){}function contribute(uint256 campaignID){}function campaigns()constant returns(mapping(uint256 => struct Campaign) campaigns){}function getUserLatest(address uAddr)returns(uint256 uCampaignID){}function getNumCampaigns()returns(uint256 r_numCampaigns){}function users()constant returns(mapping(address => struct User) users){}}
2c0f7b6f… :numCampaigns
4a616c3d… :getUserCampaign
5598f8cc… :getCampaign
5b2329d4… :checkGoalReached
6f77926b… :getUser
99329342… :newCampaign
c1cbbca7… :contribute
cb5697f9… :campaigns
d6ce497d… :getUserLatest
d9a9bb3e… :getNumCampaigns
f2020275… :users


// New Campaign Transaction
// newCampaign(string32 name, string32 website, address beneficiary, uint goal, uint timelimit)
// contract.transact().newCampaign("My Great Campaign"
// , "mygreatcampaign.com", "0x6465940d1a1a7901f89476ff87a945e0fb1d07db", 50000, 4232408243);

// Contribute to Campaign
// contribute(uint campaignID)
// contract.transact({value: 34598}).contribute(234243);

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
var contractAbi = [{"constant":true,"inputs":[],"name":"numCampaigns","outputs":[{"name":"numCampaigns","type":"uint256"}]},{"constant":false,"inputs":[{"name":"uAddr","type":"address"},{"name":"uCID","type":"uint256"}],"name":"getUserCampaign","outputs":[{"name":"uCampaignID","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"getCampaign","outputs":[{"name":"r_name","type":"string32"},{"name":"r_website","type":"string32"},{"name":"r_benificiary","type":"address"},{"name":"r_fundingGoal","type":"uint256"},{"name":"r_numFunders","type":"uint256"},{"name":"r_amount","type":"uint256"},{"name":"r_timelimit","type":"uint256"},{"name":"r_owner","type":"address"},{"name":"r_ownerNumCampaigns","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"checkGoalReached","outputs":[{"name":"reached","type":"bool"}]},{"constant":false,"inputs":[{"name":"uAddr","type":"address"}],"name":"getUser","outputs":[{"name":"uNumCampaigns","type":"uint256"}]},{"constant":false,"inputs":[{"name":"name","type":"string32"},{"name":"website","type":"string32"},{"name":"beneficiary","type":"address"},{"name":"goal","type":"uint256"},{"name":"timelimit","type":"uint256"}],"name":"newCampaign","outputs":[{"name":"campaignID","type":"uint256"}]},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"contribute","outputs":[]},{"constant":true,"inputs":[],"name":"campaigns","outputs":[{"name":"campaigns","type":"mapping(uint256=>structCampaign)"}]},{"constant":false,"inputs":[{"name":"uAddr","type":"address"}],"name":"getUserLatest","outputs":[{"name":"uCampaignID","type":"uint256"}]},{"constant":false,"inputs":[],"name":"getNumCampaigns","outputs":[{"name":"r_numCampaigns","type":"uint256"}]},{"constant":true,"inputs":[],"name":"users","outputs":[{"name":"users","type":"mapping(address=>structUser)"}]}];
var contractAddr = "0xf2a1a687a703ec8d662e46e7cf9d057478851450";
var contract = eth.contract(contractAddr, contractAbi);

// New Campaign Transaction
// newCampaign(string32 name, string32 website, address beneficiary, uint goal, uint timelimit)
// contract.transact().newCampaign("My Great Campaign"
// , "mygreatcampaign.com", "0x6465940d1a1a7901f89476ff87a945e0fb1d07db", 50000, 4232408243);

function new_campaign()
{
  var c_name = $('#name').val();
  var c_website = $('#website').val();
  var c_beneficiary = $('#address').val();
  var c_goal = $('#goal').val();
  var c_timelimit = 124237892; //$('#timelimit').val();
  
  var accounts = web3.eth.accounts;
  
  if(String(c_beneficiary) == "")
  {
        c_beneficiary = accounts[0];
  }
  
  if(String(c_name) == "" || c_goal <= 0 || c_timelimit <= 0)
  {
  	return false;
  }
  
  var new_camp = contract.transact({from: accounts[0]}).newCampaign(c_name, c_website, c_beneficiary, c_goal, c_timelimit); //parseInt(c_timelimit)
  var get_camp_id = contract.call().getUserLatest(accounts[0]);
  var get_camp = contract.call().getCampaign(get_camp_id);
  var new_camp_url = "http:/crowdfundrr.github.io/?id=" + String(get_camp_id);
  
  $("#new_campaign_wrapper").hide();
  
  //.attr("href", "http://www.google.com/")
  
  $("#new_campaign_id").html(String(get_camp_id));
  $("#new_campaign_name").html(String(get_camp[0]));
  $("#new_campaign_name").attr("href", new_camp_url);
  $("#new_campaign_url").html(new_camp_url);
  $("#new_campaign_hash").val(String('<meta name="hash_verifier" content="' + String(accounts[0]) + '">'));
  $("#new_campaign_goto").attr("href", new_camp_url);
  
  $("#campaign_success_wrapper").show();
  $("#campaign_success_wrapper").css('display', 'block');
}

function get_campaign(id)
{
  var c_id = $('#campaign_id').val();
  if(id != undefined)
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
  $('#campaign_id').val(String(c_id));
  
}

function donate_campaign()
{
	// $('#campaign_id').val(); $('#donate_amount').val(); function donate_campaign(){};
	var camp_id = $('#campaign_id').val();
	var donate_amount = $('#donate_amount').val();
	
	if(parseInt(donate_amount) > 0)
	{
		contract.transact({value: parseInt(donate_amount)}).contribute(parseInt(camp_id));
		get_campaign(camp_id);
	}
}

function check_for_id()
{
	var qs = (function(a) {
	    if (a == "") return {};
	    var b = {};
	    for (var i = 0; i < a.length; ++i)
	    {
	        var p=a[i].split('=', 2);
	        if (p.length == 1)
	            b[p[0]] = "";
	        else
	            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
	    }
	    return b;
	})(window.location.search.substr(1).split('&'));
	
	var get_url_id = qs["id"]; //getUrlParameter('id');
	
	if(parseInt(get_url_id) >= 0)
	{
		get_campaign(get_url_id);
	}
}
