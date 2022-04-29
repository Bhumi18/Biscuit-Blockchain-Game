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
const contract_address = "0xe325a50b198809d9dD6eF09b97A025385d426478";

const Carousel = () => {
  let variable = {};
  const [source, setSource] = useState(image);
  const [isLoading, setLoading] = React.useState(true);
  const [code, setCode] = React.useState("");
  let image_url;

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

      const tx = await contract.secondCode();
      tx.wait();
      // console.log("trasnaction is");
      // console.log(tx);

      const code2 = await contract.getSecondCode();

      // console.log(code2);
      if (code2 < 6631) {
        let endpoint =
          "https://bafybeifniz2yhpir6iyavzl2ntbc3wgpwzfsmr5gsmbtvp4trd2l3g66zi.ipfs.dweb.link/jsonsA/";
        let jsonUrl = endpoint + code2 + ".json";
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
        let jsonUrl = endpoint + code2 + ".json";
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

      // const code1 = await contract.getFirstCode();
      // console.log(code1);
      // if (code1 == code2) {
      //   alert("user wins !!");
      // } else {
      //   alert("you loose !!");
      // }
    }
    // setLoading(false);
    // if (source.length > 0) {
    //   setLoading(true);
    //   console.log(source);
    // }
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
