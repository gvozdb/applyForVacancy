<?php
/** @var modX $modx */
/** @var applyForVacancy $afv */
/** @var array $scriptProperties */

$sp = &$scriptProperties;
$modelPath = MODX_CORE_PATH . 'components/applyforvacancy/model/applyforvacancy/';
if (!$afv = $modx->getService('applyforvacancy', 'applyForVacancy', $modelPath)) {
    return 'Could not load applyForVacancy class!';
}
$afv->initialize($modx->context->key);

// Чекаем задействованные сниппеты на существование
foreach (array('AjaxForm', $sp['snippet']) as $v) {
    if (!$modx->getCount('modSnippet', array('name' => $v))) {
        return 'Could not load ' . $v . ' snippet!';
    }
}

// Чекаем на авторизацию
if (!$user = $modx->user->get('id')) {
    return;
}
//
$sp['id'] = (int)(!empty($sp['id']) ? $sp['id'] : $modx->resource->id);

// Чекаем отклик на уникальность
if ($modx->getCount('afvObject', array('resource' => $sp['id'], 'user' => $user))) {
    return;
}

return $modx->runSnippet('AjaxForm', $sp);