@extends('admin.admin_master')
@section('admin')

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Input Tags at add Products -->
<link href="{{ asset('backend/assets/plugins/input-tags/css/tagsinput.css') }}" rel="stylesheet" />

<div class="page-wrapper">
    <div class="page-content">

        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">eCommerce</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Product</li>
                    </ol>
                </nav>
            </div>

        </div>
        <!--end breadcrumb-->

        <div class="card">
            <div class="card-body p-4">
                <h5 class="card-title">Edit Product</h5>
                <hr>
                <div class="form-body mt-4">

                    <form method="post" action="{{ route('product.update') }}" enctype="multipart/form-data">
                        @csrf
                        <input type="hidden" name="id" value="{{ $product->id }}">

                        <div class="row">
                            <div class="col-lg-8">
                                <div class="border border-3 p-4 rounded">

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Product Title</label>
                                        <input type="text" name="title" class="form-control" id="inputProductTitle" value="{{ $product->title }}">
                                    </div>
                                    @error('title')
                                    <span class="text-danger">{{$message}}</span>
                                    @enderror

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Product Code</label>
                                        <input type="text" name="product_code" class="form-control" id="inputProductTitle" value="{{ $product->product_code }}">
                                    </div>
                                    @error('product_code')
                                    <span class="text-danger">{{$message}}</span>
                                    @enderror

                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Product Thumbnail </label>
                                        <input class="form-control" name="image" type="file" id="image">
                                        @error('image')
                                        <span class="text-danger">{{$message}}</span>
                                        @enderror
                                    </div>
                                    <div class="mb-3">
                                        <img id="showImage" src="{{ asset($product->image ) }}" style="width:100px; height: 100px;">
                                    </div>


                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Image One</label>
                                        <input class="form-control" name="image_one" type="file">
                                        @error('image_one')
                                        <span class="text-danger">{{$message}}</span>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Image Two</label>
                                        <input class="form-control" name="image_two" type="file">
                                        @error('image_two')
                                        <span class="text-danger">{{$message}}</span>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Image Three</label>
                                        <input class="form-control" name="image_three" type="file">
                                        @error('image_three')
                                        <span class="text-danger">{{$message}}</span>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Image Four</label>
                                        <input class="form-control" name="image_four" type="file">
                                        @error('image_four')
                                        <span class="text-danger">{{$message}}</span>
                                        @enderror
                                    </div>

                                    @foreach($details as $item)
                                    <div class="mb-3">
                                        <label for="inputProductDescription" class="form-label">Short Description</label>
                                        <textarea name="short_description" class="form-control" id="inputProductDescription" rows="3">
                                        {{ $item->short_description }} 
                                        </textarea>
                                        @error('short_description')
                                        <span class="text-danger">{{$message}}</span>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="inputProductDescription" class="form-label">Long Description</label>
                                        <textarea id="mytextarea" name="long_description">
                                        {{ $item->long_description }} 
                                        </textarea>
                                    </div>
                                    @endforeach
                                </div>
                            </div>


                            <div class="col-lg-4">
                                <div class="border border-3 p-4 rounded">
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label for="inputPrice" class="form-label">Price</label>
                                            <input type="text" name="price" class="form-control" id="inputPrice" value="{{ $product->price }}">
                                            @error('price')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>

                                        <div class="col-md-6">
                                            <label for="inputCompareatprice" class="form-label">Special Price</label>
                                            <input type="text" name="special_price" class="form-control" id="inputCompareatprice" value="{{ $product->special_price }}">
                                        </div>


                                        <div class="col-12">
                                            <label for="categoryList" class="form-label">Product Category </label>
                                            <select name="category" class="form-select" id="categoryList">
                                                @foreach($category as $item)
                                                <option value="{{ $item->category_name }} " {{ $item->category_name == $product->category ? 'selected': '' }}> {{ $item->category_name }} </option>
                                                @endforeach
                                            </select>
                                            @error('category')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>

                                        <div class="col-12">
                                            <label for="subcategoryList" class="form-label">Product SubCategory</label>
                                            <select name="subcategory" class="form-select" id="subcategoryList" required>
                                                <option value="Select SubCategory" disabled>Select SubCategory</option>
                                                @foreach($subcategory as $item)
                                                <option class='subcat parent-{{ $item->category_name }}' value="{{ $item->subcategory_name }}" {{ $item->subcategory_name == $product->subcategory ? 'selected': '' }}> {{ $item->subcategory_name }}</option>
                                                @endforeach
                                            </select>
                                            @error(' subcategory') <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>

                                        <div class="col-12">
                                            <label for="brand" class="form-label">Brand</label>
                                            <input type="text" name="brand" class="form-control" id="brand" value="{{ $product->brand }}">
                                        </div>

                                        @foreach($details as $item)
                                        <div class="mb-3">
                                            <label class="form-label">Product Size</label>
                                            <input type="text" name="size" class="form-control visually-hidden" data-role="tagsinput" value="{{ $item->size }}">
                                            @error('size')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Product Color</label>
                                            <input type="text" name="color" class="form-control visually-hidden" data-role="tagsinput" value="{{ $item->color }}">
                                            @error('color')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>
                                        @endforeach

                                        <div class="form-check">
                                            <input class="form-check-input" name="remark" type="radio" value="FEATURED" id="1" {{ $product->remark == 'FEATURED' ? 'checked' : '' }}>
                                            <label class="form-check-label" for="1">FEATURED</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" name="remark" type="radio" value="NEW" id="2" {{ $product->remark == 'NEW' ? 'checked' : '' }}>
                                            <label class="form-check-label" for="2">NEW</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" name="remark" type="radio" value="COLLECTION" id="3" {{ $product->remark == 'COLLECTION' ? 'checked' : '' }}>
                                            <label class="form-check-label" for="3">COLLECTION</label>
                                        </div>

                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="submit" class="btn btn-primary">Update Product</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        $('#image').change(function(e) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#showImage').attr('src', e.target.result);
            }
            reader.readAsDataURL(e.target.files['0']);

        });
    });
</script>

<script src='https://cdn.tiny.cloud/1/vdqx2klew412up5bcbpwivg1th6nrh3murc6maz8bukgos4v/tinymce/5/tinymce.min.js' referrerpolicy="origin">
</script>
<script>
    tinymce.init({
        selector: '#mytextarea'
    });
</script>

<script src="{{ asset('backend/assets/plugins/input-tags/js/tagsinput.js') }}"></script>

<script>
    $(document).ready(function() {
        $(".subcat").attr('disabled', true); // disable all subcategory options
        $(".subcat").hide(); //and hide them(all subcategory options)
        var selectedCategory = $("#categoryList").val(); //Wich category is selected
        $(".parent-" + selectedCategory).attr('disabled', false); //enable subcategories of selected category / 
        $(".parent-" + selectedCategory).show(); //and show them
    });

    $('#categoryList').on('click', function() { //If is selected any Category 
        $("#subcategoryList").val("Select SubCategory"); //show Select SubCategory option
        $(".subcat").attr('disabled', true); //then disable all subcategory options
        $(".subcat").hide(); //and hide them(all subcategory options)
        var selectedCategory = $(this).val(); //Wich category is selected
        $(".parent-" + selectedCategory).attr('disabled', false); //enable subcategories of selected category / 
        $(".parent-" + selectedCategory).show(); //and show them
    });
</script>

@endsection