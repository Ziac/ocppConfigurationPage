angular.module('ocppConfigApp', [
  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'ngAria'
])
.config(function($mdThemingProvider) {
  // Define custom palettes
  const fusePrimary = $mdThemingProvider.extendPalette('blue-grey', {
    '500': '#2D323E',
    'contrastDefaultColor': 'light'
  });

  const fuseAccent = $mdThemingProvider.extendPalette('deep-orange', {
    '500': '#FF5722',
    'contrastDefaultColor': 'light'
  });

  // Register the custom palettes
  $mdThemingProvider.definePalette('fusePrimary', fusePrimary);
  $mdThemingProvider.definePalette('fuseAccent', fuseAccent);

  // Configure themes
  $mdThemingProvider.theme('default')
    .primaryPalette('fusePrimary')
    .accentPalette('fuseAccent')
    .warnPalette('red');

  $mdThemingProvider.theme('success')
    .primaryPalette('green');

  $mdThemingProvider.theme('error')
    .primaryPalette('red');
})
.run(function($rootScope, TranslationService) {
  $rootScope.$on('$translateChangeSuccess', function() {
    $rootScope.currentLanguage = TranslationService.getCurrentLanguage();
  });
});