<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\SiteInfoController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\FavouriteController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\ProductDetailsController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ForgetController;
use App\Http\Controllers\User\ResetController;
use App\Http\Controllers\User\UserController;
use App\Models\ProductCart;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


 /////////////// User Login API Start ////////////////////////

 // Login Routes 
Route::post('/login',[AuthController::class, 'Login']);

 // Register Routes 
Route::post('/register',[AuthController::class, 'Register']);

 // Forget Password Routes 
Route::post('/forgetpassword',[ForgetController::class, 'ForgetPassword']);

 // Reset Password Routes 
Route::post('/resetpassword',[ResetController::class, 'ResetPassword']);

 // Current User Route 
Route::get('/user',[UserController::class, 'User'])->middleware('auth:api');


 /////////////// End User Login API Start ////////////////////////


 



// Get Visitor 
Route::get('/getvisitor',[VisitorController::class, 'GetVisitorDetails']);
// Contact Page Route
Route::post('/postcontact',[ContactController::class, 'PostContactDetails']);

// Site Infro Route
Route::get('/allsiteinfo',[SiteInfoController::class, 'AllSiteinfo']);

// All Category Route
Route::get('/allcategory',[CategoryController::class, 'AllCategory']);

// ProductList Route
Route::get('/productlistbyremark/{remark}',[ProductListController::class, 'ProductListByRemark']);

Route::get('/productlistbycategory/{category}',[ProductListController::class, 'ProductListByCategory']);

Route::get('/productlistbysubcategory/{category}/{subcategory}',[ProductListController::class, 'ProductListBySubCategory']);

Route::get('/allarticles',[ArticleController::class, 'AllArticles']);
Route::post('/addarticle',[ArticleController::class, 'AddArticle']);
Route::get('/article/{id}', [ArticleController::class, 'getArticle']);
Route::put('/article/{id}', [ArticleController::class, 'updateArticle']);
Route::delete('/article/{id}', [ArticleController::class, 'deleteArticle']);

Route::get('/allcomments',[CommentController::class, 'allComments']);
Route::post('/addcomment',[CommentController::class, 'createComment']);
Route::get('/comment/{article}', [CommentController::class, 'commentsByArticle']);
Route::put('/comment/{id}', [CommentController::class, 'updateComment']);
Route::delete('/comment/{id}', [CommentController::class, 'deleteComment']);



// Slider Route
Route::get('/allslider',[SliderController::class, 'AllSlider']);

// Product Details Route
Route::get('/productdetails/{id}',[ProductDetailsController::class, 'ProductDetails']);

// Notification Route
Route::get('/notification',[NotificationController::class, 'NotificationHistory']);

// Search Route
Route::get('/search/{key}',[ProductListController::class, 'ProductBySearch']);

Route::get('/similar/{subcategory}',[ProductListController::class, 'SimilarProduct']);

Route::post('/addtocart',[ProductCartController::class, 'addToCart']);

Route::get('/cartcount/{email}',[ProductCartController::class, 'CartCount']);

Route::get('/favourite/{product_code}/{email}',[FavouriteController::class, 'AddFavourite']);

Route::get('/favouritelist/{email}',[FavouriteController::class, 'FavouriteList']);

Route::get('/favouriteremove/{product_code}/{email}',[FavouriteController::class, 'FavouriteRemove']);

Route::get('/cartlist/{email}',[ProductCartController::class, 'CartList']);

Route::get('/removecartlist/{id}',[ProductCartController::class, 'RemoveCartList']);

Route::get('/cartitemplus/{id}/{quantity}/{price}',[ProductCartController::class, 'CartItemPlus']);

Route::get('/cartitemminus/{id}/{quantity}/{price}',[ProductCartController::class, 'CartItemMinus']);

Route::post('/cartorder',[ProductCartController::class, 'CartOrder']);

Route::get('/orderlistbyuser/{email}',[ProductCartController::class, 'OrderListByUser']);

Route::post('/postreview',[ReviewController::class, 'PostReview']);

Route::get('/reviewlist/{product_code}',[ReviewController::class, 'ReviewList']);
