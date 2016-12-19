<?php

class afvObjectRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'afvObject';
    public $classKey = 'afvObject';
    public $languageTopics = array('applyforvacancy:default');
    public $permission = 'remove';

    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('afv_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var afvObject $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('afv_err_nf'));
            }
            $object->remove();
        }

        return $this->success();
    }
}

return 'afvObjectRemoveProcessor';