const apiKey = "8225bcc5-a917-437a-bf4e-57016969e317";
const fortniteApiUrl = "https://fnbr.co/api/images";
const cosmeticListUrl = "https://fortniteapi.io/v2/items/list?lang=en";
const fortniteApiIoApiKey = "89064f30-514adb24-3bbe4145-a8c96cc6";

function searchCosmetics() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cosmeticList = document.getElementById('cosmeticList');

    // Clear previous search results
    cosmeticList.innerHTML = '';

    // Fetch cosmetic data from Fortnite API
    $.ajax({
        url: `${fortniteApiUrl}?search=${searchInput}`,
        method: 'GET',
        headers: {
            'x-api-key': apiKey
        },
        success: function (response) {
            const cosmetics = response.data;
            displayCosmetics(cosmetics, cosmeticList);
        }
    });
}

function displayCosmetics(cosmetics, cosmeticList) {
    cosmetics.forEach(cosmetic => {
        // Fetch cosmetic ID
        fetchCosmeticId(cosmetic);
    });
}

function fetchCosmeticId(cosmetic) {
    const cosmeticName = cosmetic.name.toLowerCase();

    $.ajax({
        url: `${cosmeticListUrl}&name=${cosmeticName}`,
        method: 'GET',
        headers: {
            'Authorization': fortniteApiIoApiKey
        },
        success: function (response) {
            const cosmeticId = response.items[0]?.id;

            if (cosmeticId) {
                // If the ID is available, display it or use it as needed
                displayCosmeticInfo(cosmetic, cosmeticId);
            }
        }
    });
}

function displayCosmeticInfo(cosmetic, cosmeticId) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    // Add colored rarity text using rarityscript
    let rarityText = cosmetic.rarity.toLowerCase();
    const raritySpan = document.createElement('span');
    raritySpan.classList.add(rarityText);
    raritySpan.textContent = cosmetic.rarity;
    listItem.appendChild(raritySpan);

    // Display cosmetic name, rarity, and description
    listItem.innerHTML += ` - <strong>${cosmetic.name}</strong>`;
    listItem.innerHTML += `<br>Description: ${cosmetic.description} `;
    listItem.innerHTML += `<br>Type: ${cosmetic.readableType} `;
    listItem.innerHTML += `<br>Slug: ${cosmetic.slug} `;
    listItem.innerHTML += `<br>Cosmetic ID: ${cosmeticId}`;
  //listItem.innerHTML += `<br>Shop History: ${cosmeticId}`;// Display the retrieved cosmetic ID
    // Add price if available
    if (cosmetic.price) {
        const priceIcon = cosmetic.priceIconLink ? `<img src="https://image.fnbr.co/price/icon_vbucks.png" alt="${cosmetic.priceIcon}" height="20px">` : '';
        listItem.innerHTML += `<br>Price: ${priceIcon}${cosmetic.price} `;
    }

    // Add image if available
    if (cosmetic.images && cosmetic.images.icon) {
        const img = document.createElement('img');
        img.src = cosmetic.images.icon;
        img.alt = cosmetic.name;
        listItem.appendChild(img);
    }

    cosmeticList.appendChild(listItem);
}
