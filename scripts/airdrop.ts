const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128)
import hre, { ethers, network } from "hardhat"
import fs from "fs"
import {holders} from '../holders'

async function main() {

    // 1st batch until sent 50,000,000 units to: 0x7427143b6a5097b505e00ceffcc25ebca6baefac // loop #36380
    // 2nd batch until sent 50,000,000 units to: 0x498c5b2cdda547ff4953c95d979506ce56b4d724 // loop #10312
    // 3rd batch until sent 50,000,000 units to: 0x5f195d5418ba270f3ae1d8f7083ff1f510aabf73 // loop #3724
    // batch 4 : sent 50,000,000 units to: 0x4afcd291d0ca5a17c4979cabe9f4a10d0a72018f // loop #3936

    function formatTimestamp(date: Date): string {
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amOrPm = hours >= 12 ? 'pm' : 'am';
      
        const formattedTimestamp = `${day} ${month} ${year} at ${hours % 12}:${minutes.toString().padStart(2, '0')} ${amOrPm} UTC`;
      
        return formattedTimestamp;
      }
      
      const now = new Date(); // Current date and time
      const formattedNow = formatTimestamp(now);
    
    try {

        const [signer] = await ethers.getSigners()


        const FlokiIsNotLate = await ethers.getContractFactory("FlokiIsNotLate")

        const addr = "0x80A75739E5aEA9211F2c053dFdd34F71b369A7Cd"

        // console.log(addr)
        // console.log(FlokiIsNotLate.interface)
        // console.log(signer)

        console.log("Start:", formatTimestamp(now))

        const erc20 = new ethers.Contract(addr, FlokiIsNotLate.interface, signer)

        // Split the input text into lines and remove any leading/trailing whitespace
        const lines = holders.trim().split('\n');

        // Wrap each line in double quotes and create an array
        const formattedAddresses = lines.map(address => address);

        const list = `[${formattedAddresses.join(',\n')}]`

        // await erc20.mint(ethers.parseEther('10848387.28'))

        console.log('\nholders.length:', formattedAddresses.length,'\n')

        console.log("bal", await erc20.balanceOf(signer.address))

        for (let id = 47186 ; id < Number(formattedAddresses.length) ; id++) {
        // for (let id = 0 ; id < Number(1) ; id++) {

            // console.log("formattedAddresses[id]", formattedAddresses[id])
            // console.log("formattedAddresses", formattedAddresses)
            // console.log("formattedAddresses2", ["0xff821ea35fa15858fca33439dcc84887dd550b58","0x6d2450a6a293e7b1badf2bd33f7c5308d1f13650","0x6d2450a6a293e7b1badf2bd33f7c5308d1f13650"])
        // const newArray = ["0xff821ea35fa15858fca33439dcc84887dd550b58","0x6d2450a6a293e7b1badf2bd33f7c5308d1f13650","0x6d2450a6a293e7b1badf2bd33f7c5308d1f13650"]
        
        await erc20.transfer(formattedAddresses[id],ethers.parseEther('50000000'))

        console.log("sent 50,000,000 units to:", msg(formattedAddresses[id]), "// loop #"+ Number(id))
        
        }
        console.log("End:", formatTimestamp(now))

        
    } catch(e) {
        console.log("aidrop error:", e)
        console.log("End:", formatTimestamp(now))

    }
    // const addr = holders
    // const erc20 = new ethers.Contract(addr, Basic.interface, signer)
    // const mint = await erc20.mint(await ethers.parseEther(amount.amount))
    // const hash = mint.hash
    // console.log(
    //     "Minted",
    //     msg(amount.amount),
    //     "units. \n\nTx hash:",
    //     msg(hash)
    // )
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
