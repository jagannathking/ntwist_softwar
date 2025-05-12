document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sort-button');
    const nameList = document.getElementById('name-list');

    if (sortButton && nameList) {
        sortButton.addEventListener('click', () => {
            console.log('Sort button clicked.');

            const listItems = nameList.querySelectorAll('li');

            const itemsArray = Array.from(listItems);

            itemsArray.sort((a, b) => {
                const textA = a.textContent.trim().toLowerCase();
                const textB = b.textContent.trim().toLowerCase();
                if (textA < textB) return -1; 
                if (textA > textB) return 1;  
                return 0; 
            });

            itemsArray.forEach(item => {
                nameList.appendChild(item);
            });

             console.log('List sorted and re-rendered.');
        });
    } else {
        console.error('Sort button or name list element not found.');
    }
});