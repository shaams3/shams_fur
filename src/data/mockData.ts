export interface Collection {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

export interface Product {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  category: string;
  saleBadge?: { en: string; ar: string };
  isNew?: boolean;
  isPopular?: boolean;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  details: {
    dimensions: { en: string; ar: string };
    material: { en: string; ar: string };
    colors: string[];
  };
}

export interface Testimonial {
  id: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  text: { en: string; ar: string };
  rating: number;
  avatar: string;
}

export const collections: Collection[] = [
  {
    id: "bedrooms",
    name: { en: "Bedrooms", ar: "غرف النوم" },
    description: { en: "Plush beds, wardrobes, and elegant nightstands designed for ultimate tranquility.", ar: "أسرة فخمة، خزائن ملابس، وطاولات جانبية أنيقة مصممة لأقصى درجات الراحة." },
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sofas",
    name: { en: "Sofas & Sectionals", ar: "الكنب والأنتريهات" },
    description: { en: "Luxury lounges, velvet sectionals, and high-end fabric armchairs.", ar: "كنب فاخر، مجالس مخملية مريحة، وكراسي بذراعين مصممة بعناية." },
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dining",
    name: { en: "Dining Rooms", ar: "غرف الطعام" },
    description: { en: "Marble-top dining tables, velvet chairs, and premium sideboards.", ar: "طاولات طعام بسطح رخامي، كراسي مخملية فاخرة، وبوفيهات راقية." },
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tv-units",
    name: { en: "TV Units", ar: "وحدات التلفزيون" },
    description: { en: "Sleek wall mounts, media centers, and storage consoles with wood veneers.", ar: "وحدات تلفاز جدارية أنيقة، مكتبات وسائط، وطاولات تلفزيون خشبية مميزة." },
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "office",
    name: { en: "Office Furniture", ar: "أثاث المكاتب" },
    description: { en: "Executive mahogany desks, ergonomic leather chairs, and neat bookcases.", ar: "مكاتب تنفيذية فاخرة، كراسي مكتبية مريحة، وخزائن كتب أنيقة." },
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "chairs",
    name: { en: "Modern Chairs", ar: "الكراسي العصرية" },
    description: { en: "Avant-garde accent chairs, swivel lounge seats, and velvet vanity stools.", ar: "كراسي مميزة ذات تصميم مبتكر، مقاعد دوارة مريحة، ومقاعد تسريحة مخملية." },
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "coffee-tables",
    name: { en: "Coffee Tables", ar: "طاولات القهوة" },
    description: { en: "Gold-trimmed nesting tables, marble coffee tables, and dark wood blocks.", ar: "طاولات قهوة رخامية، طاولات متداخلة بإطارات ذهبية، وكتل خشبية كلاسيكية." },
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "kids-rooms",
    name: { en: "Kids Rooms", ar: "غرف الأطفال" },
    description: { en: "Playful storage, safe bunk beds, and bright studies for young minds.", ar: "حلول تخزين مبتكرة، أسرة بطابقين آمنة، ومكاتب دراسة مبهجة." },
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "outdoor",
    name: { en: "Outdoor Furniture", ar: "الأثاث الخارجي" },
    description: { en: "Weatherproof rattan loungers, garden dining sets, and luxury daybeds.", ar: "أرائك خيزران مقاومة للطقس، أطقم طعام للحديقة، وأسرة نهارية فاخرة." },
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "decorations",
    name: { en: "Luxury Decorations", ar: "الديكورات الفاخرة" },
    description: { en: "Gilded mirrors, abstract ceramic sculptures, and premium table lighting.", ar: "مرايا مذهبة، مجسمات سيراميك فنية، ووحدات إضاءة طاولة راقية." },
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
  }
];

// Helper to generate 20 products per collection programmatically to keep codebase clean and modular
const createProducts = (): Product[] => {
  const list: Product[] = [];
  
  const designTemplates: Record<string, { name: {en: string, ar: string}[], desc: {en: string, ar: string}[], imgs: string[], basePrice: number }> = {
    bedrooms: {
      name: [
        { en: "Royal Velvet Bed", ar: "سرير مخملي ملكي" },
        { en: "Minimalist Oak Wardrobe", ar: "خزانة ملابس بلوط مبسطة" },
        { en: "Classic Wood Nightstand", ar: "طاولة سرير كلاسيكية" },
        { en: "Luxury Vanity Dressing Table", ar: "طاولة تسريحة فاخرة" },
        { en: "Tufted Headboard Bed", ar: "سرير ذو رأسية منجدة" },
        { en: "Modern Leather Bedframe", ar: "إطار سرير جلدي عصري" },
        { en: "Gold-trimmed Chest of Drawers", ar: "خزانة أدراج بحواف ذهبية" },
        { en: "Boucle Upholstered Bench", ar: "مقعد سرير منجد بوكليه" },
        { en: "Grand Mirror Wardrobe", ar: "خزانة ملابس بمرايا كبيرة" },
        { en: "Premium Canopy Bed", ar: "سرير ذو مظلة فاخر" },
        { en: "Marble Top Vanity Desk", ar: "مكتب تسريحة بسطح رخامي" },
        { en: "Brushed Brass Nightstand", ar: "كومودينو من النحاس المصقول" },
        { en: "Ergonomic Mattress Deluxe", ar: "مرتبة طبية ديلوكس" },
        { en: "Danish Oak Bedstead", ar: "سرير بلوط دنماركي" },
        { en: "Floating Wooden Nightstand", ar: "طاولة سرير معلقة خشبية" },
        { en: "Luxury Bedroom Ottoman", ar: "أوتومان غرفة نوم فاخر" },
        { en: "Velvet Lounge Daybed", ar: "سرير نهاري مخملي مريح" },
        { en: "Contemporary Tallboy Chest", ar: "خزانة أدراج عمودية معاصرة" },
        { en: "Art Deco Headboard Frame", ar: "إطار رأسية آرت ديكو" },
        { en: "Emperor Suite Complete Set", ar: "طقم غرفة نوم إمبراطور متكامل" }
      ],
      desc: [
        { en: "Exquisite velvet upholstery with golden metallic base lines.", ar: "تنجيد مخملي رائع مع خطوط قاعدة معدنية ذهبية." },
        { en: "Solid white oak frame featuring soft-close sliding doors.", ar: "إطار من خشب البلوط الأبيض الصلب يتميز بأبواب انزلاقية ناعمة الإغلاق." },
        { en: "Compact walnut nightstand with silent gliding double drawers.", ar: "كومودينو جوز مدمج مع أدراج مزدوجة صامتة الحركة." },
        { en: "Elegant makeup station with integrated LED mirror and gold legs.", ar: "محطة مكياج أنيقة مع مرآة LED مدمجة وأرجل ذهبية." },
        { en: "Deep button tufting provides a classic yet contemporary aesthetic.", ar: "تنجيد عميق بالأزرار يمنح مظهراً كلاسيكياً ومعاصراً في آن واحد." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582582621959-a0a27f482f17?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 1800
    },
    sofas: {
      name: [
        { en: "Modern Beige Sofa", ar: "كنبة بيج عصرية" },
        { en: "Velvet Chesterfield Sofa", ar: "كنبة تشيسترفيلد مخملية" },
        { en: "Minimalist L-Shape Sectional", ar: "كنبة زاوية مبسطة" },
        { en: "Boucle Accent Sofa", ar: "كنبة بوكليه مميزة" },
        { en: "Luxury Leather Recliner", ar: "كرسي جلد فاخر مستلقي" },
        { en: "Classic Tufted Loveseat", ar: "كنبة ثنائية منجدة كلاسيكية" },
        { en: "Contemporary Curved Lounge", ar: "أريكة منحنية معاصرة" },
        { en: "Dark Wood Frame Daybed", ar: "سرير نهاري بإطار خشبي داكن" },
        { en: "Mid-Century Modern Sofa", ar: "كنبة منتصف القرن عصرية" },
        { en: "Sleek Corduroy Sectional", ar: "كنبة زاوية قطيفة مضلعة" },
        { en: "Modular Living Room Couch", ar: "كنبة معيشة موديولار قابلة للتشكيل" },
        { en: "Italian Grain Leather Sofa", ar: "كنبة جلد إيطالي فاخر" },
        { en: "Deep Seating Cozy Couch", ar: "كنبة وثيرية ذات عمق مريح" },
        { en: "Minimal Gold Leg Sofa", ar: "كنبة بأرجل ذهبية ناعمة" },
        { en: "Emerald Velvet Setpiece", ar: "كنبة مخملية زمردية فاخرة" },
        { en: "Scandinavian Fabric Sofa", ar: "كنبة قماشية اسكندنافية" },
        { en: "Artisan Wood trim Sofa", ar: "كنبة بحواف خشبية يدوية" },
        { en: "Plush Reclining Sectional", ar: "كنبة زاوية مستلقية فخمة" },
        { en: "Luxury Lounge Chaise", ar: "شيزلونج استرخاء فاخر" },
        { en: "Imperial Tufted Sofa Set", ar: "طقم كنب توكسيدو إمبراطوري" }
      ],
      desc: [
        { en: "Sink-in comfort with high-density foam cushions and neutral tone linen.", ar: "راحة فائقة مع وسائد إسفنجية عالية الكثافة وقماش كتان بلون محايد." },
        { en: "Iconic design featuring deep tufting, rolled arms, and rich velvet.", ar: "تصميم أيقوني يتميز بتنجيد عميق، أذرع ملفوفة، ومخمل غني." },
        { en: "Sleek L-shaped sofa designed to fit perfectly in modern open spaces.", ar: "كنبة زاوية أنيقة مصممة لتناسب المساحات المفتوحة الحديثة تماماً." },
        { en: "Textured boucle fabric paired with a warm dark-wood foundation.", ar: "قماش بوكليه محكم الملمس مقترن بقاعدة خشبية داكنة دافئة." },
        { en: "Premium top-grain leather with electronic smooth reclining mechanisms.", ar: "جلد فاخر طبيعي مع آليات استلقاء إلكترونية سلسة." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 2200
    },
    dining: {
      name: [
        { en: "Marble Dining Table", ar: "طاولة طعام رخام" },
        { en: "Walnut Wood Dinner Table", ar: "طاولة طعام خشب جوز" },
        { en: "Velvet Dining Chair Deluxe", ar: "كرسي طعام مخملي فاخر" },
        { en: "Luxury Sideboard Buffet", ar: "بوفيه جانبي فاخر" },
        { en: "Gold Leg Dining Suite", ar: "طقم طعام بأرجل ذهبية" },
        { en: "Glass Top Round Table", ar: "طاولة مستديرة بسطح زجاجي" },
        { en: "Mid-Century Dining Chairs", ar: "كراسي طعام منتصف القرن" },
        { en: "Modern Oak Sideboard", ar: "خزانة جانبية بلوط حديثة" },
        { en: "Extendable Dining Table", ar: "طاولة طعام قابلة للتمديد" },
        { en: "Polished Travertine Table", ar: "طاولة حجر ترافرتين مصقول" },
        { en: "Minimalist Bench Seating", ar: "مقعد طعام طويل مبسط" },
        { en: "Leather Upholstered Chair", ar: "كرسي طعام منجد بالجلد" },
        { en: "Sunburst Veneer Table", ar: "طاولة طعام بقشرة خشبية دائرية" },
        { en: "Luxury Display Credenza", ar: "خزانة عرض فاخرة" },
        { en: "High-back Dining Chair", ar: "كرسي طعام بظهر مرتفع" },
        { en: "Industrial Metal Accent Table", ar: "طاولة طعام معدنية صناعية" },
        { en: "Geometric Base Dinner Table", ar: "طاولة طعام بقاعدة هندسية" },
        { en: "Artisan Carved Credenza", ar: "بوفيه منحوت يدوياً" },
        { en: "Luxury Gold-trimmed Buffet", ar: "بوفيه فاخر بحواف ذهبية" },
        { en: "Royal 8-Seater Dining Set", ar: "طقم طعام ملكي لثمانية أفراد" }
      ],
      desc: [
        { en: "Genuine Calacatta marble slab seated on double brass pillars.", ar: "لوح رخام كالاكاتا أصلي يستقر على عمودين من النحاس الأصفر." },
        { en: "Rich walnut veneer showing organic grain with gold geometric inlay.", ar: "قشرة خشب جوز غنية تظهر عروقاً عضوية مع ترصيع هندسي ذهبي." },
        { en: "Comfy dining chair with quilted velvet back and slender gold legs.", ar: "كرسي طعام مريح بظهر مخملي مبطن وأرجل ذهبية نحيفة." },
        { en: "Spacious storage buffet with gold fluted panels and wood finish.", ar: "بوفيه تخزين واسع مع ألواح مضلعة ذهبية وتشطيب خشبي." },
        { en: "Sleek dining set that balances modern minimalist angles and warm materials.", ar: "طقم طعام أنيق يوازن بين الزوايا المبسطة والمواد الدافئة." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 1500
    },
    "tv-units": {
      name: [
        { en: "Minimalist Floating TV Stand", ar: "طاولة تلفزيون معلقة بسيطة" },
        { en: "Luxury Marble Media Console", ar: "خزانة وسائط رخامية فاخرة" },
        { en: "Dark Wood Slatted TV Unit", ar: "وحدة تلفزيون خشبية مضلعة داكنة" },
        { en: "Gold Accent Entertainment Center", ar: "طاولة تلفزيون بلمسات ذهبية" },
        { en: "Modern Glossy Media Console", ar: "وحدة وسائط حديثة لامعة" },
        { en: "Mid-Century TV Console", ar: "طاولة تلفزيون منتصف القرن" },
        { en: "Rustic Oak Entertainment Stand", ar: "طاولة تلفزيون بلوط ريفي" },
        { en: "Contemporary Glass Door Console", ar: "خزانة وسائط بأبواب زجاجية" },
        { en: "Luxury Stone Face TV Console", ar: "طاولة تلفاز بواجهة حجرية فاخرة" },
        { en: "Minimalist White & Gold Unit", ar: "وحدة تلفاز بيضاء وذهبية بسيطة" },
        { en: "Curved Wood Media Credenza", ar: "خزانة وسائط خشبية منحنية" },
        { en: "LED Integrated TV Console", ar: "طاولة تلفزيون بإضاءة LED مدمجة" },
        { en: "Compact Media Console Stand", ar: "طاولة تلفزيون مدمجة للوسائط" },
        { en: "Industrial Metal Frame Unit", ar: "وحدة تلفزيون بإطار معدني" },
        { en: "Luxury Brass Plated Panel Unit", ar: "وحدة تلفاز بلوحة نحاسية فاخرة" },
        { en: "Walnut Floating Shelf Unit", ar: "وحدة رفوف جوز معلقة" },
        { en: "Grand Media Wall Storage Unit", ar: "خزانة حائط كبيرة لوحدات الوسائط" },
        { en: "Retro Lowline Media Bench", ar: "مقعد وسائط منخفض كلاسيكي" },
        { en: "Fluted Glass TV Credenza", ar: "طاولة تلفاز بزجاج مضلع" },
        { en: "Symmetric Walnut TV Set", ar: "طقم تلفزيون متماثل من خشب الجوز" }
      ],
      desc: [
        { en: "Clean lines and hidden cable pathways for a wireless wall look.", ar: "خطوط نظيفة ومسارات كابلات مخفية لمظهر جداري خالي من الأسلاك." },
        { en: "Beautiful Spanish white marble surface paired with dark oak veneer.", ar: "سطح رخامي أبيض إسباني جميل مقترن بقشرة بلوط داكنة." },
        { en: "Textured vertical slats provide infrared compatibility for remotes.", ar: "توفر الألواح الرأسية ذات الملمس البارز توافقاً مع أجهزة التحكم عن بعد." },
        { en: "Double sliding gold-mesh doors with internal tempered glass shelves.", ar: "أبواب مزدوجة من الشبك الذهبي المنزلق مع رفوف داخلية من الزجاج المقسى." },
        { en: "Spacious luxury console containing heavy-duty push-to-open drawer rails.", ar: "خزانة فاخرة واسعة تحتوي على قضبان أدراج شديدة التحمل تفتح بالضغط." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 1100
    },
    office: {
      name: [
        { en: "Executive Mahogany Desk", ar: "مكتب ماهوجني رئيسي" },
        { en: "Ergonomic Leather Desk Chair", ar: "كرسي مكتب جلدي مريح" },
        { en: "Luxury Fluted Bookcase", ar: "خزانة كتب مضلعة فاخرة" },
        { en: "Minimalist Walnut Desk", ar: "مكتب جوز مبسط" },
        { en: "Gold Frame Office Credenza", ar: "خزانة مكتب بإطار ذهبي" },
        { en: "Task Swivel Office Chair", ar: "كرسي مكتب دوار للمهام" },
        { en: "Modern L-Shape Office Suite", ar: "مكتب زاوية عصري متكامل" },
        { en: "Vintage Leather Office Chair", ar: "كرسي مكتب جلدي عتيق" },
        { en: "Glass Desk with Gold Accents", ar: "مكتب زجاجي بلمسات ذهبية" },
        { en: "Walnut File Drawer Cabinet", ar: "خزانة ملفات من خشب الجوز" },
        { en: "Tufted High-back Executive Chair", ar: "كرسي رئيسي مرتفع الظهر مبطن" },
        { en: "Floating Office Study Desk", ar: "مكتب دراسة معلق للمكتب" },
        { en: "Modern Metal Desk Stand", ar: "حامل مكتب معدني حديث" },
        { en: "Luxury Office Desk Organizer", ar: "منظم مكتب فاخر" },
        { en: "Danish Design Oak Bureau", ar: "خزانة مكتب بلوط تصميم دنماركي" },
        { en: "Brushed Steel Writing Table", ar: "طاولة كتابة من الصلب المصقول" },
        { en: "Premium Leather Writing Mat", ar: "قاعدة كتابة جلدية فاخرة" },
        { en: "Adjustable Height Walnut Desk", ar: "مكتب جوز قابل لتعديل الارتفاع" },
        { en: "Asymmetrical Designer Desk", ar: "مكتب مصمم غير متماثل" },
        { en: "Presidential Office Set", ar: "طقم مكتب رئاسي كامل" }
      ],
      desc: [
        { en: "Solid mahogany desk showing premium grain detail and leather inlay.", ar: "مكتب من خشب الماهوجني الصلب يظهر تفاصيل عروق فاخرة وترصيعاً جلدياً." },
        { en: "Real Italian leather padding with complete back support adjustability.", ar: "حشوة جلدية إيطالية طبيعية مع إمكانية تعديل كامل لدعم الظهر." },
        { en: "High tall bookcase featuring gold framing and warm LED shelves.", ar: "خزانة كتب مرتفعة تتميز بإطار ذهبي ورفوف بإضاءة LED دافئة." },
        { en: "Perfect home office solution built from high-density solid walnut wood.", ar: "الحل المثالي للمكتب المنزلي مبني من خشب الجوز الصلب عالي الكثافة." },
        { en: "Sleek lowboard providing ample space for printers and essential documents.", ar: "خزانة منخفضة أنيقة توفر مساحة كافية للطابعات والمستندات الهامة." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 1400
    },
    chairs: {
      name: [
        { en: "Velvet Swivel Lounge Chair", ar: "كرسي صالة دوار مخملي" },
        { en: "Minimal Wood Accent Chair", ar: "كرسي مميز خشبي بسيط" },
        { en: "Teddy Boucle Armchair", ar: "كرسي ذراعين تيدي بوكليه" },
        { en: "Luxury Gold-Plated Armchair", ar: "كرسي ذراعين فاخر مطلي بالذهب" },
        { en: "Classic Leather Lounge Chair", ar: "كرسي صالة جلدي كلاسيكي" },
        { en: "Danish Modern Accent Chair", ar: "كرسي مميز معاصر دنماركي" },
        { en: "Quilted Velvet Vanity Chair", ar: "كرسي تسريحة مخملي مبطن" },
        { en: "Rattan Weave Lounge Chair", ar: "كرسي صالة منسوج من الخيزران" },
        { en: "Faux Fur Accent Chair", ar: "كرسي مميز من الفرو الصناعي" },
        { en: "Mid-Century Modern Armchair", ar: "كرسي بذراعين منتصف القرن" },
        { en: "Ergonomic Cushion Armchair", ar: "كرسي بذراعين ببطانة مريحة" },
        { en: "Geometric Accent Metal Chair", ar: "كرسي معدني مميز بتصميم هندسي" },
        { en: "Luxury High-back Velvet Seat", ar: "مقعد مخملي فاخر بظهر مرتفع" },
        { en: "Minimalist Lounge Tub Chair", ar: "كرسي صالة مستدير بسيط" },
        { en: "Linen Wingback Chair", ar: "كرسي مجنح من الكتان" },
        { en: "Sculptural Brass Frame Chair", ar: "كرسي إطار نحاسي منحوت" },
        { en: "Premium Leather Rocking Chair", ar: "كرسي هزاز جلدي فاخر" },
        { en: "Woven Suede Lounge Chair", ar: "كرسي صالة من جلد الغزال المنسوج" },
        { en: "Emerald Velvet Throne Chair", ar: "كرسي عرش مخملي زمردي" },
        { en: "Royal Lounge Armchair Set", ar: "طقم كراسي صالة ملكية فاخرة" }
      ],
      desc: [
        { en: "Smooth 360-degree swivel wrapped in soft, luxurious cotton velvet.", ar: "دوران سلس بزاوية 360 درجة ملفوف بمخمل قطني ناعم وفاخر." },
        { en: "Solid ash wood frame with a woven paper cord comfortable seat.", ar: "إطار من خشب الرماد الصلب مع مقعد مريح من حبل ورقي منسوج." },
        { en: "Cosy boucle texture with high density foam padding for relaxation.", ar: "ملمس بوكليه مريح مع حشوة رغوية عالية الكثافة للاسترخاء." },
        { en: "High-grade brass plating structure holding soft velvet cushioning.", ar: "هيكل مطلي بالذهب عالي الجودة يحمل وسائد مخملية ناعمة." },
        { en: "Iconic lounger designed with premium bent plywood and aniline leather.", ar: "كرسي استرخاء أيقوني مصمم من خشب رقائقي منحني فاخر وجلد أنيلين." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 650
    },
    "coffee-tables": {
      name: [
        { en: "Nesting Gold Trim Tables", ar: "طاولات متداخلة بحواف ذهبية" },
        { en: "White Marble Coffee Table", ar: "طاولة قهوة رخام أبيض" },
        { en: "Organic Dark Wood Block", ar: "كتلة خشبية داكنة طبيعية" },
        { en: "Tempered Glass Coffee Table", ar: "طاولة قهوة زجاج مقسى" },
        { en: "Luxury Fluted Drum Table", ar: "طاولة أسطوانية مضلعة فاخرة" },
        { en: "Walnut Oval Coffee Table", ar: "طاولة قهوة بيضاوية جوز" },
        { en: "Industrial Iron Frame Table", ar: "طاولة قهوة بإطار حديدي" },
        { en: "Terrazzo Top Side Table", ar: "طاولة جانبية بسطح ترازو" },
        { en: "Modern Mirror Coffee Table", ar: "طاولة قهوة مرآة حديثة" },
        { en: "Travertine Round Coffee Table", ar: "طاولة قهوة دائرية ترافرتين" },
        { en: "Sleek Black Ash Coffee Table", ar: "طاولة قهوة رماد أسود أنيقة" },
        { en: "Gold-Plated Base Marble Table", ar: "طاولة رخام بقاعدة مطلية بالذهب" },
        { en: "Live Edge Walnut Table", ar: "طاولة قهوة حافة حية جوز" },
        { en: "Abstract Shaped Accent Table", ar: "طاولة جانبية بشكل تجريدي مميز" },
        { en: "Double Tier Glass Coffee Table", ar: "طاولة قهوة زجاجية مزدوجة الطبقات" },
        { en: "Luxury Brass Hammered Table", ar: "طاولة نحاسية مطروقة فاخرة" },
        { en: "Minimalist Floating Shelf Table", ar: "طاولة رفوف معلقة بسيطة" },
        { en: "Crescent Brass Coffee Table", ar: "طاولة قهوة نحاسية شكل هلال" },
        { en: "Sculptured Oak Center Table", ar: "طاولة وسط بلوط منحوتة" },
        { en: "Gold Luxury Nesting Set of 3", ar: "طقم طاولات متداخلة ذهبي فاخر 3 قطع" }
      ],
      desc: [
        { en: "Space-saving design that offers high versatility and elegance.", ar: "تصميم موفر للمساحة يوفر مرونة عالية وأناقة متناهية." },
        { en: "Polished white marble slab with gray veins on a black steel cross-base.", ar: "لوح رخام أبيض مصقول بعروق رمادية على قاعدة متقاطعة من الصلب الأسود." },
        { en: "Crafted from a single solid block of timber with textured finish.", ar: "مصنوعة من كتلة خشبية صلبة واحدة مع تشطيب مميز للملمس." },
        { en: "Ultra-clear tempered glass top allowing floor rug patterns to show.", ar: "سطح زجاجي مقسى فائق الوضوح يسمح بظهور نقوش سجاد الأرضية." },
        { en: "Charming fluted wood panel siding finished with matte gold paint.", ar: "جوانب ساحرة من ألواح الخشب المضلعة مشطبة بطلاء ذهبي مطفأ." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 450
    },
    "kids-rooms": {
      name: [
        { en: "Safety Pine Wood Bunk Bed", ar: "سرير طابقين آمن خشب صنوبر" },
        { en: "Playful Cloud Storage Shelf", ar: "رف تخزين شكل سحابة مبهج" },
        { en: "Kids Modern Study Desk", ar: "مكتب دراسة حديث للأطفال" },
        { en: "Pastel Velvet Accent Chair", ar: "كرسي مميز مخملي بألوان الباستيل" },
        { en: "Tepee Tent Canvas Bedframe", ar: "إطار سرير قماشي شكل خيمة تيبي" },
        { en: "Montessori Low House Bed", ar: "سرير منخفض شكل منزل مونتيسوري" },
        { en: "Kids Multi-bin Toy Organizer", ar: "منظم ألعاب متعدد الصناديق للأطفال" },
        { en: "Cute Animal Stool Velvet", ar: "كرسي شكل حيوان لطيف مخملي" },
        { en: "Height Adjustable Study Set", ar: "طقم دراسة قابل لتعديل الارتفاع" },
        { en: "Upholstered Soft Bumper Bed", ar: "سرير أطفال منجد بحواف ناعمة" },
        { en: "Kids Pastel Activity Table", ar: "طاولة أنشطة أطفال بألوان الباستيل" },
        { en: "Starry Night Projector Wardrobe", ar: "خزانة ملابس برسوم ليلية نجوم" },
        { en: "Safari Theme Book Display", ar: "حامل عرض كتب بطابع السافاري" },
        { en: "Kids Ergonomic Swivel Chair", ar: "كرسي دوار مريح للأطفال" },
        { en: "Soft Cushion Playroom Rug", ar: "سجادة غرفة ألعاب مبطنة ناعمة" },
        { en: "Castle Theme Double Bed", ar: "سرير مزدوج بطابع القلعة" },
        { en: "Underbed Toy Rolling Storage", ar: "درج تخزين ألعاب أسفل السرير بعجلات" },
        { en: "Minimalist Birch Wood Crib", ar: "سرير أطفال خشب البتولا مبسط" },
        { en: "Kids Luxury Modular Sofa", ar: "كنبة موديولار للأطفال فاخرة" },
        { en: "Junior Complete Bedroom Set", ar: "طقم غرفة نوم جونيور كامل" }
      ],
      desc: [
        { en: "Sturdy solid pine wood with high safety rails and a storage staircase.", ar: "خشب صنوبر صلب متين مع حواجز أمان عالية ودرج تخزين مدمج." },
        { en: "Wall-mounted cute floating shelves painted with organic baby-safe paint.", ar: "رفوف معلقة لطيفة تثبت على الجدار مطلية بطلاء عضوي آمن للأطفال." },
        { en: "Compact study desk with integrated tablet stand and drawer cabinet.", ar: "مكتب دراسة مدمج مع حامل تابلت مدمج وخزانة أدراج." },
        { en: "Comfortable miniature seat in soft pink or mint velvet fabrics.", ar: "مقعد مصغر مريح بقماش مخملي ناعم باللون الوردي أو النعناعي." },
        { en: "Whimsical tent design that inspires imagination and cozy dreams.", ar: "تصميم خيمة رائع يلهم الخيال ويحقق أحلاماً مريحة." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 950
    },
    outdoor: {
      name: [
        { en: "Weatherproof Rattan Lounger", ar: "شيزلونج خيزران مقاوم للطقس" },
        { en: "Garden Dining Set with Cushions", ar: "طقم طعام حديقة مع وسائد" },
        { en: "Luxury Garden Canopy Daybed", ar: "سرير نهاري بظلة حديقة فاخر" },
        { en: "Teak Wood Patio Coffee Table", ar: "طاولة قهوة فناء خشب تيك" },
        { en: "Hanging Egg Swing Chair", ar: "كرسي أرجوحة معلق شكل بيضة" },
        { en: "Aluminum Frame Garden Sofa", ar: "كنبة حديقة بإطار ألومنيوم" },
        { en: "Outdoor Bar Height Table set", ar: "طقم طاولة بار خارجية مرتفعة" },
        { en: "Waterproof Sectional Lounge", ar: "جلسة زاوية خارجية مقاومة للماء" },
        { en: "Premium Patio Umbrellas Large", ar: "مظلات فناء كبيرة فاخرة" },
        { en: "Teak Sun Lounge Deck Chair", ar: "كرسي استرخاء شمس خشب تيك" },
        { en: "Concrete Design Fire Pit Table", ar: "طاولة موقد نار بتصميم خرساني" },
        { en: "Outdoor Rattan Armchair", ar: "كرسي ذراعين خيزران خارجي" },
        { en: "Woven Rope Accent Patio Chair", ar: "كرسي فناء مميز بحبل منسوج" },
        { en: "Minimalist Garden Bench Wood", ar: "مقعد حديقة خشب بسيط" },
        { en: "Luxury Poolside Recliner", ar: "كرسي استرخاء فناء حمام السباحة" },
        { en: "Outdoor Buffet Server Cart", ar: "عربة تقديم وبوفيه خارجية" },
        { en: "All-weather Loveseat Garden", ar: "كنبة ثنائية للحديقة صالحة للطقس" },
        { en: "Outdoor Bistro Table and Chairs", ar: "طاولة بيسترو خارجية مع كراسي" },
        { en: "Teak Dining Bench Outdoor", ar: "مقعد طعام خارجي خشب تيك" },
        { en: "Tropical Resort Canopy Set", ar: "طقم جلسة ظلة للمنتجعات الاستوائية" }
      ],
      desc: [
        { en: "Synthetic hand-woven rattan over anti-rust powder coated steel.", ar: "خيزران صناعي منسوج يدوياً فوق فولاذ مقاوم للصدأ مطلي بمسحوق." },
        { en: "Includes a 6-seater long teak table and comfortable high-back chairs.", ar: "يشتمل على طاولة طويلة من خشب التيك لـ 6 أفراد وكراسي مريحة بظهر مرتفع." },
        { en: "Escape the sun under adjustable canvas folds on plush double padding.", ar: "اهرب من أشعة الشمس تحت طيات قماش قابلة للتعديل مع حشوة مزدوجة فخمة." },
        { en: "Naturally oiled premium teak wood that ages into silver gray patina.", ar: "خشب تيك فاخر مدهون بالزيت الطبيعي يتحول بمرور الوقت إلى لون فضي عتيق." },
        { en: "Heavy-duty steel stand holding a woven synthetic basket with cushions.", ar: "حامل فولاذي شديد التحمل يحمل سلة خيزران صناعي منسوجة مع وسائد." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 1300
    },
    decorations: {
      name: [
        { en: "Gilded Arched Wall Mirror", ar: "مرآة حائط مقوسة مذهبة" },
        { en: "Abstract Ceramic Sculpture", ar: "مجسم سيراميك تجريدي فني" },
        { en: "Premium Brass Table Lamp", ar: "مصباح طاولة نحاسي فاخر" },
        { en: "Luxury Wool Hand-woven Rug", ar: "سجادة صوف فاخرة منسوجة يدوياً" },
        { en: "Golden Metal Candle Holders", ar: "حوامل شموع معدنية ذهبية" },
        { en: "Textured Matte Ceramic Vase", ar: "مزهرية سيراميك غير لامعة" },
        { en: "Minimalist Marble Bookends", ar: "مساند كتب رخامية بسيطة" },
        { en: "Modern Abstract Oil Painting", ar: "لوحة زيتية تجريدية معاصرة" },
        { en: "Luxury Velvet Accent Pillows", ar: "وسائد مخملية مميزة فاخرة" },
        { en: "Brass Hourglass Timer Decor", ar: "ساعة رملية نحاسية للديكور" },
        { en: "Terracotta Planter Gold Stand", ar: "أصيص طين تراكوتا بحامل ذهبي" },
        { en: "Agate Coaster Set with Gold Rim", ar: "طقم قواعد أكواب عقيق بحواف ذهبية" },
        { en: "Geometric Metal Wall Art", ar: "لوحة جدارية معدنية هندسية" },
        { en: "Crystal Pendant Table Center", ar: "تحفة كريستال لوسط الطاولة" },
        { en: "Woven Seagrass Storage Basket", ar: "سلة تخزين منسوجة من الأعشاب البحرية" },
        { en: "Retro Brass Globe Stand", ar: "مجسم كرة أرضية نحاسي كلاسيكي" },
        { en: "Luxury Scented Soy Candle Set", ar: "طقم شموع صويا معطرة فاخرة" },
        { en: "Modern Brushed Gold Wall Clock", ar: "ساعة حائط ذهبية مصقولة حديثة" },
        { en: "Handmade Clay Jug Vintage", ar: "إبريق فخاري مصنوع يدوياً عتيق" },
        { en: "Imperial Gilded Art Piece Suite", ar: "طقم تحف إمبراطورية مذهبة متكاملة" }
      ],
      desc: [
        { en: "Hand-carved wood frame detailed with genuine gold leaf finishing.", ar: "إطار خشبي منحوت يدوياً ومزين بلمسات من ورق الذهب الحقيقي." },
        { en: "Minimalist interlocking organic shapes in off-white stone texture.", ar: "أشكال عضوية متداخلة بسيطة بملمس الحجر الأبيض الفاتح." },
        { en: "Brushed brass base with a high-end white linen drum lampshade.", ar: "قاعدة من النحاس الأصفر المصقول مع مظلة مصباح أسطوانية من الكتان الأبيض الفاخر." },
        { en: "Ultra soft high-pile wool rug featuring subtle beige geometric lines.", ar: "سجادة صوف ناعمة للغاية تتميز بخطوط هندسية بيج لطيفة." },
        { en: "Set of three varying heights to create a warm luxury lighting ambient.", ar: "طقم من ثلاث قطع بارتفاعات مختلفة لخلق إضاءة دافئة وفاخرة." }
      ],
      imgs: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
      ],
      basePrice: 250
    }
  };

  // Loop through 10 collections
  Object.keys(designTemplates).forEach((colId) => {
    const template = designTemplates[colId];
    
    // Generate 20 items per collection
    for (let i = 0; i < 20; i++) {
      const nameObj = template.name[i] || template.name[0];
      const descObj = template.desc[i % template.desc.length];
      const image = template.imgs[i % template.imgs.length];
      
      const price = Math.round(template.basePrice * (0.75 + (i * 0.08)));
      // Make some items have discount (around 30% of items)
      const hasDiscount = i % 3 === 0;
      const oldPrice = hasDiscount ? Math.round(price * 1.25) : undefined;
      const rating = parseFloat((4.3 + (i % 8) * 0.1).toFixed(1));
      
      // Badges
      let saleBadge: { en: string; ar: string } | undefined;
      if (hasDiscount) {
        saleBadge = { en: "SALE", ar: "خصم" };
      }
      
      const isNew = i < 4; // First 4 items are marked as NEW
      const isPopular = i >= 4 && i < 8; // Next 4 are POPULAR
      
      // Availability
      let availability: 'in-stock' | 'low-stock' | 'out-of-stock' = 'in-stock';
      if (i === 12) {
        availability = 'out-of-stock';
      } else if (i === 7 || i === 17) {
        availability = 'low-stock';
      }
      
      // Materials and Dimensions based on index
      const materials = [
        { en: "Genuine Leather & Walnut Wood", ar: "جلد طبيعي وخشب جوز" },
        { en: "Solid White Oak & Brass Details", ar: "خشب بلوط صلب وتفاصيل نحاسية" },
        { en: "Italian Marble & Powder Coated Steel", ar: "رخام إيطالي وفولاذ مطلي" },
        { en: "Premium Velvet & Gold Plated Frame", ar: "مخمل فاخر وإطار مطلي بالذهب" },
        { en: "Textured Boucle & Solid Ash Base", ar: "قماش بوكليه متين وقاعدة رماد صلبة" }
      ];
      
      const dimensions = [
        { en: "W: 220cm x D: 90cm x H: 85cm", ar: "عرض: ٢٢٠ سم × عمق: ٩٠ سم × ارتفاع: ٨٥ سم" },
        { en: "W: 180cm x D: 80cm x H: 75cm", ar: "عرض: ١٨٠ سم × عمق: ٨٠ سم × ارتفاع: ٧٥ سم" },
        { en: "W: 60cm x D: 60cm x H: 105cm", ar: "عرض: ٦٠ سم × عمق: ٦٠ سم × ارتفاع: ١٠٥ سم" },
        { en: "W: 100cm x D: 100cm x H: 45cm", ar: "عرض: ١٠٠ سم × عمق: ١٠٠ سم × ارتفاع: ٤٥ سم" },
        { en: "W: 140cm x D: 45cm x H: 80cm", ar: "عرض: ١٤٠ سم × عمق: ٤٥ سم × ارتفاع: ٨٠ سم" }
      ];

      const colors = ["#C5A880", "#1E1611", "#FAF8F5", "#2C2C2C", "#607D8B"];

      list.push({
        id: `p-${colId}-${i + 1}`,
        name: nameObj,
        description: descObj,
        price,
        oldPrice,
        rating,
        image,
        category: colId,
        saleBadge,
        isNew,
        isPopular,
        availability,
        details: {
          dimensions: dimensions[i % dimensions.length],
          material: materials[i % materials.length],
          colors: colors.slice(0, 2 + (i % 3))
        }
      });
    }
  });
  
  return list;
};

export const products: Product[] = createProducts();

export const testimonials: Testimonial[] = [
  {
    id: "r1",
    name: { en: "Aisha Al-Mansoori", ar: "عائشة المنصوري" },
    role: { en: "Interior Designer", ar: "مصممة ديكور داخلي" },
    text: {
      en: "Shams products have completely transformed my recent residential projects. The walnut finishing is exceptionally premium and the design is truly state of the art.",
      ar: "لقد أحدثت منتجات شمس تحولاً كاملاً في مشاريعي السكنية الأخيرة. تشطيبات خشب الجوز ممتازة بشكل استثنائي والتصميم فني رائع بحق."
    },
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "r2",
    name: { en: "Khalid Al-Saeed", ar: "خالد السعيد" },
    role: { en: "Homeowner", ar: "صاحب منزل" },
    text: {
      en: "The velvet Chesterfield sofa we ordered is beautiful, comfortable, and commands attention in our living room. Exceptional customer support and secure delivery.",
      ar: "كنبة تشيسترفيلد المخملية التي طلبناها جميلة ومريحة وتجذب الانتباه في غرفة معيشتنا. دعم عملاء استثنائي وتوصيل آمن."
    },
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "r3",
    name: { en: "Dr. Sarah Miller", ar: "د. سارة ميلر" },
    role: { en: "Luxury Collector", ar: "مهتمة بالديكورات الفاخرة" },
    text: {
      en: "I bought the gold-trimmed marble dining table. The attention to detail, symmetry, and materials are comparable to high-end European brands, but with a unique soul.",
      ar: "اشتريت طاولة الطعام الرخامية ذات الحواف الذهبية. إن الاهتمام بالتفاصيل والتناسق والمواد يضاهي الماركات الأوروبية العالمية ولكن بروح فريدة."
    },
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "r4",
    name: { en: "Tariq Ibrahim", ar: "طارق إبراهيم" },
    role: { en: "Executive Architect", ar: "مهندس معماري تنفيذي" },
    text: {
      en: "Excellent office furniture. The mahogany desk looks imposing yet extremely modern. Highly recommended for corporate headquarters looking for a luxury look.",
      ar: "أثاث مكتبي ممتاز. مكتب الماهوجني يبدو مهيباً وفي نفس الوقت حديثاً للغاية. موصى به بشدة للمقرات الفخمة الباحثة عن الفخامة."
    },
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
];

export const translations = {
  en: {
    brandName: "SHAMS",
    navHome: "Home",
    navCollections: "Collections",
    navBestSellers: "Best Sellers",
    navAbout: "About Us",
    navContact: "Contact Us",
    searchPlaceholder: "Search luxury collections...",
    cartTitle: "Shopping Cart",
    cartEmpty: "Your cart is empty",
    cartSubtotal: "Subtotal",
    cartCheckout: "Checkout Now",
    shopNow: "Shop Now",
    exploreCollections: "Explore Collections",
    aboutTitle: "The Art of Living Luxuriously",
    aboutSubtitle: "ABOUT SHAMS FURNITURE",
    aboutDesc1: "Founded on the principles of symmetry, fine craftsmanship, and organic geometry, Shams crafts furniture that transforms ordinary residential and commercial spaces into stunning architectural experiences.",
    aboutDesc2: "We source the finest Calacatta marble, old-growth solid walnut, and rich velvet to guarantee every piece stands as a testament to high-end design and durability.",
    statsYears: "Years of Experience",
    statsCustomers: "Happy Customers",
    statsCollections: "Premium Collections",
    statsDelivery: "Fast Delivery",
    collectionsTitle: "Luxury Collections",
    collectionsSubtitle: "OUR SIGNATURE RANGES",
    productsTitle: "Curated Masterpieces",
    productsSubtitle: "FIND THE PERFECT PIECES",
    filterAll: "All Collections",
    sortBy: "Sort By",
    sortPriceLowHigh: "Price: Low to High",
    sortPriceHighLow: "Price: High to Low",
    sortRating: "Top Rated",
    whyChooseTitle: "Why Choose Shams",
    whyChooseSubtitle: "THE SEAL OF EXTRAORDINARY QUALITY",
    featureQuality: "Premium Quality",
    featureQualityDesc: "Only the finest solid wood, Italian marbles, and rich textiles are selected.",
    featureDelivery: "Secure White-Glove Delivery",
    featureDeliveryDesc: "Delivered directly into your home room, unpacked, and fully installed.",
    featurePayment: "Secure Payment Methods",
    featurePaymentDesc: "Fully encrypted processing safeguarding your credit transactions.",
    featureDesigns: "Modern Elegant Designs",
    featureDesignsDesc: "Award-winning structures combining minimalist aesthetics and luxury.",
    featureWarranty: "10-Year Warranty",
    featureWarrantyDesc: "Comprehensive coverage on structure frame, joints, and wood cracks.",
    featureSupport: "Dedicated Concierge Support",
    featureSupportDesc: "A personal home design advisor available round-the-clock.",
    bestSellersTitle: "Best Sellers",
    bestSellersSubtitle: "MOST COVETED FURNISHINGS",
    reviewsTitle: "Voices of Distinction",
    reviewsSubtitle: "CLIENT TESTIMONIALS",
    galleryTitle: "Visual Luxury",
    gallerySubtitle: "SHAMS IN MODERN SPACES",
    contactTitle: "Connect With Our Concierge",
    contactSubtitle: "VISIT OUR DESIGN SHOWROOMS",
    contactName: "Full Name",
    contactEmail: "Email Address",
    contactPhone: "Phone Number",
    contactMessage: "Detailed Inquiry Message",
    contactSend: "Send Message",
    contactLocation: "Location Address",
    contactLocationDesc: "Plot 42, Luxury Design Avenue, New Cairo, Egypt",
    contactHours: "Business Hours",
    contactHoursDesc: "Saturday - Thursday: 10:00 AM - 10:00 PM | Friday: 3:00 PM - 10:00 PM",
    addToCart: "Add to Cart",
    quickView: "Quick View",
    wishlist: "Wishlist",
    inStock: "In Stock",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
    material: "Material",
    dimensions: "Dimensions",
    colors: "Select Finish Color",
    close: "Close",
    checkoutTitle: "Checkout",
    checkoutReceipt: "Order Summary",
    checkoutConfirmBanner: "Your order will be confirmed shortly — our team will contact you to finalize delivery details.",
    checkoutProceed: "Proceed to Delivery Info",
    checkoutFormTitle: "Delivery Information",
    checkoutName: "Full Name",
    checkoutNamePlaceholder: "Enter your full name",
    checkoutPhone: "Phone Number",
    checkoutPhonePlaceholder: "+20 1XX XXX XXXX",
    checkoutAddress: "Delivery Address",
    checkoutAddressPlaceholder: "Street, City, Governorate",
    checkoutNote: "Order Note",
    checkoutNotePlaceholder: "Any special requests or delivery instructions (optional)",
    checkoutSubmit: "Place Order",
    checkoutSending: "Placing Order...",
    checkoutSuccessTitle: "Order Placed Successfully!",
    checkoutSuccessMessage: "Thank you for your order. Our team will contact you soon to confirm your delivery.",
    checkoutSuccessClose: "Continue Shopping",
    checkoutBack: "Back to Cart",
    checkoutTotal: "Order Total",
    checkoutQty: "Qty",
    checkoutItem: "Item",
    checkoutPrice: "Price",
    checkoutErrorName: "Please enter your full name",
    checkoutErrorPhone: "Please enter a valid phone number",
    checkoutErrorAddress: "Please enter your delivery address",
    checkoutEmailError: "Failed to send order. Please try again or contact us directly."
  },
  ar: {
    brandName: "شمس",
    navHome: "الرئيسية",
    navCollections: "التصنيفات",
    navBestSellers: "الأكثر مبيعاً",
    navAbout: "عن شمس",
    navContact: "اتصل بنا",
    searchPlaceholder: "ابحث في التشكيلات الفاخرة...",
    cartTitle: "سلة المشتريات",
    cartEmpty: "سلة مشترياتك فارغة",
    cartSubtotal: "المجموع الفرعي",
    cartCheckout: "إتمام الشراء الآن",
    shopNow: "تسوق الآن",
    exploreCollections: "اكتشف التشكيلات",
    aboutTitle: "فن العيش بفخامة ورفاهية",
    aboutSubtitle: "عن مفروشات شمس",
    aboutDesc1: "تأسست شمس على مبادئ التناسق الهندسي، الحرفية اليدوية الدقيقة، والتصميم العضوي، لتصنع قطع أثاث تحول المساحات السكنية والتجارية العادية إلى تجارب معمارية مذهلة.",
    aboutDesc2: "نحن ننتقي أرقى أنواع رخام الكالاكاتا، خشب الجوز الصلب العتيق، والمخمل الفاخر لنضمن أن تكون كل قطعة شهادة على جودة التصميم والمتانة الطويلة.",
    statsYears: "سنوات من الخبرة",
    statsCustomers: "عملاء سعداء",
    statsCollections: "تشكيلات راقية",
    statsDelivery: "توصيل سريع وآمن",
    collectionsTitle: "التشكيلات الفاخرة",
    collectionsSubtitle: "مجموعاتنا المتميزة",
    productsTitle: "تحف فنية منسقة",
    productsSubtitle: "اعثر على القطعة المثالية لمنزلك",
    filterAll: "جميع المجموعات",
    sortBy: "ترتيب حسب",
    sortPriceLowHigh: "السعر: من الأقل للأعلى",
    sortPriceHighLow: "السعر: من الأعلى للأقل",
    sortRating: "الأعلى تقييماً",
    whyChooseTitle: "لماذا تختار شمس",
    whyChooseSubtitle: "شعار الجودة الاستثنائية الفاخرة",
    featureQuality: "جودة ممتازة مطلقة",
    featureQualityDesc: "نختار فقط أرقى الأخشاب الصلبة، الرخام الإيطالي، والأقمشة الغنية.",
    featureDelivery: "توصيل متميز وتركيب كامل",
    featureDeliveryDesc: "التوصيل مباشرة إلى غرفتك مع فك التغليف والتركيب الكامل باحترافية.",
    featurePayment: "طرق دفع آمنة 100%",
    featurePaymentDesc: "نظام دفع مشفر بالكامل يحمي معاملاتك المالية وبياناتك المصرفية.",
    featureDesigns: "تصاميم عصرية أنيقة",
    featureDesignsDesc: "هياكل حائزة على جوائز تجمع بين البساطة الجمالية ومظاهر الفخامة.",
    featureWarranty: "ضمان لمدة 10 سنوات",
    featureWarrantyDesc: "تغطية شاملة للهياكل الخشبية، المفاصل، وتشققات الخشب الطبيعي.",
    featureSupport: "خدمة كونسيرج مخصصة",
    featureSupportDesc: "مستشار تصميم داخلي خاص بك متاح على مدار الساعة للإجابة عن استفساراتك.",
    bestSellersTitle: "الأكثر مبيعاً",
    bestSellersSubtitle: "الأثاث الأكثر طلباً ورغبة",
    reviewsTitle: "أصوات التميز",
    reviewsSubtitle: "آراء عملائنا النخبة",
    galleryTitle: "الفخامة البصرية",
    gallerySubtitle: "مفروشات شمس في المساحات العصرية",
    contactTitle: "تواصل مع مستشاري التصميم",
    contactSubtitle: "تفضل بزيارة صالات العرض الخاصة بنا",
    contactName: "الاسم بالكامل",
    contactEmail: "البريد الإلكتروني",
    contactPhone: "رقم الهاتف",
    contactMessage: "تفاصيل رسالة الاستفسار",
    contactSend: "إرسال الرسالة",
    contactLocation: "عنوان المعرض الرئيسي",
    contactLocationDesc: "قطعة 42، شارع التصميم الفاخر، القاهرة الجديدة، مصر",
    contactHours: "ساعات العمل الرسمية",
    contactHoursDesc: "السبت - الخميس: 10:00 صباحاً - 10:00 مساءً | الجمعة: 3:00 مساءً - 10:00 مساءً",
    addToCart: "إضافة للسلة",
    quickView: "عرض سريع",
    wishlist: "المفضلة",
    inStock: "متوفر في المخزن",
    lowStock: "كمية محدودة",
    outOfStock: "غير متوفر حالياً",
    material: "المادة",
    dimensions: "الأبعاد",
    colors: "اختر لون التشطيب",
    close: "إغلاق",
    checkoutTitle: "إتمام الطلب",
    checkoutReceipt: "ملخص الطلب",
    checkoutConfirmBanner: "سيتم تأكيد طلبك قريباً — سيتواصل معك فريقنا لإتمام تفاصيل التوصيل.",
    checkoutProceed: "المتابعة لبيانات التوصيل",
    checkoutFormTitle: "بيانات التوصيل",
    checkoutName: "الاسم بالكامل",
    checkoutNamePlaceholder: "أدخل اسمك الكامل",
    checkoutPhone: "رقم الهاتف",
    checkoutPhonePlaceholder: "+20 1XX XXX XXXX",
    checkoutAddress: "عنوان التوصيل",
    checkoutAddressPlaceholder: "الشارع، المدينة، المحافظة",
    checkoutNote: "ملاحظة على الطلب",
    checkoutNotePlaceholder: "أي طلبات خاصة أو تعليمات للتوصيل (اختياري)",
    checkoutSubmit: "تأكيد الطلب",
    checkoutSending: "جاري تأكيد الطلب...",
    checkoutSuccessTitle: "تم تقديم طلبك بنجاح!",
    checkoutSuccessMessage: "شكراً لطلبك. سيتواصل معك فريقنا قريباً لتأكيد موعد التوصيل.",
    checkoutSuccessClose: "مواصلة التسوق",
    checkoutBack: "العودة للسلة",
    checkoutTotal: "إجمالي الطلب",
    checkoutQty: "الكمية",
    checkoutItem: "المنتج",
    checkoutPrice: "السعر",
    checkoutErrorName: "الرجاء إدخال الاسم بالكامل",
    checkoutErrorPhone: "الرجاء إدخال رقم هاتف صحيح",
    checkoutErrorAddress: "الرجاء إدخال عنوان التوصيل",
    checkoutEmailError: "فشل إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرةً."
  }
};
