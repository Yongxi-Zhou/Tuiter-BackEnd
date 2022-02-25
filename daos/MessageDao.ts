/**
 * @file Implements DAO managing data storage of Messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageModel from "../mongoose/Messages/MessageModel";
import Message from "../models/messages/Messages";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
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
    findMessagedUserSent(uid: string): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }
    findMessagedUserReceived(uid: string): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }
    userSentMessagesToAnotherUser(uid: string, auid: string): Promise<Message> {
        throw new Error("Method not implemented.");
    }
    userDeleteMessage(uid: string, auid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    userDeleteAllMessageSent(uid: string, auid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    userDeleteAllMessageReceived(uid: string, auid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    findAllMessages = async (): Promise<Message[]> =>
        MessageModel.find()
            .populate("postedBy")
            .exec();
    findAllMessagesByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ postedBy: uid })
            .populate("postedBy")
            .exec();
    findMessageById = async (uid: string): Promise<any> =>
        MessageModel.findById(uid)
            .populate("postedBy")
            .exec();
    createMessageByUser = async (uid: string, Message: Message): Promise<Message> =>
        MessageModel.create({ ...Message, postedBy: uid });
    updateMessage = async (uid: string, Message: Message): Promise<any> =>
        MessageModel.updateOne(
            { _id: uid },
            { $set: Message });
    deleteMessage = async (uid: string): Promise<any> =>
        MessageModel.deleteOne({ _id: uid });
}