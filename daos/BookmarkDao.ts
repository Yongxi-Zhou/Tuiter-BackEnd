/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose bookmarkModel
 * to integrate with MongoDB
 */
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
/**
 * @class bookmarkDao Implements Data Access Object managing data storage
 * of bookmarks
 * @property {bookmarkDao} bookmarkDao Private single instance of bookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns bookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() { }
    //get
    /**
     * Uses bookmarkModel to retrieve all bookmark documents from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    async findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel
            .find({ bookmarkedBy: uid })
            .populate("bookmarkedTuit")
            .exec();
    }
    /**
     * Uses bookmarkModel to retrieve single bookmark document from bookmarks collection
     * @param {string} uid bookmark's primary key
     * @returns Promise To be notified when bookmark is retrieved from the database
     */
    async findAUserBookmarksTuit(uid: string, tid: string): Promise<Bookmark[]> {
        return await BookmarkModel
            .find({ bookmarkedTuit: tid, bookmarkedBy: uid })
            .populate("bookmarkedBy")
            .exec();
    }

    /**
     * Uses bookmarkModel to retrieve single bookmark document from bookmarks collection
     * @param {string} uid bookmark's primary key
     * @returns Promise To be notified when bookmark is retrieved from the database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({ bookmarkedTuit: tid })
            .populate("bookmarkedBy")
            .exec();

    //post
    /**
     * Inserts bookmark instance into the database
     * @param {bookmark} bookmark Instance to be inserted into the database
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({ bookmarkedBy: uid, bookmarkedTuit: tid });

    //delete
    /**
     * Removes bookmark from the database.
     * @param {string} uid Primary key of bookmark to be removed
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ bookmarkedBy: uid, bookmarkedTuit: tid });
}