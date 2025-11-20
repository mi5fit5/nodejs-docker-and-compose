"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const wishes_module_1 = require("./wishes/wishes.module");
const wishlists_module_1 = require("./wishlists/wishlists.module");
const offers_module_1 = require("./offers/offers.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("./users/entities/user.entity");
const wish_entity_1 = require("./wishes/entities/wish.entity");
const wishlist_entity_1 = require("./wishlists/entities/wishlist.entity");
const offer_entity_1 = require("./offers/entities/offer.entity");
const hash_module_1 = require("./hash/hash.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.database'),
                    entities: [user_entity_1.User, wish_entity_1.Wish, wishlist_entity_1.Wishlist, offer_entity_1.Offer],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            wishes_module_1.WishesModule,
            wishlists_module_1.WishlistsModule,
            offers_module_1.OffersModule,
            auth_module_1.AuthModule,
            hash_module_1.HashModule,
            jwt_1.JwtModule,
        ],
        controllers: [],
        providers: [jwt_1.JwtService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map