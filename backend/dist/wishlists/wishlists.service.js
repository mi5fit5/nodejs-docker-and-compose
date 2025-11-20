"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const wishes_service_1 = require("../wishes/wishes.service");
const typeorm_2 = require("@nestjs/typeorm");
let WishlistsService = class WishlistsService {
    constructor(wishlistRepository, wishesService) {
        this.wishlistRepository = wishlistRepository;
        this.wishesService = wishesService;
    }
    async createWishlist(createWishlistDto, user) {
        const wishes = await this.wishesService.findManyByIds(createWishlistDto.itemsId);
        const wishlist = await this.wishlistRepository.save(Object.assign(Object.assign({}, createWishlistDto), { owner: user, items: wishes }));
        return await this.wishlistRepository.findOne({
            where: { id: wishlist.id },
            relations: ['owner', 'items'],
        });
    }
    async findAllWishlists() {
        const wishlists = await this.wishlistRepository.find({
            relations: ['owner', 'items'],
        });
        return wishlists;
    }
    async findWishlistById(wishlistId) {
        const wishlist = await this.wishlistRepository.findOne({
            where: { id: wishlistId },
            relations: ['owner', 'items'],
        });
        if (!wishlist) {
            throw new common_1.NotFoundException('Виш-лист не найден');
        }
        return wishlist;
    }
    async updateWishlist(wishlistId, userId, updateWishlistDto) {
        const wishlist = await this.findWishlistById(wishlistId);
        if (!wishlist) {
            throw new common_1.NotFoundException('Виш-лист не найден');
        }
        if (wishlist.owner.id !== userId) {
            throw new common_1.BadRequestException('Вы не являетесь владельцем данного виш-листа');
        }
        const { name, image, description, itemsId = [] } = updateWishlistDto;
        const wishes = await this.wishesService.findManyByIds(itemsId);
        return await this.wishlistRepository.save(Object.assign(Object.assign({}, wishlist), { name,
            image,
            description, items: wishes }));
    }
    async deleteWishlistById(wishlistId, userId) {
        const wishlist = await this.findWishlistById(wishlistId);
        if (!wishlist) {
            throw new common_1.NotFoundException('Виш-лист не найден');
        }
        if (wishlist.owner.id !== userId) {
            throw new common_1.BadRequestException('Вы не являетесь владельцем данного виш-листа');
        }
        await this.wishlistRepository.delete(wishlistId);
        return wishlist;
    }
};
WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(wishlist_entity_1.Wishlist)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        wishes_service_1.WishesService])
], WishlistsService);
exports.WishlistsService = WishlistsService;
//# sourceMappingURL=wishlists.service.js.map