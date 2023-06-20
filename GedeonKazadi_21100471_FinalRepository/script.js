  // Randomly change the "Subs of the Month" images and names on page load
  window.addEventListener('load', function() {
    var sub1Img = document.getElementById('sub1-img');
    var sub2Img = document.getElementById('sub2-img');
    var sub1Title = document.getElementById('sub1-title');
    var sub2Title = document.getElementById('sub2-title');
    var sub1Text = document.querySelector('#sub1-img + .card-body .card-text');
    var sub2Text = document.querySelector('#sub2-img + .card-body .card-text');

    var sandwiches = [{
        name: 'Italian Sub',
        image: 'images/eaters-collective-uhJfaJ6c9fY-unsplash.jpg',
        description: 'A classic Italian flavored submarine sandwich, also known as an "Italian sub" or "Italian hero," is a mouthwatering combination of savory ingredients. It typically features thinly sliced Italian deli meats such as salami, pepperoni, and ham, along with provolone cheese.'
      },
      {
        name: 'Veggie Delight',
        image: 'images/italian-sub-sandwich-recipe.jpg',
        description: 'A veggie-flavored submarine sandwich is a delightful option for those who prefer a plant-based or vegetarian diet. Packed with fresh and vibrant ingredients, this sandwich is a celebration of vegetables and flavors.'
      },
      {
        name: 'Double Hoggie',
        image: 'images/Sub-5.jpg',
        description: 'The Double Hoggie is a hearty submarine sandwich filled with layers of succulent ham, crispy bacon, and tender roast beef. Topped with melted cheese, fresh vegetables, and tangy sauce, it offers a satisfying taste experience.'
      },
      {
        name: 'Subway King',
        image: 'images/340d12d3-3ff7-4f38-91a7-dc852b6f52d8.jpg',
        description: 'The Subway King is a royal treat for sandwich enthusiasts. Packed with premium ingredients like roasted turkey, black forest ham, and tender chicken strips, its a sandwich fit for a king. With a variety of flavorful sauces and toppings, its a taste sensation.'
      },
      // Add more sandwich objects here
    ];

    // Randomly select a sandwich for Sub 1
    var randomIndex1 = Math.floor(Math.random() * sandwiches.length);
    sub1Img.src = sandwiches[randomIndex1].image;
    sub1Title.textContent = sandwiches[randomIndex1].name;
    sub1Text.textContent = sandwiches[randomIndex1].description;

    // Randomly select a sandwich for Sub 2, ensuring it's different from Sub 1
    var randomIndex2 = Math.floor(Math.random() * (sandwiches.length - 1));
    if (randomIndex2 >= randomIndex1) {
      randomIndex2++;
    }
    sub2Img.src = sandwiches[randomIndex2].image;
    sub2Title.textContent = sandwiches[randomIndex2].name;
    sub2Text.textContent = sandwiches[randomIndex2].description;
  });

  document.getElementById('build-sub-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var subName = document.getElementById('sub-name').value;
    var bread = document.getElementById('bread').value;
    var toppings = [];
    var checkboxes = document.querySelectorAll('input[name="topping"]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
      toppings.push(checkboxes[i].value);
    }
    var sauce = document.getElementById('sauce').value;
    var subCost = calculateSubCost(bread, toppings, sauce);
    var subItem = createSubItem(subName, bread, toppings, sauce, subCost);
    document.getElementById('sub-list').appendChild(subItem);
    updateTotalCost(subCost);
    resetForm();
  });

  function calculateSubCost(bread, toppings, sauce) {
    var baseCost = 20; // Cost for base bread in ZAR
    var toppingCost = toppings.length * 5; // Cost per topping in ZAR
    var sauceCost = 10; // Cost for sauce in ZAR
    return baseCost + toppingCost + sauceCost;
  }

  function createSubItem(name, bread, toppings, sauce, cost) {
    var subItem = document.createElement('li');
    subItem.innerHTML = `
      <strong>${name}</strong><br>
      Bread: ${bread}<br>
      Toppings: ${toppings.join(', ')}<br>
      Sauce: ${sauce}<br>
      Cost: ZAR ${cost.toFixed(2)}
    `;
    return subItem;
  }

  function updateTotalCost(cost) {
    var totalCostElement = document.getElementById('total-cost');
    var totalCost = parseFloat(totalCostElement.textContent);
    totalCost += cost;
    totalCostElement.textContent = totalCost.toFixed(2);
  }

  function resetForm() {
    document.getElementById('sub-name').value = '';
    document.getElementById('bread').selectedIndex = 0;
    var checkboxes = document.querySelectorAll('input[name="topping"]');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    document.getElementById('sauce').selectedIndex = 0;
  }

  document.getElementById('submit-order').addEventListener('click', function() {
    var subList = document.getElementById('sub-list');
    var totalCost = document.getElementById('total-cost').textContent;
    alert('Order submitted!\n\nSubs:\n' + subList.innerHTML + '\nTotal Cost: ZAR ' + totalCost);
    subList.innerHTML = '';
    document.getElementById('total-cost').textContent = '0.00';
  });

  var orderDetails = JSON.parse(localStorage.getItem('orderDetails'));

if (orderDetails && orderDetails.length > 0) {
  var orderDetailsBody = document.getElementById('order-details-body');
  var totalCost = 0;

  // Populate order details table
  orderDetails.forEach(function (order) {
    var toppings = order.toppings.join(', ');
    var row = '<tr>' +
              '<td>' + order.subName + '</td>' +
              '<td>' + order.bread + '</td>' +
              '<td>' + toppings + '</td>' +
              '<td>' + order.sauce + '</td>' +
              '<td>$' + order.subCost + '</td>' +
              '</tr>';
    orderDetailsBody.innerHTML += row;
    totalCost += order.subCost;
  });

  // Display total cost
  document.getElementById('total-cost').textContent = totalCost;
}

// Apply coupon code
document.getElementById('apply-coupon-btn').addEventListener('click', function () {
  var couponCode = document.getElementById('coupon-input').value.trim();

  // Check if the coupon code is valid (e.g., 'SAVE10' for a 10% discount)
  if (couponCode === 'SAVE10') {
    // Apply 10% discount
    var currentTotal = parseInt(document.getElementById('total-cost').textContent);
    var discountedTotal = currentTotal - (currentTotal * 0.1);
    document.getElementById('total-cost').textContent = discountedTotal.toFixed(2);
    alert('Coupon applied successfully!');
  } else {
    alert('Invalid coupon code. Please try again.');
  }
});