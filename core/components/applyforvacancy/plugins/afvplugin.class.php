<?php

abstract class afvPlugin
{
    /** @var modX $modx */
    protected $modx;
    /** @var applyForVacancy $afv */
    protected $afv;
    /** @var array $sp */
    protected $sp;

    public function __construct(&$modx, &$sp)
    {
        $this->sp = &$sp;
        $this->modx = &$modx;
        $this->afv = $this->modx->applyforvacancy;

        if (!is_object($this->afv)) {
            $path = MODX_CORE_PATH . 'components/applyforvacancy/model/applyforvacancy/';
            $this->afv = $this->modx->getService('applyforvacancy', 'applyforvacancy', $path, $this->sp);
        }
        if (!$this->afv->initialized[$this->modx->context->key]) {
            $this->afv->initialize($this->modx->context->key);
        }
    }

    abstract public function run();
}