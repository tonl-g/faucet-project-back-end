/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { expect } = require('chai');

describe('Faucet', function () {
  let Tonton, tonton, Faucet, dev, alice, bob, eve;

  const NAME = 'TONTON';
  const FAUCET_NAME = 'Faucet';
  const SYMBOL = 'TON';
  const INITIAL_SUPPLY = ethers.utils.parseEther('8000');

  this.beforeEach(async function () {
    [dev, alice, bob, eve] = await ethers.getSigners();
    Tonton = await ethers.getContractFactory('Tonton');
    tonton = await Tonton.connect(dev).deploy(NAME, SYMBOL, INITIAL_SUPPLY);
    await tonton.deployed();
    Faucet = await ethers.getContractFactory('Faucet');
    faucet = await Faucet.connect(dev).deploy(tonton.address, FAUCET_NAME);
    await faucet.deployed();
    await tonton.approve(faucet.address, INITIAL_SUPPLY);
  });

  describe('Deployement', function () {
    it('Test deploy ownable event', async function () {
      await expect(faucet.deployTransaction)
        .to.emit(faucet, 'Deployed')

        .withArgs(FAUCET_NAME);
    });
  });

  describe('Functions', function () {
    describe('sendTonton', function () {
      it('Should emit Bought', async function () {
        await expect(faucet.connect(alice).sendTonton())
          .to.emit(faucet, 'Bought')

          .withArgs(alice.address, 100);
      });
    });

    describe('totalSupply', function () {
      it('Should return totalSupply', async function () {
        expect(await tonton.totalSupply()).to.equal(ethers.utils.parseEther('8000'));
      });
    });

    describe('balanceOf', function () {
      it('Should return balance of owner', async function () {
        expect(await tonton.connect(dev).balanceOf(dev.address)).to.equal(INITIAL_SUPPLY);
      });
    });
    describe('approval', function () {
      it('approve', async function () {
        Faucet = await ethers.getContractFactory('Faucet');
        faucet = await Faucet.connect(dev).deploy(token.address, FAUCET_NAME);
        await faucet.deployed();
        await tonton.approve(faucet.address, INITIAL_SUPPLY);
        expect(await tonton.allowance(dev.address, faucet.address)).to.equal(ethers.utils.parseEther('8000'));
      });
    });
  });
});
