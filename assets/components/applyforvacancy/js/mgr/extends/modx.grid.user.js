applyForVacancy.grid.modxUserExt = function (config) {
    Ext.applyIf(config, {
        url: applyForVacancy.config['connector_url'],
        baseParams: {
            action: 'mgr/system/user/getlist',
            usergroup: (MODx.request['usergroup'] ? MODx.request['usergroup'] : ''),
        },
        save_action: 'mgr/system/user/updatefromgrid',
        fields: [
            'id',
            'username',
            'fullname',
            'email',
            'gender',
            'blocked',
            'role',
            'active',
            'cls',
            'dob',
            'position',
            'vessel',
            'dwt',
            'engine',
            'country',
            'state',
            'city',
        ],
        columns: [{
            header: _('id'),
            dataIndex: 'id',
            width: 60,
            sortable: true,
            fixed: true,
            resizable: false,
        }, {
            header: _('name'),
            dataIndex: 'username',
            width: 120,
            sortable: true,
            fixed: true,
            resizable: false,
            renderer: function (value, p, record) {
                return String.format('<a href="?a=security/user/update&id={0}" title="{1}" class="x-grid-link">{2}</a>', record.id, _('user_update'), Ext.util.Format.htmlEncode(value));
            },
        }, {
            header: _('user_full_name'),
            dataIndex: 'fullname',
            width: 180,
            sortable: true,
            editor: {
                xtype: 'textfield',
            },
            renderer: Ext.util.Format.htmlEncode,
        }, {
            header: _('afv_grid_dob'),
            dataIndex: 'dob',
            width: 90,
            sortable: true,
            fixed: true,
            resizable: false,
        }, {
            header: _('afv_grid_position'),
            dataIndex: 'position',
            width: 150,
            sortable: true,
        }, {
            header: _('afv_grid_vessel'),
            dataIndex: 'vessel',
            width: 100,
            sortable: true,
        }, {
            header: _('afv_grid_dwt'),
            dataIndex: 'dwt',
            width: 100,
            sortable: true,
        }, {
            header: _('afv_grid_engine'),
            dataIndex: 'engine',
            width: 100,
            sortable: true,
        }, {
            header: _('afv_grid_country'),
            dataIndex: 'country',
            width: 150,
            sortable: true,
            fixed: true,
            resizable: false,
        }, {
            header: _('afv_grid_state'),
            dataIndex: 'state',
            width: 100,
            sortable: true,
        }, {
            header: _('afv_grid_city'),
            dataIndex: 'city',
            width: 100,
            sortable: true,
        }],

        tbar: [{
            text: _('user_new'),
            handler: this.createUser,
            scope: this,
            cls: 'primary-button',
        }, {
            text: _('bulk_actions'),
            menu: [{
                text: _('selected_activate'),
                handler: this.activateSelected,
                scope: this,
            }, {
                text: _('selected_deactivate'),
                handler: this.deactivateSelected,
                scope: this,
            }, {
                text: _('selected_remove'),
                handler: this.removeSelected,
                scope: this,
            }]
        }, '->', {
            xtype: 'afv-combo-user-position',
            name: 'position',
            id: 'modx-user-filter-position',
            emptyText: _('afv_grid_position') + '...',
            // value: (MODx.request['position'] ? MODx.request['position'] : ''),
            width: 150,
            listeners: {
                select: {fn: this.filterPosition, scope: this}
            },
        }, {
            xtype: 'afv-combo-user-vessel',
            name: 'vessel',
            id: 'modx-user-filter-vessel',
            emptyText: _('afv_grid_vessel') + '...',
            // value: (MODx.request['vessel'] ? MODx.request['vessel'] : ''),
            width: 150,
            listeners: {
                select: {fn: this.filterVessel, scope: this}
            },
        }, {
            xtype: 'afv-combo-user-country',
            name: 'country',
            id: 'modx-user-filter-country',
            emptyText: _('afv_grid_country') + '...',
            // value: (MODx.request['country'] ? MODx.request['country'] : ''),
            width: 150,
            listeners: {
                select: {fn: this.filterCountry, scope: this}
            },
        }, {
            xtype: 'modx-combo-usergroup',
            name: 'usergroup',
            id: 'modx-user-filter-usergroup',
            emptyText: _('user_group') + '...',
            baseParams: {
                action: 'security/group/getlist',
                addAll: true,
            },
            // value: (MODx.request['usergroup'] ? MODx.request['usergroup'] : ''),
            width: 150,
            listeners: {
                select: {fn: this.filterUsergroup, scope: this}
            },
        }, {
            xtype: 'afv-field-search',
            id: 'modx-user-search',
            width: 170,
            listeners: {
                search: {
                    fn: function (field) {
                        this.getStore().baseParams.query = field.getValue();
                        this.getBottomToolbar().changePage(1);
                    }, scope: this
                },
                clear: {
                    fn: function (field) {
                        field.setValue('');
                        this.getStore().baseParams.query = '';
                        this.getBottomToolbar().changePage(1);
                    }, scope: this
                },
            }
        }]
    });
    applyForVacancy.grid.modxUserExt.superclass.constructor.call(this, config);
};
Ext.extend(applyForVacancy.grid.modxUserExt, MODx.grid.User, {
    filterPosition: function (cb, nv, ov) {
        this.getStore().baseParams.position = Ext.isEmpty(nv) || Ext.isObject(nv) ? cb.getValue() : nv;
        this.getBottomToolbar().changePage(1);
        //this.refresh();
        return true;
    },

    filterVessel: function (cb, nv, ov) {
        this.getStore().baseParams.vessel = Ext.isEmpty(nv) || Ext.isObject(nv) ? cb.getValue() : nv;
        this.getBottomToolbar().changePage(1);
        //this.refresh();
        return true;
    },

    filterCountry: function (cb, nv, ov) {
        this.getStore().baseParams.country = Ext.isEmpty(nv) || Ext.isObject(nv) ? cb.getValue() : nv;
        this.getBottomToolbar().changePage(1);
        //this.refresh();
        return true;
    },

    activateSelected: function () {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;
        MODx.Ajax.request({
            url: MODx.config['connector_url'],
            params: {
                action: 'security/user/activateMultiple',
                users: cs,
            },
            listeners: {
                'success': {
                    fn: function (r) {
                        this.getSelectionModel().clearSelections(true);
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    deactivateSelected: function () {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;
        MODx.Ajax.request({
            url: MODx.config['connector_url'],
            params: {
                action: 'security/user/deactivateMultiple',
                users: cs,
            },
            listeners: {
                'success': {
                    fn: function (r) {
                        this.getSelectionModel().clearSelections(true);
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    removeSelected: function () {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;
        MODx.msg.confirm({
            title: _('user_remove_multiple'),
            text: _('user_remove_multiple_confirm'),
            url: MODx.config['connector_url'],
            params: {
                action: 'security/user/removeMultiple',
                users: cs,
            },
            listeners: {
                'success': {
                    fn: function (r) {
                        this.getSelectionModel().clearSelections(true);
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    removeUser: function () {
        MODx.msg.confirm({
            title: _('user_remove'),
            text: _('user_confirm_remove'),
            url: MODx.config['connector_url'],
            params: {
                action: 'security/user/delete',
                id: this.menu.record.id,
            },
            listeners: {
                'success': {fn: this.refresh, scope: this}
            }
        });
    },

    duplicateUser: function () {
        MODx.Ajax.request({
            url: MODx.config['connector_url'],
            params: {
                action: 'security/user/duplicate',
                id: this.menu.record.id,
            },
            listeners: {
                'success': {fn: this.refresh, scope: this}
            }
        });
    }
});
Ext.reg('modx-grid-user', applyForVacancy.grid.modxUserExt);