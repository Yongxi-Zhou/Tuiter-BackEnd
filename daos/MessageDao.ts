/**
 * @file Implements DAO managing data storage of Messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Messages";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
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
    async findMessagedUserSent(uid: string): Promise<Message[]> {
        return await MessageModel.find({ from: uid })
            .populate("to")
            .exec();
    }
    async findMessagedUserReceived(uid: string): Promise<Message[]> {
        return await MessageModel.find({ to: uid })
            .populate("from")
            .exec();
    }

    //post
    async userSentMessagesToAnotherUser(uid: string, auid: string, message: Message): Promise<Message> {
        return await MessageModel.create({ ...message, from: uid, to: auid })
    }

    //delete
    async userDeleteMessage(uid: string, auid: string): Promise<any> {
        return await MessageModel.deleteOne({ from: uid, to: auid })

    }
    async userDeleteAllMessage(uid: string, auid: string): Promise<any> {
        return await MessageModel.deleteMany({ from: uid, to: auid })
    }

    //put
    async updateLastMessage(uid: string, auid: string, message: Message): Promise<any> {
        return await MessageModel.updateOne(
            { from: uid, to: auid },
            { $set: message });
    }
}