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
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wish_entity_1 = require("./entities/wish.entity");
const typeorm_2 = require("typeorm");
let WishesService = class WishesService {
    constructor(wishRepository) {
        this.wishRepository = wishRepository;
    }
    async createWish(createWishDto, user) {
        const wish = await this.wishRepository.save(Object.assign(Object.assign({}, createWishDto), { owner: user }));
        return wish;
    }
    async findLastWishes() {
        const wishes = await this.wishRepository.find({
            order: { createdAt: 'desc' },
            take: 40,
            relations: ['owner', 'offers', 'offers.user'],
        });
        return wishes;
    }
    async findTopWishes() {
        const wishes = await this.wishRepository.find({
            order: { copied: 'desc' },
            take: 20,
            relations: ['owner', 'offers', 'offers.user'],
        });
        return wishes;
    }
    async findWishById(id) {
        const wish = await this.wishRepository.findOne({
            where: { id },
            relations: ['owner', 'offers', 'offers.user'],
        });
        if (!wish) {
            throw new common_1.NotFoundException('Пожелание не найдено');
        }
        return wish;
    }
    async updateWish(wishId, userId, updateWishDto) {
        const wish = await this.wishRepository.findOne({
            where: { id: wishId },
            relations: ['owner'],
        });
        if (!wish) {
            throw new common_1.NotFoundException('Пожелание не найдено');
        }
        if (wish.raised > 0) {
            throw new common_1.BadRequestException('Нельзя изменить стоимость');
        }
        if (wish.owner.id !== userId) {
            throw new common_1.BadRequestException('Вы не являетесь владельцем этого пожелания');
        }
        const updatedWish = await this.wishRepository.update(wishId, updateWishDto);
        return updatedWish;
    }
    async removeWishById(wishId, userId) {
        const wish = await this.wishRepository.findOne({
            where: { id: wishId },
            relations: ['owner'],
        });
        if (!wish) {
            throw new common_1.NotFoundException('Пожелание не найдено');
        }
        if (wish.owner.id !== userId) {
            throw new common_1.BadRequestException('Вы не являетесь владельцем этого пожелания');
        }
        await this.wishRepository.delete(wishId);
        return wish;
    }
    async copyWish(wishId, user) {
        const wish = await this.wishRepository.findOne({
            where: { id: wishId },
            relations: ['owner'],
        });
        if (!wish) {
            throw new common_1.NotFoundException('Пожелание не найдено');
        }
        this.wishRepository.update(wishId, { copied: wish.copied + 1 });
        delete wish.id;
        delete wish.createdAt;
        delete wish.updatedAt;
        const wishCopy = Object.assign(Object.assign({}, wish), { owner: user, copied: 0, raised: 0, offers: [] });
        await this.createWish(wishCopy, user);
    }
    async findManyByIds(wishIds) {
        const wishes = await this.wishRepository.find({
            where: { id: (0, typeorm_2.In)(wishIds) },
        });
        return wishes;
    }
    async updateRaisedAmount(wishId, raised) {
        await this.wishRepository.update(wishId, { raised });
    }
};
WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishesService);
exports.WishesService = WishesService;
//# sourceMappingURL=wishes.service.js.map