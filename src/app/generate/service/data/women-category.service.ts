import { Injectable } from '@angular/core';
import { Categories } from '../../categories';

@Injectable({
  providedIn: 'root',
})
export class WomenCategoryService {
  constructor() {}

  private Women: Categories = {
    categories: [
      {
        name: 'Western Wear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-western',
      },
      {
        name: 'Indian Wear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-indian',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private WesternWear: Categories = {
    categories: [
      {
        name: 'Topwear',
        image: '',
        code: 'women-western-top',
      },
      {
        name: 'Bottomwear',
        image: '',
        code: 'women-western-bottom',
      },
      {
        name: 'Dress/Jumpsuit',
        image: '',
        code: 'women-western-dress',
      },
      {
        name: 'Sets',
        image: '',
        code: 'women-western-sets',
      },
      {
        name: 'Lingerie/Sleepwear',
        image: '',
        code: 'women-western-sleepwear',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'women-western-sports',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private Topwear: Categories = {
    categories: [
      {
        name: 'Top/Blouse',
        image: '',
        code: 'women-blouse',
      },
      {
        name: 'T-Shirt/Polo',
        image: '',
        code: 'women-tshirt',
      },
      {
        name: 'Shirts',
        image: '',
        code: 'women-shirt',
      },
      {
        name: 'Sweatshirt',
        image: '',
        code: 'women-sweatshirt',
      },
      {
        name: 'Sweater',
        image: '',
        code: 'women-sweater',
      },
      {
        name: 'Blazer & Coats',
        image: '',
        code: 'women-coats',
      },
      {
        name: 'Jackets',
        image: '',
        code: 'women-western-jackets',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private Bottomwear: Categories = {
    categories: [
      {
        name: 'Jeans',
        image: '',
        code: 'women-jeans',
      },
      {
        name: 'Trouser',
        image: '',
        code: 'women-trouser',
      },
      {
        name: 'Shorts',
        image: '',
        code: 'women-shorts',
      },
      {
        name: 'Skirts',
        image: '',
        code: 'women-skirts',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private DressJumpsuit: Categories = {
    categories: [],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: false,
  };

  private LingerieSleepwear: Categories = {
    categories: [
      {
        name: 'Bra',
        image: '',
        code: 'women-bra',
      },
      {
        name: 'Briefs',
        image: '',
        code: 'women-briefs',
      },
      {
        name: 'Shapewear',
        image: '',
        code: 'women-shapeswear',
      },
      {
        name: 'Sleepwear & Loungewear',
        image: '',
        code: 'women-sleepwear',
      },
      {
        name: 'Thermal',
        image: '',
        code: 'women-thermal',
      },
      {
        name: 'Swimwear',
        image: '',
        code: 'women-lingerie-swimwear',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: false,
  };

  private SportswearActivewear: Categories = {
    categories: [
      {
        name: 'Track pants & Shorts',
        image: '',
        code: 'women-sports-shorts',
      },
      {
        name: 'Tracksuit',
        image: '',
        code: 'women-sports-tracks',
      },
      {
        name: 'Jackets & Sweatshirts',
        image: '',
        code: 'women-sports-jackets',
      },
      {
        name: 'Active T-shirts',
        image: '',
        code: 'women-sports-tshirts',
      },
      {
        name: 'Swimwear',
        image: '',
        code: 'women-sports-swimwear',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private Sets: Categories = {
    categories: [
      {
        name: 'Co-ord set',
        image: '',
        code: 'women-coord',
      },
      {
        name: 'Pantsuits',
        image: '',
        code: 'women-pant-suit',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private Indianwear: Categories = {
    categories: [
      {
        name: 'Topwear',
        image: '',
        code: 'women-indian-top',
      },
      {
        name: 'Sets',
        image: '',
        code: 'women-indian-sets',
      },
      {
        name: 'Bottomwear',
        image: '',
        code: 'women-indian-bottom',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private IndianTopwear: Categories = {
    categories: [
      {
        name: 'Kurti',
        image: '',
        code: 'women-indian-kurti',
      },
      {
        name: 'Top/Blouse',
        image: '',
        code: 'women-indian-blouse',
      },
      {
        name: 'Jackets',
        image: '',
        code: 'women-indian-jacket',
      },
      {
        name: 'Anarkali',
        image: '',
        code: 'women-indian-anarkali',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private IndianSets: Categories = {
    categories: [
      {
        name: 'Suits',
        image: '',
        code: 'women-indian-suits',
      },
      {
        name: 'Saree',
        image: '',
        code: 'women-indian-saree',
      },
      {
        name: 'Lehenga Set',
        image: '',
        code: 'women-lehenga-set',
      },
      {
        name: 'Sharara Set',
        image: '',
        code: 'women-sharara-set',
      },
      {
        name: 'Anarkali Set',
        image: '',
        code: 'women-anarkali-set',
      },
      {
        name: 'Dhoti Set',
        image: '',
        code: 'wpmen-dhoti-set',
      },
      {
        name: 'Dupatta',
        image: '',
        code: 'women-dupatta',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private IndianBottomwear: Categories = {
    categories: [
      {
        name: 'Leggings',
        image: '',
        code: 'women-indian-leggings',
      },
      {
        name: 'Skirts',
        image: '',
        code: 'women-indian-skirts',
      },
      {
        name: 'Salwar',
        image: '',
        code: 'women-indian-salwar',
      },
      {
        name: 'Churidaar',
        image: '',
        code: 'women-indian-churidaar',
      },
      {
        name: 'Pallazzo',
        image: '',
        code: 'women-indian-pallazzo',
      },
      {
        name: 'Lehenga',
        image: '',
        code: 'women-indian-lehenga',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  public getCategory(category: string) {
    switch (category) {
      case 'women':
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
