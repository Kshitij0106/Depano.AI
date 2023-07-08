import { Injectable } from '@angular/core';
import { Category } from '../../category';
import { Subcategory } from '../../subcategory';

@Injectable({
  providedIn: 'root',
})
export class WomenCategoryService {
  constructor() {}

  private TopAttributesSubCategories: Subcategory[] = [
    {
      name: 'Fit type',
      image: '',
      code: 'wwtop-fit',
      prompt: '',
    },
    {
      name: 'Color',
      image: '',
      code: 'color',
      prompt: '',
    },
    {
      name: 'Neckline',
      image: '',
      code: 'women-neck',
      prompt: '',
    },
    {
      name: 'Sleeves',
      image: '',
      code: 'women-sleeves-type',
      prompt: '',
    },
    {
      name: 'Print/Pattern',
      image: '',
      code: 'print',
      prompt: '',
    },
  ];

  private TopAttributesOptionalSubCategories: Subcategory[] = [
    {
      name: 'Fabric',
      image: '',
      code: 'fabric',
      prompt: '',
    },
    {
      name: 'Sleeve length',
      image: '',
      code: 'wwtop-sleeve-length',
      prompt: '',
    },
    {
      name: 'Hemline',
      image: '',
      code: 'wwtop-hemline',
      prompt: '',
    },
    {
      name: 'Length',
      image: '',
      code: 'wwtop-length',
      prompt: '',
    },
    {
      name: 'Embellishments',
      image: '',
      code: 'wwtop-embellishments',
      prompt: '',
    },
  ];

  private TopAttributes: Category = {
    subCategories: this.TopAttributesSubCategories,
    optionalTypes: this.TopAttributesOptionalSubCategories,
    key: 'attributes',
    next: true,
  };

  private BottomAttributesSubCategories: Subcategory[] = [
    {
      name: 'Fit type',
      image: '',
      code: 'wwbottom-fit',
      prompt: '',
    },
    {
      name: 'Color',
      image: '',
      code: 'color',
      prompt: '',
    },
    {
      name: 'Print/Pattern',
      image: '',
      code: 'print',
      prompt: '',
    },
    {
      name: 'Waist rise',
      image: '',
      code: 'women-waist',
      prompt: '',
    },
    {
      name: 'Length',
      image: '',
      code: 'wwbottom-length',
      prompt: '',
    },
  ];

  private BottomAttributesOptionalSubCategories: Subcategory[] = [
    {
      name: 'Fabric',
      image: '',
      code: 'fabric',
      prompt: '',
    },
    {
      name: 'Hemline',
      image: '',
      code: 'wwbottom-hem',
      prompt: '',
    },
    {
      name: 'Closure',
      image: '',
      code: 'wwbottom-closure',
      prompt: '',
    },
  ];

  private BottomAttributes: Category = {
    subCategories: this.BottomAttributesSubCategories,
    optionalTypes: this.BottomAttributesOptionalSubCategories,
    key: 'attributes',
    next: true,
  };

  private Women: Category = {
    subCategories: [
      {
        name: 'Topwear',
        image:
          'https://i.pinimg.com/originals/c5/82/fd/c582fdd80283b0ffdc2d34a74bd2a8e3.jpg',
        code: 'women-top',
        prompt: 'from neck to waist',
      },
      {
        name: 'Bottomwear',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-bottom',
        prompt: 'from waist to heels',
      },
      {
        name: 'Dress',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-dress',
        prompt: 'from neck to heels',
      },
      {
        name: 'Sets',
        image:
          'https://i.pinimg.com/564x/6b/74/f5/6b74f51970916d6b7d73b17d9b606d31.jpg',
        code: 'women-set',
        prompt: 'from neck to heels',
      },
    ],
    optionalTypes: [
      ...this.TopAttributesOptionalSubCategories,
      ...this.BottomAttributesOptionalSubCategories,
    ],
    key: 'wear',
    next: true,
  };

  private Topwear: Category = {
    subCategories: [
      {
        name: 'Westernwear',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.XbDIj4fBZf7j6Rgar6JmAgHaJ4%26pid%3DApi&f=1&ipt=2de60556973b412506c8d274bca66b46275c1a3d846fd44342615af22291d1d3&ipo=images',
        code: 'women-top-western',
        prompt: 'western-style',
      },
      {
        name: 'Indianwear',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.nn-ZFSM6ztP1jSA1m4ly3gHaJ4%26pid%3DApi&f=1&ipt=55e554eae9c0ccb1b56742640201699a02fef9d3df995fe96b961067815d81ab&ipo=images',
        code: 'women-top-indian',
        prompt: 'indian-style',
      },
    ],
    optionalTypes: this.TopAttributesOptionalSubCategories,
    key: 'style',
    next: true,
  };

  private TopWesternwear: Category = {
    subCategories: [
      {
        name: 'Top/Blouse',
        image:
          'https://i5.walmartimages.com/asr/9f228d9e-4582-434c-9cd3-2ffaa45b4000_1.c42b0b1a13cdfe59c2ecfa4a55dec434.jpeg',
        code: 'women-western-blouse',
        prompt: 'blouse',
      },
      {
        name: 'T-Shirt/Polo',
        image:
          'https://i.pinimg.com/originals/c5/82/fd/c582fdd80283b0ffdc2d34a74bd2a8e3.jpg',
        code: 'women-tshirt',
        prompt: 't-shirt',
      },
      {
        name: 'Shirts',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.XbDIj4fBZf7j6Rgar6JmAgHaJ4%26pid%3DApi&f=1&ipt=2de60556973b412506c8d274bca66b46275c1a3d846fd44342615af22291d1d3&ipo=images',
        code: 'women-western-shirt',
        prompt: 'shirt',
      },
      {
        name: 'Sweatshirt',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FlvVopCNBreg0zI9NYocxQHaHa%26pid%3DApi&f=1&ipt=bd487932095316720c18285a9e626765fb54ae201b58fccf9f216e5673a03570&ipo=images',
        code: 'women-sweatshirt',
        prompt: 'sweatshirt',
      },
      {
        name: 'Sweater',
        image:
          'https://i5.walmartimages.com/asr/c58f377a-b843-415d-b9f2-b66f4f32cd80_1.310f77dffec582a0b8893d6b253a29ec.jpeg',
        code: 'women-sweater',
        prompt: 'sweater',
      },
      {
        name: 'Blazer & Coats',
        image:
          'https://ae01.alicdn.com/kf/HTB1djL4czfguuRjSszcq6zb7FXab/feitong-2018-winer-Autumn-OL-Black-Women-Blazers-New-Fashion-Single-Button-Blazer-Femenino-Ladies-Blazer.jpg',
        code: 'women-coats',
        prompt: 'blazer',
      },
      {
        name: 'Jackets',
        image:
          'https://i5.walmartimages.com/asr/a49c8a04-50de-4ba6-a5a1-c5600e9b2661.2faf8f723097680d0916978ad3c2ac88.jpeg',
        code: 'women-western-jackets',
        prompt: 'jacket',
      },
      {
        name: 'Bra',
        image: '',
        code: 'women-bra',
        prompt: 'bra',
      },
      {
        name: 'Shapewear',
        image: '',
        code: 'women-top-shapeswear',
        prompt: 'shapewear',
      },
      {
        name: 'Thermal',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/71FbHshmSXL._AC_UX466_.jpg',
        code: 'women-top-thermal',
        prompt: 'top thermal',
      },
      {
        name: 'Active T-shirts',
        image:
          'https://i.pinimg.com/originals/db/79/90/db79909353e081a28cf05f7ca045ba4f.jpg',
        code: 'women-sports-tshirts',
        prompt: 'active t-shirts',
      },
    ],
    optionalTypes: this.TopAttributesOptionalSubCategories,
    key: 'type',
    next: true,
  };

  private TopIndianwear: Category = {
    subCategories: [
      {
        name: 'Kurti',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.nn-ZFSM6ztP1jSA1m4ly3gHaJ4%26pid%3DApi&f=1&ipt=55e554eae9c0ccb1b56742640201699a02fef9d3df995fe96b961067815d81ab&ipo=images',
        code: 'women-indian-kurti',
        prompt: 'kurti',
      },
      {
        name: 'Top/Blouse',
        image:
          'https://i.pinimg.com/originals/d5/7f/74/d57f749d4358307a0154e1195107255e.jpg',
        code: 'women-indian-blouse',
        prompt: 'blouse',
      },
      {
        name: 'Jackets',
        image:
          'https://i.pinimg.com/736x/a1/84/10/a1841064183515c9727d1926afcd8f18.jpg',
        code: 'women-indian-jacket',
        prompt: 'indian jacket',
      },
      {
        name: 'Anarkali',
        image:
          'https://2.bp.blogspot.com/-ouORdVKRVQM/Vr9WSskmlGI/AAAAAAAADZo/PoWCT-OdbyM/s1600/Pakistani-Anarkali-dresses-Latest-Designer-Anarkali-Suits-For-Women-2014-20156.jpg',
        code: 'women-indian-anarkali',
        prompt: 'anarkali',
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
        image: '',
        code: 'women-bottom-western',
        prompt: 'western-style',
      },
      {
        name: 'Indianwear',
        image: '',
        code: 'women-bottom-indian',
        prompt: 'indian-style',
      },
    ],
    optionalTypes: this.BottomAttributesOptionalSubCategories,
    key: 'style',
    next: true,
  };

  private BottomWesternwear: Category = {
    subCategories: [
      {
        name: 'Jeans',
        image: '',
        code: 'women-jeans',
        prompt: 'jeans',
      },
      {
        name: 'Trouser',
        image: '',
        code: 'women-trouser',
        prompt: 'trouser',
      },
      {
        name: 'Shorts',
        image: '',
        code: 'women-shorts',
        prompt: 'shorts',
      },
      {
        name: 'Skirts',
        image: '',
        code: 'women-skirts',
        prompt: 'skirts',
      },
      {
        name: 'Briefs',
        image: '',
        code: 'women-briefs',
        prompt: 'briefs',
      },
      {
        name: 'Shapewear',
        image: '',
        code: 'women-bottom-shapewear',
        prompt: 'bottom shapewear',
      },
      {
        name: 'Track pants & shorts',
        image: '',
        code: 'women-sports-pants',
        prompt: 'sports pants',
      },
    ],
    optionalTypes: this.BottomAttributesOptionalSubCategories,
    key: 'type',
    next: true,
  };

  private BottomIndianwear: Category = {
    subCategories: [
      {
        name: 'Leggings',
        image: '',
        code: 'women-indian-leggings',
        prompt: 'leggings',
      },
      {
        name: 'Skirts',
        image: '',
        code: 'women-indian-skirts',
        prompt: 'indian skirts',
      },
      {
        name: 'Salwar',
        image: '',
        code: 'women-indian-salwar',
        prompt: 'salwar',
      },
      {
        name: 'Churidaar',
        image: '',
        code: 'women-indian-churidaar',
        prompt: 'churidaar salwar',
      },
      {
        name: 'Palazzo',
        image: '',
        code: 'women-indian-palazzo',
        prompt: 'palazzo',
      },
      {
        name: 'Lehenga',
        image: '',
        code: 'women-indian-lehenga',
        prompt: 'lehenga',
      },
      {
        name: 'Saree',
        image: '',
        code: 'women-bottom-saree',
        prompt: 'saree',
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
        image: '',
        code: 'women-set-western',
        prompt: 'western-style',
      },
      {
        name: 'Indianwear',
        image: '',
        code: 'women-set-indian',
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
        name: 'Co-ord set',
        image: '',
        code: 'women-coord',
        prompt: 'co-ord set',
      },
      {
        name: 'Pantsuits',
        image: '',
        code: 'women-pant-suit',
        prompt: 'pant suit',
      },
      {
        name: 'Sleepwear & Loungewear',
        image: '',
        code: 'women-set-sleep',
        prompt: 'sleepwear set',
      },
      {
        name: 'Tracksuit',
        image: '',
        code: 'women-tracksuit',
        prompt: 'tracksuit',
      },
      {
        name: 'Swimwear',
        image: '',
        code: 'women-sports-swimwear',
        prompt: 'swimwear',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private SetsIndian: Category = {
    subCategories: [
      {
        name: 'Suits',
        image: '',
        code: 'women-indian-suits',
        prompt: 'indian suit',
      },
      {
        name: 'Saree with Blouse',
        image: '',
        code: 'women-set-saree',
        prompt: 'saree with blouse',
      },
      {
        name: 'Lehenga Set',
        image: '',
        code: 'women-lehenga-set',
        prompt: 'lehenga with blouse',
      },
      {
        name: 'Sharara Set',
        image: '',
        code: 'women-sharara-set',
        prompt: 'sahara set',
      },
      {
        name: 'Anarkali Set',
        image: '',
        code: 'women-anarkali-set',
        prompt: 'anarkali set',
      },
      {
        name: 'Dhoti Set',
        image: '',
        code: 'women-dhoti-set',
        prompt: 'dhoti set',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private Dress: Category = {
    subCategories: [
      {
        name: 'Bodycon',
        image: '',
        code: 'women-dress-bodycon',
        prompt: 'bodycon dress',
      },
      {
        name: 'Qipao',
        image: '',
        code: 'women-dress-qipao',
        prompt: 'qipao dress',
      },
      {
        name: 'Plegged',
        image: '',
        code: 'women-dress-plegged',
        prompt: 'plegged dress',
      },
      {
        name: 'Peplum',
        image: '',
        code: 'women-dress-peplum',
        prompt: 'peplum dress',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private WomenWestern: Category = {
    subCategories: [
      {
        name: 'Jeans',
        image: '',
        code: 'women-jeans',
        prompt: 'jeans',
      },
      {
        name: 'T-Shirt/Polo',
        image:
          'https://i.pinimg.com/originals/c5/82/fd/c582fdd80283b0ffdc2d34a74bd2a8e3.jpg',
        code: 'women-tshirt',
        prompt: 't-shirt',
      },
      {
        name: 'Trouser',
        image: '',
        code: 'women-trouser',
        prompt: 'trouser',
      },
      {
        name: 'Shorts',
        image: '',
        code: 'women-shorts',
        prompt: 'shorts',
      },
      {
        name: 'Co-ord set',
        image: '',
        code: 'women-coord',
        prompt: 'co-ord set',
      },
      {
        name: 'Shirts',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.XbDIj4fBZf7j6Rgar6JmAgHaJ4%26pid%3DApi&f=1&ipt=2de60556973b412506c8d274bca66b46275c1a3d846fd44342615af22291d1d3&ipo=images',
        code: 'women-western-shirt',
        prompt: 'shirt',
      },
      {
        name: 'Pantsuits',
        image: '',
        code: 'women-pant-suit',
        prompt: 'pant suit',
      },
      {
        name: 'Sweatshirt',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FlvVopCNBreg0zI9NYocxQHaHa%26pid%3DApi&f=1&ipt=bd487932095316720c18285a9e626765fb54ae201b58fccf9f216e5673a03570&ipo=images',
        code: 'women-sweatshirt',
        prompt: 'sweatshirt',
      },
      {
        name: 'Sweater',
        image:
          'https://i5.walmartimages.com/asr/c58f377a-b843-415d-b9f2-b66f4f32cd80_1.310f77dffec582a0b8893d6b253a29ec.jpeg',
        code: 'women-sweater',
        prompt: 'sweater',
      },
      {
        name: 'Skirts',
        image: '',
        code: 'women-skirts',
        prompt: 'skirts',
      },
      {
        name: 'Blazer & Coats',
        image:
          'https://ae01.alicdn.com/kf/HTB1djL4czfguuRjSszcq6zb7FXab/feitong-2018-winer-Autumn-OL-Black-Women-Blazers-New-Fashion-Single-Button-Blazer-Femenino-Ladies-Blazer.jpg',
        code: 'women-coats',
        prompt: 'blazer',
      },
      {
        name: 'Jackets',
        image:
          'https://i5.walmartimages.com/asr/a49c8a04-50de-4ba6-a5a1-c5600e9b2661.2faf8f723097680d0916978ad3c2ac88.jpeg',
        code: 'women-western-jackets',
        prompt: 'jacket',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private WomenIndian: Category = {
    subCategories: [
      {
        name: 'Salwar',
        image: '',
        code: 'women-indian-salwar',
        prompt: 'salwar',
      },
      {
        name: 'Suits',
        image: '',
        code: 'women-indian-suits',
        prompt: 'indian suit',
      },
      {
        name: 'Saree with Blouse',
        image: '',
        code: 'women-set-saree',
        prompt: 'saree with blouse',
      },
      {
        name: 'Churidaar',
        image: '',
        code: 'women-indian-churidaar',
        prompt: 'churidaar salwar',
      },
      {
        name: 'Kurti',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.nn-ZFSM6ztP1jSA1m4ly3gHaJ4%26pid%3DApi&f=1&ipt=55e554eae9c0ccb1b56742640201699a02fef9d3df995fe96b961067815d81ab&ipo=images',
        code: 'women-indian-kurti',
        prompt: 'kurti',
      },
      {
        name: 'Lehenga Set',
        image: '',
        code: 'women-lehenga-set',
        prompt: 'lehenga with blouse',
      },
      {
        name: 'Leggings',
        image: '',
        code: 'women-indian-leggings',
        prompt: 'leggings',
      },
      {
        name: 'Skirts',
        image: '',
        code: 'women-indian-skirts',
        prompt: 'indian skirts',
      },
      {
        name: 'Top/Blouse',
        image:
          'https://i.pinimg.com/originals/d5/7f/74/d57f749d4358307a0154e1195107255e.jpg',
        code: 'women-indian-blouse',
        prompt: 'blouse',
      },
      {
        name: 'Anarkali',
        image:
          'https://2.bp.blogspot.com/-ouORdVKRVQM/Vr9WSskmlGI/AAAAAAAADZo/PoWCT-OdbyM/s1600/Pakistani-Anarkali-dresses-Latest-Designer-Anarkali-Suits-For-Women-2014-20156.jpg',
        code: 'women-indian-anarkali',
        prompt: 'anarkali',
      },
      {
        name: 'Palazzo',
        image: '',
        code: 'women-indian-palazzo',
        prompt: 'palazzo',
      },
      {
        name: 'Anarkali Set',
        image: '',
        code: 'women-anarkali-set',
        prompt: 'anarkali set',
      },
      {
        name: 'Lehenga',
        image: '',
        code: 'women-indian-lehenga',
        prompt: 'lehenga',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private FitTypeTop: Category = {
    subCategories: [
      {
        name: 'Slim fit',
        image: '',
        code: 'wt-fit-slim',
        prompt: 'slim fit',
      },
      {
        name: 'Regular',
        image: '',
        code: 'wt-fit-regular',
        prompt: 'regular fit',
      },
      {
        name: 'Loose/Relaxed',
        image: '',
        code: 'wt-fit-loose',
        prompt: 'relaxed fit and oversized fit',
      },
      {
        name: 'Athletic',
        image: '',
        code: 'wt-fit-ath',
        prompt: 'athletic',
      },
      {
        name: 'Tailored',
        image: '',
        code: 'mt-fit-tailored',
        prompt: 'athletic',
      },
    ],
    optionalTypes: [],
    key: 'fit-type',
    next: false,
  };

  private Neckline: Category = {
    subCategories: [
      {
        name: 'Round neck',
        image: '',
        code: 'neck-round',
        prompt: '',
      },
      {
        name: 'Off Shoulder',
        image: '',
        code: 'neck-off-shoulder',
        prompt: 'neck-spread',
      },
      {
        name: 'V-neck',
        image: '',
        code: 'neck-v',
        prompt: '',
      },
      {
        name: 'Boat neck',
        image: '',
        code: 'neck-boat',
        prompt: '',
      },
      {
        name: 'Polo collar',
        image: '',
        code: 'neck-polo-collar',
        prompt: '',
      },
      {
        name: 'Halter neck',
        image: '',
        code: 'neck-halter',
        prompt: '',
      },
      {
        name: 'Button-down collar',
        image: '',
        code: 'neck-button-down',
        prompt: '',
      },
      {
        name: 'Henley neck',
        image: '',
        code: 'neck-henley',
        prompt: 'neck-henley',
      },
      {
        name: 'Turtleneck',
        image: '',
        code: 'turtleneck',
        prompt: 'turtleneck',
      },
      {
        name: 'Hooded',
        image: '',
        code: 'neck-hooded',
        prompt: 'neck-hooded',
      },
      {
        name: 'Square Neck',
        image: '',
        code: 'neck-square',
        prompt: 'neck-square',
      },
    ],
    optionalTypes: [],
    key: 'neck-line',
    next: false,
  };

  private SleevesType: Category = {
    subCategories: [
      {
        name: 'Bell',
        image: '',
        code: 'bell-sleeves',
        prompt: '',
      },
      {
        name: 'Raglan',
        image: '',
        code: 'raglan-sleeves',
        prompt: '',
      },
      {
        name: 'Puff',
        image: '',
        code: 'puff-sleeves',
        prompt: '',
      },
      {
        name: 'Cap',
        image: '',
        code: 'raglan-sleeves',
        prompt: '',
      },
      {
        name: 'Flutter',
        image: '',
        code: 'puff-sleeves',
        prompt: '',
      },
      {
        name: 'Short',
        image: '',
        code: 'short-sleeves',
        prompt: '',
      },
      {
        name: 'Long',
        image: '',
        code: 'long-sleeves',
        prompt: '',
      },
      {
        name: 'Sleeveless',
        image: '',
        code: 'sleeves-less',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'sleeves type',
    next: false,
  };

  private Pattern: Category = {
    subCategories: [
      {
        name: 'Solid',
        image: '',
        code: 'print-solid',
        prompt: '',
      },
      {
        name: 'Striped',
        image: '',
        code: 'print-striped',
        prompt: '',
      },
      {
        name: 'Abstract',
        image: '',
        code: 'print-abstract',
        prompt: '',
      },
      {
        name: 'Check',
        image: '',
        code: 'print-check',
        prompt: '',
      },
      {
        name: 'Floral',
        image: '',
        code: 'print-floral',
        prompt: '',
      },
      {
        name: 'Polka dots',
        image: '',
        code: 'print-polka',
        prompt: '',
      },
      {
        name: 'Geometric',
        image: '',
        code: 'print-geometric',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'print',
    next: false,
  };

  private Fabric: Category = {
    subCategories: [
      {
        name: 'Cotton',
        image: '',
        code: 'fabric-cotton',
        prompt: '',
      },
      {
        name: 'Polyester',
        image: '',
        code: 'fabric-polyester',
        prompt: '',
      },
      {
        name: 'Linen',
        image: '',
        code: 'fabric-linen',
        prompt: '',
      },
      {
        name: 'Denim',
        image: '',
        code: 'fabric-denim',
        prompt: '',
      },
      {
        name: 'Velvet',
        image: '',
        code: 'fabric-velvet',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'fabric',
    next: false,
  };

  private SleevesLength: Category = {
    subCategories: [
      {
        name: 'Half sleeves',
        image: '',
        code: 'sleeves-half',
        prompt: '',
      },
      {
        name: 'Full sleeves',
        image: '',
        code: 'sleeves-full',
        prompt: '',
      },
      {
        name: 'Sleeveless',
        image: '',
        code: 'sleeves-less',
        prompt: '',
      },
      {
        name: 'Three quarter sleeves',
        image: '',
        code: 'sleeves-quarter',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'sleeves',
    next: false,
  };

  private HemlineTop: Category = {
    subCategories: [
      {
        name: 'Straight',
        image: '',
        code: 'hem-straight',
        prompt: '',
      },
      {
        name: 'Curved',
        image: '',
        code: 'hem-curved',
        prompt: '',
      },
      {
        name: 'Ribbed',
        image: '',
        code: 'hem-ribbed',
        prompt: '',
      },
      {
        name: 'High low',
        image: '',
        code: 'hem-high-low',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'hemline',
    next: false,
  };

  private LengthTop: Category = {
    subCategories: [
      {
        name: 'Regular',
        image: '',
        code: 'length-regular',
        prompt: '',
      },
      {
        name: 'Short',
        image: '',
        code: 'length-short',
        prompt: '',
      },
      {
        name: 'Long',
        image: '',
        code: 'length-long',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'length',
    next: false,
  };

  private Embellishments: Category = {
    subCategories: [
      {
        name: 'Embroidery',
        image: '',
        code: 'embed-embroidery',
        prompt: '',
      },
      {
        name: 'Contrast piping',
        image: '',
        code: 'embed-contrast',
        prompt: '',
      },
      {
        name: 'Patches',
        image: '',
        code: 'embed-patches',
        prompt: '',
      },
      {
        name: 'Studs',
        image: '',
        code: 'embed-studs',
        prompt: '',
      },
      {
        name: 'Sequins',
        image: '',
        code: 'embed-sequins',
        prompt: '',
      },
      {
        name: 'Beads',
        image: '',
        code: 'embed-beadds',
        prompt: '',
      },
      {
        name: 'Lace',
        image: '',
        code: 'embed-lace',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'embellishments',
    next: false,
  };

  private FitTypeBottom: Category = {
    subCategories: [
      {
        name: 'Slim fit',
        image: '',
        code: 'wb-fit-slim',
        prompt: 'slim fit',
      },
      {
        name: 'Regular',
        image: '',
        code: 'wb-fit-regular',
        prompt: 'regular fit',
      },
      {
        name: 'Tapered',
        image: '',
        code: 'wb-fit-tapered',
        prompt: 'tapered fit',
      },
      {
        name: 'Straight',
        image: '',
        code: 'wb-fit-straight',
        prompt: 'straight fit',
      },
      {
        name: 'Loose',
        image: '',
        code: 'wb-fit-loose',
        prompt: 'loose fit',
      },
      {
        name: 'Cropped',
        image: '',
        code: 'wb-fit-cropped',
        prompt: 'loose fit',
      },
      {
        name: 'A line',
        image: '',
        code: 'wb-fit-aline',
        prompt: 'loose fit',
      },
      {
        name: 'Pencil',
        image: '',
        code: 'wb-fit-pencil',
        prompt: 'loose fit',
      },
      {
        name: 'Flared',
        image: '',
        code: 'wb-fit-flared',
        prompt: 'loose fit',
      },
    ],
    optionalTypes: [],
    key: 'fit-type',
    next: false,
  };

  private WaistRise: Category = {
    subCategories: [
      {
        name: 'Regular',
        image: '',
        code: 'waist-regular',
        prompt: '',
      },
      {
        name: 'Low rise',
        image: '',
        code: 'waist-low',
        prompt: '',
      },
      {
        name: 'High rise',
        image: '',
        code: 'waist-high',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'waist',
    next: false,
  };

  private LengthBottom: Category = {
    subCategories: [
      {
        name: 'Regular',
        image: '',
        code: 'length-regular',
        prompt: '',
      },
      {
        name: 'Long',
        image: '',
        code: 'length-long',
        prompt: '',
      },
      {
        name: 'Ankle',
        image: '',
        code: 'length-ankle',
        prompt: '',
      },
      {
        name: 'Knee-length',
        image: '',
        code: 'length-knee',
        prompt: '',
      },
      {
        name: 'Short',
        image: '',
        code: 'length-short',
        prompt: '',
      },
      {
        name: 'Cropped',
        image: '',
        code: 'length-cropped',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'length',
    next: false,
  };

  private HemlineBotom: Category = {
    subCategories: [
      {
        name: 'Straight',
        image: '',
        code: 'hem-straight',
        prompt: '',
      },
      {
        name: 'Curved',
        image: '',
        code: 'hem-curved',
        prompt: '',
      },
      {
        name: 'Cuffed',
        image: '',
        code: 'hem-cuffed',
        prompt: '',
      },
      {
        name: 'Plain',
        image: '',
        code: 'hem-plain',
        prompt: '',
      },
      {
        name: 'Distressed',
        image: '',
        code: 'hem-distressed',
        prompt: '',
      },
      {
        name: 'Ruffled',
        image: '',
        code: 'hem-ruffled',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'hemline',
    next: false,
  };

  private Closures: Category = {
    subCategories: [
      {
        name: 'Zipper fly',
        image: '',
        code: 'closure-zipper',
        prompt: '',
      },
      {
        name: 'Hook & Bar',
        image: '',
        code: 'closure-hook',
        prompt: '',
      },
      {
        name: 'Elastic wasitband',
        image: '',
        code: 'closure-waistband',
        prompt: '',
      },
      {
        name: 'Drawstring',
        image: '',
        code: 'closure-drawstring',
        prompt: '',
      },
      {
        name: 'Button',
        image: '',
        code: 'closure-button',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'hemline',
    next: false,
  };

  private Color: Category = {
    subCategories: [
      {
        name: 'Pink',
        code: '#CE4E6C',
        image: '',
        prompt: 'pink',
      },
      {
        name: 'Red',
        code: '#CE024B',
        image: '',
        prompt: 'red',
      },
      {
        name: 'Lavander',
        code: '#8A2DA0',
        image: '',
        prompt: 'lavender',
      },
      {
        name: 'Lime',
        code: '#D7DEA0',
        image: '',
        prompt: 'lime',
      },
      {
        name: 'Blue',
        code: '#3AA3C8',
        image: '',
        prompt: 'blue',
      },
      {
        name: 'Purple',
        code: '#9C3AC8',
        image: '',
        prompt: 'purple',
      },
      {
        name: 'Yellow',
        code: '#FEED95',
        image: '',
        prompt: 'yellow',
      },
      {
        name: 'Sage Green',
        code: '#9EF396',
        image: '',
        prompt: 'Sage Green',
      },
      {
        name: 'Baby Pink',
        code: '#FF98B2',
        image: '',
        prompt: 'baby pink',
      },
      {
        name: 'Sky Blue',
        code: '#86F2F0',
        image: '',
        prompt: 'Sky Blue',
      },
      {
        name: 'Sapphire Blue',
        code: '#0015E4',
        image: '',
        prompt: 'Sapphire Blue',
      },
    ],
    optionalTypes: [],
    key: 'color',
    next: false,
  };

  public getCategory(category: string) {
    switch (category) {
      case 'Women':
        return this.Women;
        break;
      case 'female-western':
        return this.WomenWestern;
        break;
      case 'female-indian':
        return this.WomenIndian;
        break;
      case 'women-top':
        return this.Topwear;
        break;
      case 'women-bottom':
        return this.Bottomwear;
        break;
      case 'women-dress':
        return this.Dress;
        break;
      case 'women-set':
        return this.Sets;
        break;
      case 'women-western':
        return this.Bottomwear;
        break;
      case 'women-western-dress':
        return this.Dress;
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
      case 'women-bottom-western':
        return this.BottomWesternwear;
        break;
      case 'women-bottom-indian':
        return this.BottomIndianwear;
        break;
      case 'women-set-western':
        return this.SetsWestern;
        break;
      case 'women-set-indian':
        return this.SetsIndian;
        break;
      case 'women-tshirt':
        return this.TopAttributes;
        break;
      case 'women-western-blouse':
        return this.TopAttributes;
        break;
      case 'women-western-shirt':
        return this.TopAttributes;
        break;
      case 'women-sweater':
        return this.TopAttributes;
        break;
      case 'women-sweatshirt':
        return this.TopAttributes;
        break;
      case 'women-western-jackets':
        return this.TopAttributes;
        break;
      case 'women-coats':
        return this.TopAttributes;
        break;
      case 'women-bra':
        return this.TopAttributes;
        break;
      case 'women-top-thermal':
        return this.TopAttributes;
        break;
      case 'women-sports-tshirts':
        return this.TopAttributes;
        break;
      case 'women-indian-kurti':
        return this.TopAttributes;
        break;
      case 'women-indian-blouse':
        return this.TopAttributes;
        break;
      case 'women-indian-jacket':
        return this.TopAttributes;
        break;
      case 'women-indian-anarkali':
        return this.TopAttributes;
        break;
      case 'women-jeans':
        return this.BottomAttributes;
        break;
      case 'women-trouser':
        return this.BottomAttributes;
        break;
      case 'women-shorts':
        return this.BottomAttributes;
        break;
      case 'wwtop-fit':
        return this.FitTypeTop;
        break;
      case 'women-neck':
        return this.Neckline;
        break;
      case 'women-sleeves-type':
        return this.SleevesType;
        break;
      case 'print':
        return this.Pattern;
        break;
      case 'fabric':
        return this.Fabric;
        break;
      case 'wwtop-sleeve-length':
        return this.SleevesLength;
        break;
      case 'wwtop-hemline':
        return this.HemlineTop;
        break;
      case 'wwtop-length':
        return this.LengthTop;
        break;
      case 'wwtop-embellishments':
        return this.Embellishments;
        break;
      case 'wwbottom-fit':
        return this.FitTypeBottom;
        break;
      case 'women-waist':
        return this.WaistRise;
        break;
      case 'wwbottom-length':
        return this.LengthBottom;
        break;
      case 'wwbottom-hem':
        return this.HemlineBotom;
        break;
      case 'wwbottom-closure':
        return this.Closures;
        break;
      case 'color':
        return this.Color;
        break;
      default:
        return '';
    }
  }
}
