<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CartOrder;
use App\Models\ProductCart;
use App\Models\ProductList;
use Illuminate\Http\Request;

class ProductCartController extends Controller
{
    public function addToCart(Request $request)
    {
        $email = $request->input('email');
        $size = $request->input('size');
        $color = $request->input('color');
        $quantity = $request->input('quantity');
        $product_code = $request->input('product_code');
        
        $productDetails = ProductList::where('product_code', $product_code)->get();

        $price = $productDetails[0]['price'];
        $special_price = $productDetails[0]['special_price'];

        if ($special_price == "na") {
            $total_price = floatval($price) * $quantity;
            $unit_price = floatval($price);
        } else {
            $total_price = floatval($special_price) * $quantity;
            $unit_price = floatval($special_price);
        }

        $result = ProductCart::insert([
            'email' => $email,
            'image' => $productDetails[0]['image'],
            'product_name' => $productDetails[0]['title'],
            'product_code' => $productDetails[0]['product_code'],
            'size' => "Size: " . $size,
            'color' => "Color: " . $color,
            'quantity' => $quantity,
            'unit_price' => $unit_price,
            'total_price' => $total_price,
        ]);
        
        return $result;
    }

    public function CartCount(Request $request){
        $email = $request->email;
        $result = ProductCart::where('email',$email)->count();
        return $result;
    }

    public function CartList(Request $request){
        $email = $request->email;
        $result = ProductCart::where('email',$email)->get();
        return $result;
    }

    public function RemoveCartList(Request $request){
        $id = $request->id;
        $result = ProductCart::where('id',$id)->delete();
        return $result;
    }

    public function CartItemPlus(Request $request){
        $id = $request->id;
        $quantity = $request->quantity;
        $price = $request->price;
        $newQuantity = $quantity+1;
        $total_price = $newQuantity*$price;
        $result = ProductCart::where('id',$id)->update(['quantity'=>$newQuantity, 'total_price'=>$total_price]);
        return $result;
    }

    public function CartItemMinus(Request $request){
        $id = $request->id;
        $quantity = $request->quantity;
        $price = $request->price;
        $newQuantity = $quantity-1;
        $total_price = $newQuantity*$price;
        $result = ProductCart::where('id',$id)->update(['quantity'=>$newQuantity, 'total_price'=>$total_price]);
        return $result;
    }

    public function CartOrder(Request $request){
        $city = $request->input('city');
        $payment_method = $request->input('payment_method');
        $name = $request->input('name');
        $email = $request->input('email');
        $delivery_address = $request->input('delivery_address');
        $invoice_no = $request->input('invoice_no');
        $delivery_charge = $request->input('delivery_charge');

        date_default_timezone_set("Asia/Dhaka");
        $request_time = date("h:i:sa");
        $request_date = date("d-m-Y");

        $CartList = ProductCart::where('email',$email)->get();

        foreach($CartList as $CartListItem){
            $resultInsert = CartOrder::insert([
                'invoice_no' => "Easy".$invoice_no,
                'product_name' => $CartListItem['product_name'],
                'product_code' => $CartListItem['product_code'],
                'size' => $CartListItem['size'],
                'color' => $CartListItem['color'],
                'quantity' => $CartListItem['quantity'],
                'unit_price' => $CartListItem['unit_price'],
                'total_price' => $CartListItem['total_price'],
                'email' => $CartListItem['email'],
                'name' => $name,
                'payment_method' => $payment_method,
                'delivery_address' => $delivery_address,
                'city' => $city,
                'delivery_charge' => $delivery_charge,
                'order_date' => $request_date,
                'order_time' => $request_time,
                'order_status' => "Pending",
            ]);

            if($resultInsert==1){
                $resultDelete = ProductCart::where('id',$CartListItem['id'])->delete();
                if($resultDelete==1){
                    $cartInsertDeleteResult = 1;
                }else{
                    $cartInsertDeleteResult = 0;
                }
            }

        }

        return $cartInsertDeleteResult;        
    }

    public function OrderListByUser(Request $request){
        $email = $request->email;
        $result = CartOrder::where('email',$email)->orderBy('id','DESC')->get();
        return $result;
    }

    //Admin Dashboard

    public function PendingOrder(){
        $orders = CartOrder::where('order_status','Pending')->orderBy('id','DESC')->get();
        return view('backend.order.pending_orders',compact('orders'));
    }

    public function ProcessingOrder(){
        $orders = CartOrder::where('order_status','Processing')->orderBy('id','DESC')->get();
        return view('backend.order.processing_orders',compact('orders'));
    }

    public function CompletedOrder(){
        $orders = CartOrder::where('order_status','Completed')->orderBy('id','DESC')->get();
        return view('backend.order.completed_orders',compact('orders'));
    }

    public function OrderDetails($id){
        $order = CartOrder::findOrFail($id);
        return view('backend.order.order_details',compact('order'));
    }

    public function OrderDelete($id)
    {
        CartOrder::findOrFail($id)->delete();

        $notification = array(
            'message' => 'Order Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }

    public function changeOrderStatus($id)
    {
        $cartOrder = CartOrder::findOrFail($id);

        if ($cartOrder->order_status == 'Pending') {
            $cartOrder->update(['order_status' => 'Processing']);
        } else {
            $cartOrder->update(['order_status' => 'Completed']);
        }

        $notification = array(
            'message' => 'Order Status Changed Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }
}