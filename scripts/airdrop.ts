const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128)
import hre, { ethers, network } from "hardhat"
import fs from "fs"
import {holders} from '../holders'

async function main() {

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
    
    try {

        const [signer] = await ethers.getSigners()

        const FlokiIsNotLate = await ethers.getContractFactory("FlokiIsNotLate")

        const addr = "0x80A75739E5aEA9211F2c053dFdd34F71b369A7Cd"

        console.log("Start:", formatTimestamp(new Date()))

        const erc20 = new ethers.Contract(addr, FlokiIsNotLate.interface, signer)

        const amount = await erc20.balanceOf(signer.address)
        console.log('my balance:', amount)

        let pageLoop = 39

        for(let i=4; i < pageLoop; i++ ) {

            console.log('\nPage', i, '\n')
            
            const url = 'https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=0xfb5B838b6cfEEdC2873aB27866079AC55363D37E&page='+pageLoop+'&offset=388890&apikey=X2S1HA87E6EA6URA21GMVJGB3R5S1T4P3W'
    
            const response = await fetch(url); // Replace with your API endpoint URL
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
                
            // console.log('holders:', data.result)

            console.log('\ndata.result.length:', data.result.length,'\n')
            // console.log('\ndata.result[1001].TokenHolderAddress:', data.result[1001].TokenHolderAddress)
            // console.log('\ndata.result:', data.result)

            console.log("bal", await erc20.balanceOf(signer.address))
            
            for (let id = 0 ; id < data.result.length ; id++) {
        
                await erc20.transfer(data.result[id].TokenHolderAddress, ethers.parseEther('50000000'))

                console.log("sent 50,000,000 units to:", msg(data.result[id].TokenHolderAddress), "// loop #"+ Number(id))
            
            }
            console.log("End:", formatTimestamp(new Date()))
        }
            
        } catch (e) {
            console.error('Error fetching data:', e);
            console.log("aidrop error:", e)
            console.log("End:", formatTimestamp(new Date()))
        }
        
    }

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
