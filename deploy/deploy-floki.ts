import "@nomiclabs/hardhat-ethers"

//your address here...
const initialMint = ethers.parseEther("10000000000000")

//to deploy, run yarn hardhat deploy --network hardhat

export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments

    const { deployer } = await getNamedAccounts()
    console.log("deployer:", deployer)
    const name = "FlokiIsNotLate"
    const symbol = "FlokiAA"

    const zeroTaxHandler = await deploy("ZeroTaxHandler", {
        from: deployer,
        args: [],
        log: true
    })

    const zeroTreasuryHandler = await deploy("ZeroTreasuryHandler", {
        from: deployer,
        args: [],
        log: true
    })

    await deploy("FlokiIsNotLate", {
        from: deployer,
        args: [
            name,
            symbol,
            zeroTaxHandler.address,
            zeroTreasuryHandler.address
        ],
        log: true
    })
}
export const tags = ["FlokiIsNotLate"]
