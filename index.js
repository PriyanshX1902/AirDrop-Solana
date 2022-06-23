const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL
} = require('@solana/web3.js');

const wallet = new Keypair();
const publicKey = new PublicKey(wallet._keypair.publicKey);
console.log(publicKey);
const secretKey = wallet._keypair.secretKey
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const getWalletBalance = async (key)=>{
  try {
    const walletBalance = await connection.getBalance(publicKey);
    console.log('Wallet Balance is '+ walletBalance)
  } catch (error) {
    console.log(error)
  }
}
const airdropSol = async ()=>{
  try{
    const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2*LAMPORTS_PER_SOL);
    await connection.confirmTransaction(fromAirDropSignature);

  } catch (error) {
    console.log(error)
  }
}
const main = async()=>{
  await getWalletBalance()
  await airdropSol();
  await getWalletBalance();
}
main()