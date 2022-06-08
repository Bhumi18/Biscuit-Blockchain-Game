import React from "react";
import image from "../photos/cardloading.gif";
import frontImage from "../photos/card.png";
import "../App.css";
import { useState, useRef, useEffect } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { ParallaxHover } from "react-parallax-hover";
import { ShakeLittle } from "reshake";
import Plx from "react-plx";
import { ethers } from "ethers";
import biscuit from "../artifacts/contracts/Biscuit.sol/Biscuit.json";
import Repeat from "react-repeat-component";
import { wait } from "@testing-library/user-event/dist/utils";
import "./carousal.scss";
const contract_address = "0xe325a50b198809d9dD6eF09b97A025385d426478";

const Carousel = () => {
  const ref = useRef();
  // const ref1 = useRef();

  let variable = {};
  const [imagesource, setImageSource] = useState({});
  //const [source, setSource] = useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [target, setTarget] = React.useState("");
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
  let image_url;

  const cardData = [
    {
      start: "self",
      startOffset: 100,
      duration: 300,
      // easing: [0.25, 0.1, 0.6, 1.5],
      properties: [
        {
          startValue: 50,
          endValue: 0,
          unit: "vh",
          property: "translateX",
        },
        {
          startValue: 180,
          endValue: 0,
          property: "rotate",
        },
        {
          startValue: 0,
          endValue: 1,
          property: "scale",
        },
      ],
    },
  ];

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
    // console.log(imagesource);
  };

  if (isLoading) {
    return (
      <div className="carousal">
        <Repeat times={52} className="progress-bar">
          {(i) => (
            <div key={i} id={`step-${i}`}>
              <div class="item">
                {/* {console.log("src" + { source })} */}

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
                  <Plx className="rcard" parallaxData={cardData}>
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
                  </Plx>
                </Flippy>
              </div>
            </div>
          )}
        </Repeat>
      </div>
    );
  }
};
export default Carousel;
