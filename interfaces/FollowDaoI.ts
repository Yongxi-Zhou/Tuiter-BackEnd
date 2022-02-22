import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    findAllFollowingUsers(tid: string): Promise<Follow[]>;
    findAllFollowedUser(uid: string): Promise<Follow[]>;

    userFollowsAnotherUser(uid: string, auid: string): Promise<Follow>;
    userUnfollowsAnotherUser(uid: string, auid: string): Promise<any>;

    userRemoveAllFollowedUser(uid: string): Promise<Follow>;
    userRemoveAllFollowingUser(uid: string): Promise<Follow>;
};