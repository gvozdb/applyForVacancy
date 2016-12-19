<?php

/**
 *
 */
class afvOnUserFormPrerender extends afvPlugin
{
    public function run()
    {
        $sp = &$this->sp;

        /** @var modUser $user */
        $user = $sp['user'];
        if (empty($user) || empty($user->get('id'))) {
            return;
        }
        $this->afv->regManagerTab($this->modx->controller, $user);
    }
}