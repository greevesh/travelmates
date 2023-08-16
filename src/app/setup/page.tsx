"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Card from "react-bootstrap/Card";
import Journey from "../components/journey/Journey";
import styles from "../styles/auth/card-container.module.css";
import NextButton from "./NextButton";
import Search from "./create-group/Search";
import PreviousButton from "./PreviousButton";

import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/app";

import { generateRandomID } from "../helpers";

import { UserResults, GroupData, GroupMembershipData } from "../types";
import SelectedBadge from "../components/SelectedBadge";
import CreateGroupButton from "./create-group/CreateGroupButton";

const Setup = () => {
  const [input, setInput] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<UserResults[]>([]);
  const [emptyInput, setEmptyInput] = useState<boolean>(true);
  const [groupMemberships, setGroupMemberships] = useState<
    GroupMembershipData[]
  >([]);
  const [groupID, setGroupID] = useState<string>("");
  const [users, setUsers] = useState<UserResults[]>([]);

  const debouncedInput = useDebounce(input, 300);

  let [step, setStep] = useState<number>(1);

  const fetchUsers = async (): Promise<void> => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    try {
      const users: any = querySnapshot.docs
        .map((doc) => {
          const id: string = doc.data().id;
          const displayName: string = doc.data().displayName.toLowerCase();
          const inputLowerCase: string = input.toLowerCase();

          if (displayName.startsWith(inputLowerCase.slice(0, input.length))) {
            return {
              id: id,
              photoURL: doc.data().photoURL,
              displayName: doc.data().displayName,
            };
          }

          return null;
        })
        .filter(Boolean);

      setUsers(users);
    } catch (err) {
      console.log(err);
    }
  };

  let group: GroupData | null = null;
  let groupMembership: GroupMembershipData | null = null;

  const createGroup = async (group: GroupData | null): Promise<void> => {
    if (group !== null) {
      try {
        await setDoc(doc(db, "groups", group.id), group);
        console.log("group document written successfully!", group);
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  };

  console.log(users);

  const createGroupMemberships = async (): Promise<void> => {
    console.log(groupMembership);
    try {
      users.forEach((user) => {
        const groupMembership: GroupMembershipData = {
          id: generateRandomID(),
          user_id: user.id,
          group_id: groupID,
        };
        setDoc(
          doc(db, "group-memberships", groupMembership.id),
          groupMembership
        );
        console.log(user);
      });
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  useEffect(() => {
    setGroupID(generateRandomID());
  }, []);

  const handleSearchChange = (value: string): void => {
    setInput(value);
    setEmptyInput(false);
  };

  useEffect(() => {
    if (input) {
      fetchUsers();
    }
  }, [debouncedInput]);

  const handleSelect = (selectedItem: string): void => {
    setInput("");
    // setSelectedUsers((prevSelectedUsers) => [
    //   ...prevSelectedUsers,
    //   {
    //     id: generateRandomID(),
    //     user_id: selectedUser,
    //     group_id: groupID,
    //   }
    // ]);
    setEmptyInput(false);
    // setGroupMemberships((prevMemberships) => [...prevMemberships, {
    //
    // }]);
  };

  useEffect(() => {
    console.log(groupMemberships);
  }, [groupMemberships]);

  const handleDelete = (itemToDelete: string): void => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((item) => item !== itemToDelete)
    );
  };

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setEmptyInput(true);
    }
  }, [selectedUsers]);

  const handleSubmit = async (): Promise<void> => {
    try {
      await createGroup(group);
      await createGroupMemberships();
      setUsers([]);
      setSelectedUsers([]);
    } catch (error) {
      console.log(error);
    }
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
          {step === 1 ? (
            <>
              <Card.Title>Create a Journey</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                So your mates will know where you&lsquo;ll be
              </Card.Subtitle>
              <Journey />
              <div className="d-flex justify-content-end">
                <NextButton incrementStep={incrementStep} />
              </div>
            </>
          ) : (
            <>
              <Card.Title>Create a Group</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                So you can see where your mates are
              </Card.Subtitle>
              <Search
                input={input}
                handleSelect={handleSelect}
                handleChange={handleSearchChange}
                users={users}
              />
              {selectedUsers.map((item) => (
                <SelectedBadge
                  key={item}
                  selectedItem={item}
                  handleDelete={() => handleDelete(item)}
                />
              ))}
              <CreateGroupButton
                group={group}
                handleSubmit={handleSubmit}
                emptyInput={emptyInput}
              />
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
