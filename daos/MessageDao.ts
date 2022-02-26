/**
 * @file Implements DAO managing data storage of Messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageModel from "../mongoose/messages/messageModel";
import Message from "../models/messages/Messages";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() { }
    //get
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    async findMessagedUserSent(uid: string): Promise<Message[]> {
        return await MessageModel.find({ from: uid })
            .populate("to")
            .exec();
    }
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    async findMessagedUserReceived(uid: string): Promise<Message[]> {
        return await MessageModel.find({ to: uid })
            .populate("from")
            .exec();
    }

    //post
    /**
     * Inserts Message instance into the database
     * @param {Message} Message Instance to be inserted into the database
     * @returns Promise To be notified when Message is inserted into the database
     */
    async userSentMessagesToAnotherUser(uid: string, auid: string, message: Message): Promise<Message> {
        return await MessageModel.create({ ...message, from: uid, to: auid })
    }

    //delete
    /**
     * Removes Message from the database.
     * @param {string} uid Primary key of Message to be removed
     * @returns Promise To be notified when Message is removed from the database
     */
    async userDeleteMessage(uid: string, auid: string): Promise<any> {
        return await MessageModel.deleteOne({ from: uid, to: auid })
    }
    /**
     * Removes Message from the database.
     * @param {string} uid Primary key of Message to be removed
     * @returns Promise To be notified when Message is removed from the database
     */
    async userDeleteAllMessage(uid: string, auid: string): Promise<any> {
        return await MessageModel.deleteMany({ from: uid, to: auid })
    }

    //put
    /**
     * Updates Message with new values in database
     * @param {string} uid Primary key of Message to be modified
     * @param {Message} Message Message object containing properties and their new values
     * @returns Promise To be notified when Message is updated in the database
     */
    async updateLastMessage(uid: string, auid: string, message: Message): Promise<any> {
        return await MessageModel.updateOne(
            { from: uid, to: auid },
            { $set: message });
    }
}