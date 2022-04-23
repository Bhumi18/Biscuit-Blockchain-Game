import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import image from "../photos/card.png";
import "../App.css";
import { useState } from "react";
import { ethers } from "ethers";
import biscuit from "../artifacts/contracts/Biscuit.sol/Biscuit.json";
import { wait } from "@testing-library/user-event/dist/utils";
const contract_address = "0x4F04DB93D46864EE83C71797B47cB6Cff0d61492";

const Carousel = () => {
  let variable = {};
  const [source, setSource] = useState(image);
  const [isLoading, setLoading] = React.useState(true);

  const game = async (e) => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contract_address,
        biscuit.abi,
        signer
      );

      const tx = await contract.choose();
      tx.wait();
      const code2 = await contract.getSecondCode();
      console.log(code2);
      // const image_url =
      //   "https://gateway.pinata.cloud/ipfs/Qmed8tNbk5Kf7pfRLunhDNBxuzXAarcsuCMBY5ViaYMHV9/" +
      //   code2 +
      //   ".png";
      //   console.log("hi");
      const url =
        "https://gateway.pinata.cloud/ipfs/Qmed8tNbk5Kf7pfRLunhDNBxuzXAarcsuCMBY5ViaYMHV9/1020.png";
      //   const url =
      //     "https://ipfs.io/ipfs/QmcaDhHDr6g69vrHcxXedzVAdof9b8cP8STuWzSZDbXkES";
      variable = { url };
      e.target.src = url;
      setSource(variable[Object.keys(variable)]);
      const code1 = await contract.getFirstCode();
      console.log(code1);
      if (code1 == code2) {
        alert("user wins !!");
      } else {
        alert("you loose !!");
      }
    }
    setLoading(false);
    if (source.length > 0) {
      setLoading(true);
      console.log(source);
    }
  };

  if (isLoading) {
    return (
      <OwlCarousel
        className="owl-theme"
        loop
        style={{ margin: "0 auto", width: "900px" }}
        nav
      >
        <div class="item">
          {/* {console.log("src" + { source })} */}
          <img src={source} onClick={game}></img>
        </div>
        <div class="item">
          <img src={source} onClick={game}></img>
        </div>
        <div class="item">
          <img src={source} onClick={game}></img>
        </div>
        <div class="item">
          <img src={source} onClick={game}></img>
        </div>
        <div class="item">
          <img src={source} onClick={game}></img>
        </div>
        <div class="item">
          <img src={source} onClick={game}></img>
        </div>
        <div class="item">
          <img src={source} onClick={game} id="7"></img>
        </div>
      </OwlCarousel>
    );
  }
};
export default Carousel;
