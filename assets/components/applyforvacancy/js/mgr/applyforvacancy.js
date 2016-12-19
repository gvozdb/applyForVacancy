var applyForVacancy = function (config) {
    config = config || {};
    applyForVacancy.superclass.constructor.call(this, config);
};
Ext.extend(applyForVacancy, Ext.Component, {
    page: {},
    window: {},
    grid: {},
    tree: {},
    panel: {},
    combo: {},
    config: {},
    view: {},
    utils: {},
    ux: {},
    fields: {},
});
Ext.reg('applyforvacancy', applyForVacancy);

applyForVacancy = new applyForVacancy();