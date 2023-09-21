"use client";
import React, { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../../../../../firebase/app";
import Heading from "../Heading";
import Search from "./Search";
import CreateGroupButton from "./CreateGroupButton";
import SelectedBadge from "../../SelectedBadge";
import fetchGroupMembers from "../../../create-group/fetchGroupMembers";
import { currentUserID, groupID, generateRandomID } from "../../../globals";
import {
  GroupMember,
  Group,
  GroupMembership,
  UserResults,
} from "../../../create-group/types";

const GroupForm: React.FC = () => {
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
    setGroupMembers([]);
    if (group) {
      fetchGroupMembers({
        setGroupMembers,
        setGroupMembersLoaded,
        groupID,
      });
    }
  }, []);

  useEffect(() => {
    if (groupMembers.length === 0) {
      setEmptyInput(true);
    }
  }, [groupMembers]);

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

  // HANDLERS - START
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
  // HANDLERS - END

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
    <>
      <Heading
        heading="Create a Group"
        subheading="So you can see where your mates are"
      />
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
    </>
  );
};

export default GroupForm;
