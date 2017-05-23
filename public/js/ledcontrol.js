<button class="btn btn-success">Install</button>

// Client Side Ajax Script
<script>
    $('button').click(function () {
        $.post('/ledcontrol', {data: 'blah'}, function (data) {
        console.log(data);
      });
    }, 'json');
</script>
