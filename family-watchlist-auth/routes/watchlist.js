import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import { addMovie, deleteMovie, getWatchlist, updateMovie } from "../utils/db.js";

const router = express.Router();

router.get("/:userId", authenticate, (req, res)=>{
    const userId = req.params.userId;
    const watchlist = getWatchlist(userId);
    res.status(200).json(watchlist);
})

router.post("/:userId/movies", authenticate, authorizeModification, (req, res)=>{
    const userId = req.params.userId;

    const movie = addMovie(userId, req.body);
    if (!movie) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(201).json(movie);
})

router.put("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res)=>{
    const movieId = Number(req.params.movieId);
    const userId = req.params.userId;
    const movie = updateMovie(userId, movieId, req.body);
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(200).json(movie);
})

router.delete("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res)=>{
    const movieId = Number(req.params.movieId);
    const userId = req.params.userId;
    const removed = deleteMovie(userId, movieId);
    if (!removed) {
        return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json({ message: "Movie removed" });
})

export default router