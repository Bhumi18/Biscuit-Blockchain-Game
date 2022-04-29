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
const contract_address = "0xe325a50b198809d9dD6eF09b97A025385d426478";

function App() {
  let variable = {};
  const [source, setSource] = useState(image);
  const [isLoading, setLoading] = useState(true);
  let image_url;

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

      const fee = await contract.participationFee();
      const tx = await contract.participate({ value: fee });
      tx.wait();
      console.log("hi");
      const code1 = await contract.getFirstCode();
      console.log(code1);

      if (code1 < 6631) {
        let endpoint =
          "https://bafybeifniz2yhpir6iyavzl2ntbc3wgpwzfsmr5gsmbtvp4trd2l3g66zi.ipfs.dweb.link/jsonsA/";
        let jsonUrl = endpoint + code1 + ".json";
        fetch(jsonUrl)
          .then((res) => res.json())
          .then((data) => {
            image_url = data["Url"];
            console.log("data:", data["Url"]);
            variable = { image_url };
            e.target.src = image_url;
            setSource(variable[Object.keys(variable)]);
          });
      } else {
        let endpoint =
          "https://bafybeiepbnhno6sygrdqeiyfv5ca4gbrclmr5hzbquzl6lhck6b7pbloo4.ipfs.dweb.link/jsonsB/";
        let jsonUrl = endpoint + code1 + ".json";
        fetch(jsonUrl)
          .then((res) => res.json())
          .then((data) => {
            image_url = data["Url"];
            console.log("data:", data["Url"]);
            variable = { image_url };
            e.target.src = image_url;
            setSource(variable[Object.keys(variable)]);
          });
      }
    }
    // setLoading(false);
    // if (source.length > 0) {
    //   setLoading(true);
    //   console.log(source);
    // }
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
