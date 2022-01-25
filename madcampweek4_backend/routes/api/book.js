const express = require("express");
const Book = require("../../models/book");
const Node = require("../../models/node");
const router = express.Router();

router.post(
    "/book",
    async (req, res) => {

        const {bookid, bookname, writer, category, genre, view, likes,content} = req.body;

        try {
            let book = await Book.findOne({ bookid });

            if (book) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            book = new Book ({
                bookid, 
                bookname, 
                writer, 
                category,
                genre,
                view,
                likes,
                content
            });

            await book.save();

            res.send(book);
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

//특정 book 좋아요 개수 반환
router.post(
    "/getlikebook",
    async (req, res) => {
        try{
            let getlikebook = await Book.findOne({ bookid:req.body.bookid });
            
            if(!getlikebook){
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Book doesn't exists" }] });
            }

            res
            .status(200)
            .json({
                likes: getlikebook.likes
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

//CATEGORY 만족하는 book 반환(최신순)
router.get(
    "/categorybook",
    async (req, res) => {
        try{
            let categorybook = await Book.find({category:req.query.category}).sort({bookid:'desc'});
            if(categorybook.length==0){
                return res
                    .status(400)
                    .json({ errors: [{ msg: "No such book exists" }] });
            }
            res
                .status(200)
                .json({
                    categorybook
                });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);
//CATEGORY 만족하는 book 반환(좋아요)
router.get(
    "/categorybooklike",
    async (req, res) => {
        try{
            let categorybook = await Book.find({category:req.query.category}).sort({likes:'desc'});
            if(categorybook.length==0){
                return res
                    .status(400)
                    .json({ errors: [{ msg: "No such book exists" }] });
            }
            res
                .status(200)
                .json({
                    categorybook
                });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);
//Book의 첫 노드 내용 반환
router.get(
    "/getfirstnode",
    async (req, res) => {
        try{
            let getfirstnode = await Node.findOne({ bookfrom:req.query.bookfrom, postid:0});
            console.log(getfirstnode.length);

            if(getfirstnode.length==0){
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Next first node doesn't exists" }] });
            }

            res
            .status(200)
            .json({
                content:getfirstnode.content
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);
router.put(
    "/viewbook",
    async (req, res) => {
        try {
            let book = await Book.findOne({ bookid:req.query.bookid})

            if (!book) {
                return res
                .status(400)
                .json({ errors: [{ msg: "No book" }] });
            }

            //update book view
            var view = book.view;
            view ++;
            book.view = view;

            await book.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;