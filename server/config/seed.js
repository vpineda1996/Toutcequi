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
      'name': 'Roasted Vegi Lasagna',
      'description': 'Roasted Vegi Lasagna',
      'rating': 5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'https://enrootmeals.com/images/gallery/sVegLasagna-2-(1)-1473796886.jpg',
      'ingredients': [],
      'servingSize': 4,
      'steps': []
    },
    {
      'name':'BBQ Brisket Plate',
      'description': 'BBQ Brisket Plate',
      'rating': 5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'https://enrootmeals.com/images/gallery/sBrisketPlate-1473818006.jpg',
      'ingredients': [],
      'steps': []
    },
    {
      'name': 'Grilled Lemon-Garlic Chicken and Tomato Kebabs With Basil Chimichurri Recipe',
      'description': 'Grilled Lemon-Garlic Chicken and Tomato Kebabs With Basil Chimichurri Recipe',
      'rating': 5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160703-Grilled-Lemon-Garlic-Chicken-Tomato-Kebabs-Basil-Chimichurri-emily-matt-clifton-7-thumb-1500xauto-433447.jpg',
      'servingSize': 4,
      'ingredients': [],
      'steps': [],
    },
    {
      'name': 'Butter-Basted Sous Vide Halibut Recipe',
      'description': 'Butter-Basted Sous Vide Halibut Recipe',
      'rating': 5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160826-sous-vide-halibut-26-thumb-1500xauto-433935.jpg',
      'servingSize': 4,
      'ingredients': [],
      'steps': [],
    },
    {
      'name': 'The Best Minestrone Soup Recipe',
      'description': 'The Best Minestrone Soup Recipe',
      'rating': 5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2016/09/20160909-minestrone-18-thumb-1500xauto-434133.jpg',
      'servingSize': 4,
      'ingredients': [],
      'steps': [],
    },
    {
      'name': 'Quick-Marinated White Bean Salad and Feta Lettuce Cups Recipe',
      'description': 'Quick-Marinated White Bean Salad and Feta Lettuce Cups Recipe',
      'rating': 5,
      'imageThumbnail': 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg',
      'imageBackground': 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160703-Quick-Marinated-White-Bean-Salad-Feta-Lettuce-Cups-Emily-Matt-Clifton-3-thumb-1500xauto-433449.jpg',
      'servingSize': 4,
      'ingredients': [],
      'steps': [],
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
