<?php

$_lang['area_afv_main'] = 'Основные';
$_lang['area_afv_frontend'] = 'Фронт-энд';
$_lang['area_afv_status'] = 'Статусы';
$_lang['area_afv_email'] = 'Email';

// Main
$_lang['setting_afv_manager_emails'] = 'Ящики менеджеров';
$_lang['setting_afv_manager_emails_desc'] = 'Укажите почтовые ящики менеджеров через запятую.';

// Frontend
$_lang['setting_afv_frontend_js'] = 'JS фронтенда';
$_lang['setting_afv_frontend_js_desc'] = 'Путь к JS файлу компонента. Если вы хотите использовать собственные скрипты - укажите путь к ним здесь, или очистите параметр и загрузите их вручную через шаблон сайта.';

$_lang['setting_afv_frontend_css'] = 'CSS фронтенда';
$_lang['setting_afv_frontend_css_desc'] = 'Путь к CSS файлу компонента. Если вы хотите использовать собственные стили - укажите путь к ним здесь, или очистите параметр и загрузите их вручную через шаблон сайта.';

// Status
foreach (
    array(
        1 => 'Новый',
        2 => 'Принят',
        3 => 'Подтверждён',
        4 => 'Отклонён',
    ) as $k => $v
) {
    $_lang['setting_afv_status_' . $k . '_subj_tpl'] = 'Заголовок письма статуса "' . $v . '"';
    $_lang['setting_afv_status_' .
           $k .
           '_subj_tpl_desc'] = 'Укажите чанк для заголовка письма, которое будет выслано при смене статуса на "' .
                               $v .
                               '".';

    $_lang['setting_afv_status_' . $k . '_body_tpl'] = 'Шаблон письма статуса "' . $v . '"';
    $_lang['setting_afv_status_' .
           $k .
           '_body_tpl_desc'] = 'Укажите чанк для письма, которое будет выслано при смене статуса на "' . $v . '".';
}

// Email
$_lang['setting_afv_email_from'] = 'Исходящий почтовый ящик';
$_lang['setting_afv_email_from_desc'] = 'Укажите почтовый ящик, который будет указан в качестве исходящего ящика.';

$_lang['setting_afv_email_name'] = 'Имя отправителя';
$_lang['setting_afv_email_name_desc'] = 'Укажите имя отправителя, которое будет указано в исходящем письме.';