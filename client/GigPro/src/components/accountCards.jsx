import React from "react";
import { useState } from "react";
import { useContractWrite } from "wagmi";
import { GigProContract } from "../Constant/gigprocontract";
import gigproAbi from "../ABI/GigPro.json";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import {celoABI,CusdABI } from "../ABI/abi";
const AccountCards = () => {
  const [approveAmount, setApproveAmount] = useState("");
  const [upgradeAmount, setUpgradeAmount] = useState("");
  const [downgradeAmount, setDowngradeAmount] = useState("");
  const [approve, setIsApprove] = useState(false);
  const [upgrade, setIsUpgrade] = useState(false);
  const [downgrade, setdowngrade] = useState(
    false
  );

  async function approveTokenss(amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  
    const signer = provider.getSigner();
  
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    console.log("the chain id is",Number(chainId))
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider
    });
  
    const superSigner = sf.createSigner({ signer: signer });
  
    console.log(signer);
    console.log(await superSigner.getAddress());
  
    //fDAI on goerli: you can find network addresses here: https://docs.superfluid.finance/superfluid/developers/networks
    //note that this abi is the one found here: https://goerli.etherscan.io/address/0x88271d333C72e51516B67f5567c728E702b3eeE8
    const CUSD = new ethers.Contract(
      "0x765de816845861e75a25fca122bb6898b8b1282a",
      CusdABI,
      signer
    );
    try {
      console.log("approving CUSD spend");
      await CUSD.approve(
        "0x3acb9a08697b6db4cd977e8ab42b6f24722e6d6e",
        ethers.utils.parseEther(amount.toString())
      ).then(function (tx) {
        console.log(
          `Congrats, you just approved your Cusd spend. You can see this tx at https://celoscan.io/address/${tx.hash}`
        );
      });
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }
    async function upgradeTokens(amount) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
      
        const signer = provider.getSigner();
      
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        const sf = await Framework.create({
          chainId: Number(chainId),
          provider: provider
        });
      
        const superSigner = sf.createSigner({ signer: signer });
      
        console.log(signer);
        console.log(await superSigner.getAddress());
        const cusdx= await sf.loadSuperToken("cUSDx");
      
        console.log(cusdx);
      
        try {
          const upgradeOperation = cusdx.upgrade({
            amount: ethers.utils.parseEther(amount)
          });
      
          console.log("Upgrading...");
      
          await upgradeOperation.exec(signer);
      
          console.log(
            `Congrats - you've just upgraded your tokens to an Index!
               Network: CELO
               Super Token: CUSDXx
               Amount: ${amount}         
            `
          );
      
          console.log(
            `Congrats - you've just distributed to your index!
          `
          );
        } catch (error) {
          console.log(
            "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
          );
          console.error(error);
        }
      }
      //another
      //where the Superfluid logic takes place
async function downgradeTokens(amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  
    const signer = provider.getSigner();
  
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider
    });
  
    const superSigner = sf.createSigner({ signer: signer });
  
    console.log(signer);
    console.log(await superSigner.getAddress());
    const celox = await sf.loadSuperToken("cUSDx");
  
    console.log(celox);
  
    try {
      const downgradeOperation = celox.downgrade({
        amount: ethers.utils.parseEther(amount)
      });
  
      console.log("downgrading...");
  
      await downgradeOperation.exec(signer);
  
      console.log(
        `Congrats - you've just downgraded your tokens
           Network: CELO
           Super Token: CUSDx
           Amount: ${amount}         
        `
      );
  
      console.log(
        `Congrats - you've just downgraded
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }
  
  async function approveTokens(amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  
    const signer = provider.getSigner();
  
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider
    });
  
    const superSigner = sf.createSigner({ signer: signer });
  
    console.log(signer);
    console.log(await superSigner.getAddress());
  
    //CELOx on celo: you can find network addresses here: https://docs.superfluid.finance/superfluid/developers/networks
    //note that this abi is the one found here: https://goerli.etherscan.io/address/0x88271d333C72e51516B67f5567c728E702b3eeE8
    const CELO = new ethers.Contract(
      "0x471EcE3750Da237f93B8E339c536989b8978a438",//"0x671425ae1f272bc6f79bec3ed5c4b00e9c628240",
      celoABI,
      signer
    );
    try {
      console.log("approving celo spend");
      await CELO.approve(
        "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
        ethers.utils.parseEther(amount.toString())
      ).then(function (tx) {
        console.log(
          `Congrats, you just approved your Celo spend. You can see this tx at https://celo.etherscan.io/tx/${tx.hash}`
        );
      });
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }
  //handles

  const handleApproveAmountChange = (e) => {
    setApproveAmount(e.target.value);
    console.log(e.target.value);
  };
  const handleUpgradeAmountChange = (e) => {
    setUpgradeAmount(e.target.value);
  };

  const handleDowngradeAmountChange = (e) => {
    setDowngradeAmount(e.target.value);
  };
  return (
    <div className="flex justify-between gap-16 w-full  grid grid-column items-center  h-full">
  <div className="w-80 h-70 flex flex-col justify-between rounded-xl bg-gray-300">
    <h2 className="text-center text-xl font-semibold mb-5">Cusd to Cusdx</h2>
    <div className="flex h-full flex-col gap-20 pt-5">
     
      <div className="flex justify-evenly items-center">
        <h3>CUSD:</h3>
        <input className="border-b w-40 border-black bg-transparent focus:border-none text-center " type="text" placeholder="4000" onChange={handleApproveAmountChange}/>
      </div>
      <div className="flex justify-center items-center text-black pl-10 pr-10 mb-4">
      {approve?<button onClick={()=>{upgradeTokens(approveAmount)}} className="inline-flex p-2 justify-center items-center w-20 rounded-full bg-green-400">Wrap</button>:<button onClick={()=>{approveTokenss(approveAmount);
      setTimeout(() => {
        setIsApprove(true);
      }, 1000);}} className="inline-flex p-2 justify-center items-center w-20 rounded-full bg-red-200">Approve</button>}
        
       
      </div>
    </div>
  </div>

  <div className="w-full h-full flex flex-col justify-between rounded-xl bg-gray-300">
    <h2 className="text-center text-xl font-semibold mb-5">cUSDx to cUSD</h2>
    <div className="flex h-full flex-col gap-20 pt-5">
     
      <div className="flex justify-evenly items-center">
        <h3>cUSDx:</h3>
        <input className="border-b border-black bg-transparent w-40 focus:border-none text-center " type="text" placeholder="4000" onChange={handleDowngradeAmountChange}/>
      </div>
      <div className="flex justify-center items-center text-black pl-10 pr-10 mb-4">
      <button onClick={()=>{downgradeTokens(downgradeAmount)}}  className="inline-flex p-2 justify-center items-center w-20 rounded-full bg-red-200">Unwrap</button>
        
        
      </div>
    </div>
  </div>
</div>

  );
};

export default AccountCards;
///
// import React, { useState, useEffect } from "react";
// import { Framework } from "@superfluid-finance/sdk-core";
// import {
//   Button,
//   Form,
//   FormGroup,
//   FormControl,
//   Spinner,
//   Card
// } from "react-bootstrap";
// import { daiABI } from "./config";
// import "./createFlow.css";
// import { ethers } from "ethers";

// let account;

// //where the Superfluid logic takes place
// async function upgradeTokens(amount) {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   await provider.send("eth_requestAccounts", []);

//   const signer = provider.getSigner();

//   const chainId = await window.ethereum.request({ method: "eth_chainId" });
//   const sf = await Framework.create({
//     chainId: Number(chainId),
//     provider: provider
//   });

//   const superSigner = sf.createSigner({ signer: signer });

//   console.log(signer);
//   console.log(await superSigner.getAddress());
//   const daix = await sf.loadSuperToken("fDAIx");

//   console.log(daix);

//   try {
//     const upgradeOperation = daix.upgrade({
//       amount: amount
//     });

//     console.log("Upgrading...");

//     await upgradeOperation.exec(signer);

//     console.log(
//       `Congrats - you've just upgraded your tokens to an Index!
//          Network: Goerli
//          Super Token: DAIx
//          Amount: ${amount}         
//       `
//     );

//     console.log(
//       `Congrats - you've just distributed to your index!
//     `
//     );
//   } catch (error) {
//     console.log(
//       "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
//     );
//     console.error(error);
//   }
// }

// //where the Superfluid logic takes place
// async function downgradeTokens(amount) {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   await provider.send("eth_requestAccounts", []);

//   const signer = provider.getSigner();

//   const chainId = await window.ethereum.request({ method: "eth_chainId" });
//   const sf = await Framework.create({
//     chainId: Number(chainId),
//     provider: provider
//   });

//   const superSigner = sf.createSigner({ signer: signer });

//   console.log(signer);
//   console.log(await superSigner.getAddress());
//   const daix = await sf.loadSuperToken("fDAIx");

//   console.log(daix);

//   try {
//     const downgradeOperation = daix.downgrade({
//       amount: amount
//     });

//     console.log("downgrading...");

//     await downgradeOperation.exec(signer);

//     console.log(
//       `Congrats - you've just downgraded your tokens
//          Network: Goerli
//          Super Token: DAIx
//          Amount: ${amount}         
//       `
//     );

//     console.log(
//       `Congrats - you've just downgraded
//     `
//     );
//   } catch (error) {
//     console.log(
//       "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
//     );
//     console.error(error);
//   }
// }



// export const SuperTokens = () => {
//   const [approveAmount, setApproveAmount] = useState("");
//   const [upgradeAmount, setUpgradeAmount] = useState("");
//   const [downgradeAmount, setDowngradeAmount] = useState("");
//   const [isApproveButtonLoading, setIsApproveButtonLoading] = useState(false);
//   const [isUpgradeButtonLoading, setIsUpgradeButtonLoading] = useState(false);
//   const [isDowngradeButtonLoading, setIsDowngradeButtonLoading] = useState(
//     false
//   );
//   const [currentAccount, setCurrentAccount] = useState("");

//   function UpgradeButton({ isLoading, children, ...props }) {
//     return (
//       <Button variant="success" className="button" {...props}>
//         {isUpgradeButtonLoading ? <Spinner animation="border" /> : children}
//       </Button>
//     );
//   }

//   function DowngradeButton({ isLoading, children, ...props }) {
//     return (
//       <Button variant="success" className="button" {...props}>
//         {isDowngradeButtonLoading ? <Spinner animation="border" /> : children}
//       </Button>
//     );
//   }

//   function ApproveButton({ isLoading, children, ...props }) {
//     return (
//       <Button variant="success" className="button" {...props}>
//         {isApproveButtonLoading ? <Spinner animation="border" /> : children}
//       </Button>
//     );
//   }

//   const handleApproveAmountChange = (e) => {
//     setApproveAmount(() => ([e.target.name] = e.target.value));
//   };

//   const handleUpgradeAmountChange = (e) => {
//     setUpgradeAmount(() => ([e.target.name] = e.target.value));
//   };

//   const handleDowngradeAmountChange = (e) => {
//     setDowngradeAmount(() => ([e.target.name] = e.target.value));
//   };

//   const connectWallet = async () => {
//     try {
//       const { ethereum } = window;

//       if (!ethereum) {
//         alert("Get MetaMask!");
//         return;
//       }
//       const accounts = await ethereum.request({
//         method: "eth_requestAccounts"
//       });
//       console.log("Connected", accounts[0]);
//       setCurrentAccount(accounts[0]);
//       account = currentAccount;
//       // Setup listener! This is for the case where a user comes to our site
//       // and connected their wallet for the first time.
//       // setupEventListener()
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const checkIfWalletIsConnected = async () => {
//     console.log("runs");
//     const { ethereum } = window;

//     if (!ethereum) {
//       console.log("Make sure you have metamask!");
//       return;
//     } else {
//       console.log("We have the ethereum object", ethereum);
//     }

//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const chain = await window.ethereum.request({ method: "eth_chainId" });
//     let chainId = chain;
//     console.log("chain ID:", chain);
//     console.log("global Chain Id:", chainId);
//     if (accounts.length !== 0) {
//       account = accounts[0];
//       console.log("Found an authorized account:", account);
//       setCurrentAccount(account);
//       // Setup listener! This is for the case where a user comes to our site
//       // and ALREADY had their wallet connected + authorized.
//       // setupEventListener()
//     } else {
//       console.log("No authorized account found");
//     }
//   };

//   useEffect(() => {
//     checkIfWalletIsConnected();
//   }, []);

//   return (
//     <div>
//       <h2>Working with Super Tokens</h2>
//       {currentAccount === "" ? (
//         <button id="connectWallet" className="button" onClick={connectWallet}>
//           Connect Wallet
//         </button>
//       ) : (
//         <Card className="connectedWallet">
//           {`${currentAccount.substring(0, 4)}...${currentAccount.substring(
//             38
//           )}`}
//         </Card>
//       )}
//       <Form>
//         <FormGroup className="mb-3">
//           <FormControl
//             name="subscriber"
//             value={approveAmount}
//             onChange={handleApproveAmountChange}
//             placeholder="Enter approve amount"
//           ></FormControl>
//         </FormGroup>
//         <p>
//           <ApproveButton
//             onClick={() => {
//               setIsApproveButtonLoading(true);
//               approveTokens(approveAmount);
//               setTimeout(() => {
//                 setIsApproveButtonLoading(false);
//               }, 1000);
//             }}
//           >
//             Click to Approve
//           </ApproveButton>
//         </p>
//       </Form>
//       <Form>
//         <FormGroup className="mb-3">
//           <FormControl
//             name="subscriber"
//             value={upgradeAmount}
//             onChange={handleUpgradeAmountChange}
//             placeholder="Enter Upgrade amount"
//           ></FormControl>
//         </FormGroup>
//         <UpgradeButton
//           onClick={() => {
//             setIsUpgradeButtonLoading(true);
//             upgradeTokens(downgradeAmount);
//             setTimeout(() => {
//               setIsUpgradeButtonLoading(false);
//             }, 1000);
//           }}
//         >
//           Click to Upgrade
//         </UpgradeButton>
//       </Form>
//       <Form>
//         <FormGroup className="mb-3">
//           <FormControl
//             name="subscriber"
//             value={downgradeAmount}
//             onChange={handleDowngradeAmountChange}
//             placeholder="Enter Downgrade amount"
//           ></FormControl>
//         </FormGroup>
//         <DowngradeButton
//           onClick={() => {
//             setIsUpgradeButtonLoading(true);
//             downgradeTokens(downgradeAmount);
//             setTimeout(() => {
//               setIsUpgradeButtonLoading(false);
//             }, 1000);
//           }}
//         >
//           Click to Downgrade
//         </DowngradeButton>
//       </Form>

//       <div className="description">
//         <p>
//           Go to the SuperTokens.js component and look at the
//           <b> upgrade and approve </b>
//           functions to see under the hood
//         </p>
//       </div>
//     </div>
//   );
// };
