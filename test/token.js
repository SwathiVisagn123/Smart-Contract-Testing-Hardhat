const { expect } = require("chai");

describe("Validate token scenarios", function () {
  let Token;
  let token;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners(); //signers object
    Token = await ethers.getContractFactory("Token"); //instance of contract
    token = await Token.deploy(); //deployed contract
  });

  it("Should set the right owner", async function () {
    expect(await token.owner()).to.equal(owner.address);
  });

  it("Should assign totalSupply to owner balance", async function () {
    const ownerBalance = await token.balanceOf(owner.address); //get owner's balance
    expect(await token.totalSupply()).to.equal(ownerBalance); //compare owner balance and total supply
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, 10); //hardhat by default sets owners address and calls this function from owners address
    expect(await token.balanceOf(addr1.address)).to.equal(10);

    await token.connect(addr1).transfer(addr2.address, 5); //to make addr1 as the msg.sender instead of the default owner
    expect(await token.balanceOf(addr1.address)).to.equal(5);
    expect(await token.balanceOf(addr2.address)).to.equal(5);
  });

  it("Should fail if sender does not have enough tokens", async function () {
    const initial = await token.balanceOf(owner.address);

    //addr1 will inititally have 0 tokens, so no transfer should occur
    //we expect the transfer of token from addr1 should be reverted with error "Insufficient balance"
    //similar to expectRevert in truffle
    await expect(
      token.connect(addr1).transfer(owner.address, 10)
    ).to.be.revertedWith("Insufficient balance");

    expect(await token.totalSupply()).to.equal(initial);
  });
});
