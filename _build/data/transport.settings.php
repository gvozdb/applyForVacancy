<?php
/** @var modX $modx */
/** @var array $sources */

$settings = array();
$tmp = array(
    'main' => array(
        'manager_emails' => array(
            'xtype' => 'textfield',
            'value' => '',
        ),
    ),
    'frontend' => array(
        // 'frontend_css' => array(
        //     'xtype' => 'textfield',
        //     'value' => '[[+cssUrl]]web/default.css',
        // ),
        // 'frontend_js' => array(
        //     'xtype' => 'textfield',
        //     'value' => '[[+jsUrl]]web/default.js',
        // ),
    ),
    'status' => array(
        'status_1_subj_tpl' => array(
            'xtype' => 'textfield',
            'value' => '@INLINE Статус изменён на {$status_name}',
        ),
        'status_1_body_tpl' => array(
            'xtype' => 'textfield',
            'value' => '@INLINE Статус изменён на "{$status_name}". Письмо предназначено для {$recipient}.',
        ),
        'status_2_subj_tpl' => array(
            'xtype' => 'textfield',
            'value' => '@INLINE Статус изменён на {$status_name}',
        ),
        'status_2_body_tpl' => array(
            'xtype' => 'textfield',
            'value' => '@INLINE Статус изменён на "{$status_name}". Письмо предназначено для {$recipient}.',
        ),
        'status_3_subj_tpl' => array(
            'xtype' => 'textfield',
            'value' => '@INLINE Статус изменён на {$status_name}',
        ),
        'status_3_body_tpl' => array(
            'xtype' => 'textfield',
            'value' => '@INLINE Статус изменён на "{$status_name}". Письмо предназначено для {$recipient}.',
        ),
        'status_4_subj_tpl' => array(
            'xtype' => 'textfield',
            'value' => '@INLINE Статус изменён на {$status_name}',
        ),
        'status_4_body_tpl' => array(
            'xtype' => 'textfield',
            'value' => '@INLINE Статус изменён на "{$status_name}". Письмо предназначено для {$recipient}.',
        ),
    ),
    'email' => array(
        'email_from' => array(
            'xtype' => 'textfield',
            'value' => '',
        ),
        'email_name' => array(
            'xtype' => 'textfield',
            'value' => '',
        ),
    ),
);

foreach ($tmp as $area => $rows) {
    foreach ($rows as $k => $v) {
        /** @var modSystemSetting $setting */
        $setting = $modx->newObject('modSystemSetting');
        $setting->fromArray(array_merge(array(
            'namespace' => PKG_NAME_LOWER,
            'area' => PKG_NAME_SHORT . '_' . $area,
            'key' => PKG_NAME_SHORT . '_' . $k,
        ), $v), '', true, true);

        $settings[] = $setting;
    }
}
unset($tmp);

return $settings;