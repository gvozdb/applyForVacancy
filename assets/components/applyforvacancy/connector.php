<?php
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var applyForVacancy $applyForVacancy */
$applyForVacancy = $modx->getService('applyforvacancy', 'applyForVacancy', $modx->getOption('applyforvacancy_core_path', null, $modx->getOption('core_path') .
                                                                                                   'components/applyforvacancy/') .
                                                      'model/applyforvacancy/');
$modx->lexicon->load('applyforvacancy:default');

// handle request
$corePath = $modx->getOption('applyforvacancy_core_path', null, $modx->getOption('core_path') . 'components/applyforvacancy/');
$path = $modx->getOption('processorsPath', $applyForVacancy->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));