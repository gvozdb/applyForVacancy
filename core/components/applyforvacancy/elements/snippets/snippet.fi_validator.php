<?php
/** @var modX $modx */
/** @var fiValidator $validator */
/** @var applyForVacancy $afv */

$modelPath = MODX_CORE_PATH . 'components/applyforvacancy/model/applyforvacancy/';
if (!$afv = $modx->getService('applyforvacancy', 'applyForVacancy', $modelPath)) {
    $modx->log(MODX::LOG_LEVEL_ERROR, '[afv.fiHook] Could not load applyForVacancy class!');

    return false;
}
$afv->initialize($modx->context->key);

// Чекаем на авторизацию
if (!$user = $modx->user->get('id')) {
    $validator->addError('resource', $modx->lexicon('afv_err_auth'));
}

//
if ($key == 'resource') {
    if (!empty($value)) {
        // Чекаем отклик на уникальность
        if ($modx->getCount('afvObject', array('resource' => (int)$value, 'user' => $user))) {
            $validator->addError('resource', $modx->lexicon('afv_err_unique_resource'));
        }
    } else {
        $validator->addError('resource', $modx->lexicon('afv_err_required_resource'));
    }
}