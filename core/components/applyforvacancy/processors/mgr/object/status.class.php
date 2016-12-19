<?php

class afvObjectStatusUpdateProcessor extends modObjectUpdateProcessor
{
    /** @var afvObject $object */
    public $object;
    public $objectType = 'afvObject';
    public $classKey = 'afvObject';
    public $languageTopics = array('applyforvacancy:default');
    // public $permission = 'save';
    /** @var applyForVacancy $afv */
    protected $afv;
    protected $status_old = 0;

    /**
     * @return bool
     */
    public function initialize()
    {
        $path = MODX_CORE_PATH . 'components/applyforvacancy/model/applyforvacancy/';
        if (!$this->afv = $this->modx->getService('applyforvacancy', 'applyForVacancy', $path)) {
            return false;
        }
        $this->afv->initialize($this->modx->context->key);

        return parent::initialize();
    }

    /**
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }

    /**
     * @return bool
     */
    public function beforeSet()
    {
        if (!$id = (int)$this->getProperty('id')) {
            return $this->modx->lexicon('afv_err_ns');
        }

        // Проверяем на заполненность
        $required = array(
            'status:afv_err_required_status',
        );
        $this->afv->tools->checkProcessorRequired($this, $required, 'afv_err_required');

        $this->status_old = $this->object->get('status');

        return parent::beforeSet();
    }

    /**
     * @return bool
     */
    public function afterSave()
    {
        // Отсылаем письмо о смене статуса
        if ($status = $this->object->get('status')) {
            if ($this->status_old == $status) {
                return parent::afterSave();
            }

            $params = array_merge($this->object->toArray(), array(
                'status_name' => $this->modx->lexicon('afv_status_' . $status),
                'resource' => $this->object->Resource->toArray(),
                'user' => array_merge($this->object->User->toArray(), $this->object->Profile->toArray()),
            ));
            $subj_tpl = $this->modx->getOption('afv_status_' . $status . '_subj_tpl');
            $body_tpl = $this->modx->getOption('afv_status_' . $status . '_body_tpl');

            // Шлём менеджеру
            if ($status === 1) {
                $subj = $this->afv->tools->getChunk($subj_tpl, array_merge($params, array('recipient' => 'manager')));
                $body = $this->afv->tools->getChunk($body_tpl, array_merge($params, array('recipient' => 'manager')));
                $emails = array_map('trim', explode(',', $this->modx->getOption('afv_manager_emails')));
                foreach ($emails as $to) {
                    $this->sendEmail($to, $subj, $body);
                }
            }

            // Шлём пользователю
            if (in_array($status, array(1, 2, 4))) {
                if ($to = $this->object->Profile->get('email')) {
                    $subj = $this->afv->tools->getChunk($subj_tpl, array_merge($params, array('recipient' => 'user')));
                    $body = $this->afv->tools->getChunk($body_tpl, array_merge($params, array('recipient' => 'user')));
                    $this->sendEmail($to, $subj, $body);
                }
            }

            // Шлём поставщику
            if ($status === 3) {
                if ($to = $this->object->Resource->get('vendor.email')) {
                    $subj = $this->afv->tools->getChunk($subj_tpl, array_merge($params, array('recipient' => 'vendor')));
                    $body = $this->afv->tools->getChunk($body_tpl, array_merge($params, array('recipient' => 'vendor')));
                    $this->sendEmail($to, $subj, $body);
                }
            }
        }

        return parent::afterSave();
    }

    public function sendEmail($to, $subj, $body)
    {
        if (empty($to) || empty($subj) || empty($body)) {
            return;
        }

        // Получаем исходящий email и имя
        if (!$from = $this->modx->getOption('afv_email_from', null, '', true)) {
            $from = $this->modx->getOption('mail_use_smtp') ? $this->modx->getOption('mail_smtp_user')
                : $this->modx->getOption('emailsender');
        }
        $name = $this->modx->getOption('afv_email_name', null, $this->modx->getOption('site_name'), true);

        /* @var modPHPMailer $mail */
        $mail = $this->modx->getService('mail', 'mail.modPHPMailer');
        $mail->setHTML(true);
        $mail->set(modMail::MAIL_SUBJECT, $subj);
        $mail->set(modMail::MAIL_BODY, $body);
        $mail->set(modMail::MAIL_SENDER, $from);
        $mail->set(modMail::MAIL_FROM, $from);
        $mail->set(modMail::MAIL_FROM_NAME, $name);
        $mail->address('to', $to);

        if (!$mail->send()) {
            $this->modx->log(modX::LOG_LEVEL_ERROR, 'An error occurred while trying to send the email: ' .
                                                    $mail->mailer->ErrorInfo);
            $mail->reset();

            return false;
        }
        $mail->reset();

        return true;
    }
}

return 'afvObjectStatusUpdateProcessor';