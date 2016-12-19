<?php

class afvComboStatusGetListProcessor extends modProcessor
{
    /** @var applyForVacancy $afv */
    protected $afv;

    /**
     * @return bool
     */
    public function initialize()
    {
        $path = MODX_CORE_PATH . 'components/applyforvacancy/model/applyforvacancy/';
        $this->afv = $this->modx->getService('applyforvacancy', 'applyForVacancy', $path);
        $this->afv->initialize($this->modx->context->get('key'));

        return parent::initialize();
    }

    /**
     * @return string
     */
    public function process()
    {
        $output = array();
        $statuses = array(
            '1',
            '2',
            '3',
            '4',
        );
        foreach ($statuses as $status) {
            $output[] = array(
                'value' => $status,
                'display' => $this->modx->lexicon('afv_status_' . $status),
            );
        }

        return $this->outputArray($output);
    }

    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return array('applyforvacancy:default');
    }
}

return 'afvComboStatusGetListProcessor';