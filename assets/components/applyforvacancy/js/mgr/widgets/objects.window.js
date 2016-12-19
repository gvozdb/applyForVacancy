/**
 * Окно смены статуса у объекта
 *
 * @param config
 * @constructor
 */
applyForVacancy.window.ObjectStatus = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'afv-window-object-status';
    }
    Ext.applyIf(config, {
        title: _('afv_window_object_status'),
        baseParams: {
            action: 'mgr/object/status',
        },
        modal: true,
    });
    applyForVacancy.window.ObjectStatus.superclass.constructor.call(this, config);
};
Ext.extend(applyForVacancy.window.ObjectStatus, applyForVacancy.window.Default, {
    getFields: function (config) {
        var data = config['record'] ? config.record['object'] : null;
        var r = [];

        if (data) {
            r.push({
                layout: 'column',
                border: false,
                style: {marginTop: '0px'},
                anchor: '100%',
                items: [{
                    columnWidth: .5,
                    layout: 'form',
                    style: {marginRight: '5px'},
                    items: [{
                        xtype: 'statictextfield',
                        id: config.id + '-resource',
                        name: 'resource_formatted',
                        fieldLabel: _('afv_field_resource'),
                        anchor: '100%',
                    }],
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    labelWidth: 100,
                    style: {marginLeft: '5px'},
                    items: [{
                        xtype: 'statictextfield',
                        id: config.id + '-user',
                        name: 'user_formatted',
                        fieldLabel: _('afv_field_user'),
                        anchor: '100%',
                    }],
                }],
            }, {
                layout: 'column',
                border: false,
                style: {marginTop: '0px'},
                anchor: '100%',
                items: [{
                    columnWidth: 1,
                    layout: 'form',
                    items: [{
                        xtype: 'afv-combo-status',
                        id: config.id + '-status',
                        name: 'status',
                        fieldLabel: _('afv_field_status'),
                        anchor: '100%',
                    }],
                }],
            });
        }

        if (data) {
            r.push({
                xtype: 'hidden',
                id: config.id + '-id',
                name: 'id',
            });
        }

        return r;
    },
});
Ext.reg('afv-window-object-status', applyForVacancy.window.ObjectStatus);


// /**
//  * Вкладки/поля для окон добавления/редактирования
//  *
//  * @param config
//  * @returns {{object}}
//  * @constructor
//  */
// applyForVacancy.fields.Object = function (config) {
//     var data = config['record'] ? config.record['object'] : null;
//     var r = {
//         xtype: 'modx-tabs',
//         border: true,
//         autoHeight: true,
//         style: {marginTop: '10px'},
//         anchor: '100% 100%',
//         items: [{
//             title: _('afv_tab_main'),
//             layout: 'form',
//             cls: 'modx-panel afv-panel',
//             autoHeight: true,
//             items: [],
//         }],
//         listeners: {
//             afterrender: function (tabs) {
//                 if (config['activeTab']) {
//                     tabs.setActiveTab(config['activeTab']);
//                 } else {
//                     // Рендерим вторую вкладку, иначе данные с неё не передаются в процессор
//                     tabs.setActiveTab(1);
//                     tabs.setActiveTab(0);
//                 }
//             },
//         },
//     };
//
//     r.items[0].items.push({
//         layout: 'column',
//         border: false,
//         style: {marginTop: '0px'},
//         anchor: '100%',
//         items: [{
//             columnWidth: .5,
//             layout: 'form',
//             style: {marginRight: '5px'},
//             items: [{
//                 xtype: 'afv-combo-group',
//                 id: config.id + '-group',
//                 name: 'group',
//                 fieldLabel: _('afv_field_group'),
//                 anchor: '100%',
//             }, {
//                 xtype: 'textfield',
//                 id: config.id + '-name',
//                 name: 'name',
//                 fieldLabel: _('afv_field_name'),
//                 anchor: '100%',
//             }],
//         }, {
//             columnWidth: .5,
//             layout: 'form',
//             labelWidth: 100,
//             style: {marginLeft: '5px'},
//             items: [{
//                 xtype: 'textarea',
//                 id: config.id + '-description',
//                 name: 'description',
//                 fieldLabel: _('afv_field_description'),
//                 height: 102,
//                 anchor: '100%',
//             }],
//         }],
//     }, {
//         layout: 'column',
//         border: false,
//         style: {marginTop: '0px'},
//         anchor: '100%',
//         items: [{
//             columnWidth: 1,
//             layout: 'form',
//             items: [{
//                 xtype: 'afv-combo-parent',
//                 id: config.id + '-parent',
//                 name: 'parent',
//                 fieldLabel: _('afv_field_parent'),
//                 anchor: '100%',
//             }],
//         }],
//     }, {
//         layout: 'column',
//         border: false,
//         style: {marginTop: '-10px'},
//         anchor: '100%',
//         items: [{
//             columnWidth: 1,
//             layout: 'form',
//             items: [{
//                 xtype: 'xcheckbox',
//                 id: config.id + '-active',
//                 name: 'active',
//                 boxLabel: _('afv_field_active'),
//             }],
//         }],
//     });
//
//     if (data) {
//         r.items[0].items.push({
//             xtype: 'hidden',
//             id: config.id + '-id',
//             name: 'id',
//         });
//     }
//
//     return r;
// };
//
// /**
//  * Окно добавления объекта
//  *
//  * @param config
//  * @constructor
//  */
// applyForVacancy.window.ObjectCreate = function (config) {
//     config = config || {};
//     if (!config.id) {
//         config.id = 'afv-window-object-create';
//     }
//     Ext.applyIf(config, {
//         title: _('afv_window_object_create'),
//         baseParams: {
//             action: 'mgr/object/create',
//         },
//         modal: true,
//     });
//     applyForVacancy.window.ObjectCreate.superclass.constructor.call(this, config);
// };
// Ext.extend(applyForVacancy.window.ObjectCreate, applyForVacancy.window.Default, {
//     getFields: function (config) {
//         return applyForVacancy.fields.Object(config);
//     },
// });
// Ext.reg('afv-window-object-create', applyForVacancy.window.ObjectCreate);
//
// /**
//  * Окно редактирования объекта
//  *
//  * @param config
//  * @constructor
//  */
// applyForVacancy.window.ObjectUpdate = function (config) {
//     config = config || {};
//     if (!config.id) {
//         config.id = 'afv-window-object-update';
//     }
//     Ext.applyIf(config, {
//         title: _('afv_window_object_update'),
//         baseParams: {
//             action: 'mgr/object/update',
//         },
//         modal: true,
//     });
//     applyForVacancy.window.ObjectUpdate.superclass.constructor.call(this, config);
// };
// Ext.extend(applyForVacancy.window.ObjectUpdate, applyForVacancy.window.Default, {
//     getFields: function (config) {
//         return applyForVacancy.fields.Object(config);
//     },
// });
// Ext.reg('afv-window-object-update', applyForVacancy.window.ObjectUpdate);