"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { name: 'Amenda', email: 'amenda@email.com' },
    { name: 'Pretinho', email: 'pretinho@email.com' },
    { name: 'Kaio', email: 'kaio@email.com' },
];
class User {
    static findAll() {
        return new Promise((resolve, reject) => {
            resolve(users);
        });
    }
}
exports.default = User;
