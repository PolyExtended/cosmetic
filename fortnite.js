    const apiKey = "8225bcc5-a917-437a-bf4e-57016969e317";

    function searchCosmetics() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const cosmeticList = document.getElementById('cosmeticList');

        // Clear previous search results
        cosmeticList.innerHTML = '';

        // Fetch cosmetic data from Fortnite API
        $.ajax({
            url: `https://fnbr.co/api/images?search=${searchInput}`,
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
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');

            // Add colored rarity text using rarityscript
            let rarityText = cosmetic.rarity.toLowerCase();


            const raritySpan = document.createElement('span');
            raritySpan.classList.add(rarityText);
            raritySpan.textContent = cosmetic.rarity;
            listItem.appendChild(raritySpan);

            // Display cosmetic name, rarity, and description
            listItem.innerHTML += ` - <strong>${cosmetic.name}</strong><br>${cosmetic.description}`;

            // Add price if available
            if (cosmetic.price ) {
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
        });
    }
