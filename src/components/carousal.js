import React from "react";
import image from "../photos/cardloading.gif";
import frontImage from "../photos/card.png";
import "../App.css";
import { useState, useRef, useEffect } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { ParallaxHover } from "react-parallax-hover";
import { ShakeLittle } from "reshake";
//import { Parallax } from "react-scroll-parallax";
import { ethers } from "ethers";
import biscuit from "../artifacts/contracts/Biscuit.sol/Biscuit.json";
import Repeat from "react-repeat-component";
import { wait } from "@testing-library/user-event/dist/utils";
import "./carousal.css";

const contract_address = "0xf5Cb523b3deE7B125B2944C7a1f9cdf7a4992DC5";

const Carousel = () => {
  let variable = {};
  const [source, setSource] = useState(image);
  let [tar, setTarget] = useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [code, setCode] = React.useState("");
  let image_url;
  let code2;

  const ref = useRef();
  const ref1 = useRef();
  const [imagesource, setImageSource] = useState({});
  const [flip, setFlip] = useState(false);
  const [imageHash, setImageHash] = useState("");
  const [cardArr, setCardArr] = useState([
    { id: 0, img: null, status: false },
    { id: 1, img: null, status: false },
    { id: 2, img: null, status: false },
    { id: 3, img: null, status: false },
    { id: 4, img: null, status: false },
    { id: 5, img: null, status: false },
    { id: 6, img: null, status: false },
    { id: 7, img: null, status: false },
    { id: 8, img: null, status: false },
    { id: 9, img: null, status: false },
    { id: 10, img: null, status: false },
    { id: 11, img: null, status: false },
    { id: 12, img: null, status: false },
    { id: 13, img: null, status: false },
    { id: 14, img: null, status: false },
    { id: 15, img: null, status: false },
    { id: 16, img: null, status: false },
    { id: 17, img: null, status: false },
    { id: 18, img: null, status: false },
    { id: 19, img: null, status: false },
    { id: 20, img: null, status: false },
    { id: 21, img: null, status: false },
    { id: 22, img: null, status: false },
    { id: 23, img: null, status: false },
    { id: 24, img: null, status: false },
    { id: 25, img: null, status: false },
    { id: 26, img: null, status: false },
    { id: 27, img: null, status: false },
    { id: 28, img: null, status: false },
    { id: 29, img: null, status: false },
    { id: 30, img: null, status: false },
    { id: 31, img: null, status: false },
    { id: 32, img: null, status: false },
    { id: 33, img: null, status: false },
    { id: 34, img: null, status: false },
    { id: 35, img: null, status: false },
    { id: 36, img: null, status: false },
    { id: 37, img: null, status: false },
    { id: 38, img: null, status: false },
    { id: 39, img: null, status: false },
    { id: 40, img: null, status: false },
    { id: 41, img: null, status: false },
    { id: 42, img: null, status: false },
    { id: 43, img: null, status: false },
    { id: 44, img: null, status: false },
    { id: 45, img: null, status: false },
    { id: 46, img: null, status: false },
    { id: 47, img: null, status: false },
    { id: 48, img: null, status: false },
    { id: 49, img: null, status: false },
    { id: 50, img: null, status: false },
    { id: 51, img: null, status: false },
  ]);

  const game = async (i) => {
    console.log(i);
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contract_address,
        biscuit.abi,
        signer
      );

      const tx = await contract.assignSecond();
      tx.wait(1);
      console.log(tx.hash);
      // tar = i.target;
      // setTarget(tar);
      const s = await provider.waitForTransaction(tx.hash);
      code2 = await contract.getSecondCode();
      contract.on("AssignedCode2", AssignedCodeEvent(i));
      return () => {
        contract.removeAllListeners("AssignedCode2");
      };
      // console.log("code2 is");
      // console.log(code2);
      // if (code2 < 6631) {
      //   let endpoint =
      //     "https://bafybeifniz2yhpir6iyavzl2ntbc3wgpwzfsmr5gsmbtvp4trd2l3g66zi.ipfs.dweb.link/jsonsA/";
      //   let jsonUrl = endpoint + code2 + ".json";
      //   fetch(jsonUrl)
      //     .then((res) => res.json())
      //     .then((data) => {
      //       image_url = data["Url"];
      //       console.log("data:", data["Url"]);
      //       console.log(image_url);
      //       // variable = { image_url };
      //       // console.log(e.target.src);
      //       const arr = [...cardArr];
      //       arr[i].img = image_url;
      //       arr[i].status = true;
      //       setCardArr([...arr]);
      //       console.log(cardArr);
      //       //e.target.src = image_url;
      //       // console.log(e.target.src);
      //       setImageSource(image_url);
      //       console.log(Date.now());
      //       setImageHash(Date.now());
      //       console.log(imageHash);
      //     });
      // } else {
      //   let endpoint =
      //     "https://bafybeiepbnhno6sygrdqeiyfv5ca4gbrclmr5hzbquzl6lhck6b7pbloo4.ipfs.dweb.link/jsonsB/";
      //   let jsonUrl = endpoint + code2 + ".json";
      //   fetch(jsonUrl)
      //     .then((res) => res.json())
      //     .then((data) => {
      //       image_url = data["Url"];
      //       console.log("data:", data["Url"]);
      //       console.log(image_url);
      //       // variable = { image_url };
      //       // console.log(e.target.src);
      //       const arr = [...cardArr];
      //       arr[i].img = image_url;
      //       arr[i].status = true;
      //       setCardArr([...arr]);
      //       console.log(cardArr);
      //       // e.target.src = image_url;
      //       // console.log(e.target.src);
      //       console.log(Date.now());

      //       setImageSource(image_url);
      //       setImageHash(Date.now());
      //       console.log(imageHash);
      //     });
      //   setFlip(true);
      //   console.log(imagesource);
      //   console.log(imageHash);
      // }
    }
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contract_address, biscuit.abi, signer);

  const AssignedCodeEvent = async (i) => {
    console.log("code2 is");
    console.log(code2);
    if (code2 < 6631) {
      let endpoint =
        "https://bafybeifniz2yhpir6iyavzl2ntbc3wgpwzfsmr5gsmbtvp4trd2l3g66zi.ipfs.dweb.link/jsonsA/";
      let jsonUrl = endpoint + code2 + ".json";
      fetch(jsonUrl)
        .then((res) => res.json())
        .then((data) => {
          image_url = data["Url"];
          console.log("data:", data["Url"]);
          console.log(image_url);
          // variable = { image_url };
          // console.log(e.target.src);
          const arr = [...cardArr];
          arr[i].img = image_url;
          arr[i].status = true;
          setCardArr([...arr]);
          console.log(cardArr);
          //e.target.src = image_url;
          // console.log(e.target.src);
          setImageSource(image_url);
          console.log(Date.now());
          setImageHash(Date.now());
          console.log(imageHash);
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
          console.log(image_url);
          // variable = { image_url };
          // console.log(e.target.src);
          const arr = [...cardArr];
          arr[i].img = image_url;
          arr[i].status = true;
          setCardArr([...arr]);
          console.log(cardArr);
          // e.target.src = image_url;
          // console.log(e.target.src);
          console.log(Date.now());

          setImageSource(image_url);
          setImageHash(Date.now());
          console.log(imageHash);
        });
      setFlip(true);
      console.log(imagesource);
      console.log(imageHash);
    }
  };

  if (isLoading) {
    return (
      <div className="carousal">
        <Repeat times={52} className="progress-bar">
          {(i) => (
            <div key={i} id={`step-${i}`}>
              <div class="item">
                {/* {console.log("src" + { source })} */}

                {/*<Parallax
                  className="Parallax-module__parallax--skrA3"
                  rotateZ={["0deg", "360deg"]}
          >*/}
                <Flippy
                  flipOnHover={false}
                  flipOnClick={false}
                  flipDirection="horizontal"
                  ref={ref}
                  isFlipped={false}
                  onClick={(e) => {
                    e.currentTarget.firstChild.firstChild.className +=
                      " isActive";
                  }}
                >
                  <div className="fullcard">
                    <ShakeLittle>
                      <FrontSide>
                        <img
                          class="imgcf"
                          onClick={() => {
                            game(i);
                          }}
                          src={frontImage}
                        ></img>
                      </FrontSide>
                    </ShakeLittle>

                    <BackSide>
                      <div>
                        <ParallaxHover borderRadius={10} scale={5}>
                          <img
                            class="imgcb"
                            src={cardArr[i].status ? cardArr[i].img : image}
                          />
                        </ParallaxHover>
                      </div>
                    </BackSide>
                  </div>
                </Flippy>
                {/*</Parallax> */}
              </div>
            </div>
          )}
        </Repeat>
      </div>
    );
  }
};
export default Carousel;
