<?php
/** @var modX $modx */
/** @var fiHooks $hook */
/** @var applyForVacancy $afv */

$modelPath = MODX_CORE_PATH . 'components/applyforvacancy/model/applyforvacancy/';
if (!$afv = $modx->getService('applyforvacancy', 'applyForVacancy', $modelPath)) {
    $modx->log(MODX::LOG_LEVEL_ERROR, '[afv.fiHook] Could not load applyForVacancy class!');

    return false;
}
$afv->initialize($modx->context->key);

// Чекаем на авторизацию
if (!$user = $modx->user->get('id')) {
    return;
}

//
$data = $hook->getValues();

//
if (!empty($data['resource'])) {
    $resource = (int)$data['resource'];
    // Чекаем отклик на уникальность
    if (!$modx->getCount('afvObject', array('resource' => $resource, 'user' => $user))) {
        // Добавляем отклик
        $obj = $modx->newObject('afvObject');
        $obj->fromArray(array(
            'resource' => $resource,
            'user' => $user,
            'createdon' => time(),
            'status' => 0,
        ));
        $obj->save();

        $response = $afv->tools->runProcessor('mgr/object/status', array(
            'id' => $obj->get('id'),
            'status' => 1,
        ));
    }
}