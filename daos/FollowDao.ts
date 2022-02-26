/**
 * @file Implements DAO managing data storage of follows. Uses mongoose followModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class followDao Implements Data Access Object managing data storage
 * of follows
 * @property {followDao} followDao Private single instance of followDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns followDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() { }

    //get
    /**
     * Uses followModel to retrieve all following documents from follows collection
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllFollowingUser = async (uid: string): Promise<Follow[]> =>
        await FollowModel.find({ userFollowing: uid }).exec()

    /**
     * Uses followModel to retrieve all followed documents from follows collection
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllFollowedUser = async (uid: string): Promise<Follow[]> =>
        await FollowModel.find({ userFollowed: uid }).exec()


    // post
    /**
     * Inserts follow instance into the database
     * @param {follow} follow Instance to be inserted into the database
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsAnotherUser = async (uid: string, auid: string): Promise<Follow> => {
        return await FollowModel.create({ userFollowed: uid, userFollowing: auid })
    }

    //delete
    /**
     * Removes follow from the database.
     * @param {string} uid Primary key of follow to be removed
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsAnotherUser = async (uid: string, auid: string): Promise<any> =>
        await FollowModel.deleteOne({ userFollowed: uid, userFollowing: auid })

    /**
     * Removes all follows from the database. Useful for testing
     * @returns Promise To be notified when all follows are removed from the
     * database
     */
    userRemoveAllFollower = async (uid: string): Promise<any> =>
        await FollowModel.deleteMany({ userFollowed: uid })

    /**
     * Removes all follows from the database. Useful for testing
     * @returns Promise To be notified when all follows are removed from the
     * database
     */
    userRemoveAllFollowing = async (uid: string): Promise<any> =>
        await FollowModel.deleteMany({ userFollowing: uid })

}