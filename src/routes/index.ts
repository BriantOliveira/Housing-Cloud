import { Router } from "express";
import { getUserById, patchUser, deleteUser } from "../controllers/user";

const router = Router();

router.get("/user/:id", getUserById);
router.patch("/user/:id", patchUser);
router.delete("/user/:id", deleteUser);

export default router;
