<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // Get all articles
    public function allArticles()
    {
        $articles = Article::all();
        return response()->json( $articles, 200);
    }

    // Get a specific article by ID
    public function allArticle($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        return response()->json(['article' => $article], 200);
    }

    // Create a new article
    public function addArticle(Request $request)
    {
        // Validate the JSON data
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
        ]);

        // Create a new article
        $article = Article::create([
            'name' => $request->input('name'),
            'category' => $request->input('category'),
        ]);

        // Return a JSON response with the newly created article
        return response()->json(['message' => 'Article created successfully', 'article' => $article], 201);
    }

    // Update an existing article
    public function updateArticle(Request $request, $id)
    {
        // Find the article by ID
        $article = Article::find($id);

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        // Validate the JSON data for updating
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
        ]);

        // Update the article
        $article->update([
            'name' => $request->input('name'),
            'category' => $request->input('category'),
        ]);

        // Return a JSON response with the updated article
        return response()->json(['message' => 'Article updated successfully', 'article' => $article], 200);
    }

    // Delete an article by ID
    public function deleteArticle($id)
    {
        // Find the article by ID
        $article = Article::find($id);

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        // Delete the article
        $article->delete();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Article deleted successfully'], 204);
    }
}
