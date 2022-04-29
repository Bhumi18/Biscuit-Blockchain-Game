const hre = require("hardhat");

async function main() {
  const biscuit = await hre.ethers.getContractFactory("Biscuit");
  const biscuit_contract = await biscuit.deploy();

  await biscuit_contract.deployed();

  console.log("biscuit_contract deployed to:", biscuit_contract.address); // 0xe325a50b198809d9dD6eF09b97A025385d426478
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
