applyForVacancy.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('applyforvacancy') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('afv_tab_objects'),
                layout: 'anchor',
                items: [{
                    xtype: 'afv-grid-objects',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    applyForVacancy.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(applyForVacancy.panel.Home, MODx.Panel);
Ext.reg('applyforvacancy-panel-home', applyForVacancy.panel.Home);
