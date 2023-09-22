"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Heading from "../Heading";
import Search from "./Search";
import SelectedBadge from "./SelectedBadge";
import CreateGroupButton from "./CreateGroupButton";
import AddMembersButton from "./AddMembersButton";
import Message from "../Message";
import fetchGroupMembers from "../../../create-group/fetchGroupMembers";
import createGroup from "../../../create-group/createGroup";
import createGroupMemberships from "../../../create-group/createGroupMemberships";
import { currentUserID, groupID, generateRandomID } from "../../../globals";
import {
  SelectedUser,
  GroupMember,
  Group,
  GroupMembership,
  UserResults,
} from "../../../create-group/types";

const GroupForm: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [emptyInput, setEmptyInput] = useState<boolean>(true);
  const [users, setUsers] = useState<UserResults[]>([]);
  const [groupMembersLoaded, setGroupMembersLoaded] = useState(false);
  const [showNoGroupMembers, setShowNoGroupMembers] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const group: Group = {
    id: groupID,
    creatorID: currentUserID,
  };

  if (!localStorage.getItem("groupID")) {
    localStorage.setItem("groupID", generateRandomID());
  }

  useEffect(() => {
    // setGroupMembers([]);
    if (group) {
      fetchGroupMembers({
        setGroupMembers,
        setGroupMembersLoaded,
        groupID,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setEmptyInput(true);
    }
  }, [selectedUsers]);

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
        setSelectedUsers((prevSelectedUsers) => [
          ...prevSelectedUsers,
          {
            membershipID: generateRandomID(),
            id: selectedUser.id,
            displayName: selectedUser.displayName,
          },
        ]);
        setGroupMembersLoaded(true);
        setEmptyInput(false);
        console.log("Selected users:", selectedUsers);
      }
    }
  };

  const handleSelectedUserDelete = (selectedUser: SelectedUser): void => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user !== selectedUser)
    );
  };

  const handleDelete = (groupMember: GroupMember): void => {
    setGroupMembers((prevGroupMembers) =>
      prevGroupMembers.filter((user) => user !== groupMember)
    );
  };

  const handleSubmit = async (): Promise<void> => {
    if (group !== undefined && pathname.includes("setup")) {
      try {
        await createGroup(group);
        await createGroupMemberships({ group, groupMembership, selectedUsers });
        router.push(`/group/${groupID}`);
      } catch (err) {
        console.log("Error creating group:", err);
      }
    } else {
      try {
        await createGroupMemberships({ group, groupMembership, selectedUsers });
        setSelectedUsers([]);
        fetchGroupMembers({
          groupMembers,
          setGroupMembers,
          setGroupMembersLoaded,
          groupID,
        });
      } catch (err) {
        console.log("Error adding members:", err);
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
      {selectedUsers.length > 0
        ? selectedUsers.map((selectedUser: SelectedUser) => (
            <SelectedBadge
              key={selectedUser.id}
              selectedItem={selectedUser.displayName}
              handleDelete={() => handleSelectedUserDelete(selectedUser)}
            />
          ))
        : null}
      {pathname.includes("setup") ? (
        <CreateGroupButton
          group={group}
          handleSubmit={handleSubmit}
          emptyInput={emptyInput}
        />
      ) : (
        <AddMembersButton handleSubmit={handleSubmit} emptyInput={emptyInput} />
      )}
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
    </>
  );
};

export default GroupForm;
