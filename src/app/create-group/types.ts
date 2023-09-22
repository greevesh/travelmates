import React from "react";

export interface HeadingProps {
  heading: string;
  subheading: string;
}

export interface Group {
  id: string | null;
  creatorID: string | null;
}

export interface FetchGroupMemberProps {
  setGroupMembers: React.Dispatch<React.SetStateAction<GroupMember[]>>;
  setGroupMembersLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  groupID: string | null;
}

export interface GroupMembership {
  membershipID: string;
  userID: string | undefined;
  groupID: string | null;
  displayName: string;
}

export interface UserSearchProps {
  input: string;
  handleChange: (value: string) => void;
  handleSelect: (user: UserResults) => void;
  users: UserResults[];
  groupMembers: GroupMember[];
  setUsers: React.Dispatch<React.SetStateAction<UserResults[]>>;
}

export interface UserResults {
  id: string;
  photoURL: string;
  displayName: string;
}

export interface SelectedBadgeProps {
  selectedItem: string;
  handleDelete: () => void;
}

export interface SelectedUser {
  membershipID: string;
  id: string;
  displayName: string;
}

export interface GroupMember {
  membershipID: string;
  userID: string;
  displayName: string;
}

export interface AddMembersButtonProps {
  handleSubmit: () => void;
  emptyInput: boolean;
}

export interface CreateGroupButtonProps {
  group: Group | null;
  handleSubmit: () => void;
  emptyInput: boolean;
}

export interface CreateGroupMembershipsProps {
  group: Group;
  groupMembership: GroupMembership | null;
  selectedUsers: SelectedUser[];
}
