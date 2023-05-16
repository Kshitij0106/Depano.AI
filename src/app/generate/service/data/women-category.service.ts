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
        name: 'Topwear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-top',
        prompt: '',
      },
      {
        name: 'Bottomwear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-bottom',
        prompt: '',
      },
      {
        name: 'Dress',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-dress',
        prompt: '',
      },
      {
        name: 'Sets',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-set',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private Topwear: Category = {
    subCategories: [
      {
        name: 'Westernwear',
        image: '',
        code: 'women-top-western',
        prompt: '',
      },
      {
        name: 'Indianwear',
        image: '',
        code: 'women-top-indian',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private TopWesternwear: Category = {
    subCategories: [
      {
        name: 'Top/Blouse',
        image: '',
        code: 'women-western-blouse',
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
        code: 'women-western-shirt',
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
      {
        name: 'Innerwear/Sleepwear',
        image: '',
        code: 'women-top-sleepwear',
        prompt: '',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'women-top-sports',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private TopInnerwearSleepwear: Category = {
    subCategories: [
      {
        name: 'Bra',
        image: '',
        code: 'women-bra',
        prompt: '',
      },
      {
        name: 'Shapewear',
        image: '',
        code: 'women-top-shapeswear',
        prompt: '',
      },
      {
        name: 'Thermal',
        image: '',
        code: 'women-top-thermal',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private TopSportswearActivewear: Category = {
    subCategories: [
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
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private TopIndianwear: Category = {
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
    key: '',
    next: true,
  };

  private Bottomwear: Category = {
    subCategories: [
      {
        name: 'Westernwear',
        image: '',
        code: 'women-bottom-western',
        prompt: '',
      },
      {
        name: 'Indianwear',
        image: '',
        code: 'women-bottom-indian',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private BottomWesternwear: Category = {
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
      {
        name: 'Innerwear/Sleepwear',
        image: '',
        code: 'women-bottom-sleepwear',
        prompt: '',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'women-bottom-sports',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private BottomInnerwearSleepwear: Category = {
    subCategories: [
      {
        name: 'Briefs',
        image: '',
        code: 'women-briefs',
        prompt: '',
      },
      {
        name: 'Shapewear',
        image: '',
        code: 'women-bottom-shapewear',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private BottomSportswearActivewear: Category = {
    subCategories: [
      {
        name: 'Track pants & shorts',
        image: '',
        code: 'women-sports-pants',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private BottomIndianwear: Category = {
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
      {
        name: 'Saree',
        image: '',
        code: 'women-bottom-saree',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private Sets: Category = {
    subCategories: [
      {
        name: 'Westernwear',
        image: '',
        code: 'women-set-western',
        prompt: '',
      },
      {
        name: 'Indianwear',
        image: '',
        code: 'women-set-indian',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private SetsWestern: Category = {
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
      {
        name: 'Innerwear/Sleepwear',
        image: '',
        code: 'women-set-inner',
        prompt: '',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'women-set-sports',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private SetsInnerwearSleepwear: Category = {
    subCategories: [
      {
        name: 'Sleepwear & Loungewear',
        image: '',
        code: 'women-set-sleep',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: '',
    next: true,
  };

  private SetsSportswearActivewear: Category = {
    subCategories: [
      {
        name: 'Tracksuit',
        image: '',
        code: 'women-tracksuit',
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
    key: '',
    next: true,
  };

  private SetsIndian: Category = {
    subCategories: [
      {
        name: 'Suits',
        image: '',
        code: 'women-indian-suits',
        prompt: '',
      },
      {
        name: 'Saree with Blouse',
        image: '',
        code: 'women-set-saree',
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
    ],
    optionalTypes: [],
    key: '',
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
    key: '',
    next: true,
  };

  public getCategory(category: string) {
    switch (category) {
      case 'Women':
        return this.Women;
        break;
      case 'women-top':
        return this.Topwear;
        break;
      case 'women-bottom':
        return this.Bottomwear;
        break;
      case 'women-dress':
        return this.DressJumpsuit;
        break;
      case 'women-set':
        return this.Sets;
        break;
      case 'women-western':
        return this.Bottomwear;
        break;
      case 'women-western-dress':
        return this.DressJumpsuit;
        break;
      case 'women-western-sets':
        return this.Sets;
        break;
      case 'women-top-western':
        return this.TopWesternwear;
        break;
      case 'women-top-indian':
        return this.TopIndianwear;
        break;
      case 'women-top-sleepwear':
        return this.TopInnerwearSleepwear;
        break;
      case 'women-top-sports':
        return this.TopSportswearActivewear;
        break;
      case 'women-bottom-western':
        return this.BottomWesternwear;
        break;
      case 'women-bottom-indian':
        return this.BottomIndianwear;
        break;
      case 'women-bottom-sleepwear':
        return this.BottomInnerwearSleepwear;
        break;
      case 'women-bottom-sports':
        return this.BottomSportswearActivewear;
        break;
      case 'women-set-western':
        return this.SetsWestern;
        break;
      case 'women-set-indian':
        return this.SetsIndian;
        break;
      case 'women-set-inner':
        return this.SetsInnerwearSleepwear;
        break;
      case 'women-set-sports':
        return this.SetsSportswearActivewear;
        break;
      default:
        return '';
    }
  }
}
