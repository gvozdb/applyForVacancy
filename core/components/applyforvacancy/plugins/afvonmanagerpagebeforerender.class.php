<?php

/**
 *
 */
class afvOnManagerPageBeforeRender extends afvPlugin
{
    public function run()
    {
        $sp = &$this->sp;
        
        /** @var modManagerController $controller */
        $controller = $sp['controller'];
        if (is_object($controller)) {
            $action = $controller->scriptProperties['a'];
            if ($action == 'security/user') {
                $controller->addLexiconTopic('applyforvacancy:default');
                $controller->addCss($this->afv->config['cssUrl'] . 'mgr/main.css');
                $controller->addCss($this->afv->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
                $controller->addJavascript($this->afv->config['jsUrl'] . 'mgr/applyforvacancy.js');
                $controller->addJavascript($this->afv->config['jsUrl'] . 'mgr/misc/ux.js');
                $controller->addJavascript($this->afv->config['jsUrl'] . 'mgr/misc/utils.js');
                $controller->addJavascript($this->afv->config['jsUrl'] . 'mgr/misc/combo.js');
                $controller->addHtml("<script type='text/javascript'>
                    applyForVacancy.config = {$this->modx->toJSON($this->afv->config)};
                    applyForVacancy.config['connector_url'] = \"{$this->afv->config['connectorUrl']}\";
                </script>");
                $controller->addLastJavascript($this->afv->config['jsUrl'] . 'mgr/extends/modx.grid.user.js');
            }
        }
    }
}