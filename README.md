## applyForVacancy

### Требования:

- Компонент pdoTools,
- Компонент miniShop2,
- Компонент FormIt,
- Компонент AjaxForm,
- Ресурсы обязательно должны быть товарами miniShop2,
- У товаров обязательно должны быть созданы поля: position_type, vessel_type, dwt, engine,
- У пользователей обязательно должны быть созданы поля: position, vessel, dwt, engine. Эти поля должны храниться в объекте modUserProfile.


### Вывод во фронт-энде:

Для вывода кнопки был написан сниппет-обёртка над AjaxForm. Сниппет принимает все параметры, которые принимает AjaxForm + параметр id, который отвечает за ID ресурса, на который будет происходить отклик.

Пример вызова сниппета:
```
{'!applyForVacancy' | snippet : [
    'id' => $_modx->resource.id,
    'snippet' => 'FormIt',
    'form' => 'tpl.afv.form',
    'hooks' => 'afv.fiHook',
    'customValidators' => 'afv.fiValidator',
    'validate' => 'resource:afv.fiValidator',
    'validationErrorMessage' => 'В форме содержатся ошибки!',
    'successMessage' => 'Сообщение успешно отправлено',
]}
```
В параметрах hooks, customValidators и validate указаны хук и валидатор. Это 2 дополнительных сниппета, которые взаимодействуют с FormIt.

В параметр form указывается чанк, который идёт в пакете.


### Шаблоны писем:

Заголовки и тексты писем указываются, как чанки (можно @INLINE) в системных настройках компонента.
В каждом заголовке или тексте письма присутствуют параметры:

- array $resource - массив с полями ресурса,
- array $user - массив с полями пользователя,
- string $recipient - тип получателя: user, manager, vendor,
- int $createdon - timestamp подачи заявки,
- int $status - ID статуса,
- string $status_name - название статуса.