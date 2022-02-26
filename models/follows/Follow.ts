/**
 * @file Declares Follow data type representing relationship between
 * users , as in user Follow other users
 */
import User from "../users/User";
/**
 * @typedef follow Represents follows relationship between a user and another user,
 * as in a user follows another user
 * @property {Tuit} userFollowed user followed by another user
 * @property {User} userFollowing User following another user
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
};