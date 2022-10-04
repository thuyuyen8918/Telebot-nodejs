const { Telegraf } = require('telegraf');
const axios = require('axios').default;

const bot = new Telegraf('5612237937:AAHEEZgo7huSM7j18qlwAm7nuzl-2IoaQz4');

var instance = "";
var denom = "";

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

function myCLI(ctx) {
    var msg = `
Wellcome to CLI command help
Below is guideline to use the bot
/wallet : - CLI commands are for wallet operation
/validator: - CLI commands are for validator operation
/fullnode: - CLI commands are for fullnode operation
/delegate: - CLI commands are for delegation operation
/withdraw: - CLI commands are for delegation operation
/ibc:	   - CLI commands are for IBC operation
`;
    bot.telegram.sendMessage(ctx.chat.id, msg, {parse_mode: 'html'});
};




bot.command('start', ctx => {
    	bot.telegram.sendMessage(ctx.chat.id, `
  <b> Welcome to CLI tips of Cosmos SDK based chains </b>
- The bot will show syntax of common CLIs in Cosmos chain.
  Currently it only support <b>Sei</b>, <b>Stride</b> and <b>HAQQ</b> chains.
- Get support: <b>/help</b>
	`, { parse_mode: 'html' });
	let msg = 'Kindly select your chain';
	bot.telegram.sendMessage(ctx.chat.id, msg,  { reply_markup:  inlineKeyboardChainsCommands});
});

bot.command('help', ctx => {
	if (`${instance}` === "") {
		bot.telegram.sendMessage(ctx.chat.id, `You did not select chain`, { reply_markup:  inlineKeyboardChainsCommands}) ; }
	else {
		myCLI(ctx); 
		let msg = 'Kindly select your chain';
        	bot.telegram.sendMessage(ctx.chat.id, msg,  { reply_markup:  inlineKeyboardChainsCommands});
	}
});


bot.action('sei', ctx => {
    instance = "seid";
    denom = "usei";
    myCLI(ctx);
});

bot.action('haqq', ctx => {
    instance = "haqqd";
    denom = "aISLM";
    myCLI(ctx);
});

bot.action('stride', ctx => {
    instance = "strided";
    denom = "ustrd";
    myCLI(ctx);
});


bot.command('wallet', ctx => {
    bot.telegram.sendMessage(ctx.chat.id,`
Below is command syntax for wallet operations
- Create new wallet
<i>${instance} keys add <b>WALLET_NAME</b></i>

- Restore wallet
<i>${instance} keys add <b>WALLET_NAME</b> --recover</i>

- Delete wallet
<i>${instance} keys delete <b>WALLET_NAME</b></i>

- Show list of wallet
<i>${instance} keys list</i>

- Transfer asset between different wallets
<i>${instance} tx bank send <b>SEND_WALLET_ADDR RECEIVED_WALLET_ADDR</b> <b>AMOUNT</b>${denom}</i>

- Query wallet balance
<i>${instance} query bank balances <b>WALLET_ADDR</b></i>

- Voting proposal
<i>${instance} tx gov vote <b>PROPOSAL_ID yes/no</b> --from <b>WALLET_NAME</b> --chain-id <b>SEI_CHAIN_ID</b></i>
    `, {parse_mode: 'html'});
});

bot.command('fullnode', ctx => {
    bot.telegram.sendMessage(ctx.chat.id,`
Below is command syntax for fullnode operations
- Synchronization status
<i>${instance} status 2\>&1 | jq ."SyncInfo"."catching_up"</i>
Explain: <b>False</b>: fully sync. <b>True</b>: NOT fully sync

- Show node info
<i>${instance} status 2\>&1 | jq ."NodeInfo"</i>
    `, {parse_mode: 'html'});
});

bot.command('delegate', ctx => {
    bot.telegram.sendMessage(ctx.chat.id,`
Below is command syntax for delegation operations
- Delegate to validator
<i>${instance} tx staking delegate <b>VALIDATOR_ADDR</b> \\</i>
<b>AMOUNT</b><i>${denom} --from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>

- Redelegate to another validator
<i>${instance} tx staking redelegate <b>SRC_VAL_ADDR DST_VAL_ADDR</b> \\</i>
<b>AMOUNT</b><i>${denom} --from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>
    `, {parse_mode: 'html'});
});

bot.command('withdraw', ctx => {
    bot.telegram.sendMessage(ctx.chat.id,`
Below is command syntax for withdraw operations
- Withdraw reward/commission from your validator
<i>${instance} tx distribution withdraw-rewards <b>VAL_ADDR</b> \\</i>
<i>--commission --from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>

- Withdraw reward from delegated validator
<i>${instance} tx distribution withdraw-rewards <b>VAL_ADDR</b> \\</i>
<i>--from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>

- Withdraw all reward
<i>${instance} tx distribution withdraw-all-rewards \\</i>
<i>--from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>
   `, {parse_mode: 'html'});
});

bot.command('ibc', ctx => {
    bot.telegram.sendMessage(ctx.chat.id,`
Below is command syntax for IBC operations
- Transfer fund on specific IBC channel
<i>${instance} tx ibc-transfer -y transfer transfer <b>CHANNEL_ID RECEIVED_ADDR</b> \\</i>
<b>AMOUNT</b><i>${denom} --from <b>WALLET_NAME</b> --chain-id <b>CHAIN_ID</b> -y</i>

   `, {parse_mode: 'html'});
});


bot.command('validator', ctx => {
    bot.telegram.sendMessage(ctx.chat.id,`
Below is command syntax for validator operations
- Create validator
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

- Edit validator
  <i>${instance} tx staking edit-validator \\</i>
  <i>--moniker=<b>NODENAME</b> \\</i>
  <i>--identity=<b>Your identity number on keybase\.io</b> \\</i>
  <i>--website="Your website" \\</i>
  <i>--details="Your description" \\</i>
  <i>--chain-id <b>CHAIN_ID</b> \\</i>
  <i>--from <b>WALLET</b></i>

- Unjail validator
  <i>${instance} tx slashing unjail \\</i>
  <i>--broadcast-mode block \\</i>
  <i>--from <b>NODENAME</b> \\</i>
  <i>--chain-id <b>CHAIN_ID</b> \\</i>
  <i>--gas=auto --gas-adjustment 1.4</i>

- Check jail or tombstone status
  <i>${instance} query slashing signing-info \\</i>
  <i>\$\(${instance} tendermint show-validator\)</i>

- Check active/inactive status
  <i>${instance} query staking validators -oj --limit=2000 \\</i>
  <i>\| jq \'.validators[] | select(.operator_address=="<b>VALIDATOR_ADDR</b>").status\'</i>

` , {parse_mode: 'html'});
});



bot.launch();
