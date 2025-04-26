import { ethers } from "ethers";
import { connectToMetaMask } from "./connectToMetaMask";


export class ContractClass {

    private readonly contractAddress!: string;
    private readonly contractABI: ethers.InterfaceAbi;

    // provider is not used yet, I don't what it is used except making a signer
    private provider: ethers.BrowserProvider | null = null;
    private signer: ethers.JsonRpcSigner | null = null;
    private contract: ethers.Contract | null = null;

    constructor(contractAddress: string, contractABI: ethers.InterfaceAbi) {
        this.contractAddress = contractAddress;
        this.contractABI = contractABI;

        this.initialize();
    }

    private async initialize(): Promise<void> {
        await this.connectToMetaMask();
    }

    private async connectToMetaMask(): Promise<void> {
        try {
            const { provider, signer }: {
                provider: ethers.BrowserProvider,
                signer: ethers.JsonRpcSigner
            } = await connectToMetaMask();
    
            this.provider = provider;
            this.signer = signer;
    
            this.setContract();
        } catch (error) {
            this.throwError(error);
        }
    }

    private setContract(): void {
        if(!this.signer) throw new Error("MetaMask not found!");

        try {
            this.contract = new ethers.Contract(
                this.contractAddress,
                this.contractABI,
                this.signer
            );
        } catch (error) {
            this.throwError(error);
        }
    }

    // return type Promise<ethers.contractTransactionReceipt>
    public async mintTokens(supply: number) {
        if(!this.contract) throw new Error("MetaMask not connected!");

        try {
            if(supply < 1) throw new Error("Supply must be greater than 0");
    
            const txn = await this.contract.mintTokens(supply);
            const receipt = await txn.wait();
            return receipt;

        } catch (error) {
            this.throwError(error);
        }
    }

    public async purchase() {
        if(!this.contract) throw new Error("MetaMask not connected!");

        try {
            const txn = await this.contract.purchaseTicket({ value: ethers.parseEther("0.01") });
            const receipt = await txn.wait();
    
            return receipt;
        } catch (error) {
            this.throwError(error);
        }

    }

    public async ticketsOfOwner() {
        if(!this.contract || !this.signer) throw new Error("MetaMask not connected!");

        try {
            const tickets = await this.contract.ticketsOfOwner(this.signer.address);

            return tickets;
        } catch (error) {
            this.throwError(error);
        }
    }

    public async withdraw() {
        if(!this.contract) throw new Error("MetaMask not connected!");

        try {
            const txn = await this.contract.withdraw();
            const receipt = await txn.wait();
            
            return receipt;
        } catch (error) {
            this.throwError(error);
        }
    }

    private throwError(error: unknown) {
        console.error("Contract Error: ", error);
        if(error instanceof Error) {
            throw new Error("Contract operation failed: " + error.message);
        }
        throw new Error("Unknown error occured: " + error);
    }

}