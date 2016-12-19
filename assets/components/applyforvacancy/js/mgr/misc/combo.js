/**
 * @param config
 * @constructor
 */
applyForVacancy.combo.Search = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        xtype: 'twintrigger',
        ctCls: 'x-field-search',
        allowBlank: true,
        msgTarget: 'under',
        emptyText: _('search'),
        name: 'query',
        triggerAction: 'all',
        clearBtnCls: 'x-field-search-clear',
        searchBtnCls: 'x-field-search-go',
        onTrigger1Click: this._triggerSearch,
        onTrigger2Click: this._triggerClear,
    });
    applyForVacancy.combo.Search.superclass.constructor.call(this, config);
    this.on('render', function () {
        this.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
            this._triggerSearch();
        }, this);
        this.positionEl.setStyle('margin-right', '1px');
    });
    this.addEvents('clear', 'search');
};
Ext.extend(applyForVacancy.combo.Search, Ext.form.TwinTriggerField, {
    initComponent: function () {
        Ext.form.TwinTriggerField.superclass.initComponent.call(this);
        this.triggerConfig = {
            tag: 'span',
            cls: 'x-field-search-btns',
            cn: [
                {tag: 'div', cls: 'x-form-trigger ' + this.searchBtnCls},
                {tag: 'div', cls: 'x-form-trigger ' + this.clearBtnCls}
            ]
        };
    },
    _triggerSearch: function () {
        this.fireEvent('search', this);
    },
    _triggerClear: function () {
        this.fireEvent('clear', this);
    },
});
Ext.reg('afv-combo-search', applyForVacancy.combo.Search);
Ext.reg('afv-field-search', applyForVacancy.combo.Search);


/**
 * @param config
 * @constructor
 */
applyForVacancy.combo.Status = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        name: 'status',
        fieldLabel: config['name'] || 'status',
        hiddenName: config['name'] || 'status',
        displayField: 'display',
        valueField: 'value',
        fields: ['value', 'display'],
        url: applyForVacancy.config['connector_url'],
        baseParams: {
            action: 'mgr/combo/getstatuses',
        },
        pageSize: 20,
        typeAhead: false,
        editable: false,
        anchor: '100%',
        listEmptyText: '<div style="padding: 7px;">' + _('afv_combo_list_empty') + '</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item afv-combo__list-item">\
                <span>\
                    {display}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    applyForVacancy.combo.Status.superclass.constructor.call(this, config);
};
Ext.extend(applyForVacancy.combo.Status, MODx.combo.ComboBox);
Ext.reg('afv-combo-status', applyForVacancy.combo.Status);


/**
 * @param config
 * @constructor
 */
applyForVacancy.combo.UserPosition = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'position',
        fieldLabel: config['name'] || 'position',
        hiddenName: config['name'] || 'position',
        displayField: 'display',
        valueField: 'value',
        fields: ['value', 'display'],
        url: applyForVacancy.config['connector_url'],
        baseParams: {
            action: 'mgr/combo/getuserfield',
            key: 'position',
        },
        pageSize: 20,
        typeAhead: false,
        editable: true,
        anchor: '100%',
        listEmptyText: '<div style="padding: 7px;">' + _('afv_combo_list_empty') + '</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item afv-combo__list-item">\
                <span>\
                    {display}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    applyForVacancy.combo.UserPosition.superclass.constructor.call(this, config);

    // При раскрытии списка подгружаем данные заново
    this.on('expand', function () {
        var combo = Ext.getCmp(config.id);
        var comboStore = combo.getStore();
        comboStore.load();
    });
};
Ext.extend(applyForVacancy.combo.UserPosition, MODx.combo.ComboBox);
Ext.reg('afv-combo-user-position', applyForVacancy.combo.UserPosition);


/**
 * @param config
 * @constructor
 */
applyForVacancy.combo.UserVessel = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'vessel',
        fieldLabel: config['name'] || 'vessel',
        hiddenName: config['name'] || 'vessel',
        displayField: 'display',
        valueField: 'value',
        fields: ['value', 'display'],
        url: applyForVacancy.config['connector_url'],
        baseParams: {
            action: 'mgr/combo/getuserfield',
            key: 'vessel',
        },
        pageSize: 20,
        typeAhead: false,
        editable: true,
        anchor: '100%',
        listEmptyText: '<div style="padding: 7px;">' + _('afv_combo_list_empty') + '</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item afv-combo__list-item">\
                <span>\
                    {display}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    applyForVacancy.combo.UserVessel.superclass.constructor.call(this, config);

    // При раскрытии списка подгружаем данные заново
    this.on('expand', function () {
        var combo = Ext.getCmp(config.id);
        var comboStore = combo.getStore();
        comboStore.load();
    });
};
Ext.extend(applyForVacancy.combo.UserVessel, MODx.combo.ComboBox);
Ext.reg('afv-combo-user-vessel', applyForVacancy.combo.UserVessel);


/**
 * @param config
 * @constructor
 */
applyForVacancy.combo.UserCountry = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'country',
        fieldLabel: config['name'] || 'country',
        hiddenName: config['name'] || 'country',
        displayField: 'display',
        valueField: 'value',
        fields: ['value', 'display'],
        url: applyForVacancy.config['connector_url'],
        baseParams: {
            action: 'mgr/combo/getuserfield',
            key: 'country',
        },
        pageSize: 20,
        typeAhead: false,
        editable: true,
        anchor: '100%',
        listEmptyText: '<div style="padding: 7px;">' + _('afv_combo_list_empty') + '</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item afv-combo__list-item">\
                <span>\
                    {display}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    applyForVacancy.combo.UserCountry.superclass.constructor.call(this, config);

    // При раскрытии списка подгружаем данные заново
    this.on('expand', function () {
        var combo = Ext.getCmp(config.id);
        var comboStore = combo.getStore();
        comboStore.load();
    });
};
Ext.extend(applyForVacancy.combo.UserCountry, MODx.combo.ComboBox);
Ext.reg('afv-combo-user-country', applyForVacancy.combo.UserCountry);


/**
 * @param config
 * @constructor
 */
applyForVacancy.combo.PositionType = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'position_type',
        fieldLabel: config['name'] || 'position_type',
        hiddenName: config['name'] || 'position_type',
        displayField: 'display',
        valueField: 'value',
        fields: ['value', 'display'],
        url: applyForVacancy.config['connector_url'],
        baseParams: {
            action: 'mgr/combo/getproductdatafield',
            key: 'position_type',
        },
        pageSize: 20,
        typeAhead: false,
        editable: true,
        anchor: '100%',
        listEmptyText: '<div style="padding: 7px;">' + _('afv_combo_list_empty') + '</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item afv-combo__list-item">\
                <span>\
                    {display}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    applyForVacancy.combo.PositionType.superclass.constructor.call(this, config);

    // При раскрытии списка подгружаем данные заново
    this.on('expand', function () {
        var combo = Ext.getCmp(config.id);
        var comboStore = combo.getStore();
        comboStore.load();
    });
};
Ext.extend(applyForVacancy.combo.PositionType, MODx.combo.ComboBox);
Ext.reg('afv-combo-resource-position-type', applyForVacancy.combo.PositionType);


/**
 * @param config
 * @constructor
 */
applyForVacancy.combo.VesselType = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'vessel_type',
        fieldLabel: config['name'] || 'vessel_type',
        hiddenName: config['name'] || 'vessel_type',
        displayField: 'display',
        valueField: 'value',
        fields: ['value', 'display'],
        url: applyForVacancy.config['connector_url'],
        baseParams: {
            action: 'mgr/combo/getproductdatafield',
            key: 'vessel_type',
        },
        pageSize: 20,
        typeAhead: false,
        editable: true,
        anchor: '100%',
        listEmptyText: '<div style="padding: 7px;">' + _('afv_combo_list_empty') + '</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item afv-combo__list-item">\
                <span>\
                    {display}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    applyForVacancy.combo.VesselType.superclass.constructor.call(this, config);

    // При раскрытии списка подгружаем данные заново
    this.on('expand', function () {
        var combo = Ext.getCmp(config.id);
        var comboStore = combo.getStore();
        comboStore.load();
    });
};
Ext.extend(applyForVacancy.combo.VesselType, MODx.combo.ComboBox);
Ext.reg('afv-combo-resource-vessel-type', applyForVacancy.combo.VesselType);


/**
 * @param config
 * @constructor
 */
applyForVacancy.combo.DWT = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'dwt',
        fieldLabel: config['name'] || 'dwt',
        hiddenName: config['name'] || 'dwt',
        displayField: 'display',
        valueField: 'value',
        fields: ['value', 'display'],
        url: applyForVacancy.config['connector_url'],
        baseParams: {
            action: 'mgr/combo/getproductdatafield',
            key: 'dwt',
        },
        pageSize: 20,
        typeAhead: false,
        editable: true,
        anchor: '100%',
        listEmptyText: '<div style="padding: 7px;">' + _('afv_combo_list_empty') + '</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item afv-combo__list-item">\
                <span>\
                    {display}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    applyForVacancy.combo.DWT.superclass.constructor.call(this, config);

    // При раскрытии списка подгружаем данные заново
    this.on('expand', function () {
        var combo = Ext.getCmp(config.id);
        var comboStore = combo.getStore();
        comboStore.load();
    });
};
Ext.extend(applyForVacancy.combo.DWT, MODx.combo.ComboBox);
Ext.reg('afv-combo-resource-dwt', applyForVacancy.combo.DWT);


/**
 * @param config
 * @constructor
 */
applyForVacancy.combo.Engine = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'engine',
        fieldLabel: config['name'] || 'engine',
        hiddenName: config['name'] || 'engine',
        displayField: 'display',
        valueField: 'value',
        fields: ['value', 'display'],
        url: applyForVacancy.config['connector_url'],
        baseParams: {
            action: 'mgr/combo/getproductdatafield',
            key: 'engine',
        },
        pageSize: 20,
        typeAhead: false,
        editable: true,
        anchor: '100%',
        listEmptyText: '<div style="padding: 7px;">' + _('afv_combo_list_empty') + '</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item afv-combo__list-item">\
                <span>\
                    {display}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    applyForVacancy.combo.Engine.superclass.constructor.call(this, config);

    // При раскрытии списка подгружаем данные заново
    this.on('expand', function () {
        var combo = Ext.getCmp(config.id);
        var comboStore = combo.getStore();
        comboStore.load();
    });
};
Ext.extend(applyForVacancy.combo.Engine, MODx.combo.ComboBox);
Ext.reg('afv-combo-resource-engine', applyForVacancy.combo.Engine);