(function () {
'use strict';

angular.module('ShoppingListApp',[]).
controller('ToBuyController',ToBuyController).
controller('AlreadyBoughtController',AlreadyBoughtController).
provider('ShoppingListService',ShoppingListServiceProvider);

ToBuyController.$inject['ShoppingListService'];
function ToBuyController(ShoppingListService)
{
    var tobuy = this;

    tobuy.toBuyItems = ShoppingListService.getItemsToBuy();
    tobuy.buyItem = function(itemIndex){
      ShoppingListService.buyItemFromList(itemIndex);
      ShoppingListService.removeItemFromBuyList(itemIndex);
    };

}

AlreadyBoughtController.$inject['AlreadyBoughtController'];
function AlreadyBoughtController(ShoppingListService)
{
  var alreadybought = this;
  alreadybought.alreadyboughtitems = ShoppingListService.getItemsAlreadyBought();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [
    { name: "cookies", quantity: 10 },
    { name: "ice cream", quantity: 5 },
    { name: "noodles", quantity: 3 },
    { name: "masala", quantity: 2 },
    { name: "nuggets", quantity: 20 },
  ];

  var alreadyBoughtItems = [];

  service.buyItemFromList = function (itemIndex) {
      var item = {
        name: toBuyItems[itemIndex].name,
        quantity: toBuyItems[itemIndex].quantity
      };
      alreadyBoughtItems.push(item);
  };

  service.removeItemFromBuyList = function (itemIndex) {
    toBuyItems.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return toBuyItems;
  };

  service.getItemsAlreadyBought = function () {
    return alreadyBoughtItems;
  };
}

function ShoppingListServiceProvider() {
  var provider = this;

  provider.$get = function () {
    var shoppingList = new ShoppingListCheckOffService();

    return shoppingList;
  };
}

})();
