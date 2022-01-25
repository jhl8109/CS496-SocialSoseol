const express = require("express");
const Likenode = require("../../models/likenode");
const Node = require("../../models/node");
const router = express.Router();

router.post(
    "/likenode",
    async (req, res) => {

        const {likenodeid, nodefrom, writer} = req.body;

        try {
            let likenode = await Likenode.findOne({ nodefrom, writer });
            let node = await Node.findOne({ nodeid:nodefrom });

            if (likenode) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }
            if(!node) {
                return res
                .status(400)
                .json({ errors: [{ msg: "No node" }] });
            }

            likenode = new Likenode ({
                likenodeid, 
                nodefrom, 
                writer
            });

            //update node like
            var like = node.likes;
            like ++;
            node.likes = like;

            await likenode.save();

            await node.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

router.delete(
    "/dislikenode",
    async (req, res) => {

        try {
            let likenode = await Likenode.findOne({ nodefrom:req.query.nodefrom, writer:req.query.writer });
            let node = await node.findOne({ nodeid:req.query.nodefrom})

            if (!likenode) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Didn't like. Cannot dislike." }] });
            }
            if (!node) {
                return res
                .status(400)
                .json({ errors: [{ msg: "No node" }] });
            }
            dislikenode = await Likenode.deleteOne({ nodefrom:req.query.nodefrom, writer:req.query.writer });
            //update node like
            var like = node.likes;
            like --;
            node.likes = like;

            await node.save();

            res.send("Success");
            console.log("success in console");

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);


router.get(
    "/getlikenode",
    async (req, res) => {

        try {
            let getlikenode = await Likenode.findOne({ nodefrom:req.query.nodefrom, writer:req.query.writer });
            if(!getlikenode){
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