<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function allComments()
    {
        $comments = Comment::all();
        return response()->json( $comments, 200);
    }

    public function createComment(Request $request)
    {
        // Validate the JSON data
        $request->validate([
            'message' => 'required|string',
            'article' => 'required|string',    
        ]);

        // Create a new comment
        $comment = Comment::create([
            'message' => $request->input('message'),
            'article' => $request->input('article'),
        ]);

        // Return a JSON response with the newly created comment
        return response()->json(['message' => 'Comment created successfully', 'comment' => $comment], 201);
    }

    // Update an existing comment
    public function updateComment(Request $request, $id)
    {
        // Find the comment by ID
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        // Validate the JSON data for updating
        $request->validate([
            'message' => 'required|string',
            'article' => 'required|string',

        ]);

        // Update the comment
        $comment->update([
            'message' => $request->input('message'),
            'article' => $request->input('article'),

        ]);

        // Return a JSON response with the updated comment
        return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment], 200);
    }

    // Get comments by article ID
    public function commentsByArticle($article)
    {
        $comments = Comment::where('article', $article)->get();
        return response()->json($comments, 200);
    }

    // Delete a comment by ID
    public function deleteComment($id)
    {
        // Find the comment by ID
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        // Delete the comment
        $comment->delete();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Comment deleted successfully'], 204);
    }
}