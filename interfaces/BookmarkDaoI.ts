import Bookmark from "../models/Bookmarks/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    //get
    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;
    findAUserBookmarksTuit(uid: string, tid: string): Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]>;

    //post
    userBookmarksTuit(tid: string, uid: string): Promise<Bookmark>;
    //delete
    userUnBookmarksTuit(tid: string, uid: string): Promise<any>;

};