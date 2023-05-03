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
        name: 'Western Wear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-western',
        prompt: '',
      },
      {
        name: 'Indian Wear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'men-indian',
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
        code: 'men-western-top',
        prompt: '',
      },
      {
        name: 'Bottomwear',
        image: '',
        code: 'men-western-bottom',
        prompt: '',
      },
      {
        name: 'Innerwear/Sleepwear',
        image: '',
        code: 'men-western-inner',
        prompt: '',
      },
      {
        name: 'Sportswear & Activewear',
        image: '',
        code: 'men-western-sports',
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
        name: 'T-Shirt/Polo',
        image: '',
        code: 'men-tshirt',
        prompt: '',
      },
      {
        name: 'Shirts',
        image: '',
        code: 'men-shirt',
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
        name: 'Blazer & Coats',
        image: '',
        code: 'men-coats',
        prompt: '',
      },
      {
        name: 'Jackets',
        image: '',
        code: 'men-western-jackets',
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
        code: 'men-jeans',
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
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private InnerwearSleepwear: Category = {
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
        name: 'Vests',
        image: '',
        code: 'men-vests',
        prompt: '',
      },
      {
        name: 'Sleepwear & Loungewear',
        image: '',
        code: 'men-sleepwear',
        prompt: '',
      },
      {
        name: 'Thermal',
        image: '',
        code: 'men-thermal',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: true,
  };

  private SportswearActivewear: Category = {
    subCategories: [
      {
        name: 'Track pants & Shorts',
        image: '',
        code: 'men-sports-shorts',
        prompt: '',
      },
      {
        name: 'Tracksuit',
        image: '',
        code: 'men-sports-tracks',
        prompt: '',
      },
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
      {
        name: 'Swimwear',
        image: '',
        code: 'men-sports-swimwear',
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
        code: 'men-indian-top',
        prompt: '',
      },
      {
        name: 'Bottomwear',
        image: '',
        code: 'men-indian-bottom',
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
        name: 'Kurta',
        image: '',
        code: 'men-indian-kurta',
        prompt: '',
      },
      {
        name: 'Sherwani',
        image: '',
        code: 'men-indian-sherwani',
        prompt: '',
      },
      {
        name: 'Nehru Jackets',
        image: '',
        code: 'men-indian-nehrujacket',
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
    mandatoryPrompts: [],
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
    mandatoryPrompts: [],
    next: true,
  };

  private FitType: Category = {
    subCategories: [
      {
        name: 'Slim fit',
        image: '',
        code: 'men-fit-slim',
        prompt: '',
      },
      {
        name: 'Regular',
        image: '',
        code: 'men-fit-regular',
        prompt: '',
      },
      {
        name: 'Loose/Relaxed',
        image: '',
        code: 'men-fit-loose',
        prompt: '',
      },
      {
        name: 'Athletic',
        image: '',
        code: 'men-fit-ath',
        prompt: '',
      },
    ],
    optionalTypes: [],
    mandatoryPrompts: [],
    next: false,
  };

  public getCategory(category: string) {
    switch (category) {
      case 'Men':
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
