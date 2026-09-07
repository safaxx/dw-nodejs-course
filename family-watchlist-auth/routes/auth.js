import express from "express";
import { findByUsername } from "../utils/db.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";



const router = express.Router();

router.post("/login", async (req, res)=>{
    const { password, username } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    const user = findByUsername(username);
    if(!user){
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);   
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = signToken({ id: user.id, role: user.role });
    res.status(200).json({ token });
  })

  export default router;