import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { generateRandomID } from "../globals";
import { CreateGroupMembershipsProps, GroupMembership } from "./types";

const createGroupMemberships = async ({
  group,
  groupMembership,
  groupMembers,
}: CreateGroupMembershipsProps): Promise<void> => {
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

export default createGroupMemberships;
