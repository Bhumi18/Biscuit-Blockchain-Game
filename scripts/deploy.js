const hre = require("hardhat");

async function main() {
  const biscuit = await hre.ethers.getContractFactory("Biscuit");
  const biscuit_contract = await biscuit.deploy();

  await biscuit_contract.deployed();

  console.log("biscuit_contract deployed to:", biscuit_contract.address); // 0x016d971DaEF5d754FE4DCb6796728F5F1D36CA01
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
