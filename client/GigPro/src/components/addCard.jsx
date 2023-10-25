import React from "react";
import { useState } from "react";
import { useContractWrite,useAccount } from "wagmi";
import { GigProContract } from "../Constant/gigprocontract";
import gigproAbi from "../ABI/GigPro.json";
import { ethers,Contract } from "ethers";
const AddCard = () => {
  const [freelancerAddress,setFreelancerAddress] = useState();
  const  [amount,setAmount] = useState();
  
  const { address, connector, isConnected } = useAccount()
  const addUser = async()=>{
    if (window.ethereum || window.ethereum.isMiniPay) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await  provider.getSigner(address);
      console.log("address",address);
      try{
  
        const GigProContracts = new Contract(
  GigProContract,
  gigproAbi,
  signer
        );
        let tx = await GigProContracts.addFreeLancer(freelancerAddress,amount);
        let txtx= await tx.wait();
        alert("user Added");
      }catch(error){
        alert("can't add",error);
        console.log(error);
      }
  } else {
      console.error("MiniPay provider not detected");
  }
    
  }
  const {writeAsync:add} = useContractWrite({
    address: GigProContract,
    abi: gigproAbi,
    functionName: "addFreeLancer",
    args: [freelancerAddress ,amount]

  })
  const addFreelancer =async()=>{
    try{
      if(freelancerAddress != undefined && amount != undefined){
      //  await  add();
      await addUser();
      }else{
        console.log("empty values");
      }

    }catch(error){
      console.log(error);
    }
  }
  console.log(freelancerAddress);
  return (
    <div className="w-full h-full flex flex-col justify-between  rounded-xl bg-gray-800">
      <div className="flex  h-1/2 md:h-3/4 flex-col  gap-40 pt-5 ">
        <div className="flex md:justify-evenly md:items-center   md:flex-row flex-col  ">
        <h3 className="text-center md:text-start">FreeLancer Address:</h3>
        <input className="border-b border-black bg-transparent focus:border-none text-center" type="text" placeholder="0x74....39749" onChange={(e)=>{setFreelancerAddress(e.target.value)}}/>
        </div>
        <div className="flex md:justify-evenly md:items-center md:flex-row flex-col ">
        <h3 className="text-center md:text-start">Amount in Celo:</h3>
        <input className="border-b border-black bg-transparent focus:border-none text-center " type="text" placeholder="4000" onChange={(e)=>{setAmount(ethers.utils.parseEther(e.target.value))}}/>
        </div>
        <div className="flex  justify-between  items-center text-black md:pl-10 md:pr-10 pl-1 pr-1">
        <button className="inline-flex p-2 justify-center items-center w-20 md:w-20 rounded text-sm md:text-2xl  md:rounded-full bg-red-200">Cancel</button>
        <button onClick={()=>{addFreelancer()}} className="inline-flex p-2 justify-center items-center w-20 md:w-20 rounded text-sm md:text-xl  md:rounded-full bg-green-200">Add</button>
        </div>
       
        
       
      
      </div>
    </div>
  );
};

export default AddCard;
