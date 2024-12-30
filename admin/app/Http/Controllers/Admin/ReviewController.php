<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductReview;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function ReviewList(Request $request){
        $product_code = $request->product_code;
        $result = ProductReview::where('product_code',$product_code)->orderBy('id', 'desc')->limit(4)->get();
        return $result;
    }

    public function PostReview(Request $request){
        $product_name = $request->input('product_name');
        $product_code = $request->input('product_code');
        $user_name = $request->input('reviewer_name');
        $reviewer_photo = $request->input('reviewer_photo');
        $reviewer_rating = $request->input('reviewer_rating');
        $reviewer_comment = $request->input('reviewer_comment');
        $product_name = $request->input('product_name');

        $result = ProductReview::insert([
            'product_name' => $product_name,
            'product_code' => $product_code,
            'reviewer_name' => $user_name,
            'reviewer_photo' => $reviewer_photo,
            'reviewer_rating' => $reviewer_rating,
            'reviewer_comment' => $reviewer_comment,
        ]);



        return $result;
    }

    public function GetAllReview(){
        $review = ProductReview::latest()->get();
        return view('backend.review.review_all',compact('review'));
    }
    public function DeleteReview($id){
        ProductReview::findOrFail($id)->delete();
        $notification = [
            'message' => 'Review Deleted Successfully',
            'alert_type' => 'success',
        ];
        return redirect()
            ->back()
            ->with($notification);
    }
}
