import { Router } from "express";
import { 
    registerUser,
    loginUser,
    home, 
    deleteUser
} from "../controllers/auth-controller";


const router = Router();

router.get("/register", registerUser);
router.get("/login", loginUser);
router.get("/home/:user", home);
router.get("/delete", deleteUser);

export default router;