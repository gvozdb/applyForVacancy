<?php

class afvObjectGetProcessor extends modObjectGetProcessor
{
    public $objectType = 'afvObject';
    public $classKey = 'afvObject';
    public $languageTopics = array('applyforvacancy:default');
    public $permission = 'view';

    /**
     * @return mixed
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        return parent::process();
    }

    public function beforeOutput()
    {
        $resource = $this->object->Resource;
        $profile = $this->object->Profile;

        $this->object->set('resource_formatted', $resource->get('pagetitle'));
        $this->object->set('user_formatted', $profile->get('fullname'));
    }
}

return 'afvObjectGetProcessor';