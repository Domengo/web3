/** @format */

const { ethers } = require("hardhat");
Web3 = require("web3");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const fs = require("fs");

async function main() {
  const qrc20Address = process.env.QRC20_TOKEN;
  const QRC20 = await ethers.getContractFactory("QRC20");
  const contract = QRC20.attach(qrc20Address);

  // Merkle Root
  let addresses = [
    {
          addr: "0x60FB4B324624A97E97229F82D7794DC196373aB4",
    },
    {
        addr: "0x409e242b785e437b768cfe53dc8a512677cd11130f6ac0156ca0ca5a0d922c9c",
    },
  ];

  const leafNodes = addresses.map((address) =>
    keccak256(Buffer.from(address.addr.replace("0x", ""), "hex"))
  );

  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  root = merkleTree.getHexRoot();

  const data = {
    addresses: addresses.map((address) => address.addr),
    leafNodes: leafNodes,
    root: root,
  };

  fs.writeFileSync("tree.json", JSON.stringify(data, null, 2));
}
