applyForVacancy.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'applyforvacancy-panel-home',
            renderTo: 'applyforvacancy-panel-home-div'
        }]
    });
    applyForVacancy.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(applyForVacancy.page.Home, MODx.Component);
Ext.reg('applyforvacancy-page-home', applyForVacancy.page.Home);