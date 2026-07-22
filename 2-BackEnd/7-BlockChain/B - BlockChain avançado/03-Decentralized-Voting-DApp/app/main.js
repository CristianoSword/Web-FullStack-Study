const abi = [
  "function electionTitle() view returns (string)",
  "function proposalCount() view returns (uint256)",
  "function getProposal(uint256 proposalId) view returns ((uint256 id,string name,uint256 voteCount,bool active))",
  "function vote(uint256 proposalId)",
  "function authorizeVoter(address voter)"
];

const connectButton = document.getElementById("connectButton");
const loadButton = document.getElementById("loadButton");
const contractAddressInput = document.getElementById("contractAddress");
const resultsElement = document.getElementById("results");
const titleElement = document.getElementById("title");
const statusElement = document.getElementById("status");

let browserProvider;
let signer;

async function connectWallet() {
  if (!window.ethereum) {
    statusElement.textContent = "MetaMask not found.";
    return;
  }

  browserProvider = new ethers.BrowserProvider(window.ethereum);
  await browserProvider.send("eth_requestAccounts", []);
  signer = await browserProvider.getSigner();
  statusElement.textContent = `Connected as ${await signer.getAddress()}`;
}

async function loadResults() {
  const contractAddress = contractAddressInput.value.trim();

  if (!contractAddress || !signer) {
    statusElement.textContent = "Connect a wallet and fill in the contract address.";
    return;
  }

  const contract = new ethers.Contract(contractAddress, abi, signer);
  const proposalCount = Number(await contract.proposalCount());
  const proposals = [];

  titleElement.textContent = await contract.electionTitle();
  for (let index = 0; index < proposalCount; index += 1) {
    proposals.push(await contract.getProposal(index));
  }

  resultsElement.innerHTML = "";
  proposals.forEach((proposal) => {
    const card = document.createElement("article");
    card.className = "proposal";
    card.innerHTML = `
      <h3>${proposal.name}</h3>
      <p>Votes: ${proposal.voteCount}</p>
      <button data-id="${proposal.id}">Vote</button>
    `;

    card.querySelector("button").addEventListener("click", async () => {
      const tx = await contract.vote(proposal.id);
      statusElement.textContent = `Submitting vote for ${proposal.name}...`;
      await tx.wait();
      statusElement.textContent = `Vote confirmed for ${proposal.name}.`;
      await loadResults();
    });

    resultsElement.appendChild(card);
  });
}

connectButton.addEventListener("click", connectWallet);
loadButton.addEventListener("click", loadResults);
