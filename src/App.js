import "./App.css";
//import { Button } from "react-bootstrap";
import frontImage from "./photos/card.png";
import image from "./photos/cardloading.gif";
import { useState, useRef, useEffect } from "react";
import Carousel from "./components/carousal";
import Hello from "./photos/card.png";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Popup from "./components/popup/popup";
import CardStack from "./components/card/card";
import ResCards from "./components/rescard/rescard";
import { ParallaxHover } from "react-parallax-hover";
import { ShakeLittle, ShakeSlow } from "reshake";
import Plx from "react-plx";
import { ethers } from "ethers";
import biscuit from "./artifacts/contracts/Biscuit.sol/Biscuit.json";
const contract_address = "0xf5Cb523b3deE7B125B2944C7a1f9cdf7a4992DC5";

function App() {
  // contract
  let variable = {};
  let [tar, setTarget] = useState(null);
  const [source, setSource] = useState(image);
  const [isLoading, setLoading] = useState(true);
  let image_url;
  // end

  const ref = useRef();
  const ref1 = useRef(null);
  const [toggle, setToggel] = useState(false);
  const [flip, setFlip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [viewButton, setViewButton] = useState(true);
  const [stackAnimation, setStackAnimation] = useState([
    [{ stack: 1 }, { animation: "sideSlide" }],
    [{ stack: 2 }, { animation: "randmRotation" }],
    [{ stack: 3 }, { animation: "fanOut" }],
    /*These are some of the animations for the card
    randmRotation, fanOut, sideSlide, peekAboo, queue, fan, elasticSpread, verticalSpread */
  ]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const scrollData1 = [
    {
      start: ".scrollData-trigger",
      duration: "30vh",
      properties: [
        {
          startValue: 0,
          endValue: -50,
          unit: "vh",
          property: "translateY",
        },
      ],
    },
    {
      start: ".scrollData-trigger",
      startOffset: "9470px",
      duration: "9470px",
      properties: [
        {
          startValue: 0,
          endValue: 9470,
          unit: "px",
          property: "translateY",
        },
      ],
    },
  ];

  const scrollData2 = [
    {
      start: ".scrollData-trigger",
      duration: "30vh",
      properties: [
        {
          startValue: 0,
          endValue: -50,
          unit: "vh",
          property: "translateY",
        },
      ],
    },
    {
      start: ".scrollData-trigger",
      startOffset: "8430px",
      duration: "8430px",
      properties: [
        {
          startValue: 0,
          endValue: 8430,
          unit: "px",
          property: "translateY",
        },
      ],
    },
  ];

  const scrollData3 = [
    {
      start: ".scrollData-trigger",
      duration: "30vh",
      properties: [
        {
          startValue: 0,
          endValue: -50,
          unit: "vh",
          property: "translateY",
        },
      ],
    },
    {
      start: ".scrollData-trigger",
      startOffset: "6870px",
      duration: "6870px",
      properties: [
        {
          startValue: 0,
          endValue: 6870,
          unit: "px",
          property: "translateY",
        },
      ],
    },
  ];

  const scrollData4 = [
    {
      start: ".scrollData-trigger",
      duration: "30vh",
      properties: [
        {
          startValue: 0,
          endValue: -50,
          unit: "vh",
          property: "translateY",
        },
      ],
    },
    {
      start: ".scrollData-trigger",
      startOffset: "5050px",
      duration: "5050px",
      properties: [
        {
          startValue: 0,
          endValue: 5050,
          unit: "px",
          property: "translateY",
        },
      ],
    },
  ];

  const scrollData5 = [
    {
      start: ".scrollData-trigger",
      duration: "30vh",
      properties: [
        {
          startValue: 0,
          endValue: -50,
          unit: "vh",
          property: "translateY",
        },
      ],
    },
    {
      start: ".scrollData-trigger",
      startOffset: "4650px",
      duration: "4650px",
      properties: [
        {
          startValue: 0,
          endValue: 4650,
          unit: "px",
          property: "translateY",
        },
      ],
    },
  ];

  const scrollDataB = [
    {
      start: ".scrollData-trigger",
      duration: "30vh",
      properties: [
        {
          startValue: 0,
          endValue: -0,
          unit: "vh",
          property: "translateY",
        },
      ],
    },
    {
      start: ".scrollData-trigger",
      startOffset: "0px",
      duration: "0px",
      properties: [
        {
          startValue: 0,
          endValue: 0,
          unit: "px",
          property: "translateY",
        },
      ],
    },
  ];

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
      console.log("participation fee is");
      console.log(fee);
      const tx = await contract.participate({ value: fee });
      tx.wait(1);
      console.log(tx.hash);
      await provider.waitForTransaction(tx.hash);
      // tar = e.target.src;
      // setTarget(tar);
      const code1 = await contract.getFirstCode();
      console.log("code1 is");
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
            console.log(image_url);
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
            console.log(image_url);
            variable = { image_url };
            e.target.src = image_url;
            setSource(variable[Object.keys(variable)]);
          });
      }
    }
    setLoading(false);
    if (source.length > 0) {
      setLoading(true);
      console.log(source);
    }
  };

  useEffect(() => {
    var canvas = document.querySelector("canvas");
    canvas.style.zIndex = "-1 !important";
    console.log((canvas.style.zIndex = -1));
    console.log("in");
    console.log(ref1);
  }, [200]);
  // This is loading after DOM is loaded find a way to make it load before dom or as the same time as dom

  return (
    <div className="App">
      <h1 className="header">Connect Wallet</h1>

      <div className="imageBox1">
        <Plx parallaxData={scrollData1}>
          <Flippy
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="horizontal"
            ref={ref}
            isFlipped={flip}
          >
            <FrontSide>
              <div>
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <b>Please select the Play button to Start the Game</b>
                        <p>Thank You for playing with us !!!</p>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
              </div>
              <img class="imgf" src={source} onClick={togglePopup}></img>
            </FrontSide>

            <BackSide>
              <div className="stickyimg">
                <ParallaxHover borderRadius={10} scale={5}>
                  <img class="imgb" src={source}></img>
                </ParallaxHover>
              </div>
            </BackSide>
          </Flippy>
        </Plx>
      </div>

      <div className="imageBox2">
        <Plx parallaxData={scrollData2}>
          <Flippy
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="horizontal"
            ref={ref}
            isFlipped={flip}
          >
            <FrontSide>
              <div>
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <b>Please select the Play button to Start the Game</b>
                        <p>Thank You for playing with us !!!</p>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
              </div>
              <img class="imgf" src={source} onClick={togglePopup}></img>
            </FrontSide>

            <BackSide>
              <div className="stickyimg">
                <ParallaxHover borderRadius={10} scale={5}>
                  <img class="imgb" src={source}></img>
                </ParallaxHover>
              </div>
            </BackSide>
          </Flippy>
        </Plx>
      </div>

      <div className="imageBox3">
        <Plx parallaxData={scrollData3}>
          <Flippy
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="horizontal"
            ref={ref}
            isFlipped={flip}
          >
            <FrontSide>
              <div>
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <b>Please select the Play button to Start the Game</b>
                        <p>Thank You for playing with us !!!</p>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
              </div>
              <img class="imgf" src={source} onClick={togglePopup}></img>
            </FrontSide>

            <BackSide>
              <div className="stickyimg">
                <ParallaxHover borderRadius={10} scale={5}>
                  <img class="imgb" src={source}></img>
                </ParallaxHover>
              </div>
            </BackSide>
          </Flippy>
        </Plx>
      </div>

      <div className="imageBox4">
        <Plx parallaxData={scrollData4}>
          <Flippy
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="horizontal"
            ref={ref}
            isFlipped={flip}
          >
            <FrontSide>
              <div>
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <b>Please select the Play button to Start the Game</b>
                        <p>Thank You for playing with us !!!</p>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
              </div>
              <img class="imgf" src={source} onClick={togglePopup}></img>
            </FrontSide>

            <BackSide>
              <div className="stickyimg">
                <ParallaxHover borderRadius={10} scale={5}>
                  <img class="imgb" src={source}></img>
                </ParallaxHover>
              </div>
            </BackSide>
          </Flippy>
        </Plx>
      </div>

      <div className="imageBox5">
        <Plx parallaxData={scrollData5}>
          <Flippy
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="horizontal"
            ref={ref}
            isFlipped={flip}
          >
            <FrontSide>
              <div>
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <b>Please select the Play button to Start the Game</b>
                        <p>Thank You for playing with us !!!</p>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
              </div>
              <img class="imgf" src={source} onClick={togglePopup}></img>
            </FrontSide>

            <BackSide>
              <div className="stickyimg">
                <ParallaxHover borderRadius={10} scale={5}>
                  <img class="imgb" src={source}></img>
                </ParallaxHover>
              </div>
            </BackSide>
          </Flippy>
        </Plx>
      </div>

      <Plx parallaxData={scrollDataB}>
        <ShakeLittle>
          {viewButton ? (
            <button
              ref={ref1}
              className="playBtn"
              variant="light"
              onClick={(e) => {
                participate(e);
                setViewButton(false);
              }}
            >
              Play
            </button>
          ) : null}
        </ShakeLittle>
      </Plx>

      <div className="carousle">
        <Carousel />
      </div>
      <div className="deck">
        {stackAnimation.map((i, index) => (
          <CardStack
            key={index}
            customAnimation={i[1].animation}
            index={index}
          />
        ))}
      </div>
      <div className="rescards">
        <ShakeSlow>
          <ResCards />
        </ShakeSlow>
        <ShakeSlow>
          <ResCards />
        </ShakeSlow>
        <ShakeSlow>
          <ResCards />
        </ShakeSlow>
      </div>
      {/* </Particles> */}
    </div>
  );
}

export default App;
