<?php

class afvMsVendorGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'msVendor';
    public $classKey = 'msVendor';

    /**
     * @return string
     */
    public function process()
    {
        $output = array(
            array(
                'display' => '(Все)',
                'value' => '',
            ),
            array(
                'display' => '(Не указано)',
                'value' => '_',
            ),
        );

        $sortkey = $this->getProperty('sortby', '`msVendor`.`name`');

        $c = $this->modx->newQuery($this->classKey)
            ->innerJoin('msProductData', 'msProductData', 'msProductData.vendor = msVendor.id')
            ->innerJoin('afvObject', 'afvObject', 'afvObject.resource = msProductData.id')
            ->select('`msVendor`.`id`, `msVendor`.`name`')
            ->limit(0)
            ->sortby($sortkey, $this->getProperty('sortdir', 'ASC'))
            ->groupby('`msVendor`.`id`');

        if ($c->prepare() && $c->stmt->execute()) {
            $rows = $c->stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($rows as $v) {
                $tmp = array(
                    'display' => $v['name'],
                    'value' => $v['id'],
                );
                $output[] = $tmp;
            }
        }

        return $this->outputArray($output);
    }
}

return 'afvMsVendorGetListProcessor';