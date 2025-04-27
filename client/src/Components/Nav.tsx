import { connectToMetaMask } from "../ContractUtils/connectToMetaMask"

interface NavProps {
    onClick: () => void
}

export const Nav = ({ onClick }: NavProps) => {
    return <div className="h-20 border-b border-[#484848] flex justify-between items-center px-5 ">
        <div className="text-xl font-semibold ">
            NFT Ticket Generator and Seller
        </div>
        <div className="flex justify-between items-center gap-4 ">
            <div className="bg-[#484848] px-4 py-1.5 rounded-lg hover:bg-[#585858] transition-colors duration-200 ease-in-out cursor-pointer "
                onClick={connectToMetaMask}
            >
                Connect Wallet
            </div>
            <div className="h-8 w-8 bg-[#484848] rounded-full hover:bg-[#585858] transition-colors duration-200 ease-in-out cursor-pointer "
                onClick={onClick}
            ></div>
        </div>
    </div>
}