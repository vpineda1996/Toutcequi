/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Thing = sqldb.Thing;
var User = sqldb.User;
var Recipes = sqldb.Recipes;

Thing.sync()
  .then(() => {
    return Thing.destroy({ where: {} });
  })
  .then(() => {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    }]);
  });

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });

var data = [
    {
      'name': 'Omurice',
      'description': 'Japanese Omelette-Topped Ketchup Fried Rice With Chicken ',
      'rating': 5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2016/07/20160719-omurice-vicky-wasik-17-thumb-1500xauto-433291.jpg',
      'servingSize': 2,
      'ingredients': ['rice', 'onion', 'carrot', 'chicken', 'ketchup', 'egg'],
      'quantity': [
        '2 cups cooked white sushi rice (12 ounces; 350g)',
        '5 tablespoons (75ml) vegetable or canola oil, divided',
        '1/2 cup minced yellow onion (100g; about 1/2 medium onion)',
        '1/2 cup diced carrot (100g; about 1 large carrot)',
        '3 ounces diced skinless, boneless chicken thigh (80g; about 1/2 cup)',
        '1/4 cup ketchup (60ml), thinned with 1 tablespoon (15ml) water, plus more ketchup for serving',
        '1 scallion, thinly sliced',
        'Kosher salt and freshly ground black pepper',
        '4 large eggs, beaten with a pinch of salt'
      ],
      'steps': [
        'If using day-old rice, transfer to a medium bowl and break rice up with your hands into individual grains before proceeding. Heat 1 tablespoon (15ml) vegetable oil in a 10-inch carbon steel or nonstick skillet over high heat until lightly smoking. Add half of rice and cook, stirring and tossing, until rice is pale brown and toasted and has a lightly chewy texture, about 3 minutes. Transfer to a medium bowl. Repeat with another tablespoon (15ml) oil and remaining rice.',
        'Add 2 more tablespoons (30ml) oil to skillet, return to high heat, and heat until smoking. Add onion and carrot and cook, stirring and tossing, until just tender and lightly browned in spots, about 3 minutes. Add chicken and cook, stirring, until cooked through and starting to lightly brown, about 3 minutes.',
        'Return rice to pan and toss until well combined with vegetables. Add thinned ketchup and cook, stirring and tossing, until ketchup sauce is reduced and each grain of rice is separate and coated in a shiny sheen of ketchup. Toss in scallion, then season with salt and pepper. Scrape rice mixture into a small heatproof bowl, packing it down. Invert a serving plate on top of the bowl of rice, then rotate both so that bowl is sitting inverted on top of plate. Set aside.',
        'Wipe out skillet with a paper towel and return to medium-high heat. Add remaining 1 tablespoon (15ml) oil and heat until shimmering. Add eggs and stir rapidly with a spatula, while shaking pan to agitate eggs; make sure to move spatula all around pan to break up curds and scrape them from bottom of skillet as they form. Stop stirring as soon as eggs are very softly scrambled and creamy (but still loose enough to come together into a single mass), 1 to 2 minutes.',
        'Using spatula, gently spread egg in an even layer around skillet and scrape down any wispy bits around the edges. The top surface should be loose and creamy, but if it looks too liquid and raw, let cook, undisturbed, for another few seconds. (If it still flows, you can swirl skillet to send loose egg to the edges, where it will set more quickly.) Remove from heat.',
        'Lift bowl from rice; rice should hold a mound-like form. Slide open-face omelette on top of rice mound. Garnish with a squeeze of ketchup and Kewpie mayonnaise, if using. Serve right away.'
      ],
      'activeTime': '20 minutes',
      'totalTime': '20 minutes'
    },
    {
      'name':'Spaghetti With Carbonara Sauce ',
      'description': 'Spaghetti With Carbonara Sauce ',
      'rating': 4,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2016/02/20151118-spaghetti-carbonara-vicky-wasik-27-thumb-1500xauto-430120.jpg',
      'servingSize': 4,
      'ingredients': ['spaghetti', 'bacon', 'egg', 'cheese', 'olive oil'],
      'quantity': [
        'Kosher salt',
        '1 pound dried spaghetti (450g)',
        '1/2 cup diced guanciale, pancetta, or bacon (about 3 ounces; 85g)',
        '3 tablespoons extra-virgin olive oil (45mL), divided',
        '2 whole large eggs plus 6 yolks',
        '1/4 cup grated Pecorino Romano (about 1 ounce; 25g), plus more for serving',
        '1/4 cup grated Parmigiano-Reggiano (about 1 ounce; 25g), plus more for serving',
        '1 teaspoon freshly ground black pepper (ground medium-coarse), plus more for serving'
      ],
      'steps': [
        'Bring a pot of salted water to a boil. Add pasta and cook, stirring, until al dente.',
        'Meanwhile, combine guanciale (or pancetta or bacon) with 2 tablespoons olive oil (30mL) in a large skillet and cook, stirring frequently, over medium heat, until fat has rendered and guanciale is crisp, about 7 minutes. In a large metal heatproof mixing bowl, whisk together whole eggs and yolks, Pecorino Romano, Parmigiano-Reggiano, and black pepper.',
        'Using tongs and/or a strainer, transfer pasta to skillet with crisped guanciale and its fat; be sure not to drain boiling pasta water. Add remaining 1 tablespoon olive oil (15mL) to pasta and stir to combine. Scrape pasta, pork, and all the fat into the egg mixture. Measure 1/2 cup of pasta cooking water (120mL) and add to pasta and egg mixture. Stir well to combine.',
        'Set mixing bowl over pot of boiling pasta water (make sure bottom of bowl does not touch the water) and cook, stirring quickly with tongs, until sauce thickens to a creamy, silky consistency and leaves trails as you stir. Remove from heat, season with salt if needed, and divide into bowls. Serve right away, topping with more grated cheese and freshly ground pepper as desired.'
      ],
      'activeTime': '20 minutes',
      'totalTime': '20 minutes'
    },
    {
      'name': 'Homemade Egg McMuffin',
      'description': 'Homemade Egg McMuffin',
      'rating': 4.5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2016/01/20160105-homemade-egg-mcmuffing-recipe-kenji-21-thumb-1500xauto-429275.jpg',
      'servingSize': 1,
      'ingredients': ['butter', 'english muffin','canadian bacon', 'egg', 'cheese'],
      'quantity': [
        '1 tablespoon unsalted butter (1/2 ounce; 15g), softened, divided',
        '1 English muffin, split',
        '1 slice high-quality Canadian bacon',
        '1 large egg',
        '1 slice American, cheddar, Swiss, or jack cheese'
      ],
      'steps': [
        'Spread 1 teaspoon butter on each half of the English muffin and place halves in a 10-inch nonstick or cast iron skillet over medium heat. Cook, swirling muffin halves and pressing gently to get good contact with pan, until both pieces are well browned, about 4 minutes. Transfer to a sheet of aluminum foil, split side up.',
        'Melt remaining 1 teaspoon butter in the now-empty skillet and increase heat to medium-high. Add bacon and cook, turning frequently, until browned and crisp around the edges, about 1 1/2 minutes. Transfer bacon to lower muffin half.',
        'Place a quart-sized wide mouth Mason jar lid (both the lid and the sealing ring) upside down in the now-empty skillet. (The side the jar screws onto should be facing up.) Spray the inside with nonstick cooking spray and break egg into it. Poke the egg yolk with a fork to break it and season with salt and pepper. Pour 3/4 cup water into the skillet, cover, and cook until egg is set, about 2 minutes.',
        'Using a thin spatula, transfer Mason jar lid to a paper towel–lined plate. Pour excess water out of the skillet and return it to the stovetop with the heat off. Flip Mason jar lid over and gently remove it to release egg. Place egg on top of bacon and top with cheese slice. Close sandwich, wrap in aluminum foil, and return to the now-empty skillet. Let it warm up in the skillet for 2 minutes with the heat off, flipping occasionally. Unwrap and serve immediately.'
      ],
      'activeTime': '10 minutes',
      'totalTime': '10 minutes'
    },
    {
      'name': 'Green Salad With Tomatoes, Scallions, and Toasted Kasha',
      'description': 'Green Salad With Tomatoes, Scallions, and Toasted Kasha',
      'rating': 5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2015/09/20150902-tomato-kasha-salad-vicky-wasik-9-thumb-1500xauto-426387.jpg',
      'servingSize': 4,
      'ingredients': ['olive oil, kasha', 'lettuce', 'tomato', 'scallion', 'vinaigrette'],
      'quantity': [
        '1 tablespoon extra-virgin olive oil',
        '1/4 cup toasted kasha',
        'Kosher salt',
        '3 quarts loosely packed torn lettuce leaves (about 2 medium heads lettuce',
        '1 pint mixed cherry tomatoes, quartered',
        '2 scallions, white and light green parts only, cut into thin slivers on a bias and soaked in ice water for 15–30 minutes, then drained',
        'Simple Vinaigrette, for dressing the salad'
      ],
      'steps' : [
        'In a medium skillet, heat oil over medium-high heat until shimmering. Add kasha and cook, stirring, until lightly toasted and fragrant, about 30 seconds. Transfer to a paper towel–lined plate to drain and season with salt. Let cool completely.',
        'In a large bowl, combine lettuce, tomatoes, and scallions. Sprinkle a few pinches of toasted kasha on top and season with salt. Drizzle with just enough vinaigrette, gently tossing with clean hands to lightly coat lettuce leaves. Serve right away. Reserve extra kasha for another use (such as a garnish for other dishes).'
      ],
      'activeTime': '15 minutes',
      'totalTime': '15 minutes'
    },
    {
      'name': 'Classic Caprese Salad',
      'description': 'Classic Caprese Salad',
      'rating': 4.5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2015/08/20150815-caprese-salad-recipe-1-thumb-1500xauto-426003.jpg',
      'servingSize': 4,
      'ingredients': ['tomato', 'cheese', 'olive oil', 'basil'],
      'quantity': [
        '1 1/2 pounds best-quality ripe tomatoes, mixed sizes, at room temperature',
        '8 to 12 ounces best-quality fresh mozzarella cheese, torn into bite-sized chunks',
        'Best-quality extra-virgin olive oil',
        'Coarse sea salt, such as Maldon or fleur de sel',
        'Coarsely ground fresh black pepper',
        '6 to 8 fresh basil leaves'
      ],
      'steps': [
        'Cut tomatoes into an assortment of slices and chunks and spread over a large plate in a single, slightly overlapping layer. Tuck chunks of mozzarella into the tomato pieces. Drizzle generously with extra-virgin olive oil. Sprinkle with coarse sea salt and black pepper. Tear basil leaves into small pieces with your fingertips and spread them on top. Serve immediately.'
      ],
      'activeTime': '10 minutes',
      'totalTime': '10 minutes'
    },
    {
      'name': 'Pimento Cheese Twice Baked Potatoes ',
      'description': 'Pimento Cheese Twice Baked Potatoes',
      'rating': 5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2013/10/20131025-271134-pimento-cheese-twice-baked-potatoes-thumb-625xauto-361263.jpg',
      'servingSize': 4,
      'ingredients': ['bell pepper','potato','cheese','sour cream', 'butter', 'Kosher salt'],
      'quantity': [
        '1 medium red bell pepper',
        '4 russet potatoes, scrubbed',
        '6 ounces sharp cheddar cheese, grated',
        '1/2 cup sour cream',
        '6 tablespoons butter, melted, divided',
        '2 teaspoons paprika',
        '1/8 teaspoon cayenne pepper',
        'Kosher salt',
        'Freshly ground black pepper',
        '1/4 cup finely sliced chives, for garnish',
        'Type of fire: two-zone indirect',
        'Grill heat: medium-high'
      ],
      'steps': [
        'Roast pepper over gas stove, grill, or broiler until skin is completely charred. Place in a bowl, cover with plastic wrap, and let sit until cool enough to handle, about 10 to 15 minutes. Remove the charred outer skin, cut in half and remove the seeds and core. Finely chop pepper.',
        'To bake potatoes in oven or grill: Preheat oven or grill to 400°F. Place potatoes directly on cooking rack and bake until a paring knife can be inserted into middle of potato with little to no resistance, about 60 minutes. Transfer to plate and let rest until cool enough to handle, about 10 minutes.',
        'To bake potatoes in microwave: Place potatoes on a microwave safe plate and microwave on high for 9 to 12 minutes, rotating potatoes every 3 minutes, until a paring knife can be inserted into middle of potato with little to no resistance. Remove from microwave let and rest until cool enough to handle, about 10 minutes.',
        'Slice tops off potatoes lengthwise. Using a spoon or mellonballer, scoop out flesh into a medium bowl, leaving about 1/4-inch of flesh remaining in potato.',
        'Add all but 1/2 cup of cheese into bowl with potato flesh along with roasted pepper, sour cream, 3 tablespoons melted butter, paprika, and cayenne. Mash ingredients together until mixture is cohesive.',
        'Light one chimney full of charcoal. When all the charcoal is lit and covered with gray ash, pour out and arrange the coals on one side of the charcoal grate. Set cooking grate in place, cover grill and allow to preheat for 5 minutes. Clean and oil the grilling grate. Brush potatoes all over with remaining butter and season with salt and pepper to taste. Place on cool side of grill, cover, and cook until potato skins start to brown around the edges and slightly crisp, about 10 minutes.',
        'Remove potatoes from grill. Spoon filling into potatoes and top with remaining cheese. Place potatoes back on the cool side of the grill, cover, and cook until cheese has melted, about 10 minutes. Remove from grill, let cool for 5 minutes, garnish with chives, then serve immediately.'
      ],
      'activeTime': '25 minutes',
      'totalTime':  '1 hour (using microwave) 1 hour 45 minutes (using oven)'
    }

];
Recipes.sync({force:true})
  .then(() => Recipes.destroy({ where: {} }))
  .then(() => {
    Recipes.bulkCreate(data)
    .then(() => {
      console.log('finished populating recipes');
    });
  });
