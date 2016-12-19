<?php

/**
 *
 */
class afvOnDocFormPrerender extends afvPlugin
{
    public function run()
    {
        $sp = &$this->sp;

        /** @var modResource $resource */
        $resource = $sp['resource'];
        if (empty($resource) || empty($resource->get('id'))) {
            return;
        }
        $this->afv->regManagerTab($this->modx->controller, $resource);
    }
}