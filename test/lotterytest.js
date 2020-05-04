const LotteryStorage = artifacts.require("./lottery.sol");
// let lottery;

// beforeEach(async()=>{
//     lottery = await LotteryStorage.deployed();
//     console.log("deployed");
// })

contract("Lottery", async accounts => {
  var lottery;

  beforeEach(async () =>{
    lottery = await LotteryStorage.new();
  });
  console.log("test start");
  it("deployed to the test network", async () => {
    assert.ok(lottery.address);
    console.log("Lottery deployed");
  });
  it("allows one account to enter", async () => {
    console.log("First test start");
    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei("0.012", "ether"),
    });
    lottery.getPlayers.call().then(function (result) {
      players = result;
      assert.equal(1, players.length);
    });
    console.log("First test complete");
  });
  it("requires a minimum amount of ethers", async () => {
    console.log("second test start");
    try {
      await lottery.methods.enter({
        from: accounts[0],
        value: 0,
      });
      assert(false);
    } catch (err) {
      assert.ok(err);
    }
    console.log("Second test Complete");
  });

  it("allows multiple account to enter", async () => {
    console.log("Third test start");
    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });
    await lottery.enter({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"),
    });
    await lottery.enter({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether"),
    });
    const players = await lottery.getPlayers.call();
    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
    console.log("Third test Complete");
  });

  it("sends money to winer and resets the players array", async () => {
    console.log("Fourth test start");
    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether"),
    });
    const initalBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.pickWinner({
      from: accounts[0],
    });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initalBalance;
    assert(difference > web3.utils.toWei("1.8", "ether"));
    console.log("Fourth test Complete");
  });
});

// let accounts;
// let lottery;

// beforeEach(async()=>{
//     accounts = await web3.eth.getAccounts();
//     lottery = await LotteryStorage.deployed();
//     console.log("deployed");
// })

// describe('Lottery Contract', () => {
//     it('deploys a contract',()=>{
//         assert.ok(lottery.address)
//     });
//     it('allows one account to enter',async ()=>{
//         await lottery.enter({
//             from:accounts[0],
//             value: web3.utils.toWei('0.02','ether')
//         });
//         const players = await lottery.getPlayers.call({
//             from:accounts[0]
//         });
//         assert.equal(1,players.length);
//     });
//     it('allows multiple account to enter',async ()=>{
//         await lottery.enter({
//             from:accounts[0],
//             value: web3.utils.toWei('0.02','ether')
//         });
//          await lottery.enter({
//             from:accounts[1],
//             value: web3.utils.toWei('0.02','ether')
//         });
//         await lottery.enter({
//             from:accounts[2],
//             value: web3.utils.toWei('0.02','ether')
//         });
//         const players = await lottery.getPlayers.call({
//             from:accounts[0]
//         });
//         console.log(players);
//         assert.equal(accounts[0],players[0]);
//         assert.equal(accounts[1],players[1]);
//         assert.equal(accounts[2],players[2]);
//         assert.equal(3,players.length);
//     });

//     it('requires a minimum amount of ethers',async()=>{
//         try{
//         await lottery.enter({
//             from:accounts[0],
//             value:0
//         });
//         assert(false);
//         }
//         catch(err){
//             assert.ok(err);
//         }
//     });
//     it('only manager can call a winner',async()=>{
//         try{
//             await lottery.enter({
//                 from:accounts[1],
//             });
//         assert(false);
//         }catch(err){
//             assert(err);
//         }
//     });
//     it('sends money to winer and resets the players array',async()=>{
//         await lottery.enter({
//             from:accounts[0],
//             value:web3.utils.toWei('2','ether')
//         });
        
//         const players = await lottery.getPlayers.call({
//             from:accounts[0]
//         });
//         console.log(players);
//         const initalBalance = await web3.eth.getBalance(accounts[0]);
//         await lottery.pickWinner().send({
//             from:accounts[0]
//         });
//         const finalBalance = await web3.eth.getBalance(accounts[0]);
//         const difference = finalBalance - initalBalance;
//         assert(difference>web3.utils.toWei('1.8','ether'));
    
//     })
// })
