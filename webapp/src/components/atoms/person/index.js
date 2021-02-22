import React from "react";

import person1 from "./person1.svg";
import person2 from "./person2.svg";
import person3 from "./person3.svg";
import person4 from "./person4.svg";
import person5 from "./person5.svg";
import person6 from "./person6.svg";

const Person = ({ mistakes }) => {
  const image = () => {
    switch (mistakes) {
      case 0:
        return null;
      case 1:
        return <img src={person1} alt="Hangman 1 mistake" />;
      case 2:
        return <img src={person2} alt="Hangman 2 mistakes" />;
      case 3:
        return <img src={person3} alt="Hangman 3 mistakes" />;
      case 4:
        return <img src={person4} alt="Hangman 4 mistakes" />;
      case 5:
        return <img src={person5} alt="Hangman 5 mistakes" />;
      case 6:
        return <img src={person6} alt="Hangman 6 mistakes" />;
      default:
        return null;
    }
  };

  return <>{image()}</>;
};

export default Person;
