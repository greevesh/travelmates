import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { generateRandomID } from "../globals";
import {
  SelectedUser,
  CreateGroupMembershipsProps,
  GroupMembership,
} from "./types";

const createGroupMemberships = async ({
  group,
  groupMembership,
  selectedUsers,
}: CreateGroupMembershipsProps): Promise<void> => {
  console.log("group membership:", groupMembership);
  if (group) {
    try {
      selectedUsers.forEach((selectedUser: SelectedUser) => {
        const groupMembership: GroupMembership = {
          membershipID: generateRandomID(),
          userID: selectedUser.id,
          groupID: group.id,
          displayName: selectedUser.displayName,
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

export default createGroupMemberships;
