import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    //get
    findAllFollowingUser(uid: string): Promise<Follow[]>;
    findAllFollowedUser(uid: string): Promise<Follow[]>;

    // post
    userFollowsAnotherUser(uid: string, auid: string): Promise<Follow>;
    //delete
    userUnfollowsAnotherUser(uid: string, auid: string): Promise<any>;
    userRemoveAllFollower(uid: string): Promise<any>;
    userRemoveAllFollowing(uid: string): Promise<any>;
};