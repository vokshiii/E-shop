@extends('admin.admin_master')
@section('admin')

<div class="page-wrapper">
    <div class="page-content">
        <div class="card radius-10">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0">Chatbot Data</h5>
                    </div>
                    <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i></div>
                </div>
                <hr>
                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>SL</th>
                                <th>Question</th>
                                <th>Response</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="chatbot-table"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: 'https://localhost:7011/api/Chatbot',
            success: function (response) {
                var tableBody = $('#chatbot-table tbody'); // Get the table body element

                $.each(response, function (index, item) {
                    // Create a new row for each item in the response
                    var row = $('<tr>');
                    row.append($('<td>').text(index + 1));
                    row.append($('<td>').html('<img src="' + item.category_image + '" alt="">'));
                    row.append($('<td>').text(item.category_name));
                    row.append($('<td>').html('<a href="' + item.edit_url + '" class="btn btn-info">Edit</a> <a href="' + item.delete_url + '" class="btn btn-danger" id="delete">Delete</a>'));

                    tableBody.append(row); // Append the row to the table body
                });
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText); // Optional: Log the error response
                alert('An error occurred while fetching chatbot data'); // Display an error message
            }
        });
    });
</script>

@endsection
