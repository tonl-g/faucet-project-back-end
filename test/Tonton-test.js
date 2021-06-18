/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { expect } = require('chai');

describe('Tonton Token', async function () {
  let dev, owner, Tonton, tonton;
  const NAME = 'Tonton';
  const SYMBOL = 'TON';
  const INIT_SUPPLY = ethers.utils.parseEther('1000000');
  beforeEach(async function () {
    [dev, owner] = await ethers.getSigners();
    Tonton = await ethers.getContractFactory('Tonton');
    tonton = await Tonton.connect(dev).deploy(owner.address, INIT_SUPPLY);
    await tonton.deployed();
  });

  it(`Should have name ${NAME}`, async function () {
    expect(await tonton.name()).to.equal(NAME);
  });
  it(`Should have name ${SYMBOL}`, async function () {
    expect(await tonton.symbol()).to.equal(SYMBOL);
  });
  it(`Should have total supply ${INIT_SUPPLY.toString()}`, async function () {
    expect(await tonton.totalSupply()).to.equal(INIT_SUPPLY);
  });
  it(`Should mint initial supply ${INIT_SUPPLY.toString()} to owner`, async function () {
    expect(await tonton.balanceOf(owner.address)).to.equal(INIT_SUPPLY);
  });
});
