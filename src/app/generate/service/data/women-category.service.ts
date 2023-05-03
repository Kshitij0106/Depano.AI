import { Injectable } from '@angular/core';
import { Category } from '../../category';

@Injectable({
  providedIn: 'root',
})
export class WomenCategoryService {
  constructor() {}

  private Women: Category = {
    subCategories: [
      {
        name: 'Western Wear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-western',
        prompt: '',
      },
      {
        name: 'Indian Wear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-indian',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private WesternWear: Category = {
    subCategories: [
      {
        name: 'Topwear',
        image: '',
        code: 'women-western-top',
        prompt: '',
      },
      {
        name: 'Bottomwear',
        image: '',
        code: 'women-western-bottom',
        prompt: '',
      },
      {
        name: 'Dress/Jumpsuit',
        image: '',
        code: 'women-western-dress',
        prompt: '',
      },
      {
        name: 'Sets',
        image: '',
        code: 'women-western-sets',
        prompt: '',
      },
      {
        name: 'Lingerie/Sleepwear',
        image: '',
        code: 'women-western-sleepwear',
        prompt: '',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'women-western-sports',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private Topwear: Category = {
    subCategories: [
      {
        name: 'Top/Blouse',
        image: '',
        code: 'women-blouse',
        prompt: '',
      },
      {
        name: 'T-Shirt/Polo',
        image: '',
        code: 'women-tshirt',
        prompt: '',
      },
      {
        name: 'Shirts',
        image: '',
        code: 'women-shirt',
        prompt: '',
      },
      {
        name: 'Sweatshirt',
        image: '',
        code: 'women-sweatshirt',
        prompt: '',
      },
      {
        name: 'Sweater',
        image: '',
        code: 'women-sweater',
        prompt: '',
      },
      {
        name: 'Blazer & Coats',
        image: '',
        code: 'women-coats',
        prompt: '',
      },
      {
        name: 'Jackets',
        image: '',
        code: 'women-western-jackets',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private Bottomwear: Category = {
    subCategories: [
      {
        name: 'Jeans',
        image: '',
        code: 'women-jeans',
        prompt: '',
      },
      {
        name: 'Trouser',
        image: '',
        code: 'women-trouser',
        prompt: '',
      },
      {
        name: 'Shorts',
        image: '',
        code: 'women-shorts',
        prompt: '',
      },
      {
        name: 'Skirts',
        image: '',
        code: 'women-skirts',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private DressJumpsuit: Category = {
    subCategories: [
      {
        name: 'Bodycon',
        image: '',
        code: 'women-dress-bodycon',
        prompt: '',
      },
      {
        name: 'Qipao',
        image: '',
        code: 'women-dress-qipao',
        prompt: '',
      },
      {
        name: 'Plegged',
        image: '',
        code: 'women-dress-plegged',
        prompt: '',
      },
      {
        name: 'Peplum',
        image: '',
        code: 'women-dress-peplum',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private LingerieSleepwear: Category = {
    subCategories: [
      {
        name: 'Bra',
        image: '',
        code: 'women-bra',
        prompt: '',
      },
      {
        name: 'Briefs',
        image: '',
        code: 'women-briefs',
        prompt: '',
      },
      {
        name: 'Shapewear',
        image: '',
        code: 'women-shapeswear',
        prompt: '',
      },
      {
        name: 'Sleepwear & Loungewear',
        image: '',
        code: 'women-sleepwear',
        prompt: '',
      },
      {
        name: 'Thermal',
        image: '',
        code: 'women-thermal',
        prompt: '',
      },
      {
        name: 'Swimwear',
        image: '',
        code: 'women-lingerie-swimwear',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: false,
  };

  private SportswearActivewear: Category = {
    subCategories: [
      {
        name: 'Track pants & Shorts',
        image: '',
        code: 'women-sports-shorts',
        prompt: '',
      },
      {
        name: 'Tracksuit',
        image: '',
        code: 'women-sports-tracks',
        prompt: '',
      },
      {
        name: 'Jackets & Sweatshirts',
        image: '',
        code: 'women-sports-jackets',
        prompt: '',
      },
      {
        name: 'Active T-shirts',
        image: '',
        code: 'women-sports-tshirts',
        prompt: '',
      },
      {
        name: 'Swimwear',
        image: '',
        code: 'women-sports-swimwear',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private Sets: Category = {
    subCategories: [
      {
        name: 'Co-ord set',
        image: '',
        code: 'women-coord',
        prompt: '',
      },
      {
        name: 'Pantsuits',
        image: '',
        code: 'women-pant-suit',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private Indianwear: Category = {
    subCategories: [
      {
        name: 'Topwear',
        image: '',
        code: 'women-indian-top',
        prompt: '',
      },
      {
        name: 'Sets',
        image: '',
        code: 'women-indian-sets',
        prompt: '',
      },
      {
        name: 'Bottomwear',
        image: '',
        code: 'women-indian-bottom',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private IndianTopwear: Category = {
    subCategories: [
      {
        name: 'Kurti',
        image: '',
        code: 'women-indian-kurti',
        prompt: '',
      },
      {
        name: 'Top/Blouse',
        image: '',
        code: 'women-indian-blouse',
        prompt: '',
      },
      {
        name: 'Jackets',
        image: '',
        code: 'women-indian-jacket',
        prompt: '',
      },
      {
        name: 'Anarkali',
        image: '',
        code: 'women-indian-anarkali',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private IndianSets: Category = {
    subCategories: [
      {
        name: 'Suits',
        image: '',
        code: 'women-indian-suits',
        prompt: '',
      },
      {
        name: 'Saree',
        image: '',
        code: 'women-indian-saree',
        prompt: '',
      },
      {
        name: 'Lehenga Set',
        image: '',
        code: 'women-lehenga-set',
        prompt: '',
      },
      {
        name: 'Sharara Set',
        image: '',
        code: 'women-sharara-set',
        prompt: '',
      },
      {
        name: 'Anarkali Set',
        image: '',
        code: 'women-anarkali-set',
        prompt: '',
      },
      {
        name: 'Dhoti Set',
        image: '',
        code: 'wpmen-dhoti-set',
        prompt: '',
      },
      {
        name: 'Dupatta',
        image: '',
        code: 'women-dupatta',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private IndianBottomwear: Category = {
    subCategories: [
      {
        name: 'Leggings',
        image: '',
        code: 'women-indian-leggings',
        prompt: '',
      },
      {
        name: 'Skirts',
        image: '',
        code: 'women-indian-skirts',
        prompt: '',
      },
      {
        name: 'Salwar',
        image: '',
        code: 'women-indian-salwar',
        prompt: '',
      },
      {
        name: 'Churidaar',
        image: '',
        code: 'women-indian-churidaar',
        prompt: '',
      },
      {
        name: 'Pallazzo',
        image: '',
        code: 'women-indian-pallazzo',
        prompt: '',
      },
      {
        name: 'Lehenga',
        image: '',
        code: 'women-indian-lehenga',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  public getCategory(category: string) {
    switch (category) {
      case 'Women':
        return this.Women;
        break;
      case 'women-western':
        return this.WesternWear;
        break;
      case 'women-western-top':
        return this.Topwear;
        break;
      case 'women-western-bottom':
        return this.Bottomwear;
        break;
      case 'women-western-dress':
        return this.DressJumpsuit;
        break;
      case 'women-western-sets':
        return this.Sets;
        break;
      case 'women-western-sleepwear':
        return this.LingerieSleepwear;
        break;
      case 'women-western-sports':
        return this.SportswearActivewear;
        break;
      case 'women-indian':
        return this.Indianwear;
        break;
      case 'women-indian-top':
        return this.IndianTopwear;
        break;
      case 'women-indian-sets':
        return this.IndianSets;
        break;
      case 'women-indian-bottom':
        return this.IndianBottomwear;
        break;
      default:
        return '';
    }
  }
}
