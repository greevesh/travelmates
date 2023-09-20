"use client";
import React, { useEffect, useState } from "react";
import Journey from "../components/setup-form/journey-form/JourneyForm";
import styles from "../styles/auth/card-container.module.css";
import NextButton from "../components/setup-form/NextButton";
import Search from "../components/setup-form/group-form/Search";
import PreviousButton from "../components/setup-form/PreviousButton";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/app";

import { currentUserID, groupID, generateRandomID } from "../globals";

import {
  UserResults,
  Group,
  GroupMembership,
  GroupMember,
} from "../create-group/types";
import SelectedBadge from "../components/SelectedBadge";
import CreateGroupButton from "../components/setup-form/group-form/CreateGroupButton";
import fetchGroupMembers from "../create-group/fetchGroupMembers";
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
    setGroupMembers([]);
    if (group) {
      fetchGroupMembers({
        setGroupMembers,
        setGroupMembersLoaded,
        groupID,
      });
    }
  }, []);

  let [step, setStep] = useState<number>(1);

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

  const handleSelect = (newValue: string | null): void => {
    if (newValue) {
      const selectedUser = users.find((user) => user.displayName === newValue);
      console.log("user", selectedUser);

      if (selectedUser) {
        setInput("");
        setGroupMembers((prevGroupMembers) => [
          ...prevGroupMembers,
          {
            membershipID: generateRandomID(),
            userID: selectedUser.id,
            displayName: selectedUser.displayName,
          },
        ]);
        setGroupMembersLoaded(true);
        setEmptyInput(false);
        console.log(groupMembers);
      }
    }
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
      <div>
        <div>
          {step === 1 ? (
            <>
              <h1>Create some Journeys (max 5)</h1>
              <h2>So your mates will know where you&lsquo;ll be</h2>
              <Journey />
              <div className="d-flex justify-content-end">
                <NextButton incrementStep={incrementStep} />
              </div>
            </>
          ) : (
            <>
              <h1>Create a Group</h1>
              <h2>So you can see where your mates are</h2>
              <Search
                input={input}
                handleChange={handleSearchChange}
                handleSelect={handleSelect}
                users={users}
                groupMembers={groupMembers}
                setUsers={setUsers}
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
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-center w-100">
            <p>Step {step}/2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
