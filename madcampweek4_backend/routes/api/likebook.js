const express = require("express");
const Likebook = require("../../models/likebook");
const Book = require("../../models/book");
const router = express.Router();

router.post(
    "/likebook",
    async (req, res) => {

        const {likebookid, bookfrom, writer} = req.body;

        try {
            let likebook = await Likebook.findOne({ bookfrom, writer });
            let book = await Book.findOne({ bookid:req.body.bookfrom})

            if (likebook) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Already did like" }] });
            }
            if (!book) {
                return res
                .status(400)
                .json({ errors: [{ msg: "No book" }] });
            }

            likebook = new Likebook ({
                likebookid, 
                bookfrom, 
                writer
            });
            //update book like
            var like = book.likes;
            like ++;
            book.likes = like;

            await likebook.save();

            await book.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

router.delete(
    "/dislikebook",
    async (req, res) => {

        try {
            let likebook = await Likebook.findOne({ bookfrom:req.query.bookfrom, writer:req.query.writer });
            let book = await Book.findOne({ bookid:req.query.bookfrom})

            if (!likebook) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Didn't like. Cannot dislike." }] });
            }
            if (!book) {
                return res
                .status(400)
                .json({ errors: [{ msg: "No book" }] });
            }
            dislikebook = await Likebook.deleteOne({ bookfrom:req.query.bookfrom, writer:req.query.writer });
            //update book like
            var like = book.likes;
            like --;
            book.likes = like;

            await book.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);


router.get(
    "/getlikebook",
    async (req, res) => {

        try {
            let getlikebook = await Likebook.findOne({ bookfrom:req.query.bookfrom, writer:req.query.writer });
            if(!getlikebook){
                return res
                .status(400)
                .json({ like: false });
            }else{
                return res
                .status(400)
                .json({ like: true });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);



module.exports = router;