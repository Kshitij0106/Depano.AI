import { Injectable } from '@angular/core';
import { Categories } from '../../categories';

@Injectable({
  providedIn: 'root',
})
export class MenCategoryService {
  constructor() {}

  private Men: Categories = {
    categories: [
      {
        name: 'Western Wear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-western',
      },
      {
        name: 'Indian Wear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-indian',
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
        code: 'men-western-top',
      },
      {
        name: 'Bottomwear',
        image: '',
        code: 'men-western-bottom',
      },
      {
        name: 'Innerwear/Sleepwear',
        image: '',
        code: 'men-western-inner',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'men-western-sports',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private Topwear: Categories = {
    categories: [
      {
        name: 'T-Shirt/Polo',
        image: '',
        code: 'men-tshirt',
      },
      {
        name: 'Shirts',
        image: '',
        code: 'men-shirt',
      },
      {
        name: 'Sweatshirt',
        image: '',
        code: 'men-sweatshirt',
      },
      {
        name: 'Sweater',
        image: '',
        code: 'men-sweater',
      },
      {
        name: 'Blazer & Coats',
        image: '',
        code: 'men-coats',
      },
      {
        name: 'Jackets',
        image: '',
        code: 'men-western-jackets',
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
        code: 'men-jeans',
      },
      {
        name: 'Trouser',
        image: '',
        code: 'men-trouser',
      },
      {
        name: 'Shorts',
        image: '',
        code: 'men-shorts',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private InnerwearSleepwear: Categories = {
    categories: [
      {
        name: 'Briefs & Trunks',
        image: '',
        code: 'men-briefs',
      },
      {
        name: 'Boxers',
        image: '',
        code: 'men-boxers',
      },
      {
        name: 'Vests',
        image: '',
        code: 'men-vests',
      },
      {
        name: 'Sleepwear & Loungewear',
        image: '',
        code: 'men-sleepwear',
      },
      {
        name: 'Thermal',
        image: '',
        code: 'men-thermal',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private SportswearActivewear: Categories = {
    categories: [
      {
        name: 'Track pants & Shorts',
        image: '',
        code: 'men-sports-shorts',
      },
      {
        name: 'Tracksuit',
        image: '',
        code: 'men-sports-tracks',
      },
      {
        name: 'Jackets & Sweatshirts',
        image: '',
        code: 'men-sports-jackets',
      },
      {
        name: 'Active T-shirts',
        image: '',
        code: 'men-sports-tshirts',
      },
      {
        name: 'Swimwear',
        image: '',
        code: 'men-sports-swimwear',
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
        code: 'men-indian-top',
      },
      {
        name: 'Bottomwear',
        image: '',
        code: 'men-indian-bottom',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private IndianTopwear: Categories = {
    categories: [
      {
        name: 'Kurta',
        image: '',
        code: 'men-indian-kurta',
      },
      {
        name: 'Sherwani',
        image: '',
        code: 'men-indian-sherwani',
      },
      {
        name: 'Nehru Jackets',
        image: '',
        code: 'men-indian-nehrujacket',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private IndianBottomwear: Categories = {
    categories: [
      {
        name: 'Dhoti',
        image: '',
        code: 'men-indian-dhoti',
      },
      {
        name: 'Pyjama',
        image: '',
        code: 'men-indian-pyjama',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  public getCategory(category: string) {
    switch (category) {
      case 'men':
        return this.Men;
        break;
      case 'men-western':
        return this.WesternWear;
        break;
      case 'men-western-top':
        return this.Topwear;
        break;
      case 'men-western-bottom':
        return this.Bottomwear;
        break;
      case 'men-western-inner':
        return this.InnerwearSleepwear;
        break;
      case 'men-western-sports':
        return this.SportswearActivewear;
        break;
      case 'men-indian':
        return this.Indianwear;
        break;
      case 'men-indian-top':
        return this.IndianTopwear;
        break;
      case 'men-indian-bottom':
        return this.IndianBottomwear;
        break;
      default:
        return '';
    }
  }
}
