const { Telegraf } = require('telegraf');
const axios = require('axios').default;
const icon = require('node-emoji')

const bot = new Telegraf('5612237937:AAHEEZgo7huSM7j18qlwAm7nuzl-2IoaQz4');

var instance = "";
var denom = "";
var chainid = "";

// Define supported chains
const inlineKeyboardChainsCommands = {
    inline_keyboard: [
        [
	 	{ text: "SEI", callback_data: 'sei' }, 
		{ text: "HAQQ", callback_data: 'haqq' }, 
		{ text: "STRIDE", callback_data: 'stride'}
        ]
    ]
};

async function myCLI(ctx) {
    var msg = `
     ${icon.get('rocket')} <b> Wellcome to CLI command help </b> ${icon.get('rocket')}

${icon.get('collision')} <b>Below is guideline to use the bot</b>
${icon.get('star')} Wallet related CLI commands: /wallet
${icon.get('star')} Validator node related CLI commands: /validator
${icon.get('star')} Fullnode related CLI commands: /fullnode
${icon.get('star')} Delegation related CLI commands: /delegate
${icon.get('star')} Withdraw reward related CLI commands: /withdraw
${icon.get('star')} IBC related CLI commands: /ibc
${icon.get('star')} Check status of you validator: /status <b>VAL_ADDR</b>
${icon.get('star')} Check balances and delegated status: /balance <b>WALLET_ADDR</b>
`;
    bot.telegram.sendMessage(ctx.chat.id, msg, {parse_mode: 'html'});
};




bot.command('start', ctx => {
	instance = "";
  	denom = "";
	chainid = "";
	myCLI(ctx);	
	let msg = 'Kindly select your chain';
	bot.telegram.sendMessage(ctx.chat.id, msg,  { reply_markup:  inlineKeyboardChainsCommands});
});

bot.action('sei', ctx => {
    instance = "seid";
    denom = "usei";
    chainid = "sei";
    bot.telegram.sendMessage(ctx.chat.id, `${icon.get('heart')} Glad to support you ! ${icon.get('heart')}`);
});

bot.action('haqq', ctx => {
    instance = "haqqd";
    denom = "aISLM";
    chainid = "haqq";
    bot.telegram.sendMessage(ctx.chat.id, `${icon.get('heart')} Glad to support you ! ${icon.get('heart')}`);
});

bot.action('stride', ctx => {
    instance = "strided";
    denom = "ustrd";
    chainid = "stride";
    bot.telegram.sendMessage(ctx.chat.id, `${icon.get('heart')} Glad to support you ! ${icon.get('heart')}`);
});


bot.command('wallet', ctx => {
if(instance) {
    bot.telegram.sendMessage(ctx.chat.id,`
${icon.get('eight_pointed_black_star')} <b>Create new wallet</b>
<i>${instance} keys add <b>WALLET_NAME</b></i>

${icon.get('eight_pointed_black_star')} <b>Restore wallet</b>
<i>${instance} keys add <b>WALLET_NAME</b> --recover</i>

${icon.get('eight_pointed_black_star')} <b>Delete wallet</b>
<i>${instance} keys delete <b>WALLET_NAME</b></i>

${icon.get('eight_pointed_black_star')} <b>Export private key</b>
<i>${instance} keys export <b>WALLET_NAME</b> --unarmored-hex --unsafe</i>

${icon.get('eight_pointed_black_star')} <b>Show list of wallet</b>
<i>${instance} keys list</i>

${icon.get('eight_pointed_black_star')} <b>Transfer asset between different wallets</b>
<i>${instance} tx bank send <b>SEND_WALLET_ADDR RECEIVED_WALLET_ADDR</b> <b>AMOUNT</b>${denom}</i>

${icon.get('eight_pointed_black_star')} <b>Query wallet balance</b>
<i>${instance} query bank balances <b>WALLET_ADDR</b></i>

${icon.get('eight_pointed_black_star')} <b>Voting proposal</b>
<i>${instance} tx gov vote <b>PROPOSAL_ID yes/no</b> --from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b></i>
    `, {parse_mode: 'html'});
} else {
   bot.telegram.sendMessage(ctx.chat.id,`${icon.get('warning')} You did not select chain! Kindly select !`,{reply_markup: inlineKeyboardChainsCommands});
  }
});

bot.command('fullnode', ctx => {
if(instance) {	
    bot.telegram.sendMessage(ctx.chat.id,`
${icon.get('eight_pointed_black_star')} <b>Synchronization status</b>
<i>${instance} status 2\>&1 | jq ."SyncInfo"."catching_up"</i>

${icon.get('eight_pointed_black_star')} <b>Show node info</b>
<i>${instance} status 2\>&1 | jq ."NodeInfo"</i>
    `, {parse_mode: 'html'});
 } else {
    bot.telegram.sendMessage(ctx.chat.id,`${icon.get('warning')} You did not select chain! Kindly select !`,{reply_markup: inlineKeyboardChainsCommands});
  }	
});

bot.command('delegate', ctx => {
if(instance) {	
    bot.telegram.sendMessage(ctx.chat.id,`
${icon.get('eight_pointed_black_star')} <b>Delegate to validator</b>
<i>${instance} tx staking delegate <b>VALIDATOR_ADDR</b> \\</i>
<b>AMOUNT</b><i>${denom} --from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>

${icon.get('eight_pointed_black_star')} <b>Redelegate to another validator</b>
<i>${instance} tx staking redelegate <b>SRC_VAL_ADDR DST_VAL_ADDR</b> \\</i>
<b>AMOUNT</b><i>${denom} --from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>
    `, {parse_mode: 'html'});
} else {
   bot.telegram.sendMessage(ctx.chat.id,`${icon.get('warning')} You did not select chain! Kindly select !`,{reply_markup: inlineKeyboardChainsCommands});
  }	
});

bot.command('withdraw', ctx => {
if(instance) {	
    bot.telegram.sendMessage(ctx.chat.id,`
${icon.get('eight_pointed_black_star')} <b>Withdraw reward/commission from your validator</b>
<i>${instance} tx distribution withdraw-rewards <b>VAL_ADDR</b> \\</i>
<i>--commission --from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>

${icon.get('eight_pointed_black_star')} <b>Withdraw reward from delegated validator</b>
<i>${instance} tx distribution withdraw-rewards <b>VAL_ADDR</b> \\</i>
<i>--from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>

${icon.get('eight_pointed_black_star')} <b>Withdraw all reward</b>
<i>${instance} tx distribution withdraw-all-rewards \\</i>
<i>--from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>
   `, {parse_mode: 'html'});
} else {
   bot.telegram.sendMessage(ctx.chat.id,`${icon.get('warning')} You did not select chain! Kindly select !`,{reply_markup: inlineKeyboardChainsCommands});
  }	
});

bot.command('ibc', ctx => {
if(instance) {   
   bot.telegram.sendMessage(ctx.chat.id,`
${icon.get('eight_pointed_black_star')} <b>Transfer fund on specific IBC channel</b>
<i>${instance} tx ibc-transfer -y transfer transfer <b>CHANNEL_ID RECEIVED_ADDR</b> \\</i>
<b>AMOUNT</b><i>${denom} --from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>
   `, {parse_mode: 'html'});
} else {
   bot.telegram.sendMessage(ctx.chat.id,`${icon.get('warning')} You did not select chain! Kindly select !`,{reply_markup: inlineKeyboardChainsCommands});
  }	
});


bot.command('validator', ctx => {
if(instance) {	
    bot.telegram.sendMessage(ctx.chat.id,`
${icon.get('eight_pointed_black_star')} <b>Create validator</b>
  <i>${instance} tx staking create-validator \\</i>
  <i>--amount <b>AMOUNT</b>${denom} \\</i>
  <i>--from <b>WALLET_NAME</b> \\</i>
  <i>--commission-max-change-rate "0.01" \\</i>
  <i>--commission-max-rate "0.2" \\</i>
  <i>--commission-rate "0.07" \\</i>
  <i>--min-self-delegation "1" \\</i>
  <i>--pubkey  \$(${instance} tendermint show-validator) \\</i>
  <i>--moniker <b>NODENAME</b> \\</i>
  <i>--chain-id <b>CHAIN_ID</b></i>

${icon.get('eight_pointed_black_star')} <b>Edit validator</b>
  <i>${instance} tx staking edit-validator \\</i>
  <i>--moniker=<b>NODENAME</b> \\</i>
  <i>--identity=<b>Your identity number on keybase\.io</b> \\</i>
  <i>--website="Your website" \\</i>
  <i>--details="Your description" \\</i>
  <i>--chain-id <b>CHAIN_ID</b> \\</i>
  <i>--from <b>WALLET</b></i>

${icon.get('eight_pointed_black_star')} <b>Unjail validator</b>
  <i>${instance} tx slashing unjail \\</i>
  <i>--broadcast-mode block \\</i>
  <i>--from <b>NODENAME</b> \\</i>
  <i>--chain-id <b>CHAIN_ID</b> \\</i>
  <i>--gas=auto --gas-adjustment 1.4</i>

${icon.get('eight_pointed_black_star')} <b>Check jail or tombstone status</b>
  <i>${instance} query slashing signing-info \\</i>
  <i>\$\(${instance} tendermint show-validator\)</i>

${icon.get('eight_pointed_black_star')} <b>Check active/inactive status</b>
  <i>${instance} query staking validators -oj --limit=2000 \\</i>
  <i>\| jq \'.validators[] | select(.operator_address=="<b>VALIDATOR_ADDR</b>").status\'</i>

` , {parse_mode: 'html'});
} else {
   bot.telegram.sendMessage(ctx.chat.id,`${icon.get('warning')} You did not select chain! Kindly select !`,{reply_markup: inlineKeyboardChainsCommands});
  }	
});

bot.command("status", async (ctx) => {
if(chainid) {	
    var validator = ctx.update.message.text.split('/status')[1].trim();
    await axios.get(`https://${chainid}.api.explorers.guru/api/validators/${validator}`)
    .then((res) => {
	var active_status = (res.data.status == "BOND_STATUS_BONDED");
	bot.telegram.sendMessage(ctx.chat.id, `
${icon.get('snowflake')} <b>Nodename: </b> ${res.data.description.moniker}
${icon.get('heavy_check_mark')} <b>Wallet addr: </b> ${res.data.addresses.accountAddress}
${icon.get('heavy_check_mark')} <b>Cons addr: </b> ${res.data.addresses.consensusAddress}
${icon.get('heavy_check_mark')} <b>Website: </b> ${res.data.description.website}
${icon.get('heavy_check_mark')} <b>Details: </b> ${res.data.description.details} 
${icon.get('heavy_check_mark')} <b>Active Status: </b> ${active_status}
${icon.get('heavy_check_mark')} <b>Jailed Status: </b> ${res.data.jailed}
` , { parse_mode: 'html' });
   }) .catch((e) => {
           console.log(e);
           bot.telegram.sendMessage(ctx.chat.id, `${icon.get('no_entry')} Wrong chain or validator address`, {});
     });
} else {
  bot.telegram.sendMessage(ctx.chat.id,`${icon.get('warning')} You did not select chain! Kindly select !`,{reply_markup: inlineKeyboardChainsCommands});
}
});

bot.command("balance", async (ctx) => {
        var wallet = ctx.update.message.text.split('/balance ')[1].trim();
	var check_item = `${wallet.includes(chainid) ? 'OK' : ''}`;
if(chainid.length && check_item.length) {	
	await axios.get(`https://${chainid}.api.explorers.guru/api/accounts/${wallet}/tokens`)
        .then((res) => {
                var temp = res.data.map((AssetEle,index) => { return `- ${AssetEle.amount}: ${AssetEle.title}\n`});
                var balances = (`${temp}`).replace(/,/g,'');
		bot.telegram.sendMessage(ctx.chat.id,`
${icon.get('money_with_wings')} Your balances includes:
${balances}
		`, { parse_mode: 'html' })

        }) .catch((e) => {
                console.log(e);
                bot.telegram.sendMessage(ctx.chat.id, `${icon.get('no_entry')} Wrong chain or wallet address`, {});
        });

	await axios.get(`https://${chainid}.api.explorers.guru/api/accounts/${wallet}/delegations`)
	.then((res) => {
		var temp = res.data.map((DelegateEle,index) => {return `
${icon.get('eight_pointed_black_star')} Moniker: ${DelegateEle.validator.moniker}
  - Val.addr: ${DelegateEle.validator.address}
  - Amount: ${DelegateEle.amount.amount} ${DelegateEle.amount.denom} \n` });
                
		var delegated_val = (`${temp}`).replace(/,/g,'');
                bot.telegram.sendMessage(ctx.chat.id,`
${icon.get('warning')} You are delegating to below validators:
${delegated_val}
                `, { parse_mode: 'html' })
	}) .catch((e) => {
                console.log(e);
                bot.telegram.sendMessage(ctx.chat.id, `${icon.get('no_entry')} Wrong chain or wallet address`, {});
        });


} else {
  bot.telegram.sendMessage(ctx.chat.id,`${icon.get('warning')} You did not select chain OR chain and wallet are incompatible!`,{reply_markup: inlineKeyboardChainsCommands});
}
});

bot.launch();
