import express from 'express';
import { deleteUser, getAllUser, getStaffs, getStudents, getTeachers, login, signUp, update } from '../controllers/user_controller';
import { upload, verifyToken } from '../common';
const router = express.Router();

router.get("/",getAllUser);
router.post("/register",upload.single("profile"),signUp);
router.post("/login",login);
router.get("/getStudents",getStudents);
router.get("/getTeachers",getTeachers);
router.get("/getStaffs",getStaffs);
router.put("/update",verifyToken,update);
router.delete("/",verifyToken,deleteUser);

export default router;