import Message from "../models/messages/Messages";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    //get
    findMessagedUserSent(uid: string): Promise<Message[]>;
    findMessagedUserReceived(uid: string): Promise<Message[]>;

    //post
    userSentMessagesToAnotherUser(uid: string, auid: string): Promise<Message>;
    //delete
    userDeleteMessage(uid: string, auid: string): Promise<any>;

    //delete all
    userDeleteAllMessageSent(uid: string, auid: string): Promise<any>;
    userDeleteAllMessageReceived(uid: string, auid: string): Promise<any>;
};