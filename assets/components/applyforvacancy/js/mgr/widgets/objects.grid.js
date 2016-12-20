applyForVacancy.grid.Objects = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'afv-grid-objects';
    }
    Ext.applyIf(config, {
        baseParams: {
            action: 'mgr/object/getlist',
            sort: 'id',
            dir: 'DESC',
            resource: config['resource'] || 0,
            user: config['user'] || 0,
        },
        multi_select: true,
    });
    applyForVacancy.grid.Objects.superclass.constructor.call(this, config);
};
Ext.extend(applyForVacancy.grid.Objects, applyForVacancy.grid.Default, {
    getFields: function (config) {
        return [
            'id',
            'resource',
            'resource_formatted',
            'user',
            'user_formatted',
            'position_type',
            'vessel_type',
            'dwt',
            'engine',
            'createdon',
            'createdon_formatted',
            'vendor',
            'status',
            'status_formatted',
            'actions',
        ];
    },

    getColumns: function (config) {
        var r = [{
            header: _('afv_grid_id'),
            dataIndex: 'id',
            width: 70,
            sortable: true,
            fixed: true,
            resizable: false,
        }];

        if (config['user'] || (!config['resource'] && !config['user'])) {
            r.push({
                header: _('afv_grid_resource'),
                dataIndex: 'resource_formatted',
                width: 150,
                sortable: true,
                renderer: function (value, p, record) {
                    return String.format('<a href="?a=resource/update&id={0}" class="x-grid-link">{1}</a>', record.data['resource'], Ext.util.Format.htmlEncode(value));
                },
            });

            r.push({
                header: _('afv_grid_position_type'),
                dataIndex: 'position_type',
                sortable: true,
                width: 120,
            }, {
                header: _('afv_grid_vessel_type'),
                dataIndex: 'vessel_type',
                sortable: true,
                width: 120,
            }, {
                header: _('afv_grid_dwt'),
                dataIndex: 'dwt',
                sortable: true,
                width: 120,
            }, {
                header: _('afv_grid_engine'),
                dataIndex: 'engine',
                sortable: true,
                width: 120,
            });
        }

        if (config['resource'] || (!config['resource'] && !config['user'])) {
            r.push({
                header: _('afv_grid_user'),
                dataIndex: 'user_formatted',
                width: 150,
                sortable: true,
                renderer: function (value, p, record) {
                    return String.format('<a href="?a=security/user/update&id={0}" class="x-grid-link">{1}</a>', record.data['user'], Ext.util.Format.htmlEncode(value));
                },
            });
        }

        r.push({
            header: _('afv_grid_createdon'),
            dataIndex: 'createdon_formatted',
            sortable: true,
            fixed: true,
            resizable: false,
            width: 150,
        });

        r.push({
            header: _('afv_grid_vendor'),
            dataIndex: 'vendor',
            sortable: true,
            fixed: true,
            resizable: false,
            width: 150,
        });

        r.push({
            header: _('afv_grid_status'),
            dataIndex: 'status_formatted',
            sortable: true,
            fixed: true,
            resizable: false,
            width: 150,
        });

        r.push({
            header: _('afv_grid_actions'),
            dataIndex: 'actions',
            id: 'actions',
            width: 100,
            sortable: false,
            fixed: true,
            resizable: false,
            renderer: applyForVacancy.utils.renderActions,
        });

        return r;
    },

    getTopBar: function (config) {
        var r = [];

        if (!config['resource'] && !config['user']) {
            r.push({
                xtype: 'afv-combo-resource-position-type',
                id: config.id + '__tbar-position-type',
                name: 'position_type',
                emptyText: _('afv_grid_position_type') + '...',
                width: 150,
                listeners: {
                    select: {
                        fn: function (combo) {
                            this._doFilter(combo);
                        }, scope: this
                    },
                },
            }, {
                xtype: 'afv-combo-resource-vessel-type',
                id: config.id + '__tbar-vessel-type',
                name: 'vessel_type',
                emptyText: _('afv_grid_vessel_type') + '...',
                width: 150,
                listeners: {
                    select: {
                        fn: function (combo) {
                            this._doFilter(combo);
                        }, scope: this
                    },
                },
            }, {
                xtype: 'afv-combo-resource-dwt',
                id: config.id + '__tbar-dwt',
                name: 'dwt',
                emptyText: _('afv_grid_dwt') + '...',
                width: 150,
                listeners: {
                    select: {
                        fn: function (combo) {
                            this._doFilter(combo);
                        }, scope: this
                    },
                },
            }, {
                xtype: 'afv-combo-resource-engine',
                id: config.id + '__tbar-engine',
                name: 'engine',
                emptyText: _('afv_grid_engine') + '...',
                width: 150,
                listeners: {
                    select: {
                        fn: function (combo) {
                            this._doFilter(combo);
                        }, scope: this
                    },
                },
            }, {
                xtype: 'afv-combo-vendor',
                id: config.id + '__tbar-vendor',
                name: 'vendor',
                emptyText: _('afv_grid_vendor') + '...',
                width: 150,
                listeners: {
                    select: {
                        fn: function (combo) {
                            this._doFilter(combo);
                        }, scope: this
                    },
                },
            }, {
                xtype: 'afv-combo-status',
                id: config.id + '__tbar-status',
                name: 'status',
                emptyText: _('afv_grid_status') + '...',
                width: 150,
                listeners: {
                    select: {
                        fn: function (combo) {
                            this._doFilter(combo);
                        }, scope: this
                    },
                },
            });
        }

        r.push('->', this.getSearchField(config));

        return r;
    },

    getListeners: function (config) {
        return {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.statusObject(grid, e, row);
            },
        };
    },

    statusObject: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        } else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config['url'],
            params: {
                action: 'mgr/object/get',
                id: id,
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'afv-window-object-status',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    },
                                    scope: this
                                },
                                failure: {fn: this._failureHandler, scope: this},
                            },
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                },
                failure: {fn: this._failureHandler, scope: this},
            }
        });
    },

    // createObject: function (btn, e) {
    //     var w = MODx.load({
    //         xtype: 'afv-window-object-create',
    //         id: Ext.id(),
    //         listeners: {
    //             success: {
    //                 fn: function () {
    //                     this.refresh();
    //                 },
    //                 scope: this
    //             },
    //             failure: {fn: this._failureHandler, scope: this},
    //         },
    //     });
    //     w.reset();
    //     w.setValues({
    //         active: true,
    //     });
    //     w.show(e.target);
    // },
    //
    // updateObject: function (btn, e, row, activeTab) {
    //     if (typeof(row) != 'undefined') {
    //         this.menu.record = row.data;
    //     } else if (!this.menu.record) {
    //         return false;
    //     }
    //     var id = this.menu.record.id;
    //
    //     if (typeof(activeTab) == 'undefined') {
    //         activeTab = 0;
    //     }
    //
    //     MODx.Ajax.request({
    //         url: this.config['url'],
    //         params: {
    //             action: 'mgr/object/get',
    //             id: id,
    //         },
    //         listeners: {
    //             success: {
    //                 fn: function (r) {
    //                     var w = MODx.load({
    //                         xtype: 'afv-window-object-update',
    //                         id: Ext.id(),
    //                         record: r,
    //                         activeTab: activeTab,
    //                         listeners: {
    //                             success: {
    //                                 fn: function () {
    //                                     this.refresh();
    //                                 },
    //                                 scope: this
    //                             },
    //                             failure: {fn: this._failureHandler, scope: this},
    //                         },
    //                     });
    //                     w.reset();
    //                     w.setValues(r.object);
    //                     w.show(e.target);
    //                 }, scope: this
    //             },
    //             failure: {fn: this._failureHandler, scope: this},
    //         }
    //     });
    // },

    actionObject: function (action, confirm, checkIds) {
        if (typeof(action) == 'undefined') {
            return false;
        }
        if (typeof(confirm) == 'undefined') {
            confirm = false;
        }
        if (typeof(checkIds) == 'undefined') {
            checkIds = true;
        }
        var ids = this._getSelectedIds();
        if (checkIds && !ids.length) {
            this.refresh();
            return false;
        }

        var params = {
            url: this.config['url'],
            params: {
                action: 'mgr/object/' + action,
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var grid = this;
                        this._failureHandler(r, function () {
                            grid.refresh();
                        });
                    }, scope: this
                },
                failure: {
                    fn: function (r) {
                        var grid = this;
                        this._failureHandler(r, function () {
                            grid.refresh();
                        });
                    }, scope: this
                },
            },
        };

        if (confirm) {
            MODx.msg.confirm(Ext.apply({}, params, {
                title: ids.length > 1
                    ? _('afv_button_' + action + '_multiple')
                    : _('afv_button_' + action),
                text: _('afv_confirm_' + action),
            }));
        } else {
            MODx.Ajax.request(params);
        }

        return true;
    },

    // enableObject: function () {
    //     this.loadMask.show();
    //     return this.actionObject('enable');
    // },
    //
    // disableObject: function () {
    //     this.loadMask.show();
    //     return this.actionObject('disable');
    // },

    removeObject: function () {
        return this.actionObject('remove', true);
    },
});
Ext.reg('afv-grid-objects', applyForVacancy.grid.Objects);