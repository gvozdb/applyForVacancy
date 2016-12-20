<?php

class afvObjectGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'afvObject';
    public $classKey = 'afvObject';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $permission = 'list';

    /**
     * @return boolean|string
     */
    public function initialize()
    {
        $this->setProperty('sort', str_replace('_formatted', '', $this->getProperty('sort')));

        return parent::initialize();
    }

    /**
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }

    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $c->innerJoin('msProduct', 'msProduct', 'msProduct.id = afvObject.resource');
        $c->innerJoin('msProductData', 'msProductData', 'msProductData.id = msProduct.id');
        $c->innerJoin('modUserProfile', 'modUserProfile', 'modUserProfile.internalKey = afvObject.user');
        $c->leftJoin('msVendor', 'msVendor', 'msVendor.id = msProductData.vendor');

        $c->select(array($this->modx->getSelectColumns('afvObject', 'afvObject')));
        $c->select(array('msProduct.pagetitle as resource_formatted'));
        $c->select(array('msVendor.name as vendor'));
        $c->select(array(
            'msProductData.position_type as position_type',
            'msProductData.vessel_type as vessel_type',
            'msProductData.dwt as dwt',
            'msProductData.engine as engine',
        ));
        $c->select(array('modUserProfile.fullname as user_formatted'));

        // Фильтр по свойствам основного объекта
        foreach (array('resource', 'user', 'status') as $v) {
            if (${$v} = (int)$this->getProperty($v)) {
                $c->where(array(
                    'afvObject.' . $v => ${$v},
                ));
            }
        }

        // Фильтр по свойствам товара
        foreach (array('position_type', 'vessel_type', 'dwt', 'engine', 'vendor') as $v) {
            if (${$v} = $this->getProperty($v, 0)) {
                if (${$v} == '_') {
                    $c->where(array(
                        '(msProductData.' . $v . ' = "" OR msProductData.' . $v . ' IS NULL)',
                    ));
                } else {
                    $c->where(array(
                        'msProductData.' . $v => ${$v},
                    ));
                }
            }
        }

        // Поиск
        if ($query = trim($this->getProperty('query'))) {
            $c->where(array(
                'msProduct.pagetitle:LIKE' => "%{$query}%",
                'OR:modUserProfile.fullname:LIKE' => "%{$query}%",
            ));
        }

        return $c;
    }

    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $data = $object->toArray();

        // $resource = $object->Resource;
        // if ($resource->get('class_key') == 'msProduct') {
        //     $data['position_type'] = $resource->get('position_type');
        //     $data['vessel_type'] = $resource->get('vessel_type');
        //     $data['dwt'] = $resource->get('dwt');
        //     $data['engine'] = $resource->get('engine');
        // }

        $data['createdon_formatted'] = !empty($data['createdon']) ? date('d.m.Y H:i', $data['createdon']) : '';
        $data['status_formatted'] = empty($data['status']) ? '' : $this->modx->lexicon('afv_status_' . $data['status']);

        // Кнопки
        $data['actions'] = array();
        $data['actions'][] = array(
            'cls' => '',
            'icon' => 'icon icon-angle-double-right action-green',
            'title' => $this->modx->lexicon('afv_button_status'),
            'action' => 'statusObject',
            'button' => true,
            'menu' => true,
        );
        $data['actions'][] = array(
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('afv_button_remove'),
            'multiple' => $this->modx->lexicon('afv_button_remove_multiple'),
            'action' => 'removeObject',
            'button' => true,
            'menu' => true,
        );

        return $data;
    }
}

return 'afvObjectGetListProcessor';