/**
 * @file Declares message data type representing relationship between
 * users and tuits, as in user messages a tuit
 */
import User from "../users/User";

/**
 * @typedef message Represents messages relationship between a user and a tuit,
 * as in a user messages a tuit
 * @property {Tuit} tuit Tuit being messaged
 * @property {User} messagedBy User liking the tuit
 */

export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date
};