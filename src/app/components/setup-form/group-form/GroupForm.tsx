"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading from "../Heading";
import Search from "./Search";
import CreateGroupButton from "./CreateGroupButton";
import SelectedBadge from "../../SelectedBadge";
import Message from "../Message";
import fetchGroupMembers from "../../../create-group/fetchGroupMembers";
import createGroup from "../../../create-group/createGroup";
import createGroupMemberships from "../../../create-group/createGroupMemberships";
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

  // HANDLERS - START
  const handleChange = (value: string): void => {
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
        await createGroupMemberships({ group, groupMembership, groupMembers });
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
        handleChange={handleChange}
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
        <Message text="No group members added yet." />
      ) : (
        <Message text="Searching for group members..." />
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
