import express from "express";
import { addGroup, getAllGroups, getGroupById, joinGroup, joinedGroups, myGroups } from "../controllers/group_controller";
import { upload, verifyToken } from "../common";

const groupRouter = express.Router();

groupRouter.get("/",getAllGroups);
groupRouter.get("/:_id",getGroupById);
groupRouter.post("/add",verifyToken,upload.single("image"),addGroup);
groupRouter.post("/join/:id",verifyToken,joinGroup);
groupRouter.get("/myGroups",verifyToken,myGroups);
groupRouter.get("/joinedGroups",verifyToken,joinedGroups);

export default groupRouter;