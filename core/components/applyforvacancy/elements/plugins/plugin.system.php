<?php
/** @var modX $modx */
/** @var applyForVacancy $afv */

$path = MODX_CORE_PATH . 'components/applyforvacancy/model/applyforvacancy/';
if (!is_object($modx->applyforvacancy)) {
    $afv = $modx->getService('applyforvacancy', 'applyforvacancy', $path);
} else {
    $afv = $modx->applyforvacancy;
}
$className = 'afv' . $modx->event->name;
$modx->loadClass('afvPlugin', $afv->config['pluginsPath'], true, true);
$modx->loadClass($className, $afv->config['pluginsPath'], true, true);
if (class_exists($className)) {
    $handler = new $className($modx, $scriptProperties);
    $handler->run();
} else {
    // Удаляем событие у плагина, если такого класса не существует
    $event = $modx->getObject('modPluginEvent', array(
        'pluginid' => $modx->event->plugin->get('id'),
        'event' => $modx->event->name,
    ));
    if ($event instanceof modPluginEvent) {
        $event->remove();
    }
}
return;