import { useEffect, useState } from "react";
import { Nav } from "./Components/Nav";
import { ContractClass } from "./ContractUtils/ContractClass";
import NewNFTMintToken from "./contracts/NewNFTMintToken.json";
import { UtilBar } from "./Components/UtilBar";
import toast, { Toaster } from "react-hot-toast";


export default function App() {

  const [contract, setContract] = useState<ContractClass>();
  const [boughtTickets, setBoughtTickets] = useState<number[] | null>(null);

  useEffect(() => {
    const contractAddress: string = "0xBB208ACbc7A7DF279E175d9F3174FfF76730AeBa";
    const c = new ContractClass(contractAddress, NewNFTMintToken.abi);
    setContract(c);
  }, []);

  const mint = async () => {
    if(!contract) {
      toast.error("Contract not initialised yet!");
      return;
    }
    const receipt = await contract.mintTokens(10);
  }

  const purchase = async () => {
    if(!contract) {
      toast.error("Contract not initialised yet!");
      return;
    }
    const receipt = await contract.purchase();
  }

  const checkBoughtTickets = async () => {
    if(!contract) {
      toast.error("Contract not initialised yet!");
      return;
    }
    const tickets = await contract.ticketsOfOwner();
    setBoughtTickets(tickets);
  }

  return <div className="h-screen w-screen bg-[#383838] text-white ">
    <Toaster position="top-center" />
    <Nav onClick={checkBoughtTickets} />
    <UtilBar mint={mint} purchase={purchase} />
    <div className="px-7 py-4 text-2xl font-semibold ">
      My Tickets
    </div>
    <div className="flex flex-wrap gap-7 px-7 py-4">
      {
        boughtTickets ? boughtTickets.map((ticket, index) => (
          <div className="h-34 w-30 bg-green-600 rounded-xl py-2 px-4 flex justify-center items-center " key={index}>
            {ticket}
          </div>
        )) : "No Tickets Bought yet!"
        }
    </div>
  </div>
}