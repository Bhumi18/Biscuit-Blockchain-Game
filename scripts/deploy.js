const hre = require("hardhat");

async function main() {
  const biscuit = await hre.ethers.getContractFactory("Biscuit");
  const biscuit_contract = await biscuit.deploy();

  await biscuit_contract.deployed();

  console.log("biscuit_contract deployed to:", biscuit_contract.address); // 0xf5Cb523b3deE7B125B2944C7a1f9cdf7a4992DC5
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
