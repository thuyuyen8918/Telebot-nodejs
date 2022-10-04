- The part helps you to create your own BOT 
### 1. Install prerequiste packages
```
npm install -g npm@8.19.2
mkdir $HOME/cosmos_tips_telebot && cd $HOME/cosmos_tips_telebot
npm install telegraf nodemon axios start --save
```

### 2. Add Telegram bot to script
- Using [@BotFather](https://t.me/BotFather) to create your BOT, pay attention to HTTP API 
![image](https://user-images.githubusercontent.com/109055532/193730438-423e2d24-c674-411a-ab37-c9eeef0b2a2e.png)

- Download the repo, then open `index.js` to add API of your BOT
![image](https://user-images.githubusercontent.com/109055532/193731453-3efb7440-1fef-49f5-b0da-e8e89b5fedc1.png)

- Start BOT
```
cd $HOME/cosmos_tips_telebot
npm i && npm start
```
