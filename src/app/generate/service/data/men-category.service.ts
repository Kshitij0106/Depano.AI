import { Injectable } from '@angular/core';
import { Category } from '../../category';
import { Subcategory } from '../../subcategory';

@Injectable({
  providedIn: 'root',
})
export class MenCategoryService {
  constructor() {}

  private TopAttributesSubCategories: Subcategory[] = [
    {
      name: 'Fit type',
      image: '',
      code: 'mwtop-fit',
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
      code: 'men-neck',
      prompt: '',
    },
    {
      name: 'Sleeves',
      image: '',
      code: 'men-sleeves',
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
      name: 'Collar',
      image: '',
      code: 'mwtop-collar',
      prompt: '',
    },
    {
      name: 'Hemline',
      image: '',
      code: 'mwtop-hemline',
      prompt: '',
    },
    {
      name: 'Length',
      image: '',
      code: 'mwtop-length',
      prompt: '',
    },
    {
      name: 'Embellishments',
      image: '',
      code: 'mwtop-embellishments',
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
      code: 'mwbottom-fit',
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
      code: 'men-waist',
      prompt: '',
    },
    {
      name: 'Length',
      image: '',
      code: 'mwbottom-length',
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
      code: 'mwbottom-hem',
      prompt: '',
    },
  ];

  private BottomAttributes: Category = {
    subCategories: this.BottomAttributesSubCategories,
    optionalTypes: this.BottomAttributesOptionalSubCategories,
    key: 'attributes',
    next: true,
  };

  private Men: Category = {
    subCategories: [
      {
        name: 'Topwear',
        image:
          'https://cdn.shopify.com/s/files/1/0151/1081/products/03_FRONT_MENS_T_TEMPLATE_2000x.jpg?v=1550808034',
        code: 'men-top',
        prompt: 'from neck to waist',
      },
      {
        name: 'Bottomwear',
        image:
          'http://thefashionsupernova.com/wp-content/uploads/2014/02/asos-skinny-jeans-with-rips.jpg',
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
          'https://www.weddingtropics.com/wp-content/uploads/2018/03/bradford-light-sand-linen-wedding-shirt.jpg',
        code: 'men-top-western',
        prompt: 'western-style',
      },
      {
        name: 'Indianwear',
        image:
          'https://i.pinimg.com/736x/b8/a0/6c/b8a06cdeadc8dccf55d3d304640a356e.jpg',
        code: 'men-top-indian',
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
        name: 'T-Shirt',
        image:
          'https://yi-files.s3.amazonaws.com/products/247000/247859/247864-full.jpg',
        code: 'men-tshirt',
        prompt: 't-shirt',
      },
      {
        name: 'Shirts',
        image:
          'https://www.weddingtropics.com/wp-content/uploads/2018/03/bradford-light-sand-linen-wedding-shirt.jpg',
        code: 'men-shirt',
        prompt: 'shirt',
      },
      {
        name: 'Sweatshirt',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FlvVopCNBreg0zI9NYocxQHaHa%26pid%3DApi&f=1&ipt=bd487932095316720c18285a9e626765fb54ae201b58fccf9f216e5673a03570&ipo=images',
        code: 'men-sweatshirt',
        prompt: 'sweatshirt',
      },
      {
        name: 'Sweater',
        image:
          'https://cdnc.lystit.com/photos/09f0-2014/08/04/burberry-beige-lightweight-cashmere-sweater-product-1-22233121-2-155498004-normal.jpeg',
        code: 'men-sweater',
        prompt: 'sweater',
      },
      {
        name: 'Blazer & Coats',
        image: 'https://bpc.h-cdn.co/assets/16/38/1474377310-brooks-blazer.jpg',
        code: 'men-coats',
        prompt: 'blazer',
      },
      {
        name: 'Jackets',
        image:
          'https://ae01.alicdn.com/kf/HTB1qddaXJzvK1RkSnfoq6zMwVXaG/Jacket-Men-Autumn-Winter-Style-Light-Weight-Overcoat-Outerwear-Warm-Polyester-Casual-Men-s-Jacket-chaqueta.jpg',
        code: 'men-western-jackets',
        prompt: 'jacket',
      },
      {
        name: 'Vests',
        image:
          'https://5.imimg.com/data5/ME/GZ/KK/SELLER-31877795/grey3-500x500.JPG',
        code: 'men-vests',
        prompt: 'tank top',
      },
      {
        name: 'Thermal',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/61XfSsejFRL._AC_UL1500_.jpg',
        code: 'men-top-thermal',
        prompt: 'top thermal',
      },
      {
        name: 'Active T-shirts',
        image:
          'https://i5.walmartimages.com/asr/f223a816-6f6b-40c2-91fc-3b8ea33597e1.06cf0a4887ab31ceda86fcabb57727fe.jpeg',
        code: 'men-active-tshirts',
        prompt: 'gym t-shirt',
      },
    ],
    optionalTypes: this.TopAttributesOptionalSubCategories,
    key: 'type',
    next: true,
  };

  private TopIndianwear: Category = {
    subCategories: [
      {
        name: 'Kurta',
        image:
          'https://i.pinimg.com/736x/b8/a0/6c/b8a06cdeadc8dccf55d3d304640a356e.jpg',
        code: 'men-indian-kurta',
        prompt: 'kurta',
      },
      {
        name: 'Sherwani',
        image:
          'https://i.pinimg.com/originals/e3/83/81/e383816d95682a866668c9031e8a8e3b.jpg',
        code: 'men-indian-sherwani',
        prompt: 'sherwani',
      },
      {
        name: 'Nehru Jackets',
        image:
          'https://i.pinimg.com/originals/a8/76/df/a876df23222df6d8c93a0d7a10aa4f8e.jpg',
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
          'https://handcmediastorage.blob.core.windows.net/productimages/TR/TRPRWS25-F30-134533-800px-1040px.jpg',
        code: 'men-bottom-western',
        prompt: 'western-style',
      },
      {
        name: 'Indianwear',
        image:
          'https://i.pinimg.com/originals/ca/0c/be/ca0cbe75716868b1d94574aec015a6ee.jpg',
        code: 'men-bottom-indian',
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
        image:
          'http://thefashionsupernova.com/wp-content/uploads/2014/02/asos-skinny-jeans-with-rips.jpg',
        code: 'men-jeans',
        prompt: 'jeans',
      },
      {
        name: 'Trouser',
        image:
          'https://handcmediastorage.blob.core.windows.net/productimages/TR/TRPRWS25-F30-134533-800px-1040px.jpg',
        code: 'men-trouser',
        prompt: 'trouser',
      },
      {
        name: 'Shorts',
        image:
          'https://www.dmarge.com/wp-content/uploads/2014/10/Last-Import-22.jpg',
        code: 'men-shorts',
        prompt: 'shorts',
      },
      {
        name: 'Briefs & Trunks',
        image:
          'https://cdna.lystit.com/photos/2011/11/02/calvin-klein-underwear-red-three-pack-of-boxer-briefs-product-6-2322682-965849467.jpeg',
        code: 'men-briefs',
        prompt: 'briefs',
      },
      {
        name: 'Boxers',
        image:
          'https://i5.walmartimages.com/asr/c73bac41-2944-4726-8358-2b1cb32192a1_1.e3704449d96fa5f1b2c9995640e9deef.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff',
        code: 'men-boxers',
        prompt: 'boxers',
      },
      {
        name: 'Thermal',
        image:
          'https://content.backcountry.com/images/items/900/SWL/SWL01KW/DEENV.jpg',
        code: 'men-bottom-thermal',
        prompt: 'bottom thermal',
      },
      {
        name: 'Track pants',
        image: 'https://i.ebayimg.com/images/g/6JsAAOSwECtclDXl/s-l1600.jpg',
        code: 'men-active-pants',
        prompt: 'track pants',
      },
      {
        name: 'Swimwear',
        image: 'https://www.lord.gr/4057-home_default/men-swimwear-stripes.jpg',
        code: 'men-swimwear',
        prompt: 'swimwear',
      },
    ],
    optionalTypes: this.BottomAttributesOptionalSubCategories,
    key: 'type',
    next: true,
  };

  private BottomIndianwear: Category = {
    subCategories: [
      {
        name: 'Dhoti',
        image:
          'https://i.pinimg.com/originals/ca/0c/be/ca0cbe75716868b1d94574aec015a6ee.jpg',
        code: 'men-indian-dhoti',
        prompt: 'dhoti',
      },
      {
        name: 'Pyjama',
        image:
          'https://i.pinimg.com/originals/fa/d7/5f/fad75f00bb172bc36bfe8284c48c99ba.jpg',
        code: 'men-indian-pyjama',
        prompt: 'pyjama',
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
        prompt: 'suit',
      },
      {
        name: 'Sleepwear & Loungewear',
        image: '',
        code: 'men-set-sleep',
        prompt: 'sleepwear set',
      },
      {
        name: 'Tracksuit',
        image: '',
        code: 'men-tracksuit',
        prompt: 'tracksuit',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private SetsIndian: Category = {
    subCategories: [
      {
        name: 'Kurta Set',
        image: '',
        code: 'men-kurta-set',
        prompt: 'kurta set',
      },
    ],
    optionalTypes: [],
    key: 'type',
    next: true,
  };

  private MenWestern: Category = {
    subCategories: [
      {
        name: 'T-Shirt',
        image:
          'https://yi-files.s3.amazonaws.com/products/247000/247859/247864-full.jpg',
        code: 'men-tshirt',
        prompt: 'tshirt',
      },
      {
        name: 'Suits',
        image: '',
        code: 'men-suits',
        prompt: 'suit',
      },
      {
        name: 'Shirts',
        image:
          'https://www.weddingtropics.com/wp-content/uploads/2018/03/bradford-light-sand-linen-wedding-shirt.jpg',
        code: 'men-shirt',
        prompt: 'shirt',
      },
      {
        name: 'Jeans',
        image:
          'http://thefashionsupernova.com/wp-content/uploads/2014/02/asos-skinny-jeans-with-rips.jpg',
        code: 'men-jeans',
        prompt: 'jeans',
      },
      {
        name: 'Sweatshirt',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FlvVopCNBreg0zI9NYocxQHaHa%26pid%3DApi&f=1&ipt=bd487932095316720c18285a9e626765fb54ae201b58fccf9f216e5673a03570&ipo=images',
        code: 'men-sweatshirt',
        prompt: 'sweatshirt',
      },
      {
        name: 'Sweater',
        image:
          'https://cdnc.lystit.com/photos/09f0-2014/08/04/burberry-beige-lightweight-cashmere-sweater-product-1-22233121-2-155498004-normal.jpeg',
        code: 'men-sweater',
        prompt: 'sweater',
      },
      {
        name: 'Trouser',
        image:
          'https://handcmediastorage.blob.core.windows.net/productimages/TR/TRPRWS25-F30-134533-800px-1040px.jpg',
        code: 'men-trouser',
        prompt: 'trouser',
      },
      {
        name: 'Shorts',
        image:
          'https://www.dmarge.com/wp-content/uploads/2014/10/Last-Import-22.jpg',
        code: 'men-shorts',
        prompt: 'shorts',
      },
      {
        name: 'Vests',
        image:
          'https://5.imimg.com/data5/ME/GZ/KK/SELLER-31877795/grey3-500x500.JPG',
        code: 'men-vests',
        prompt: 'tank top',
      },
      {
        name: 'Thermal',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/61XfSsejFRL._AC_UL1500_.jpg',
        code: 'men-top-thermal',
        prompt: 'top thermal',
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
        image:
          'https://i.pinimg.com/originals/ca/0c/be/ca0cbe75716868b1d94574aec015a6ee.jpg',
        code: 'men-indian-dhoti',
        prompt: 'dhoti',
      },
      {
        name: 'Kurta Set',
        image: '',
        code: 'men-kurta-set',
        prompt: 'kurta-set',
      },
      {
        name: 'Kurta',
        image:
          'https://i.pinimg.com/736x/b8/a0/6c/b8a06cdeadc8dccf55d3d304640a356e.jpg',
        code: 'men-indian-kurta',
        prompt: 'kurta',
      },
      {
        name: 'Pyjama',
        image:
          'https://i.pinimg.com/originals/fa/d7/5f/fad75f00bb172bc36bfe8284c48c99ba.jpg',
        code: 'men-indian-pyjama',
        prompt: 'pyjama',
      },
      {
        name: 'Sherwani',
        image:
          'https://i.pinimg.com/originals/e3/83/81/e383816d95682a866668c9031e8a8e3b.jpg',
        code: 'men-indian-sherwani',
        prompt: 'sherwani',
      },
      {
        name: 'Nehru Jackets',
        image:
          'https://i.pinimg.com/originals/a8/76/df/a876df23222df6d8c93a0d7a10aa4f8e.jpg',
        code: 'men-indian-nehrujacket',
        prompt: 'nehru jacket',
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
        code: 'mt-fit-slim',
        prompt: 'slim fit',
      },
      {
        name: 'Regular',
        image: '',
        code: 'mt-fit-regular',
        prompt: 'regular fit',
      },
      {
        name: 'Loose/Relaxed',
        image: '',
        code: 'mt-fit-loose',
        prompt: 'relaxed fit and oversized fit',
      },
      {
        name: 'Athletic',
        image: '',
        code: 'mt-fit-ath',
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
        name: 'Spread collar',
        image: '',
        code: 'neck-spread-collar',
        prompt: 'neck-spread',
      },
      {
        name: 'V-neck',
        image: '',
        code: 'neck-v',
        prompt: '',
      },
      {
        name: 'Polo collar',
        image: '',
        code: 'neck-polo-collar',
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
        name: 'Lapel Collar',
        image: '',
        code: 'neck-lapel',
        prompt: 'neck-lapel',
      },
      {
        name: 'Notched lapel',
        image: '',
        code: 'neck-notched',
        prompt: 'neck-notched',
      },
    ],
    optionalTypes: [],
    key: 'neck-line',
    next: false,
  };

  private Sleeves: Category = {
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
    ],
    optionalTypes: [],
    key: 'sleeves',
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
        name: 'Graphic',
        image: '',
        code: 'print-graphic',
        prompt: '',
      },
      {
        name: 'Floral',
        image: '',
        code: 'print-floral',
        prompt: '',
      },
      {
        name: 'Checkered',
        image: '',
        code: 'print-checkered',
        prompt: '',
      },
    ],
    optionalTypes: [],
    key: 'print',
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
    ],
    optionalTypes: [],
    key: 'hemline',
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

  private LengthTop: Category = {
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
        code: 'mb-fit-slim',
        prompt: 'slim fit',
      },
      {
        name: 'Regular',
        image: '',
        code: 'mb-fit-regular',
        prompt: 'regular fit',
      },
      {
        name: 'Tapered',
        image: '',
        code: 'mb-fit-tapered',
        prompt: 'tapered fit',
      },
      {
        name: 'Straight',
        image: '',
        code: 'mb-fit-straight',
        prompt: 'straight fit',
      },
      {
        name: 'Loose',
        image: '',
        code: 'mb-fit-loose',
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
      case 'men-bottom-western':
        return this.BottomWesternwear;
        break;
      case 'men-bottom-indian':
        return this.BottomIndianwear;
        break;
      case 'men-set-western':
        return this.SetsWestern;
        break;
      case 'men-set-indian':
        return this.SetsIndian;
        break;
      case 'men-tshirt':
        return this.TopAttributes;
        break;
      case 'men-shirt':
        return this.TopAttributes;
        break;
      case 'men-sweater':
        return this.TopAttributes;
        break;
      case 'men-sweatshirt':
        return this.TopAttributes;
        break;
      case 'men-western-jackets':
        return this.TopAttributes;
        break;
      case 'men-coats':
        return this.TopAttributes;
        break;
      case 'men-vests':
        return this.TopAttributes;
        break;
      case 'men-top-thermal':
        return this.TopAttributes;
        break;
      case 'men-active-jackets':
        return this.TopAttributes;
        break;
      case 'men-active-tshirts':
        return this.TopAttributes;
        break;
      case 'men-jeans':
        return this.BottomAttributes;
        break;
      case 'men-trouser':
        return this.BottomAttributes;
        break;
      case 'men-shorts':
        return this.BottomAttributes;
        break;
      case 'mwtop-fit':
        return this.FitTypeTop;
        break;
      case 'men-neck':
        return this.Neckline;
        break;
      case 'men-sleeves':
        return this.Sleeves;
        break;
      case 'print':
        return this.Pattern;
        break;
      case 'fabric':
        return this.Fabric;
        break;
      case 'mwtop-hemline':
        return this.HemlineTop;
        break;
      case 'mwtop-length':
        return this.LengthTop;
        break;
      case 'mwtop-embellishments':
        return this.Embellishments;
        break;
      case 'mwbottom-fit':
        return this.FitTypeBottom;
        break;
      case 'men-waist':
        return this.WaistRise;
        break;
      case 'mwbottom-length':
        return this.LengthBottom;
        break;
      case 'mwbottom-hem':
        return this.HemlineBotom;
        break;
      case 'color':
        return this.Color;
        break;
      default:
        return '';
    }
  }
}
