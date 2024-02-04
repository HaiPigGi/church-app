<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Dokumentasi</title>
    <!-- Add your CSS styles or other head elements here -->
</head>
<body>

<div class="container">
    <h2>Create Dokumentasi</h2>

    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ route('dokumentasi.store') }}" method="post" enctype="multipart/form-data">
        @csrf

        <div class="form-group">
            <label for="tahun">Tahun:</label>
            <input type="text" name="tahun" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="jenis_kegiatan">Jenis Kegiatan:</label>
            <input type="text" name="jenis_kegiatan" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="images">Images:</label>
            <input type="file" name="images[]" class="form-control-file" multiple accept="image/*">
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>

<!-- Add your scripts or other body elements here -->

</body>
</html>
