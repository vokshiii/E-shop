@extends('admin.admin_master')
@section('admin')

<!-- To show image on upload -->
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
                        <li class="breadcrumb-item active" aria-current="page">Add New Product</li>
                    </ol>
                </nav>
            </div>
        </div>
        <!--end breadcrumb-->

        <div class="card">
            <div class="card-body p-4">
                <h5 class="card-title">Add New Product</h5>
                <hr>
                <div class="form-body mt-4">
                    <form method="post" action="{{ route('product.store') }}" enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="border border-3 p-4 rounded">

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Product Title</label>
                                        <input type="text" name="title" class="form-control" id="inputProductTitle" placeholder="Enter product title">
                                        @error('title')
                                        <span class="text-danger">{{$message}}</span>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="inputProductTitle" class="form-label">Product Code</label>
                                        <input type="text" name="product_code" class="form-control" id="inputProductTitle" placeholder="Enter product title">
                                        @error('product_code')
                                        <span class="text-danger">{{$message}}</span>
                                        @enderror
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <img id="showImage" src="{{ url('upload/no_image.jpg') }}" style="width:80; height: 80px;">
                                        </div>
                                        <div class="col-sm-9">
                                            <label for="image" class="form-label">Product Thumbnail </label>
                                            <input class="form-control" name="image" type="file" id="image">
                                            @error('image')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-sm-9">
                                            <label for="image1" class="form-label">Image One</label>
                                            <input class="form-control" name="image_one" type="file" id="image1">
                                            @error('image_one')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>
                                        <div class="col-sm-3">
                                            <img id="showImage1" src="{{ url('upload/no_image.jpg') }}" style="width:80px; height: 80px;">
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-sm-9">
                                            <label for="image2" class="form-label">Image Two</label>
                                            <input class="form-control" name="image_two" type="file" id="image2">
                                            @error('image_two')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>
                                        <div class="col-sm-3">
                                            <img id="showImage2" src="{{ url('upload/no_image.jpg') }}" style="width:80px; height: 80px;">
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-sm-9">
                                            <label for="image3" class="form-label">Image Three</label>
                                            <input class="form-control" name="image_three" type="file" id="image3">
                                            @error('image_three')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>
                                        <div class="col-sm-3">
                                            <img id="showImage3" src="{{ url('upload/no_image.jpg') }}" style="width:80px; height: 80px;">
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-sm-9">
                                            <label for="image4" class="form-label">Image Four</label>
                                            <input class="form-control" name="image_four" type="file" id="image4">
                                            @error('image_four')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>
                                        <div class="col-sm-3">
                                            <img id="showImage4" src="{{ url('upload/no_image.jpg') }}" style="width:80px; height: 80px;">
                                        </div>
                                    </div>


                                    <div class="mb-3">
                                        <label for="inputProductDescription" class="form-label">Short Description</label>
                                        <textarea name="short_description" class="form-control" id="inputProductDescription" rows="3"></textarea>
                                        @error('short_description')
                                        <span class="text-danger">{{$message}}</span>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="inputProductDescription" class="form-label">Long Description</label>
                                        <textarea id="mytextarea" name="long_description">Hello, World!</textarea>
                                    </div>

                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="border border-3 p-4 rounded">
                                    <div class="row g-3">

                                        <div class="col-md-6">
                                            <label for="inputPrice" class="form-label">Price</label>
                                            <input type="text" name="price" class="form-control" id="inputPrice" placeholder="00.00">
                                            @error('price')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>

                                        <div class="col-md-6">
                                            <label for="inputCompareatprice" class="form-label">Special Price</label>
                                            <input type="text" name="special_price" class="form-control" id="inputCompareatprice" placeholder="00.00">
                                        </div>


                                        <div class="col-12">
                                            <label for="categoryList" class="form-label">Product Category</label>
                                            <select name="category" class="form-select" id="categoryList">
                                                <option disabled selected="">Select Category</option>
                                                @foreach($categories as $category)
                                                <option value="{{ $category->category_name }}">{{ $category->category_name }}</option>
                                                @endforeach
                                            </select>
                                            @error('category')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>

                                        <div class="col-12">
                                            <label for="subcategoryList" class="form-label">Product SubCategory</label>
                                            <select name="subcategory" class="form-select" id="subcategoryList" required disabled>
                                                <option disabled selected="">Select SubCategory</option>
                                                @foreach($subcategories as $subcategory)
                                                <option value="{{ $subcategory->subcategory_name }}" class='subcategory parent-{{ $subcategory->category_name }} '>{{ $subcategory->subcategory_name }}</option>
                                                @endforeach
                                            </select>
                                            @error('subcategory')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>

                                        <div class="col-12">
                                            <label for="brand" class="form-label">Brand</label>
                                            <input type="text" name="brand" class="form-control" id="brand" placeholder="Enter a Brand">
                                        </div>


                                        <div class="mb-3">
                                            <label class="form-label">Product Size</label>
                                            <input type="text" name="size" class="form-control visually-hidden" data-role="tagsinput" value="S,M,L,XL">
                                            @error('size')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Product Color</label>
                                            <input type="text" name="color" class="form-control visually-hidden" data-role="tagsinput" value="Red,White,Black">
                                            @error('color')
                                            <span class="text-danger">{{$message}}</span>
                                            @enderror
                                        </div>


                                        <div class="form-check">
                                            <label class="form-check-label" for="1">FEATURED</label>
                                            <input class="form-check-input" name="remark" type="radio" value="FEATURED" id="1">
                                        </div>
                                        <div class="form-check">
                                            <label class="form-check-label" for="2">NEW</label>
                                            <input class="form-check-input" name="remark" type="radio" value="NEW" id="2">
                                        </div>
                                        <div class="form-check">
                                            <label class="form-check-label" for="3">COLLECTION</label>
                                            <input class="form-check-input" name="remark" type="radio" value="COLLECTION" id="3">
                                        </div>

                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="submit" class="btn btn-primary">Save Product</button>
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

        $('#image1').change(function(e) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#showImage1').attr('src', e.target.result);
            }
            reader.readAsDataURL(e.target.files['0']);
        });

        $('#image2').change(function(e) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#showImage2').attr('src', e.target.result);
            }
            reader.readAsDataURL(e.target.files['0']);
        });

        $('#image3').change(function(e) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#showImage3').attr('src', e.target.result);
            }
            reader.readAsDataURL(e.target.files['0']);
        });

        $('#image4').change(function(e) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#showImage4').attr('src', e.target.result);
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
    $('#categoryList').on('change', function() { //If is selected an Category 
        $("#subcategoryList").attr('disabled', false); //then enable subcategory select
        $(".subcategory").attr('disabled', true); //then disable all subcategory options
        $(".subcategory").hide(); //and hide them(all subcategory options)
        var selectedCategory = $(this).val(); //Wich category is selected
        $(".parent-" + selectedCategory).attr('disabled', false); //enable subcategories of selected category / 
        $(".parent-" + selectedCategory).show(); //and show them
    });
</script>

@endsection