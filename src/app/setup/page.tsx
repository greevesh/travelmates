"use client";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Journey from "../components/journey/Journey";
import styles from "../styles/auth/card-container.module.css";
import NextButton from "./NextButton";
import Search from "../groups/Search";
import PreviousButton from "./PreviousButton";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/app";

import { UserResults } from "../types";
import SelectedBadge from "../components/SelectedBadge";

const Setup = () => {
  const [input, setInput] = useState<string>("");
  const [matchedName, setMatchedName] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<UserResults[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  let [step, setStep] = useState<number>(1);

  const fetchUsers = async (): Promise<void> => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    try {
      const filteredUsers: UserResults[] = [];

      querySnapshot.forEach((doc) => {
        const displayName: string = doc.data().displayName.toLowerCase();
        const inputLowerCase: string = input.toLowerCase();

        if (displayName.startsWith(inputLowerCase.slice(0, input.length))) {
          filteredUsers.push({
            photoURL: doc.data().photoURL,
            displayName: doc.data().displayName,
          });
        }
      });

      setUsersList(filteredUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (value: string): void => {
    setInput(value);
  };

  useEffect(() => {
    console.log("input:", input);
    fetchUsers();
  }, [input]);

  const handleSelect = (selectedItem: string): void => {
    setInput("");
    setSelectedItems((prevSelectedItems) => [
      ...prevSelectedItems,
      selectedItem,
    ]);
    console.log(selectedItem);
  };

  const handleDelete = (itemToDelete: string): void => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item !== itemToDelete)
    );
  };

  const incrementStep = (): void => {
    setStep((step += 1));
    console.log(step);
  };

  const decrementStep = (): void => {
    setStep((step -= 1));
    console.log(step);
  };

  return (
    <div className={styles.container}>
      <Card style={{ width: "22rem", height: "20rem" }}>
        <Card.Body>
          <Card.Title>Create a Journey</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            So your mates will know where you&lsquo;ll be
          </Card.Subtitle>
          {step === 1 ? (
            <>
              <Journey />
              <div className="d-flex justify-content-end">
                <NextButton incrementStep={incrementStep} />
              </div>
            </>
          ) : (
            <>
              <Search
                input={input}
                handleSelect={handleSelect}
                handleChange={handleSearchChange}
                usersList={usersList}
              />
              {selectedItems.map((item) => (
                <SelectedBadge
                  key={item}
                  selectedItem={item}
                  handleDelete={() => handleDelete(item)}
                />
              ))}
              <PreviousButton decrementStep={decrementStep} />
            </>
          )}
        </Card.Body>
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-center w-100">
            <p>Step {step}/2</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Setup;
