import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() { }
    //get
    async findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel
            .find({ bookmarkedBy: uid })
            .populate("bookmarkedTuit")
            .exec();
    }
    async findAUserBookmarksTuit(uid: string, tid: string): Promise<Bookmark[]> {
        return await BookmarkModel
            .find({ bookmarkedTuit: tid, bookmarkedBy: uid })
            .populate("bookmarkedBy")
            .exec();
    }
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({ bookmarkedTuit: tid })
            .populate("bookmarkedBy")
            .exec();

    //post
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({ bookmarkedBy: uid, bookmarkedTuit: tid });

    //delete
    userUnBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ bookmarkedBy: uid, bookmarkedTuit: tid });
}