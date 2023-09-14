"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Card from "react-bootstrap/Card";
import Journey from "../components/journey-form/JourneyForm";
import styles from "../styles/auth/card-container.module.css";
import NextButton from "./NextButton";
import Search from "./create-group/Search";
import PreviousButton from "./PreviousButton";

import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/app";

import { currentUserID, generateRandomID } from "../globals";

import {
  UserResults,
  Group,
  GroupMembershipData,
  SelectedUser,
} from "../types";
import SelectedBadge from "../components/SelectedBadge";
import CreateGroupButton from "./create-group/CreateGroupButton";

const Setup: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);
  const [emptyInput, setEmptyInput] = useState<boolean>(true);
  const [groupMemberships, setGroupMemberships] = useState<
    GroupMembershipData[]
  >([]);
  const [users, setUsers] = useState<UserResults[]>([]);
  const [group, setGroup] = useState<Group>();

  useEffect(() => {
    setGroup({ id: generateRandomID(), creatorID: currentUserID });
  }, []);

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

  let groupMembership: GroupMembershipData | null = null;

  const createGroup = async (group: Group): Promise<void> => {
    if (group !== null) {
      try {
        await setDoc(doc(db, "groups", group.id), group);
        console.log("group document written successfully!", group);
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    } else {
      console.log("group is null");
    }
  };

  const createGroupMemberships = async (): Promise<void> => {
    console.log("group membership:", groupMembership);
    if (group) {
      try {
        selectedUsers.forEach((user) => {
          const groupMembership: GroupMembershipData = {
            id: generateRandomID(),
            user_id: user.id,
            group_id: group.id,
          };
          setDoc(
            doc(db, "group-memberships", groupMembership.id),
            groupMembership
          );
          console.log("group member:", user);
        });
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  };

  const handleSearchChange = (value: string): void => {
    setInput(value);
    setEmptyInput(false);
  };

  useEffect(() => {
    if (input) {
      fetchUsers();
    }
  }, [debouncedInput]);

  const handleSelect = (selectedUser: SelectedUser): void => {
    setInput("");
    setSelectedUsers((prevSelectedUsers) => [
      ...prevSelectedUsers,
      {
        id: selectedUser.id,
        displayName: selectedUser.displayName,
      },
    ]);
    setEmptyInput(false);
  };

  const handleDelete = (userToDelete: SelectedUser): void => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user !== userToDelete)
    );
  };

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setEmptyInput(true);
    }
  }, [selectedUsers]);

  const handleSubmit = async (): Promise<void> => {
    if (group !== undefined) {
      try {
        await createGroup(group);
        await createGroupMemberships();
        setUsers([]);
        setSelectedUsers([]);
      } catch (error) {
        console.log(error);
      }
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
              <Card.Title>Create a Journey (max 5)</Card.Title>
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
              {selectedUsers.map((user) => (
                <SelectedBadge
                  key={user}
                  selectedItem={user.displayName}
                  handleDelete={() => handleDelete(user)}
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
