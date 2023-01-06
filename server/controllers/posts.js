import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export const getPosts = async (req,res) => {
    // res.send('This Works');
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost= async (req,res)=>{
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message});
    }

    res.send('Post creation');
}

export const updatePost = async(req,res)=>{
    const {id:_id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Post with the ID not found");
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true});
    res.json(updatedPost);
}

export const deletePost = async(req,res)=>{
    const {id} = req.params;
    console.log("\n\n\nDelete post has reached\n\n\n");
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Post with the ID not found");
    await PostMessage.findByIdAndDelete(id);
    res.json({message:"Post deleted successfully"})
}