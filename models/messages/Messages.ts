/**
 * @file Declares message data type representing relationship between
 * users and tuits, as in user messages a tuit
 */
import User from "../users/User";

/**
 * @typedef message Represents messages relationship between a user and a tuit,
 * as in a user messages a tuit
 * @property {Tuit} message content of the message
 * @property {User} to User sent message to
 * @property {User} from User received message from
 * @property {Date} sentOn the date User sent message on
 */

export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date
};