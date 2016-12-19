<?php

class applyForVacancy
{
    /** @var modX $modx */
    public $modx;
    /** @var afvTools $tools */
    public $tools;
    /** @var pdoTools $pdoTools */
    public $pdoTools;
    /** @var array $initialized */
    public $initialized = array();

    /**
     * @param modX  $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config = array())
    {
        $this->modx = &$modx;

        $corePath = MODX_CORE_PATH . 'components/applyforvacancy/';
        $assetsUrl = MODX_ASSETS_URL . 'components/applyforvacancy/';
        $assetsPath = MODX_ASSETS_PATH . 'components/applyforvacancy/';

        $this->config = array_merge(array(
            'assetsUrl' => $assetsUrl,
            'assetsPath' => $assetsPath,
            'cssUrl' => $assetsUrl . 'css/',
            'jsUrl' => $assetsUrl . 'js/',
            'imagesUrl' => $assetsUrl . 'images/',
            'connectorUrl' => $assetsUrl . 'connector.php',
            'actionUrl' => $assetsUrl . 'action.php',

            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'pluginsPath' => $corePath . 'plugins/',
            'handlersPath' => $corePath . 'handlers/',
            'chunksPath' => $corePath . 'elements/chunks/',
            'templatesPath' => $corePath . 'elements/templates/',
            'chunkSuffix' => '.chunk.tpl',
            'snippetsPath' => $corePath . 'elements/snippets/',
            'processorsPath' => $corePath . 'processors/',

            'prepareResponse' => false,
            'jsonResponse' => false,
        ), $config);

        $this->modx->addPackage('applyforvacancy', $this->config['modelPath']);
        $this->modx->lexicon->load('applyforvacancy:default');
    }

    /**
     * @param string $ctx
     * @param array  $sp
     *
     * @return boolean
     */
    public function initialize($ctx = 'web', $sp = array())
    {
        $this->config = array_merge($this->config, $sp, array('ctx' => $ctx));

        $this->getTools();
        if ($pdoTools = $this->getPdoTools()) {
            $pdoTools->setConfig($this->config);
        }

        if (empty($this->initialized[$ctx])) {
            switch ($ctx) {
                case 'mgr':
                    break;
                default:
                    if (!defined('MODX_API_MODE') || !MODX_API_MODE) {
                        // $this->loadFrontendScripts();
                    }
                    break;
            }
        }

        return ($this->initialized[$ctx] = true);
    }

    /**
     * @return afvTools
     */
    public function getTools()
    {
        if (!is_object($this->tools)) {
            if ($class = $this->modx->loadClass('tools.afvTools', $this->config['handlersPath'], true, true)) {
                $this->tools = new $class($this->modx, $this->config);
            }
        }

        return $this->tools;
    }

    /**
     * @return pdoTools
     */
    public function getPdoTools()
    {
        if (class_exists('pdoTools') && !is_object($this->pdoTools)) {
            $this->pdoTools = $this->modx->getService('pdoTools');
        }

        return $this->pdoTools;
    }

    /**
     * @param string $objectName
     * @param array  $sp
     *
     * @return bool
     */
    public function loadFrontendScripts($objectName = '', array $sp = array())
    {
        if (empty($objectName)) {
            $objectName = 'applyForVacancy';
        }
        $objectName = trim($objectName);

        if (empty($this->modx->loadedjscripts[$objectName]) && (!defined('MODX_API_MODE') || !MODX_API_MODE)) {
            $pls = $this->tools->makePlaceholders($this->config);
            if ($css = trim($this->modx->getOption('afv_frontend_css'))) {
                $this->modx->regClientCSS(str_replace($pls['pl'], $pls['vl'], $css));
            }
            if ($js = trim($this->modx->getOption('afv_frontend_js'))) {
                $this->modx->regClientScript(str_replace($pls['pl'], $pls['vl'], $js));
            }

            $params = $this->modx->toJSON(array_merge(array(
                'assetsUrl' => $this->config['assetsUrl'],
                'actionUrl' => $this->config['actionUrl'],
            ), $sp));

            $this->modx->regClientScript('<script type="text/javascript">
                if (typeof(' . $objectName . 'Cls) == "undefined") {
                    var ' . $objectName . 'Cls = new ' . $objectName . '(' . $params . ');
                }
            </script>', true);

            $this->modx->loadedjscripts[$objectName] = true;
        }

        return !empty($this->modx->loadedjscripts[$objectName]);
    }

    /**
     * @param modManagerController $controller
     * @param                      $object
     */
    public function regManagerTab(modManagerController $controller, $object)
    {
        $class_key = get_parent_class($object);
        if ($class_key == 'modUser') {
            $type = 'user';
        } elseif (in_array($class_key, array('modDocument', 'msProduct'))) {
            $type = 'resource';
        } else {
            return;
        }

        $controller->addLexiconTopic('applyforvacancy:default');
        $controller->addCss($this->config['cssUrl'] . 'mgr/main.css');
        $controller->addCss($this->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/applyforvacancy.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/misc/ux.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/misc/utils.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/misc/combo.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/misc/default.grid.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/misc/default.window.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/widgets/objects.grid.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/widgets/objects.window.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/sections/home.js');
        $controller->addHtml("<script type='text/javascript'>
            applyForVacancy.config = {$this->modx->toJSON($this->config)};
            applyForVacancy.config['connector_url'] = \"{$this->config['connectorUrl']}\";
        </script>");

        if ($this->modx->getCount('modPlugin', array('name' => 'AjaxManager', 'disabled' => false))) {
            // $controller->addHtml('<script type="text/javascript">
            //     Ext.onReady(function() {
            //         window.setTimeout(function() {
            //             var tab = Ext.getCmp("modx-user-tabs");
            //             if (!tab) {return;}
            //             tab.add();
            //         }, 10);
            //     });
            // </script>');
        } else {
            $controller->addHtml("<script type='text/javascript'>
                Ext.ComponentMgr.onAvailable('modx-{$type}-tabs', function() {
                    this.on('beforerender', function() {
                        this.add({
                            title: _('afv_tab_objects'),
                            id: 'afv-objects',
                            layout: 'anchor',
                            items: [{
                                xtype: 'afv-grid-objects',
                                anchor: '100%',
                                cls: 'main-wrapper',
                                {$type}: {$object->get('id')},
                                classKey: '{$class_key}',
                            }],
                            listeners: {
                                show: function() {
                                    // Решаем проблему сжатой по ширине области
                                    ['search', 'position_type', 'vessel_type', 'dwt', 'engine'].forEach(function (name) {
                                        name = name.replace('_', '-');
                                        var field = Ext.getCmp('afv-grid-objects__tbar-' + name);
                                        if (field && field.wrap) {
                                            field.wrap.setWidth(field.width);
                                        }
                                    });
                                },
                            },
                        });
                    });
                });
            </script>");
        }
    }
}