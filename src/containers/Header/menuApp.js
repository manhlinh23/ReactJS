export const adminMenu = [{ //hệ thống 
    name: 'menu.admin.manage-user',
    menus: [{
        name: 'menu.admin.crud',
        link: '/system/user-manage'
    },
    {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux'
    },
    {
        name: 'menu.admin.manage-doctor',
        link: '/system/manage-doctor'

    },

    {
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/manage-schedule'
    },
    ]
},

{ //quản lý phòng khám
    name: 'menu.admin.clinic',
    menus: [{
        name: 'menu.admin.manage-clinic',
        link: '/system/manage-clinic'
    }]
},

{ //quản lý phòng khám
    name: 'menu.admin.specialty',
    menus: [{
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty'
    }]
},

{ //quản lý cẩm nang
    name: 'menu.admin.handbook',
    menus: [{
        name: 'menu.admin.manage-handbook',
        link: '/system/manage-handbook'
    }]
},
];
export const doctorMenu = [{ //hệ thống 
    name: 'menu.doctor.manage-schedule',
    menus: [
        {
            name: 'menu.doctor.schedule',
            link: '/doctor/manage-schedule'
        },
        {
            name: 'menu.doctor.patient',
            link: '/doctor/manage-patient'
        },
    ]
}
];