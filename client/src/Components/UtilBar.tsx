

interface UtilBarProps {
    mint: () => void,
    purchase: () => void
}

export const UtilBar = ({ mint, purchase }: UtilBarProps) => {
    return <div className="h-15 flex justify-between items-center p-4 ">
        <div className="flex gap-4">
            <div className="bg-blue-500 px-4 py-1.5 rounded-lg hover:bg-[#585858] transition-colors duration-200 ease-in-out cursor-pointer "
                onClick={mint}
            >
                Mint New Tickets
            </div>
            <div>
                
            </div>
        </div>
        <div className="bg-blue-500 px-4 py-1.5 rounded-lg hover:bg-[#585858] transition-colors duration-200 ease-in-out cursor-pointer "
            onClick={purchase}
        >
            Purchase a ticket
        </div>
    </div>
}