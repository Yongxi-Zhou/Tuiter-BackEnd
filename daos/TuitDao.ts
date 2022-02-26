/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} TuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() { }


    /**
     * Uses TuitModel to retrieve all Tuit documents from Tuits collection
     * @returns Promise To be notified when the Tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find()
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitModel to retrieve all Tuit documents from Tuits collection
     * @returns Promise To be notified when the Tuits are retrieved from
     * database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({ postedBy: uid })
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitModel to retrieve single Tuit document from Tuits collection
     * @param {string} uid Tuit's primary key
     * @returns Promise To be notified when Tuit is retrieved from the database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    /**
     * Inserts Tuit instance into the database
     * @param {Tuit} Tuit Instance to be inserted into the database
     * @returns Promise To be notified when Tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({ ...tuit, postedBy: uid });

    /**
     * Updates Tuit with new values in database
     * @param {string} uid Primary key of Tuit to be modified
     * @param {Tuit} Tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when Tuit is updated in the database
     */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            { _id: uid },
            { $set: tuit });

    /**
     * Removes Tuit from the database.
     * @param {string} uid Primary key of Tuit to be removed
     * @returns Promise To be notified when Tuit is removed from the database
     */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({ _id: uid });
}