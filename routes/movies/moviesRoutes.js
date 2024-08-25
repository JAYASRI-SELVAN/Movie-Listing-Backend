const express = require("express");
const router = express.Router();
const Movie = require("../../db/schemas/movieSchema");
router.get("/", async(req,res) => {
    const movies = await Movie.find();
    res.json(movies);
});
router.get("/", async(req,res) => {
    const queryParams = req.query;
    const filters ={};
    if(queryParams.name){
        filters.name={
            $regex:`^$(queryParams.name)`,
            options:"i",
        };
    }
if(queryParams.rating){
    filters.rating={
        $gte:parseFloat(queryParams.rating),
    };
}
const movies = await Movie.find(filters);
res.json(movies);
});
router.post("/", async(req,res) => {
    try{
        console.log(req.body);
        const movieData = req.body;
        const newMovie = new Movie(movieData);
        await newMovie.save();
        res.json({
            message:"Movie added successfully",
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Internal server error",
    })
}
})
router.put("/:id",async(req,res) => {
    try {
        const movieID =req.params.id;
        const updateMovieData = req.body;
        await Movie.findByIdAndUpdate(movieID,updateMovieData);
        res.json({
            message:"Movie updated successfully",
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Internal server error",
    })
}
})
router.delete("/:id",async(req,res) => {
    try {
        const movieId=req.params.id;
        const deleteMovieData = req.body;
        await Movie.findByIdAndDelete(movieId,deleteMovieData);
        res.json({
            message:"Movie deleted successfully",
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Internal server error",
    })
}
})
router.get("/:id",async(req,res) => {
    try {
        const movieId=req.params.id;
        const updateMovieData = req.body;
        await Movie.findByIdAndDelete(movieId);
        res.json(movie);
} catch (error) {
    if(error.kind ==="ObjectId"){
        res.status(404).json({message:"Movie not found"})
    } else {
        res.status(500).json({message:"Internal server error"})
    }
}
});
module.exports=router;
