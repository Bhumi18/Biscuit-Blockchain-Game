import React, { useEffect, useState, useMemo, useRef } from "react";
import { ToggleCard } from "react-stack-cards";
import frontImage from "../../photos/card.png";
import TinderCard from "react-tinder-card";
import Popup from "../popup/popup";
import "./card.css";

const Card = ({ customAnimation, index }) => {
  const arr = [frontImage, frontImage, frontImage, frontImage];
  //These are from react-stack-cards library
  const [directionToggle, setDirectionToggle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  //These are from react-tinder-card library
  const [currentIndex, setCurrentIndex] = useState(arr.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [isPopUp, setIsPopUp] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const togglePopup = () => {
    setIsPopUp(!isPopUp);
  };

  const childRefs = useMemo(
    () =>
      Array(arr.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < arr.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < arr.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  //These are from react-stack-cards library
  useEffect(() => {
    setDirectionToggle(customAnimation);
    setIsOpen(false);
    // setTinder(null);
  }, []);

  /*const onTinderSwipe = () => {
    Tinder.swipe();
  }*/

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const split = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  return (
    <div className="cards">
      <div>
        {showPopup ? (
          <Popup
            content={
              <>
                <b>Please select the Play button to Start the Game</b>
                <p>Thank You for playing with us !!!</p>
              </>
            }
            handleClose={() => {
              setShowPopup(false);
            }}
          />
        ) : null}

        <img
          src={frontImage}
          onClick={() => {
            setShowPopup(true);
          }}
          className="card"
        ></img>
      </div>
      {arr.map((character, index) => (
        <TinderCard
          ref={childRefs[index]}
          className="swipe"
          key={character.name}
          onSwipe={(dir) => swiped(dir, character.name, index)}
          onCardLeftScreen={() => outOfFrame(character.name, index)}
        >
          <ToggleCard
            className="toggle"
            images={arr}
            width="225"
            height="300"
            direction={directionToggle}
            duration={400}
            isOpen={isOpen}
            onMouseEnter={() => {
              split();
            }}
          ></ToggleCard>
          {/*<img src={character.url} className="card"></img>*/}
        </TinderCard>
      ))}
    </div>
  );
};

export default Card;
