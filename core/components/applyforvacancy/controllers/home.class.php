<?php

class applyForVacancyHomeManagerController extends modExtraManagerController
{
    /** @var applyForVacancy $afv */
    public $afv;

    /**
     *
     */
    public function initialize()
    {
        $path = MODX_CORE_PATH . 'components/applyforvacancy/model/applyforvacancy/';
        $this->afv = $this->modx->getService('applyforvacancy', 'applyForVacancy', $path);

        parent::initialize();
    }

    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return array('applyforvacancy:default');
    }

    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }

    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('applyforvacancy');
    }

    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->afv->config['cssUrl'] . 'mgr/main.css');
        $this->addCss($this->afv->config['cssUrl'] . 'mgr/bootstrap.buttons.css');

        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/applyforvacancy.js');

        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/misc/ux.js');
        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/misc/combo.js');

        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/misc/default.grid.js');
        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/misc/default.window.js');

        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/widgets/objects.grid.js');
        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/widgets/objects.window.js');

        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->afv->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('
            <script type="text/javascript">
                applyForVacancy.config = ' . json_encode($this->afv->config) . ';
                applyForVacancy.config["connector_url"] = "' . $this->afv->config['connectorUrl'] . '";
                Ext.onReady(function() {
                    MODx.load({
                        xtype: "applyforvacancy-page-home",
                    });
                });
            </script>
        ');
    }

    /**
     * @return string
     */
    public function getTemplateFile()
    {
        return $this->afv->config['templatesPath'] . 'home.tpl';
    }
}