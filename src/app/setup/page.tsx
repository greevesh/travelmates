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

import { currentUserID, groupID, generateRandomID } from "../globals";

import { UserResults, Group, GroupMembership, GroupMember } from "../types";
import SelectedBadge from "../components/SelectedBadge";
import CreateGroupButton from "./create-group/CreateGroupButton";
import fetchGroupMembers from "./create-group/fetchGroupMembers";
import { useRouter } from "next/navigation";

const Setup: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [emptyInput, setEmptyInput] = useState<boolean>(true);
  const [users, setUsers] = useState<UserResults[]>([]);
  const [groupMembersLoaded, setGroupMembersLoaded] = useState(false);
  const [showNoGroupMembers, setShowNoGroupMembers] = useState(false);

  const router = useRouter();

  const group: Group = {
    id: groupID,
    creatorID: currentUserID,
  };

  if (!localStorage.getItem("groupID")) {
    localStorage.setItem("groupID", generateRandomID());
  }

  useEffect(() => {
    console.log("group:", group);
    if (group) {
      fetchGroupMembers({
        setGroupMembers,
        setGroupMembersLoaded,
        groupID,
      });
    }
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

          const alreadySelected = (id: string): boolean => {
            return groupMembers.some(
              (groupMember) => groupMember.userID === id
            );
          };

          if (
            displayName.startsWith(inputLowerCase.slice(0, input.length)) &&
            !alreadySelected(id) &&
            currentUserID !== id
          ) {
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

  let groupMembership: GroupMembership | null = null;

  const createGroup = async (group: Group): Promise<void> => {
    if (group.id) {
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
        groupMembers.forEach((groupMember) => {
          const groupMembership: GroupMembership = {
            membershipID: generateRandomID(),
            userID: groupMember.userID,
            groupID: group.id,
            displayName: groupMember.displayName,
          };
          setDoc(
            doc(db, "group-memberships", groupMembership.membershipID),
            groupMembership
          );
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

  const handleSelect = (user: UserResults): void => {
    setInput("");
    setGroupMembers((prevGroupMembers) => [
      ...prevGroupMembers,
      {
        membershipID: generateRandomID(),
        userID: user.id,
        displayName: user.displayName,
      },
    ]);
    setGroupMembersLoaded(true);
    setEmptyInput(false);
    console.log(groupMembers);
  };

  const handleDelete = (userToDelete: GroupMember): void => {
    setGroupMembers((prevGroupMembers) =>
      prevGroupMembers.filter((user) => user !== userToDelete)
    );
  };

  useEffect(() => {
    if (groupMembers.length === 0) {
      setEmptyInput(true);
    }
    console.log("group members:", groupMembers);
  }, [groupMembers]);

  const handleSubmit = async (): Promise<void> => {
    if (group !== undefined) {
      try {
        await createGroup(group);
        await createGroupMemberships();
        router.push(`/group/${groupID}`);
        setUsers([]);
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!groupMembersLoaded) {
        setShowNoGroupMembers(true);
      }
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Card style={{ width: "22rem", height: "20rem" }}>
        <Card.Body>
          {step === 1 ? (
            <>
              <Card.Title>Create some Journeys (max 5)</Card.Title>
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
              {groupMembersLoaded || groupMembers.length > 0 ? (
                groupMembers.map((groupMember) => (
                  <SelectedBadge
                    key={groupMember.userID}
                    selectedItem={groupMember.displayName}
                    handleDelete={() => handleDelete(groupMember)}
                  />
                ))
              ) : showNoGroupMembers ? (
                <p>No group members added yet.</p>
              ) : (
                <p>Searching for group members...</p>
              )}
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
