import logo from "./logo.svg";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import frontImage from "./photos/frontSide.png";
import image from "./photos/card.png";
import { useState } from "react";
import Carousel from "./components/carousal";
import Hello from "./photos/frontSide.png";
import { ethers } from "ethers";
import biscuit from "./artifacts/contracts/Biscuit.sol/Biscuit.json";
const contract_address = "0x4F04DB93D46864EE83C71797B47cB6Cff0d61492";

function App() {
  let variable = {};
  const [source, setSource] = useState(image);
  const [isLoading, setLoading] = useState(true);

  const participate = async (e) => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contract_address,
        biscuit.abi,
        signer
      );
      console.log("hi");
      const fee = await contract.participationFee();
      const tx = await contract.participate({ value: fee });
      tx.wait();
      const code1 = await contract.getFirstCode();
      console.log(code1);
      // const image_url =
      //   "https://gateway.pinata.cloud/ipfs/Qmed8tNbk5Kf7pfRLunhDNBxuzXAarcsuCMBY5ViaYMHV9/" +
      //   code1 +
      //   ".png";
      const url =
        "https://gateway.pinata.cloud/ipfs/Qmed8tNbk5Kf7pfRLunhDNBxuzXAarcsuCMBY5ViaYMHV9/102.png";

      // const url =
      //   "https://ipfs.io/ipfs/QmcaDhHDr6g69vrHcxXedzVAdof9b8cP8STuWzSZDbXkES";

      console.log(url);
      // console.log("in");
      variable = { url };
      e.target.src = url;
      setSource(variable[Object.keys(variable)]);
    }
    setLoading(false);
    if (source.length > 0) {
      setLoading(true);
      console.log(source);
    }
  };
  return (
    <div className="App">
      <h1>Connect Wallet</h1>
      <div className="imageBox ">
        <img src={source}></img>
        <Button className="playBtn" variant="dark" onClick={participate}>
          Play
        </Button>
      </div>

      <div className="carousle">
        <Carousel />
      </div>
    </div>
  );
}

export default App;
