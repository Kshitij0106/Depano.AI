import { Injectable } from '@angular/core';
import { Category } from '../../category';

@Injectable({
  providedIn: 'root',
})
export class MenCategoryService {
  constructor() {}

  private Men: Category = {
    subCategories: [
      {
        name: 'Topwear',
        image: '',
        code: 'men-top',
        prompt: 'from neck to waist',
      },
      {
        name: 'Bottomwear',
        image: '',
        code: 'men-bottom',
        prompt: 'from waist to heels',
      },
      {
        name: 'Sets',
        image: '',
        code: 'men-sets',
        prompt: 'from neck to heels',
      },
    ],
    optionalTypes: [],
    key: 'wear',
    next: true,
  };

  private Topwear: Category = {
    subCategories: [
      {
        name: 'Westernwear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-top-western',
        prompt: 'western-style',
      },
      {
        name: 'Indianwear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-top-indian',
        prompt: 'indian-style',
      },
    ],
    optionalTypes: [],
    key: 'style',
    next: true,
  };

  private TopWesternwear: Category = {
    subCategories: [
      {
        name: 'T-Shirt/Polo',
        image: '',
        code: 'men-tshirt',
        prompt: 't-shirt',
      },
      {
        name: 'Shirts',
        image: '',
        code: 'men-shirt',
        prompt: 'shirt',
      },
      {
        name: 'Sweatshirt',
        image: '',
        code: 'men-sweatshirt',
        prompt: 'sweatshirt',
      },
      {
        name: 'Sweater',
        image: '',
        code: 'men-sweater',
        prompt: 'sweater',
      },
      {
        name: 'Blazer & Coats',
        image: '',
        code: 'men-coats',
        prompt: '',
      },
      {
        name: 'Jackets',
        image: '',
        code: 'men-western-jackets',
        prompt: 'jacket',
      },
      {
        name: 'Innerwear/Sleepwear',
        image: '',
        code: 'men-top-inner',
        prompt: '',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'men-top-sports',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private TopInnerwearSleepwear: Category = {
    subCategories: [
      {
        name: 'Vests',
        image: '',
        code: 'men-vests',
        prompt: '',
      },
      {
        name: 'Thermal',
        image: '',
        code: 'men-top-thermal',
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
        code: 'men-sports-jackets',
        prompt: '',
      },
      {
        name: 'Active T-shirts',
        image: '',
        code: 'men-sports-tshirts',
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
        name: 'Kurta',
        image: '',
        code: 'men-indian-kurta',
        prompt: 'kurta',
      },
      {
        name: 'Sherwani',
        image: '',
        code: 'men-indian-sherwani',
        prompt: 'sherwani',
      },
      {
        name: 'Nehru Jackets',
        image: '',
        code: 'men-indian-nehrujacket',
        prompt: 'nehru jacket',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private Bottomwear: Category = {
    subCategories: [
      {
        name: 'Westernwear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-bottom-western',
        prompt: 'western-style',
      },
      {
        name: 'Indianwear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-bottom-indian',
        prompt: 'indian-style',
      },
    ],
    optionalTypes: [],
    key: 'style',
    next: true,
  };

  private BottomWesternwear: Category = {
    subCategories: [
      {
        name: 'Jeans',
        image: '',
        code: 'men-jeans',
        prompt: 'jeans',
      },
      {
        name: 'Trouser',
        image: '',
        code: 'men-trouser',
        prompt: 'trouser',
      },
      {
        name: 'Shorts',
        image: '',
        code: 'men-shorts',
        prompt: 'shorts',
      },
      {
        name: 'Innerwear/Sleepwear',
        image: '',
        code: 'men-bottom-inner',
        prompt: '',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'men-bottom-sports',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private BottomInnerwearSleepwear: Category = {
    subCategories: [
      {
        name: 'Briefs & Trunks',
        image: '',
        code: 'men-briefs',
        prompt: '',
      },
      {
        name: 'Boxers',
        image: '',
        code: 'men-boxers',
        prompt: '',
      },
      {
        name: 'Thermal',
        image: '',
        code: 'men-bottom-thermal',
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
        code: 'men-sports-jackets',
        prompt: '',
      },
      {
        name: 'Swimwear',
        image: '',
        code: 'men-swimwear',
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
        name: 'Dhoti',
        image: '',
        code: 'men-indian-dhoti',
        prompt: '',
      },
      {
        name: 'Pyjama',
        image: '',
        code: 'men-indian-pyjama',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private Sets: Category = {
    subCategories: [
      {
        name: 'Westernwear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-set-western',
        prompt: 'western-style',
      },
      {
        name: 'Indianwear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-set-indian',
        prompt: 'indian-style',
      },
    ],
    optionalTypes: [],
    key: 'style',
    next: true,
  };

  private SetsWestern: Category = {
    subCategories: [
      {
        name: 'Suits',
        image: '',
        code: 'men-suits',
        prompt: '',
      },
      {
        name: 'Innerwear/Sleepwear',
        image: '',
        code: 'men-set-inner',
        prompt: '',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'men-set-sports',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private SetsInnerwearSleepwear: Category = {
    subCategories: [
      {
        name: 'Sleepwear & Loungewear',
        image: '',
        code: 'men-set-sleep',
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
        code: 'men-tracksuit',
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
        name: 'Kurta Set',
        image: '',
        code: 'men-kurta-set',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private MenWestern: Category = {
    subCategories: [
      {
        name: 'T-Shirt/Polo',
        image: '',
        code: 'men-tshirt',
        prompt: '',
      },
      {
        name: 'Suits',
        image: '',
        code: 'men-suits',
        prompt: '',
      },
      {
        name: 'Shirts',
        image: '',
        code: 'men-shirt',
        prompt: '',
      },
      {
        name: 'Jeans',
        image: '',
        code: 'men-jeans',
        prompt: '',
      },
      {
        name: 'Sweatshirt',
        image: '',
        code: 'men-sweatshirt',
        prompt: '',
      },
      {
        name: 'Sweater',
        image: '',
        code: 'men-sweater',
        prompt: '',
      },
      {
        name: 'Trouser',
        image: '',
        code: 'men-trouser',
        prompt: '',
      },
      {
        name: 'Shorts',
        image: '',
        code: 'men-shorts',
        prompt: '',
      },
      {
        name: 'Innerwear/Sleepwear',
        image: '',
        code: 'men-set-inner',
        prompt: '',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'men-set-sports',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private MenIndian: Category = {
    subCategories: [
      {
        name: 'Dhoti',
        image: '',
        code: 'men-indian-dhoti',
        prompt: '',
      },
      {
        name: 'Kurta Set',
        image: '',
        code: 'men-kurta-set',
        prompt: '',
      },
      {
        name: 'Kurta',
        image: '',
        code: 'men-indian-kurta',
        prompt: 'kurta',
      },
      {
        name: 'Pyjama',
        image: '',
        code: 'men-indian-pyjama',
        prompt: '',
      },
      {
        name: 'Sherwani',
        image: '',
        code: 'men-indian-sherwani',
        prompt: 'sherwani',
      },
      {
        name: 'Nehru Jackets',
        image: '',
        code: 'men-indian-nehrujacket',
        prompt: 'nehru jacket',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private TShirt: Category = {
    subCategories: [
      {
        name: 'Fit type',
        image: '',
        code: 'mwtop-fit',
        prompt: '',
      },
      {
        name: 'Colour',
        image: '',
        code: 'men-tshirt-color',
        prompt: '',
      },
      {
        name: 'Collar',
        image: '',
        code: 'men-tshirt-collar',
        prompt: '',
      },
      {
        name: 'Sleeves',
        image: '',
        code: 'men-tshirt-sleeves',
        prompt: '',
      },
    ],
    optionalTypes: [
      {
        name: 'Fabric',
        image: '',
        code: 'men-tshirt-fabric',
        prompt: '',
      },
      {
        name: 'Print/Pattern',
        image: '',
        code: 'men-tshirt-pattern',
        prompt: '',
      },
    ],
    key: 'attributes',
    next: true,
  };

  private FitType: Category = {
    subCategories: [
      {
        name: 'Slim fit',
        image: '',
        code: 'men-fit-slim',
        prompt: 'slim fit',
      },
      {
        name: 'Regular',
        image: '',
        code: 'men-fit-regular',
        prompt: 'regular fit',
      },
      {
        name: 'Loose/Relaxed',
        image: '',
        code: 'men-fit-loose',
        prompt: 'relaxed fit and oversized fit',
      },
      {
        name: 'Athletic',
        image: '',
        code: 'men-fit-ath',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'fit-type',
    next: false,
  };

  public getCategory(category: string) {
    switch (category) {
      case 'Men':
        return this.Men;
        break;
      case 'male-western':
        return this.MenWestern;
        break;
      case 'male-indian':
        return this.MenIndian;
        break;
      case 'men-top':
        return this.Topwear;
        break;
      case 'men-bottom':
        return this.Bottomwear;
        break;
      case 'men-sets':
        return this.Sets;
        break;
      case 'men-top-western':
        return this.TopWesternwear;
        break;
      case 'men-top-indian':
        return this.TopIndianwear;
        break;
      case 'men-top-inner':
        return this.TopInnerwearSleepwear;
        break;
      case 'men-top-sports':
        return this.TopSportswearActivewear;
        break;
      case 'men-bottom-western':
        return this.BottomWesternwear;
        break;
      case 'men-bottom-indian':
        return this.BottomIndianwear;
        break;
      case 'men-bottom-inner':
        return this.BottomInnerwearSleepwear;
        break;
      case 'men-bottom-sports':
        return this.BottomSportswearActivewear;
        break;
      case 'men-set-western':
        return this.SetsWestern;
        break;
      case 'men-set-indian':
        return this.SetsIndian;
        break;
      case 'men-set-inner':
        return this.SetsInnerwearSleepwear;
        break;
      case 'men-set-sports':
        return this.SetsSportswearActivewear;
        break;
      case 'men-tshirt':
        return this.TShirt;
        break;
      case 'mwtop-fit':
        return this.FitType;
        break;
      default:
        return '';
    }
  }
}
