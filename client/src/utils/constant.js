export const RoleEnum = {
    ADMIN: 'ADMINISTATOR',
    STAFF: 'STAFF'
}

export const apiUrlV1 = {
    login: "v1/auth/login",
    changePassword: "v1/auth/change-password",
    getListUser: "v1/customers/list-by-name",
    addUser: "v1/customers/create",
    getListItem: "v1/items/get-by-name",
    addItem: "v1/items/create",
    updateItem: "v1/items/edit",
    deleteItem: "v1/items/delete",
};

export const Genders = [
    `Nam`, `Nữ`
]

export const itemPaymentEnum = {
    MONEY: 'MONEY',
    POINT: 'POINT',
}

export const itemStatusEnum = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
}