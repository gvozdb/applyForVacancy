<form action="" method="POST" class="ajax_form afv-form">
    <input type="hidden" name="resource" value="[[+id]]">
    <button type="submit" class="afv-form__btn">Откликнуться на вакансию</button>
    <div class="afv-form__failure error_resource"></div>
</form>
<div class="afv-form__success" style="display: none;">
    Отклик успешно отправлен!
</div>

<script>
    $(document).on('af_complete', function (e, resp) {
        var form = resp['form'];
        if (form.hasClass('afv-form')) {
            form.hide();
            var $success = $(form.next());
            if ($success.length && $success.hasClass('afv-form__success')) {
                $success.show();
            }
        }
    });
</script>