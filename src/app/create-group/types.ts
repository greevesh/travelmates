export interface Group {
  id: string | null;
  creatorID: string | null;
}

export interface FetchGroupMemberProps {
  setGroupMembers: React.Dispatch<React.SetStateAction<GroupMember[]>>;
  setGroupMembersLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  groupID: string | null;
}

export interface CreateGroupButtonProps {
  group: Group | null;
  handleSubmit: () => void;
  emptyInput: boolean;
}

export interface GroupMembership {
  membershipID: string;
  userID: string | undefined;
  groupID: string | null;
  displayName: string;
}

export interface UserSearchProps {
  input: string;
  users: UserResults[];
  handleChange: (value: string) => void;
  handleSelect: (selectedItem: UserResults) => void;
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

export interface GroupMember {
  membershipID: string;
  userID: string;
  displayName: string;
}
