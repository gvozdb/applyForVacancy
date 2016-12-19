<?php

class afvProductDataFieldGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'msProductData';
    public $classKey = 'msProductData';

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
        );

        if ($key = $this->getProperty('key')) {
            $sortkey = $this->getProperty('sortby', '`msProductData`.`' . $key . '`');

            $c = $this->modx->newQuery($this->classKey)
                ->innerJoin('afvObject', 'afvObject', 'afvObject.resource = msProductData.id')
                ->select('`msProductData`.`' . $key . '`')
                ->limit(0)
                ->sortby($sortkey, $this->getProperty('sortdir', 'ASC'))
                ->groupby('`msProductData`.`' . $key . '`');

            if ($c->prepare() && $c->stmt->execute()) {
                $rows = $c->stmt->fetchAll(PDO::FETCH_COLUMN);
                foreach ($rows as $v) {
                    $tmp = array(
                        'display' => $v ?: '(Не указано)',
                        'value' => $v ?: '_',
                    );

                    $output[] = $tmp;
                }
            }
        }

        return $this->outputArray($output);
    }
}

return 'afvProductDataFieldGetListProcessor';