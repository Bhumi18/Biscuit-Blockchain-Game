import "./App.css";
//import { Button } from "react-bootstrap";
import frontImage from "./photos/card.png";
import image from "./photos/cardloading.gif";
import { useState, useRef, useEffect } from "react";
import Carousel from "./components/carousal";
//import Hello from "./photos/card.png";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Popup from "./components/popup/popup";
import CardStack from "./components/card/card";
import ResCards from "./components/rescard/rescard";
import { ParallaxHover } from "react-parallax-hover";
import { ShakeLittle, ShakeSlow } from "reshake";
//import ParticleTextEffect from "particle-text-effect";
import Plx from "react-plx";
import { ethers } from "ethers";
import biscuit from "./artifacts/contracts/Biscuit.sol/Biscuit.json";
const contract_address = "0xe325a50b198809d9dD6eF09b97A025385d426478";

function App() {
  const ref = useRef();
  const ref1 = useRef(null);
  let variable = {};
  const [source, setSource] = useState(image);
  const [isLoading, setLoading] = useState(true);
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
  let image_url;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const cardData = [
    {
      start: "self",
      startOffset: 100,
      duration: 400,
      // easing: [0.25, 0.1, 0.6, 1.5],
      properties: [
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

  const scrollDataB = [
    {
      start: "self",
      startOffset: 100,
      duration: 430,
      // easing: [0.25, 0.1, 0.6, 1.5],
      properties: [
        // {
        //   startValue: 360,
        //   endValue: 0,
        //   property: "rotate",
        // },
        {
          startValue: 1,
          endValue: 1,
          property: "scale",
        },
      ],
    },
  ];

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
      setToggel(true);
      setFlip(true);
    }
    // setLoading(false);
    // if (source.length > 0) {
    //   setLoading(true);
    //   console.log(source);
    // }
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
      {/* <ParticleTextEffect
        className="header"
        text="Connect Wallet"
        type="bubbles"
      ></ParticleTextEffect> */}

      <div className="imageBox1">
        <Plx parallaxData={scrollData1}>
          <Flippy
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="horizontal"
            ref={ref}
            isFlipped={flip}
          >
            <Plx className="rcard" parallaxData={cardData}>
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
                <img class="imgf" src={frontImage} onClick={togglePopup}></img>
              </FrontSide>
            </Plx>

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
              <img class="imgf" src={frontImage} onClick={togglePopup}></img>
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
              <img class="imgf" src={frontImage} onClick={togglePopup}></img>
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
              <img class="imgf" src={frontImage} onClick={togglePopup}></img>
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
              <img class="imgf" src={frontImage} onClick={togglePopup}></img>
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
